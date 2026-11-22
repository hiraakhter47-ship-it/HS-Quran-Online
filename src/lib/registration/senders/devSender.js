// Development-only stand-in used when no Web3Forms key is configured.
// Logs the registration instead of sending it.

export async function sendWithDevLogger(registration) {
  await new Promise((resolve) => setTimeout(resolve, 700))
  console.info('[dev] Free demo registration (not sent — no VITE_WEB3FORMS_ACCESS_KEY):', registration)
  return { ok: true }
}
