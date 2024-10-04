import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import {
  fetchMarkdownPostsMetadata,
  formattedPubDate,
  fetchAuthorMetadata,
} from './utils.js';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const access = promisify(fs.access);
const readFile = promisify(fs.readFile);

/**
 * Checks if a given path exists.
 * @param {string} pathToCheck - Path to verify.
 * @returns {Promise<boolean>} - True if exists, false otherwise.
 */
async function exists(pathToCheck) {
  try {
    await access(pathToCheck, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Splits a title into multiple lines if it exceeds a maximum length.
 * @param {string} title - Title to split.
 * @param {number} maxLineLength - Maximum length of each line.
 * @returns {Array<string>} - Array of title lines.
 */
function splitTitle(title, maxLineLength = 27) {
  const words = title.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length > maxLineLength) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }

  if (currentLine.trim()) {
    lines.push(currentLine.trim());
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
  const titleLines = splitTitle(data.title);
  const bylineY = height - 140;
  const dateY = height - 100;

  // Generate multiple <text> elements for each title line
  const titleTexts = titleLines
    .map((line, index) => `<text x="120" y="${150 + index * 72}" class="title">${line}</text>`)
    .join('\n  ');

  // Read the SVG template
  const templatePath = path.join(process.cwd(), 'scripts', 'templates', 'og-template.svg');
  const templateContent = await readFile(templatePath, 'utf-8');

  // Replace placeholders with actual data
  const svg = templateContent
    .replaceAll('${width}', width)
    .replaceAll('${height}', height)
    .replaceAll('${titleTexts}', titleTexts)
    .replaceAll('${bylineY}', bylineY)
    .replaceAll('${dateY}', dateY)
    .replaceAll('${author}', data.author)
    .replaceAll('${pubDate}', data.pubDate);

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
    const outputDir = path.join(process.cwd(), 'static', 'assets', 'og');
    const outputPath = path.join(outputDir, `${slug}.png`);

    // Ensure output directory exists
    if (!(await exists(outputDir))) {
      await mkdir(outputDir, { recursive: true });
    }

    // Save the image to the filesystem
    await writeFile(outputPath, image);
    console.log(`OG image generated for post: ${slug}`);
  } catch (error) {
    console.error('Error generating OG image:', error);
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
      const imagePath = path.join('static', 'assets', 'og', `${slug}.png`);

      // Check if the image already exists
      if (await exists(imagePath)) {
        console.log(`OG image for post "${slug}" already exists. Skipping.`);
        continue;
      }

      // Fetch author metadata
      const authorMetadata = await fetchAuthorMetadata(meta.author);

      if (!authorMetadata) {
        console.warn(
          `Could not fetch metadata for author "${meta.author}". Skipping image generation for post "${slug}".`
        );
        continue;
      }

      // Format publication date
      const pubDateFormatted = formattedPubDate(meta.pub_date);

      // Prepare data for the SVG
      const svgData = {
        title: meta.title,
        author: authorMetadata.name,
        pubDate: pubDateFormatted,
      };

      // Generate the OG image
      await generateOgImage(svgData, slug);
    }

    console.log('All Open Graph images have been successfully generated.');
  } catch (error) {
    console.error('Error during Open Graph image generation:', error);
    process.exit(1); // Exit with failure
  }
}

// Execute the script
generateAllOgImages();
