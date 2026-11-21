// Single source of truth for academy-wide details.
// Update contact information here and it changes everywhere on the site.

const WHATSAPP_NUMBER = '923368277776' // international format, digits only

export const site = {
  name: 'HS Quran Online',
  tagline: 'A way towards spirituality',
  description:
    'One-to-one online Quran classes for children and adults — learn to read, recite and understand the Quran from home.',
  defaultTitle: 'HS Quran Online | Learn Quran with Confidence',

  email: 'hiraakhter47@gmail.com',
  phone: {
    display: '+92 336 8277776',
    href: 'tel:+923368277776',
  },
  // TODO: PLACEHOLDER — replace with the real USA number after the client meeting.
  // (555-01xx numbers are reserved for fiction, so this can never ring a real person.)
  usPhone: {
    display: '+1 (555) 010-0100',
    href: 'tel:+15550100100',
  },
  whatsapp: {
    display: '+92 336 8277776',
    number: WHATSAPP_NUMBER,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },

  people: {
    founder: { name: 'Usman Lohan', title: 'Founder' },
    ceo: { name: 'Hira Usman', title: 'CEO' },
  },
}

// WhatsApp chat link, optionally with a pre-filled message.
export function whatsappHref(message) {
  return message
    ? `${site.whatsapp.href}?text=${encodeURIComponent(message)}`
    : site.whatsapp.href
}

export function mailtoHref(subject) {
  return subject
    ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${site.email}`
}

// Builds a full document title for a page, e.g. "About Us | HS Quran Online".
export function pageTitle(title) {
  return title ? `${title} | ${site.name}` : site.defaultTitle
}
