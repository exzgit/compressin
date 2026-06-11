# Image Compress Pro

A modern, browser-based image compression web app built with React and Vite.

## Overview

This app lets users upload an image, compress it entirely in the browser, preview the result, and download the optimized file. It uses a clean, simple UI with a dedicated result page and a 5-second download popup so the UX feels clear and intentional.

## Features

- Upload JPEG, PNG, WebP, GIF, and SVG images
- In-browser compression with quality control
- Live estimated before/after file size display
- Dedicated result page after compression
- Side-by-side comparison of original and compressed images
- Back button with Lucide icon for easy navigation
- Download button with a 5-second countdown popup
- Hidden SEO-friendly text and metadata for cleaner UI and better search visibility
- Ad placeholder area for Google AdSense integration

## Tech Stack

- React 19
- Vite
- lucide-react for icons
- Plain CSS for styling

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open the local Vite URL in your browser.

## Project Structure

- `index.html` — app shell and SEO metadata
- `src/main.jsx` — React app entry point
- `src/App.jsx` — main application logic and page flow
- `src/App.css` — global and component styles
- `src/components/UploadArea.jsx` — upload panel
- `src/components/QualitySlider.jsx` — quality control and estimate display
- `src/components/ComparisonSlider.jsx` — comparison panels for original vs compressed images
- `src/components/ResultInfo.jsx` — file size results
- `src/components/DownloadButton.jsx` — download button with popup and ad area
- `src/utils/compressImage.js` — image compression helper using canvas

## How It Works

1. User uploads an image from disk.
2. The app validates the file type and size.
3. The user chooses output format and quality.
4. Clicking `Compress` compresses the image in the browser and navigates to the result page.
5. The result page shows original vs compressed previews, size info, and a download button.
6. Clicking `Download` shows a 5-second waiting popup before starting the file download.

## SEO and Metadata

The app includes:

- page title and description
- keywords and robots metadata
- Open Graph and Twitter Card tags
- canonical URL placeholder
- visually hidden SEO text inside the React app for search relevance without affecting the visible UI

## Notes

- The app is intentionally client-side only, so image compression happens locally in the browser.
- Make sure to replace placeholder URLs in `index.html` (`og:url`, `og:image`, `canonical`) with your production domain before deploy.
- The ad placeholder is included in the UI, but actual ad script setup requires your own AdSense configuration.

## Customization

To change the accent color, update `--accent` in `src/index.css`.

To adjust the download delay, modify the countdown logic in `src/components/DownloadButton.jsx`.

## License

This project is provided as-is.
