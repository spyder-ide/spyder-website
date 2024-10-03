import { join } from "path";
import { existsSync, createReadStream } from "fs";
import { blogSlug } from "$lib/config"

export default join;

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // Check if the request is for a blog media element
  if (
    event.url.pathname.startsWith(`/${blogSlug}/`) &&
    event.url.pathname.match(
      /\.(png|jpe?g|gif|svg|webp|webm|mpogv|mp3|mp4|ogg)$/i
    )
  ) {
    // Construct the full path to the image file
    const imagePath = join(process.cwd(), "src", "routes", event.url.pathname);
    // Check if the image file exists
    if (existsSync(imagePath)) {
      // Create a read stream for the image file
      const stream = createReadStream(imagePath);
      // Return a new Response object with the image stream
      return new Response(stream);
    }
  }

  // If the request is not for a blog media element, resolve the event as usual
  return resolve(event);
}
