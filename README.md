# HS Quran Online

Website for **HS Quran Online**, an online Quran teaching academy. It showcases the academy's
courses, lets students and parents book a free demo class, and includes free Quran tools
(Digital Quran, Siparas and a Quran Reader).

Built with **React 19**, **Vite** and **React Router**. Deployed on **Vercel**.

## Getting started

Requires Node.js 22.22 or newer.

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
  main.jsx              App entry: router + global styles
  App.jsx               Route table (pages load on demand, except the homepage)
  app/
    Layout.jsx          Page shell: top bar, header, footer, loading state
    ScrollManager.jsx   Scroll to top / to #section after navigation
    LegacyRedirect.jsx  Redirects old static-site URLs, keeping query strings
    routes.js           All site URLs, header navigation and Quran resource links
  config/
    site.js             Academy name, email, phone, WhatsApp, people — edit contact details here
    seo.js              Page titles & descriptions (also used to build sitemap.xml)
  data/                 Editable content: courses, features, steps, FAQs, testimonials, siparas
  lib/
    quranApi.js         AlQuran Cloud API helpers (shared by all Quran pages)
    registration/       Demo form: validation, country list, phone numbers, Web3Forms sending
  hooks/                usePageMeta (title/description/canonical), useSurahs (cached Surah list)
  components/
    layout/             TopBar, Header, SiteFooter, BrandLogo
    home/               Homepage sections (Hero, WhyChooseUs, Courses, Steps, BookDemo, Testimonials, FAQ)
    forms/              DemoRegistrationForm, CountrySelect, PhoneField
    courses/            CourseCard, CourseDetailCard, CourseIcon
    quran/              QuranBrowser (Surah search), AyahNumber
    ui/                 PageHero, SectionHeading, CtaBand, Accordion, FormField, WhatsAppIcon
  pages/                One component per page
  assets/images/        Local photos (see CREDITS.md)
  styles/               Global CSS split by area, imported in order by styles/index.css
public/                 favicon.svg, apple-touch-icon.png, og-image.jpg (social preview)
```

### Editing content

| To change… | Edit |
|---|---|
| Phone, WhatsApp, email, names | `src/config/site.js` |
| Courses (also the form's Course list) | `src/data/courses.js` — never add prices |
| FAQs | `src/data/faqs.js` |
| Testimonials (currently placeholders) | `src/data/testimonials.js` |
| "Why Choose Us" points / 3 steps | `src/data/features.js`, `src/data/steps.js` |
| Page titles & search descriptions | `src/config/seo.js` |
| Photos | replace files in `src/assets/images/` (same names) and `public/og-image.jpg` |

## Routes

| URL | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/courses` | Courses (from `src/data/courses.js`; `/courses#tajweed` jumps to a course) |
| `/how-it-works` | How It Works |
| `/contact` | Contact (details + WhatsApp) |
| `/book-demo` | Book a Free Demo (`?course=<id>` pre-selects a course) |
| `/quran` | Learning Materials + Surah search |
| `/quran/digital` | Digital Holy Quran |
| `/quran/siparas` | Quran Siparas |
| `/quran/read?chapter=1&from=digital-quran` | Quran Reader (Surah) |
| `/quran/read?sipara=1&from=chapters` | Quran Reader (Sipara) |

Old URLs from the previous static site (`about.html`, `chapters.html`, `quran-reader.html?…`, etc.)
redirect to the routes above. Any other unknown URL shows a "Page not found" page (not indexed).

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | **Yes** | Web3Forms access key for the Book a Free Demo form. Registrations are emailed to the address linked to this key in Web3Forms. |
| `SITE_URL` | Only for a custom domain | The site's public address, e.g. `https://www.example.com`. Used for canonical links, social previews, `sitemap.xml` and `robots.txt`. On Vercel it defaults to the project's production domain automatically. |

- **Local:** copy `.env.example` to `.env.local` and fill in the key (`.env.local` is git-ignored).
- Without the Web3Forms key, `npm run dev` logs registrations to the console instead of sending them,
  and a production build shows "registration temporarily unavailable" rather than a fake success.
- Web3Forms access keys are public by design (they can only send form emails to you), but the key is
  still kept out of the source code.

## Deployment (Vercel)

`vercel.json` configures:

- **SPA fallback** — every route is served `index.html`, so direct visits and refreshes work.
- **Permanent redirects** for old `.html` URLs. `/index.html` and `/quran-reader.html` are
  redirected in the browser instead, so the reader's `?chapter=` / `?sipara=` query is always kept.
- **Caching** — built files in `/assets/` (names include a content hash) are cached for a year.
- **Security headers** — `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.

The build also generates `sitemap.xml` and `robots.txt`, and adds organisation structured data
(schema.org) to every page.

### Launch checklist

1. **Import the repository** in Vercel (framework preset *Vite* is detected; build `npm run build`, output `dist`).
2. **Add environment variables** (Project → Settings → Environment Variables), for *Production* and *Preview*:
   - `VITE_WEB3FORMS_ACCESS_KEY` = your Web3Forms key
   - `SITE_URL` = `https://your-domain` — only if you use a custom domain
3. **Deploy**, then **redeploy** after any environment-variable change (Vite reads them at build time).
4. **Check the live site:**
   - Submit one test on `/book-demo` and confirm the email arrives (check spam the first time).
   - Open `/about.html` and `/quran-reader.html?chapter=2` — both should land on the new pages.
   - Open `/sitemap.xml` and `/robots.txt` — the URLs inside should use your real domain.
   - Refresh on an inner page (e.g. `/courses`) — it should load, not 404.
5. **Optional:** add the site to Google Search Console and submit `https://your-domain/sitemap.xml`.
6. **Optional:** in Web3Forms, consider the Pro *domain restriction* so the key only works from your domain.

Quran text and translations are loaded from the public [AlQuran Cloud API](https://alquran.cloud/api).
