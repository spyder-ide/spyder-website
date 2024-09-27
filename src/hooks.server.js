import { existsSync, createReadStream, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { createCanvas, loadImage } from 'canvas';
import { fetchMarkdownPosts, formattedPubDate, fetchAuthorMetadata } from "$lib/utils";
import { siteUrl, ogSlug, blogSlug } from "$lib/config"

// Export the join function from the path module for use elsewhere
export default join;

// Wrap text in the canvas
const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(" ");
  let line = "";
  let testLine, metrics, testWidth;

  for (let n = 0; n < words.length; n++) {
    testLine = line + words[n] + " ";
    metrics = ctx.measureText(testLine);
    testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

const addText = (ctx, text, x, y, weight, size, font, color, width, lineHeight, wrap = false) => {
  ctx.font = `${weight} ${size}px ${font}`;
  ctx.fillStyle = color;
  if (wrap) {
    wrapText(ctx, text, x, y, width - (2 * x), lineHeight);
  } else {
    ctx.fillText(text, x, y);
  }
}

// Function to generate OpenGraph image for each blog post
const generateOgImage = async (title, author, pubDate, slug) => {
  const width = 1200;
  const height = 630;
  const lgSize = 56;
  const mdSize = 24;
  const smSize = 14;
  const lgWeight = 200;
  const mdWeight = 400;
  const smWeight = 300;
  const lineHeight = lgSize * 1.5;
  const font = "Silka"
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#f7f7f2';
  ctx.fillRect(0, 0, width, height);
  const bg = await loadImage(join(process.cwd(), 'static', 'assets', 'media', 'bg.svg'));
  ctx.drawImage(bg, -width, -height, width * 2, height * 2.25);

  // Draw the logo
  const logo = await loadImage(join(process.cwd(), 'static', 'assets', 'media', 'spyder-logomark.png'));
  ctx.drawImage(logo, width - 160, height - 160, 100, 100);

  // Title
  addText(ctx, title, 60, 100, lgWeight, lgSize, font, '#5d5d5d', width, lineHeight, true)

  // Author and date
  const byline = `By ${author} | ${formattedPubDate(pubDate)}`;
  addText(ctx, byline, 60, height - 120, mdWeight, mdSize, font, '#8c0000', width, lineHeight, false)

  // Meta
  const urlLine = `${siteUrl}${blogSlug}/${slug}`
  addText(ctx, urlLine, 60, height - 60, smWeight, smSize, font, 'rgb(55, 65, 81)', width, lineHeight, false)

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  writeFileSync(join(outputDir, `${slug}.png`), buffer);
};

// Set the output directory for OpenGraph images
const outputDir = join(process.cwd(), 'static', 'assets', ogSlug);

// Ensure the output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // Check if the request is for a blog media element
  if (
    event.url.pathname.startsWith(`/${blogSlug}/`) &&
    event.url.pathname.match(
      /\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i
    )
  ) {
    const imagePath = join(process.cwd(), "src", "routes", event.url.pathname);
    if (existsSync(imagePath)) {
      const stream = createReadStream(imagePath);
      return new Response(stream);
    }
  }

  // Fetch all blog posts
  const posts = await fetchMarkdownPosts();
  // Generate OpenGraph images for each post if not already generated
  for (const post of posts) {
    // Get author metadata
    const slug = post.path.split('/').pop(); // Extract slug from path
    const imagePath = join(outputDir, `${slug}.png`);
    const authorMetadata = await fetchAuthorMetadata(post.meta.author, event.fetch);

    // Check if the image already exists
    if (!existsSync(imagePath)) {
      await generateOgImage(post.meta.title, authorMetadata.name, post.meta.pub_date, slug);
    }
  }

  return resolve(event);
}
