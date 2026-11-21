import { Plus } from 'lucide-react'
import { useState } from 'react'

// Accessible accordion: one panel open at a time; works with mouse and keyboard.
function Accordion({ items, idPrefix = 'accordion', defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const open = index === openIndex
        const buttonId = `${idPrefix}-button-${index}`
        const panelId = `${idPrefix}-panel-${index}`
        return (
          <div className={`accordion-item${open ? ' is-open' : ''}`} key={item.question}>
            <h3 className="accordion-heading">
              <button
                id={buttonId}
                className="accordion-button"
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
              >
                <span>{item.question}</span>
                <Plus className="accordion-icon" size={20} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} className="accordion-panel" role="region" aria-labelledby={buttonId} hidden={!open}>
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
