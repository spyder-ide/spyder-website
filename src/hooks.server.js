import { existsSync, createReadStream } from "fs";
import { join } from "path";
import { locale } from 'svelte-i18n';
import fs from 'fs';
import path from 'path';

export default join;

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const lang = event.request.headers.get('accept-language')?.split(',')[0];
  if (lang) {
    locale.set(lang);
  }

  if (
    event.url.pathname.startsWith("/blog/") &&
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

  return resolve(event);
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error }) {
  return {
    message: 'Internal Error',
    code: error?.code ?? 'UNKNOWN'
  };
}

/** @type {import('@sveltejs/kit').PreloadData} */
export async function preloadData() {
  const blogDir = path.join(process.cwd(), "src", "routes", "blog");

  // Process each blog directory
  const blogEntries = fs.readdirSync(blogDir, { withFileTypes: true });
  for (const entry of blogEntries) {
    if (entry.isDirectory()) {
      const fullDirPath = path.join(blogDir, entry.name);
      console.log(`Processing blog directory: ${entry.name}`);

      try {
        const media = fs
          .readdirSync(fullDirPath)
          .filter((file) =>
            /\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i.test(file)
          );

        for (const medium of media) {
          const sourcePath = path.join(fullDirPath, medium);
          const targetPath = path.join(process.cwd(), 'build', 'blog', entry.name, medium);

          // Ensure target directory exists
          fs.mkdirSync(path.dirname(targetPath), { recursive: true });

          // Copy the file
          fs.copyFileSync(sourcePath, targetPath);
          console.log(`Copied: ${medium} to ${targetPath}`);
        }
      } catch (error) {
        console.warn(`Warning: Could not process directory ${fullDirPath}`, error);
      }
    }
  }
}
