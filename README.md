# Bread & Law

Earned-First Public Relations website.

## Setup

1. Clone this repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## Deployment

This project is configured for Vercel. Connect your GitHub repo to Vercel and it will auto-deploy on push.

## Project Structure

```
bread-and-law-site/
├── app/
│   ├── globals.css      # Global styles + Tailwind + Satoshi font
│   ├── layout.js        # Root layout (meta tags, body wrapper)
│   └── page.js          # Homepage
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── package.json
```

## Style Guide

- **Font:** Satoshi (extralight 200, regular 400, medium 500)
- **Colors:** Monochromatic grayscale, dark mode default
- **Background:** Black (#000)
- **Primary text:** gray-100
- **Secondary text:** gray-400, gray-500
- **Borders:** gray-700

See `bread-and-law-style-guide.docx` for complete guidelines.

## Next Steps

- [ ] Connect Results to Google Sheets (Consolidated List)
- [ ] Build out Approach content
- [ ] Build out Founder content
- [ ] Add Materiality Calculator tool page
- [ ] Add Media Access Dashboard tool page
