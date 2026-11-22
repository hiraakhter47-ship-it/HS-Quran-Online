import { siWhatsapp } from 'simple-icons'

// Official WhatsApp glyph (Simple Icons, CC0). Inherits the current text colour.
function WhatsAppIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={siWhatsapp.path} />
    </svg>
  )
}

export default WhatsAppIcon
