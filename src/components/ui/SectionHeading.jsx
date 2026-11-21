// Eyebrow + title + optional description, used at the top of every section.
// `title` can contain <span className="text-highlight"> for the yellow highlight.
function SectionHeading({ eyebrow, title, description, align = 'center', tone = 'light', id, as: Heading = 'h2' }) {
  return (
    <div className={`section-title section-title-${align} section-title-on-${tone}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <Heading id={id}>{title}</Heading>
      {description && <p>{description}</p>}
    </div>
  )
}

export default SectionHeading
