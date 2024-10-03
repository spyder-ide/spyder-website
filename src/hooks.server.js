import { join, dirname } from "path";
import { existsSync, createReadStream } from "fs";
import { blogSlug } from "$lib/config";

/**
 * Returns the MIME type based on the file extension.
 * @param {string} filePath - Path to the file.
 * @returns {string} - MIME type.
 */
function getMimeType(filePath) {
  const ext = dirname(filePath).split('.').pop().toLowerCase();
  switch (ext) {
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'webp':
      return 'image/webp';
    case 'webm':
      return 'video/webm';
    case 'mp4':
      return 'video/mp4';
    case 'mpogv':
      return 'video/ogg';
    case 'mp3':
      return 'audio/mpeg';
    case 'ogg':
      return 'audio/ogg';
    default:
      return 'application/octet-stream';
  }
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const imageExtensions = /\.(png|jpe?g|gif|svg|webp|webm|mpogv|mp3|mp4|ogg)$/i;

  // Check if the request is for a media element in a blog post (excluding the OG image)
  if (
    event.url.pathname.startsWith(`/${blogSlug}/`) &&
    imageExtensions.test(event.url.pathname)
  ) {
    // Construct the full path to the image file within src/routes
    const imagePath = join(process.cwd(), "src", "routes", event.url.pathname);

    // Check if the image file exists
    if (existsSync(imagePath)) {
      const stream = createReadStream(imagePath);
      const mimeType = getMimeType(imagePath);

      return new Response(stream, {
        headers: {
          "Content-Type": mimeType || "application/octet-stream",
        },
      });
    }
  }

  // For all other requests, proceed as usual
  return resolve(event);
}
