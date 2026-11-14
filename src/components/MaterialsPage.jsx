function MaterialsPage() {
  return (
    <div id="materials">
      <div className="materials-banner">
        <div>
          <h1 id="materials-title">Learning Materials</h1>
          <p className="materials-breadcrumb"><a href="index.html#home">Home</a> &nbsp;/&nbsp; Materials</p>
        </div>
      </div>
      <div className="materials-intro">
        <a className="button button-outline materials-back" href="index.html#home"><span className="button-arrow">←</span> Back to home</a>
        <p>
          We offer learning resources from basic to advanced Quran studies, including Quran chapters,
          Arabic Qaida, English Qaida, short Surahs and essential duas. Choose a resource below to
          continue learning.
        </p>
        <div className="materials-grid">
          <a className="material-link" href="digital-quran.html">DIGITAL HOLY QURAN</a>
          <a className="material-link" href="chapters.html">QURAN CHAPTERS</a>
          <a className="material-link" href="mailto:hiraakhter47@gmail.com?subject=Basic%20Arabic%20Qaida%20learning%20materials">BASIC ARABIC QAIDA</a>
          <a className="material-link" href="https://quran-online.ca/wp-content/uploads/2021/07/Short-Surahs.pdf" target="_blank" rel="noopener noreferrer">SHORT SURAHS <span aria-hidden="true">↗</span></a>
          <a className="material-link" href="https://quran-online.ca/wp-content/uploads/2021/07/Essential_Duas.pdf" target="_blank" rel="noopener noreferrer">ESSENTIAL DUAS <span aria-hidden="true">↗</span></a>
          <a className="material-link" href="https://quran-online.ca/wp-content/uploads/2021/07/English-Qaida.pdf" target="_blank" rel="noopener noreferrer">ENGLISH QAIDA <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="materials-feature">
        <div className="materials-feature-copy">
          <span className="eyebrow">Learn at your own pace</span>
          <h2>Quran Learning<br />Course Materials</h2>
        </div>
        <div className="materials-feature-image" role="img" aria-label="A mosque at dusk" />
      </div>
      <p className="materials-details">
        <strong>HS Quran Online learning resources</strong> welcome learners of all ages. Browse
        Quran chapters, study Qaida, practise short Surahs and explore useful materials to support
        your learning journey.
      </p>
    </div>
  )
}

export default MaterialsPage
