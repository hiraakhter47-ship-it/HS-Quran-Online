import { Link } from 'react-router'

// Dark emerald banner at the top of inner pages: eyebrow, title, intro and breadcrumb.
// `title` can contain <span className="text-highlight"> for the yellow highlight.
// `trail` adds middle breadcrumb levels, e.g. [{ label: 'Quran Resources', to: '/quran' }].
function PageHero({ eyebrow, title, description, breadcrumb, trail = [], compact = false }) {
  return (
    <div className={`page-hero${compact ? ' page-hero-compact' : ''}`}>
      <div className="container">
        {eyebrow && <span className="hero-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {trail.map((item) => (
            <span className="breadcrumb-step" key={item.to}>
              <span aria-hidden="true">/</span>
              <Link to={item.to}>{item.label}</Link>
            </span>
          ))}
          <span aria-hidden="true">/</span>
          <span aria-current="page">{breadcrumb}</span>
        </nav>
      </div>
    </div>
  )
}

export default PageHero
