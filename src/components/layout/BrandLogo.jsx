import { Link } from 'react-router'
import { ROUTES } from '../../app/routes.js'
import { site } from '../../config/site.js'

// The HS Quran Online logo: the "ه" mark in a mihrab-arch badge + wordmark.
// Used in the header and footer. No separate logo file exists yet.
function BrandLogo({ to = ROUTES.home, className = '', onClick }) {
  return (
    <Link className={`brand ${className}`.trim()} to={to} onClick={onClick}>
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark-glyph" lang="ar">ه</span>
      </span>
      <span className="brand-copy">
        <strong>{site.name}</strong>
        <span>{site.tagline}</span>
      </span>
    </Link>
  )
}

export default BrandLogo
