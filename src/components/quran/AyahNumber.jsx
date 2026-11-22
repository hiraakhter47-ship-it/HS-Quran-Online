const arabicDigits = new Intl.NumberFormat('ar-EG', { useGrouping: false })

// Verse-end marker: the verse number in Arabic-Indic digits inside a decorative circle.
// Screen readers hear "Verse 3" instead of the Arabic digit.
function AyahNumber({ number }) {
  return (
    <span className="ayah-number">
      <span aria-hidden="true">{arabicDigits.format(number)}</span>
      <span className="visually-hidden" lang="en">Verse {number}</span>
    </span>
  )
}

export default AyahNumber
