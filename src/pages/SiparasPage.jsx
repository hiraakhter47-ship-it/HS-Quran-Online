import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { ROUTES, siparaReaderUrl } from '../app/routes.js'
import PageHero from '../components/ui/PageHero.jsx'
import { mailtoHref, site } from '../config/site.js'
import { siparas } from '../data/siparas.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

function SiparasPage() {
  usePageMeta('siparas')

  return (
    <>
      <PageHero
        eyebrow="Quran Siparas"
        title={<>The 30 <span className="text-highlight">Siparas</span> of the Quran</>}
        description="Select a Sipara to read the Arabic text with an English translation."
        breadcrumb="Siparas"
        trail={[{ label: 'Quran Resources', to: ROUTES.quranResources }]}
        compact
      />
      <section className="quran-page" id="chapters-directory" aria-labelledby="sipara-list-title">
        <div className="container">
          <div className="sipara-toolbar">
            <h2 id="sipara-list-title" className="visually-hidden">All Siparas</h2>
            <Link className="button button-outline button-sm" to={ROUTES.quranResources}>
              <ArrowLeft size={16} aria-hidden="true" /> Back to resources
            </Link>
          </div>

          <div className="sipara-grid">
            {siparas.map((sipara, index) => {
              const number = index + 1
              return (
                <Link
                  className="sipara-card"
                  to={siparaReaderUrl(number)}
                  key={number}
                >
                  <span className="sipara-number" aria-hidden="true">{number}</span>
                  <span className="sipara-copy">
                    <strong>Sipara {String(number).padStart(2, '0')}</strong>
                    <small>{sipara.transliteration}</small>
                  </span>
                  <span className="sipara-name-urdu" lang="ur" dir="rtl">{sipara.urdu}</span>
                </Link>
              )
            })}
          </div>

          <aside className="sipara-info" aria-label={`About ${site.name}`}>
            <div>
              <strong>{site.name}</strong>
              <p>
                {site.people.founder.title}: {site.people.founder.name} &nbsp;·&nbsp; {site.people.ceo.title}: {site.people.ceo.name}
              </p>
            </div>
            <div className="sipara-info-links">
              <a href={mailtoHref()}>{site.email}</a>
              <a href={site.phone.href}>{site.phone.display}</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

export default SiparasPage
