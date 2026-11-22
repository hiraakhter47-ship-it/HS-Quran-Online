import { Navigate, useLocation } from 'react-router'

// Sends an old static-site URL (e.g. /quran-reader.html?chapter=2) to its new
// route, keeping the query string and #hash intact.
function LegacyRedirect({ to }) {
  const { search, hash } = useLocation()
  return <Navigate to={`${to}${search}${hash}`} replace />
}

export default LegacyRedirect
