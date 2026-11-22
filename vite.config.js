import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { SITEMAP_ENTRIES } from './src/config/seo.js'
import { site } from './src/config/site.js'

// The site's public address, used for canonical URLs, social previews and the sitemap.
// Priority: SITE_URL env var (set this for a custom domain) → Vercel's production domain → localhost.
function resolveSiteUrl(env) {
  const fromEnv = env.SITE_URL || env.VITE_SITE_URL
  if (fromEnv) return fromEnv
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return 'http://localhost:5173'
}

// Injects the site address into index.html and the app, adds structured data,
// and writes sitemap.xml + robots.txt into the build.
function siteMetadata(env) {
  const siteUrl = resolveSiteUrl(env).replace(/\/+$/, '')

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: site.name,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/apple-touch-icon.png`,
    description: site.description,
    email: site.email,
    telephone: site.phone.display.replace(/\s+/g, ''),
    founder: { '@type': 'Person', name: site.people.founder.name },
  }

  return {
    name: 'hs-site-metadata',
    config: () => ({ define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl) } }),
    transformIndexHtml(html) {
      return html
        .replaceAll('%SITE_URL%', siteUrl)
        .replace('</head>', `    <script type="application/ld+json">${JSON.stringify(organization)}</script>\n  </head>`)
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = SITEMAP_ENTRIES.map(({ path, priority }) =>
        `  <url><loc>${siteUrl}${path}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // System environment (e.g. Vercel) plus .env / .env.local files
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  return {
    plugins: [react(), siteMetadata(env)],
  }
})
