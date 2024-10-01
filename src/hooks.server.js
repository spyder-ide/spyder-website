import sharp from 'sharp';
import { join } from "path";
import { existsSync, createReadStream, writeFileSync, mkdirSync } from "fs";
import { fetchMarkdownPosts, formattedPubDate, fetchAuthorMetadata } from "$lib/utils";
import { siteUrl, ogSlug, blogSlug } from "$lib/config"

// Export the join function from the path module for use elsewhere
export default join;

function splitTitle(title, maxLineLength = 38) {
  const words = title.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + word).length > maxLineLength) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });

  if (currentLine) {
    lines.push(currentLine.trim());
  }

  return lines;
}

// Function to generate OpenGraph image for each blog post
const generateOgImage = async (title, author, pubDate, slug) => {
  const width = 1200;
  const height = 630;
  const titleLines = splitTitle(title);
  const titleSvg = titleLines.map((line, index) =>
    `<text x="60" y="${110 + index * 72}" class="title">${line}</text>`
  ).join('');
  try {
    const svg = `
    <svg width="${width}" height="${height}">
      <style>
        .title { fill:#5d5d5d; font-size:56px; font-weight:900; font-family:Silka; }
        .byline { fill:#8c0000; font-size:24px; font-family:Silka }
        .small { fill:#374151; font-size:14px; font-family:Silka; }
      </style>
      <rect width="100%" height="100%" x="0" y="0" fill="#f7f7f2"/>
      <g style="stroke:#8d8d8d;stroke-width:.768775;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:100000;stroke-dasharray:none;stroke-opacity:.0896032" transform="translate(-2525.116 -1610.305)scale(20.2061)">
        <path d="M-78.535 64.602q-11.388 24.496 4.306 30.716c15.693 6.22 53.008 8.708 68.606 22.2 15.597 13.493 63.155 3.062 71.289-20.095 8.133-23.157 22.778-58.849-54.444-58.849q-77.221 0-89.757 26.028z" style="fill:none" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path2" />
        <path d="M-190.246 96.846q7.717 68.591 61.713 86.007c53.995 17.415 162.5 24.381 227.985 62.16 65.483 37.778 181.784 8.573 167.123-56.266C251.915 123.907 235.22 23.969 19 23.969q-216.221 0-209.245 72.877z" style="fill:none;stroke-opacity:.03" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path3" />
        <path d="M-181.868 94.16q3.618 64.916 53.785 81.398c50.167 16.483 152.484 23.076 212.431 58.83 59.945 35.755 171.585 8.114 161.194-53.252-10.39-61.365-20.82-155.95-225.458-155.95q-204.638 0-201.951 68.973z" style="fill:none;stroke-opacity:.03" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path4" />
        <path d="M-173.277 91.472q.09 61.242 46.573 76.792c46.484 15.55 142.673 21.769 197.396 55.5 54.722 33.73 161.457 7.654 154.796-50.238S213.828 26.403 20.774 26.403q-193.055 0-194.05 65.07z" style="fill:none;stroke-opacity:.05" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path5" />
        <path d="M-164.492 88.785q-2.914 57.567 40.018 72.184c42.934 14.617 133.046 20.463 182.835 52.17 49.786 31.707 151.395 7.195 147.968-47.223S202.573 27.62 21.102 27.62q-181.471 0-185.594 61.165z" style="fill:none;stroke-opacity:.05" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path6" />
        <path d="M-155.528 86.098q-5.437 53.893 34.069 67.577c39.505 13.683 123.591 19.156 168.71 48.84 45.117 29.683 141.393 6.736 140.744-44.21-.648-50.945 2.99-129.468-166.898-129.468q-169.889 0-176.625 57.261z" style="fill:none;stroke-opacity:.05" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path7" />
        <path d="M-146.398 83.411q-7.509 50.219 28.682 62.969c36.191 12.75 114.295 17.85 154.992 45.51 40.695 27.66 131.447 6.277 133.153-41.195 1.706-47.471 8.657-120.64-149.647-120.64q-158.305 0-167.18 53.356z" style="fill:none;stroke-opacity:.07" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path8" />
        <path d="M-137.112 80.724q-9.164 46.545 23.82 58.361c32.983 11.818 105.149 16.545 141.654 42.18 36.503 25.636 121.553 5.818 125.218-38.18 3.664-43.998 13.318-111.813-133.403-111.813q-146.722 0-157.288 49.452z" style="fill:none;stroke-opacity:.07" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path9" />
        <path d="M-127.679 78.037q-10.424 42.87 19.453 53.754c29.876 10.885 96.143 15.238 128.673 38.85 32.53 23.611 111.71 5.358 116.96-35.166 5.25-40.525 17.03-102.986-118.108-102.986q-135.139 0-146.978 45.548z" style="fill:none;stroke-opacity:.07" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path10" />
        <path d="M-118.107 75.35q-11.308 39.195 15.555 49.146c26.864 9.952 87.27 13.933 116.033 35.52 28.762 21.588 101.913 4.9 108.393-32.152 6.48-37.05 19.842-94.158-103.712-94.158q-123.555-.001-136.269 41.644Z" style="fill:none" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path11" />
        <path d="M-108.402 72.663q-11.835 35.52 12.107 44.539c23.943 9.019 78.525 12.626 103.717 32.19s92.16 4.44 99.533-29.138c7.373-33.577 21.794-85.331-90.178-85.331q-111.971 0-125.18 37.74z" style="fill:none" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path12" />
        <path d="M-98.57 69.976q-12.016 31.845 9.092 39.931c21.108 8.086 69.901 11.32 91.713 28.86 21.81 17.54 82.45 3.98 90.39-26.123s22.918-76.504-77.47-76.504q-100.389 0-113.724 33.836z" style="fill:none" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path13" />
        <path d="M-88.613 67.289q-11.865 28.17 6.494 35.324c18.36 7.153 61.397 10.014 80.012 25.53 18.614 15.516 72.782 3.52 80.973-23.11 8.19-26.63 23.24-67.676-65.565-67.676q-88.805 0-101.914 29.932z" style="fill:none" transform="matrix(-.48176 0 0 -.40704 133.718 109.003)" id="path14" />
      </g>
      <path d="M206.45 111.84a2.65 2.65 0 0 1 2.51 2.87v7.71a2.38 2.38 0 0 1-2.69 2.69h-33.35c-8.25 0-13.09 2.86-13.09 9.32v2.33c0 5 2.33 9.32 11.11 12.55l23.85 9.51c16.5 6.27 17.93 15.42 17.93 25.28v2c0 20.08-12 24-36.22 24-15.6 0-29.76-1.26-32.81-1.62-2.15-.17-2.69-1.25-2.69-2.68v-7.89a2.37 2.37 0 0 1 2.69-2.69h33.17c14.34 0 18.83-1.62 18.83-9.33v-2.15c0-5.2-2.15-8.61-10.4-12L159.83 162c-13.81-5.38-17.22-15.78-17.22-25.64v-3.76c0-19.73 17.22-22.42 36.4-22.42a226 226 0 0 1 27.44 1.66" style="fill:#303030" transform="translate(1069.074 499.608)scale(.40477)" id="path15" />
      <path d="M198.33 45a29.5 29.5 0 0 0-18.65-6.64H66.94a29.6 29.6 0 0 0-13.81 3.41 30 30 0 0 0-12 11.6c-.54 1-1 1.94-1.46 2.93-.26.68-.55 1.35-.78 2a26 26 0 0 0-1.07 4.15A28 28 0 0 0 37.3 68v112.7a29.2 29.2 0 0 0 2.93 12.84 29.63 29.63 0 0 0 26.71 16.77h60.18a1.6 1.6 0 0 0 1.6-1.6v-7.19a1.6 1.6 0 0 0-1.6-1.6h-7.81L96 152.71l53.18-70.48a6 6 0 0 0 1-2.07l48.73 7.46v11a1.6 1.6 0 0 0 1.6 1.59h7.23a1.61 1.61 0 0 0 1.6-1.59V68a29.49 29.49 0 0 0-11.01-23M137 48.74l2.52 20.08-39.4-6-1.78-14zm-70 0h21.65l1.55 12.55-28.78-4.4-9.08-1.4a19.11 19.11 0 0 1 14.6-6.75zM88.87 70.8 68.78 97.5l-15.9-32.22Zm-41.16 5.7 12.88 26.08-12.88 1.58zm0 37.35 17.35-2.19 18 36.39-35.35 4.45zm60.89 86.07H68.54a20.88 20.88 0 0 1-20.83-20.82v-16.93l39.79-5zm-17.34-56.83-17.75-36 26.1-34.59v-.06l40.26 6.16zM198.9 77.9l-49.57-7.58-2.7-21.58h31.45a20.87 20.87 0 0 1 20.82 20.81z" style="fill:#8c0000" transform="translate(1069.074 499.608)scale(.40477)" id="path16" />
      ${titleSvg}
      <text x="60" y="${height - 80}" class="byline">By ${author} | ${formattedPubDate(pubDate)}</text>
      <text class="small" x="60" y="${height - 55}">${siteUrl}${blogSlug}/${slug}</text>
    </svg>
    `;

    // Create image from SVG
    const svgBuffer = Buffer.from(svg);

    // Composite background, SVG, and logo
    const image = await sharp({
      create: {
        width: width,
        height: height,
        channels: 4,
        background: { r: 247, g: 247, b: 242, alpha: 1 }
      }
    })
      .composite([
        { input: svgBuffer },
      ])
      .png()
      .toBuffer();

    // Save the image
    writeFileSync(join(outputDir, `${slug}.png`), image);
  } catch (error) {
    console.error('Error generating OG image:', error);
  }
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

export const prerender = true;
