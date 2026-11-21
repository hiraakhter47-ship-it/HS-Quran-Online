// Delivers a registration by email through Web3Forms (https://web3forms.com).
// The access key is public by design (Web3Forms docs: "Access key is public"); it is
// read from the VITE_WEB3FORMS_ACCESS_KEY environment variable, never hard-coded.
// The receiving email address is configured in the Web3Forms account, not here.

const ENDPOINT = 'https://api.web3forms.com/submit'
const TIMEOUT_MS = 15000

export async function sendWithWeb3Forms(registration, { accessKey, botcheck = false }) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New Free Demo Booking — ${registration['Full Name']} (${registration.Course})`,
        from_name: 'HS Quran Online Website',
        replyto: registration.Email,
        botcheck,
        ...registration,
      }),
      signal: controller.signal,
    })

    let result = null
    try {
      result = await response.json()
    } catch {
      // non-JSON response — handled below
    }

    if (!response.ok || !result?.success) {
      throw new Error(result?.message || `Web3Forms request failed (${response.status})`)
    }
    return { ok: true }
  } finally {
    clearTimeout(timer)
  }
}
