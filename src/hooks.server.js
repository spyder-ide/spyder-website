import { existsSync, createReadStream } from "fs";
import { join } from "path";
import { locale } from 'svelte-i18n';

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
