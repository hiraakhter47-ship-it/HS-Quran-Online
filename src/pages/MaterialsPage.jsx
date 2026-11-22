import { ArrowRight, BookA, BookOpenText, ExternalLink, FileText, ScrollText } from 'lucide-react'
import { Link } from 'react-router'
import { ROUTES } from '../app/routes.js'
import QuranBrowser from '../components/quran/QuranBrowser.jsx'
import CtaBand from '../components/ui/CtaBand.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { mailtoHref } from '../config/site.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

// kind: 'page' (inside the site), 'email' (request by email) or 'pdf' (our own PDF, opens in a new tab).
// PDF files live in /public/pdfs and are served from your own site at /pdfs/<file name>.
const resources = [
  { kind: 'page', to: ROUTES.digitalQuran, icon: BookOpenText, title: 'Digital Holy Quran', text: 'Read any Surah with Arabic text and a translation in your language.' },
  { kind: 'page', to: ROUTES.siparas, icon: ScrollText, title: 'Quran Siparas', text: 'Browse all 30 Siparas with Arabic text and English translation.' },
  { kind: 'email', href: mailtoHref('Basic Arabic Qaida learning materials'), icon: BookA, title: 'Basic Arabic Qaida', text: 'Request the Arabic Qaida learning materials by email.' },
  { kind: 'pdf', href: '/pdfs/Short-Surahs.pdf', icon: FileText, title: 'Short Surahs', text: 'A printable PDF of short Surahs to read and memorize.' },
  { kind: 'pdf', href: '/pdfs/English-Qaida.pdf', icon: FileText, title: 'English Qaida', text: 'A printable English Qaida PDF for beginners.' },
]

function ResourceCard({ resource }) {
  const { icon: Icon, title, text, kind } = resource
  const content = (
    <>
      <span className="resource-icon"><Icon size={26} aria-hidden="true" /></span>
      <span className="resource-copy">
        <strong>{title}</strong>
        <span>{text}</span>
        {kind === 'pdf' && <em className="resource-tag">PDF · opens in a new tab</em>}
        {kind === 'email' && <em className="resource-tag">Request by email</em>}
      </span>
      {kind === 'pdf'
        ? <ExternalLink className="resource-arrow" size={20} aria-hidden="true" />
        : <ArrowRight className="resource-arrow" size={20} aria-hidden="true" />}
    </>
  )

  if (kind === 'page') return <Link className="resource-card" to={resource.to}>{content}</Link>
  if (kind === 'pdf') return <a className="resource-card" href={resource.href} target="_blank" rel="noopener noreferrer">{content}</a>
  return <a className="resource-card" href={resource.href}>{content}</a>
}

function MaterialsPage() {
  usePageMeta('quranResources')

  return (
    <>
      <PageHero
        eyebrow="Quran Resources"
        title={<>Free Quran <span className="text-highlight">Learning Materials</span></>}
        description="Learning resources from basic to advanced — Quran chapters, Qaida and short Surahs — for learners of all ages."
        breadcrumb="Quran Resources"
      />

      <section className="home-section section-cream" id="materials" aria-labelledby="materials-title">
        <div className="container">
          <SectionHeading
            id="materials-title"
            eyebrow="Learning Resources"
            title={<>Choose a resource to <span className="text-highlight">continue learning</span></>}
            description="Read online, download a PDF, or request materials — everything you need to practise between classes."
          />
          <div className="resource-grid resource-grid-wide">
            {resources.map((resource) => <ResourceCard resource={resource} key={resource.title} />)}
          </div>
        </div>
      </section>

      <QuranBrowser />
      <CtaBand title="Learn with a tutor, one-to-one" />
    </>
  )
}

export default MaterialsPage
