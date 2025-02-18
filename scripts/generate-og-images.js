import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";
import {
  exists,
  fetchAuthorsMetadata,
  fetchMarkdownPostsMetadata,
  testLength,
} from "./utils.js";

const maxLineLength = 27;
const maxTextLength = 100;

/**
 * Splits a title into multiple lines if it exceeds a maximum length.
 * @param {string} title - Title to split.
 * @param {number} maxLineLength - Maximum length of each line.
 * @returns {Array<string>} - Array of title lines.
 */
function splitText(title, lineLenght = maxLineLength) {
  const words = title.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + word).length > lineLenght) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  }

  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  if (lines.length > 4) {
    throw new Error(
      `Processing the text produces too many lines (${lines.length} lines total, must be lees than 4). Edit your title and try again.`,
    );
  }

  return lines;
}

/**
 * Generates an Open Graph image for a specific post.
 * @param {object} data - Data for the SVG template.
 * @param {string} slug - Slug of the post.
 */
async function generateOgImage(data, slug) {
  const width = 1200;
  const height = 630;
  const titleLines = splitText(data.title);
  const bylineY = height - 100;

  // Read the SVG template
  const templatePath = path.join(
    process.cwd(),
    "scripts",
    "templates",
    "og-template.svg",
  );
  const templateContent = await fs.readFile(templatePath, "utf-8");

  // Generate multiple <text> elements for each title line
  const titleTexts = titleLines
    .map((line, index) =>
      `<text x="120" y="${150 + index * 72}" class="title">${line}</text>`
    )
    .join("\n  ");

  // If we have multiple authors, create a string with their names
  let authors = "";
  if (Array.isArray(data.author) && data.author.length > 1) {
    authors = [
      data.author.slice(0, -1).join(", ") + " &amp; " + data.author.slice(-1),
    ];
  } else {
    authors = data.author;
  }

  // Replace placeholders with actual data
  const svg = templateContent
    .replaceAll("${width}", width)
    .replaceAll("${height}", height)
    .replaceAll("${titleTexts}", titleTexts)
    .replaceAll("${bylineY}", bylineY)
    .replaceAll("${author}", authors);

  try {
    // Create SVG buffer
    const svgBuffer = Buffer.from(svg);

    // Generate image using sharp
    const image = await sharp({
      create: {
        width: width,
        height: height,
        channels: 4,
        background: { r: 247, g: 247, b: 242, alpha: 1 },
      },
    })
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toBuffer();

    // Output directory and path
    const outputDir = path.join(process.cwd(), "static", "assets", "og");
    const outputPath = path.join(outputDir, `${slug}.png`);

    // Ensure output directory exists
    if (!(await exists(outputDir))) {
      await fs.mkdir(outputDir, { recursive: true });
    }

    // Save the image to the filesystem
    await fs.writeFile(outputPath, image);
    console.log(`OG image generated for post: ${slug}`);
  } catch (error) {
    console.error("Error generating OG image:", error);
  }
}

/**
 * Generates Open Graph images for all Markdown posts.
 */
async function generateAllOgImages() {
  try {
    const posts = await fetchMarkdownPostsMetadata();

    for (const post of posts) {
      const { meta, path: postPath } = post;
      const slug = path.basename(postPath);
      const imagePath = path.join("static", "assets", "og", `${slug}.png`);

      // Check if the image already exists
      if (await exists(imagePath)) {
        console.log(`OG image for post "${slug}" already exists. Skipping.`);
        continue;
      }

      // Fetch author metadata\
      const authorsArray = Array.isArray(meta.author)
        ? meta.author
        : [meta.author];
      const authorMetadata = await fetchAuthorsMetadata(authorsArray);

      if (!authorMetadata) {
        console.warn(
          `Could not fetch metadata for author "${meta.author}". Skipping image generation for post "${slug}".`,
        );
        continue;
      }

      // Prepare data for the SVG
      const svgData = {
        title: meta.title,
        author: authorMetadata.map((a) => a.name),
      };

      if (!testLength(svgData.title, maxTextLength)) {
        throw new Error(
          `The title of the post "${svgData.title}" is too long (${svgData.title.length} characters)! Use titles of ${maxTextLength} characters or less.`,
        );
      }

      // Generate the OG image
      await generateOgImage(svgData, slug);
    }

    console.log("All Open Graph images have been successfully generated.");
  } catch (error) {
    console.error("Error during Open Graph image generation:", error);
    process.exit(1); // Exit with failure
  }
}

// Execute the script
generateAllOgImages();
