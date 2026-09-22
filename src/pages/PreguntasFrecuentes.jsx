import { useState } from 'react'
import './PreguntasFrecuentes.css'

const FAQ_ITEMS = [
  {
    question: '¿Cómo es el proceso de trabajo?',
    answer:
      'Empezamos con una entrevista virtual para conocer tu proyecto. Con esa información armamos una propuesta, desarrollamos el sitio y te lo presentamos para que lo revises. Si algo no te convence, lo ajustamos, y recién después lo publicamos.',
  },
  {
    question: '¿La primera consulta tiene costo?',
    answer: 'No. La asesoría inicial es completamente gratis.',
  },
  {
    question: '¿Los precios del catálogo son finales?',
    answer:
      'Son el valor base de cada servicio. El presupuesto final se define en la entrevista según lo que necesite tu proyecto. Por ejemplo, si querés dominio propio, se suma al valor final.',
  },
  {
    question: '¿Cómo se paga?',
    answer:
      'La mitad al contratar el servicio, y el saldo restante se cancela cuando entregamos el trabajo.',
  },
  {
    question: '¿Cuáles son los plazos?',
    answer:
      'El mínimo es de 48 horas para cualquier servicio. A partir de ahí depende de lo que necesite tu proyecto y de lo que acordemos en la entrevista.',
  },
  {
    question: '¿Se pueden hacer modificaciones?',
    answer:
      'Depende del servicio que elijas. Lo explicamos con detalle en la entrevista, antes de empezar.',
  },
  {
    question: '¿Voy a poder editar mi página yo mismo?',
    answer:
      'Con la opción de página 100% editable, sí. Tenés un panel de administración privado para modificar textos, imágenes, precios y más, sin saber programar.',
  },
  {
    question: '¿Incluye el dominio?',
    answer:
      'El precio del paquete no lo incluye. En la entrevista definimos si querés uno propio y, en ese caso, se suma al valor final. El trámite se hace con tu clave fiscal. El valor actual es de $8.500 ARS anuales.',
  },
  {
    question: '¿La página se ve bien en el celular?',
    answer:
      'Sí. Todos los sitios se diseñan para verse bien en celulares, tablets y computadoras.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="faq-item">
      <button
        type="button"
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && <p className="faq-answer">{item.answer}</p>}
    </div>
  )
}

function PreguntasFrecuentes() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleIndex = (index) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <main className="faq-page">
      <div className="faq-inner">
        <a href="/" className="faq-back">
          ← Volver al inicio
        </a>

        <p className="section-label">PREGUNTAS FRECUENTES</p>

        <h1 className="faq-title">
          Todo lo que necesitás
          <span> saber antes de empezar.</span>
        </h1>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggleIndex(index)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default PreguntasFrecuentes
