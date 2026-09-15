# WebnSoftware — Next.js Dynamic Sections

A clean Next.js App Router starter inspired by the uploaded hand-drawn section layout.

## Included
- Dynamic Header / navigation
- Services section
- AI Videos section
- Digital Marketing Services section
- About Us section
- Contact Us section
- Responsive styling
- Content centralized in `lib/content.ts`

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Change the content

Edit `lib/content.ts`. The UI components consume the arrays/objects from that file, so you can add, remove or rename services, AI videos and marketing services without changing the page structure.

## Suggested next step

For a production website, connect the contact form to your preferred email/API/database and replace the AI video placeholders with real video URLs or a CMS-backed video collection.
