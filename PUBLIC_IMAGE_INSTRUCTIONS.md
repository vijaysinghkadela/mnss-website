 # Public image: mnss-hero.jpg

 Place the hero image you want the site to display at: `/public/mnss-hero.jpg`.

 - Recommended sizes: 1600x900 (landscape) for good coverage. Next.js Image will serve responsive sizes.
 - File name: `mnss-hero.jpg` (lowercase) — this path is hard-coded in `src/app/page.tsx`.
 - If you prefer a different filename, update the Image `src` in `src/app/page.tsx`.

 How to preview locally:

 1. Start the dev server with `npm run dev` (or your project's usual command).
 2. Open the site locally and visit the home page. The image appears in the "About" section.

 Notes:

 - The component uses `next/image` with `fill` and `object-cover` to maintain aspect ratio and responsive cropping.
 - If you want the image added elsewhere (hero section, header logo, or a gallery), tell me where and I'll move it.
