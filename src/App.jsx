import { useEffect, useRef, useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes.jsx'
import {
  CMS_KEYS,
  loadDocument,
  mergeSiteContent,
  readLocalFallback,
} from './cms'

// Guardamos la posición antes de abrir las FAQ y la restauramos al regresar.
const FAQ_RETURN_POSITION_KEY = 'plano-labs:faq-return-position'

function rememberFaqPosition() {
  try {
    window.sessionStorage.setItem(
      FAQ_RETURN_POSITION_KEY,
      JSON.stringify({ y: window.scrollY, savedAt: Date.now() }),
    )
  } catch {
    // La navegación a preguntas frecuentes funciona aunque el navegador bloquee el almacenamiento.
  }
}

const DEFAULT_EMAIL = 'plano.labs.ideas@gmail.com'

const DEFAULT_SITE_CONTENT = {
  home: {
    eyebrow: 'CREACIÓN DIGITAL · ESTRATEGIA · RESULTADOS',
    title: 'Donde las ideas toman forma.',
    description:
      'Diseñamos experiencias digitales que combinan estrategia, tecnología y creatividad.',
    button: 'Conocé nuestros servicios',
    portrait: '',
  },
  services: {
    eyebrow: '01 / SERVICIOS',
    title: 'Soluciones digitales con intención.',
    description:
      'Combinamos creatividad, tecnología y estrategia para transformar ideas en proyectos digitales con propósito.',
  },
  about: {
    eyebrow: '02 / NOSOTROS',
    title: 'Ideas que encuentran su forma.',
    lead:
      'PLANO LABS es un espacio de creación digital donde las ideas, la tecnología y la estrategia se encuentran.',
    description:
      'Desarrollamos soluciones digitales pensadas para marcas, proyectos y personas que buscan transformar una idea en algo real.',
  },
  customOffer: {
    title: 'Tu web, a medida',
    description: '¿Tu proyecto necesita algo diferente? Diseñemos una solución pensada para vos.',
    features: 'Conversación inicial sobre tu proyecto\nPropuesta personalizada\nDiseño adaptado a tus objetivos',
    commercialInfo: 'Contanos tu idea y conversemos sobre una propuesta a medida.',
    price: 'Consultar',
  },
  contact: {
    eyebrow: '05 / CONTACTO',
    title: 'Hagamos realidad tu idea.',
    description:
      '¿Tenés una idea, un proyecto o simplemente querés saber qué podemos hacer por vos? Hablemos.',
    whatsapp: '',
    linkedin: '',
    instagram: '',
    fiverr: '',
    email: DEFAULT_EMAIL,
  },
}

const DEFAULT_SERVICES = [
  {
    id: 1,
    number: '01',
    title: 'WEB',
    description:
      'Diseñamos sitios web modernos, rápidos y pensados para convertir ideas en experiencias digitales.',
  },
  {
    id: 2,
    number: '02',
    title: 'IA',
    description:
      'Integramos inteligencia artificial para automatizar procesos, potenciar negocios y crear nuevas posibilidades.',
  },
  {
    id: 3,
    number: '03',
    title: 'VIDEO',
    description:
      'Creamos piezas audiovisuales con una mirada estratégica, estética y orientada a comunicar.',
  },
]

const DEFAULT_ABOUT_POINTS = [
  {
    id: 1,
    number: '01',
    title: 'CREACIÓN',
    description:
      'Convertimos conceptos en experiencias digitales.',
  },
  {
    id: 2,
    number: '02',
    title: 'ESTRATEGIA',
    description:
      'Pensamos cada proyecto con una dirección clara.',
  },
  {
    id: 3,
    number: '03',
    title: 'RESULTADOS',
    description:
      'Buscamos que cada solución tenga un propósito.',
  },
]

const UNIVERSE_NODES = [
  { number: '01', title: 'Creatividad', description: 'Ideas con identidad para comunicar lo que hace única a cada marca.', image: '/universe/creatividad.svg' },
  { number: '02', title: 'Diseño', description: 'Sistemas visuales claros, sensibles y pensados para ser recordados.', image: '/universe/diseno.svg' },
  { number: '03', title: 'Desarrollo', description: 'Experiencias digitales funcionales, rápidas y preparadas para crecer.', image: '/universe/desarrollo.svg' },
  { number: '04', title: 'Estrategia', description: 'Decisiones con dirección para convertir una idea en un proyecto posible.', image: '/universe/estrategia.svg' },
  { number: '05', title: 'Detrás de PLANO LABS', description: 'Soy Marcelo Alfaro, la persona detrás de PLANO LABS. Me apasiona transformar ideas en proyectos digitales reales, combinando creatividad, diseño y tecnología. Me involucro personalmente en cada proyecto, porque creo que una buena página web no solo tiene que verse bien: tiene que ayudar a que tu negocio crezca.', image: '/universe/creador.webp' },
]


function UniverseSection() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const [discovered, setDiscovered] = useState(0)
  const activeRef = useRef(0)
  const scrollStepRef = useRef(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const travel = Math.max(1, section.offsetHeight - window.innerHeight)
      const progress = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / travel))
      const step = Math.min(UNIVERSE_NODES.length - 1, Math.floor(progress * UNIVERSE_NODES.length))
      if (step !== scrollStepRef.current) {
        scrollStepRef.current = step
        activeRef.current = step
        setActive(step)
      }
      setDiscovered(previous => Math.max(previous, step))
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const selectNode = (index) => {
    activeRef.current = index
    setActive(index)
    setDiscovered(previous => Math.max(previous, index))
  }

  return (
    <section id="universo" className="universe universe-story" ref={sectionRef}>
      <div className="universe-sticky">
        <div className="universe-header">
          <p className="section-label">01 / UNIVERSO PLANO LABS</p>
          <h2>Todo lo que una idea necesita para <span>tomar forma.</span></h2>
          <p>Un ecosistema de disciplinas que se conectan para hacer que cada proyecto avance con coherencia.</p>
        </div>
        <div className="universe-experience">
          <div className="universe-orbit" aria-label="Seleccioná una disciplina del Universo PLANO LABS">
            <svg className="universe-connections" viewBox="0 0 600 520" preserveAspectRatio="none" aria-hidden="true">
              {[[300,55],[530,170],[450,455],[150,455],[70,170]].map(([x,y],index) => (
                <line key={index} x1="300" y1="260" x2={x} y2={y}
                  className={index <= discovered ? 'is-lit' : ''}
                  style={{ transitionDelay: `${index * 65}ms` }} />
              ))}
            </svg>
            <div className="universe-orbit-ring" aria-hidden="true" />
            <div className="universe-core">
              <img src={logo} alt="PLANO LABS" />
            </div>
            {UNIVERSE_NODES.map((node,index) => (
              <button
                key={node.number}
                type="button"
                className={`universe-node universe-node-${index + 1}${index === active ? ' is-active' : ''}${index <= discovered ? ' is-discovered' : ''}`}
                aria-pressed={index === active}
                onClick={() => selectNode(index)}
              >
                <span className="universe-node-number">{node.number}</span>
                <span className="universe-node-name">{node.title}</span>
              </button>
            ))}
          </div>
          <div className="universe-feature" aria-live="polite">
            <div className="universe-feature-image">
              {UNIVERSE_NODES.map((node,index) => (
                <img key={node.number} src={node.image} alt={node.title}
                  className={index === active ? 'is-active' : ''} loading="lazy" />
              ))}
              <span className="universe-feature-count">{UNIVERSE_NODES[active].number} / 05</span>
            </div>
            <div className="universe-feature-copy" key={active}>
              <span className="universe-feature-label">EL UNIVERSO EN MOVIMIENTO</span>
              <h3>{UNIVERSE_NODES[active].title}</h3>
              <p>{UNIVERSE_NODES[active].description}</p>
            </div>
          </div>
        </div>
        <p className="universe-scroll-hint">Deslizá para descubrir nuestro universo <span aria-hidden="true">↓</span></p>
      </div>
    </section>
  )
}

const DEFAULT_PORTFOLIO = [
  { id: 'legado-matero', order: 1, title: 'Legado Matero', client: 'Legado Matero', category: 'Identidad visual', shortDescription: 'Proyecto de identidad para Legado Matero.', description: 'Ficha de proyecto disponible para completar desde el administrador.', coverImage: '/portfolio-logos/Legado%20Matero.png', images: [{ id: 'logo', url: '/portfolio-logos/Legado%20Matero.png' }], published: true },
  { id: 'magia-consciente', order: 2, title: 'Magia Consciente', client: 'Magia Consciente', category: 'Identidad visual', shortDescription: 'Proyecto de identidad para Magia Consciente.', description: 'Ficha de proyecto disponible para completar desde el administrador.', coverImage: '/portfolio-logos/Magia%20Consciente.png', images: [{ id: 'logo', url: '/portfolio-logos/Magia%20Consciente.png' }], published: true },
  { id: 'san-gabriel', order: 3, title: 'San Gabriel', client: 'San Gabriel Tienda Holística', category: 'Identidad visual', shortDescription: 'Proyecto de identidad para San Gabriel Tienda Holística.', description: 'Ficha de proyecto disponible para completar desde el administrador.', coverImage: '/portfolio-logos/san-gabriel-transparent.png', images: [{ id: 'logo', url: '/portfolio-logos/san-gabriel-transparent.png' }], published: true },
]

// Los servicios antiguos siguen usando su descripción y destino original.
function catalogCover(publication) {
  const covers = { landing: '/plano-labs/landing-page.png', emprendedor: '/plano-labs/web-emprendedor.png', editable: '/plano-labs/web-editable.png' }
  const choice = publication.generatedCover || 'auto'
  if (choice === 'own') return publication.coverImage || publication.images?.[0]?.url || ''
  if (covers[choice]) return covers[choice]
  const title = String(publication.title || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
  if (/landing/.test(title)) return covers.landing
  if (/emprendedor/.test(title)) return covers.emprendedor
  if (/web editable/.test(title)) return covers.editable
  return publication.coverImage || publication.images?.[0]?.url || ''
}

function serviceIconName(service) {
  if (service.icon) return service.icon
  const title = (service.title || '').toLowerCase()
  if (/web|sitio|página|pagina/.test(title)) return 'web'
  if (/\bia\b|inteligencia|automatiz/.test(title)) return 'ai'
  if (/video|vídeo|audiovisual/.test(title)) return 'video'
  return 'spark'
}

function serviceDestination(value) {
  const link = typeof value === 'string' ? value.trim() : ''
  if (/^(?:https?:\/\/|mailto:|tel:)/i.test(link)) return link
  if (/^(?:#|\/(?![\/\\])|\.\.?\/)/.test(link) && !/[\\\u0000-\u001f]/.test(link)) return link
  return '#catalogo'
}

function ServiceIcon({ name }) {
  const paths = {
    web: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></>,
    ai: <><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" /><rect x="8" y="8" width="8" height="8" rx="2" /></>,
    video: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9 5 3-5 3z" /></>,
    design: <><path d="m12 3 9 9-9 9-9-9 9-9zM8 12h8M12 8v8" /></>,
    strategy: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><path d="M12 12 20 4m-3 0h3v3" /></>,
    spark: <path d="M12 3c.8 5 3 7.2 8 8-5 .8-7.2 3-8 8-.8-5-3-7.2-8-8 5-.8 7.2-3 8-8z" />,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.spark}</svg>
}

function AboutPoints({ points }) {
  const container = useRef(null)
  useEffect(() => {
    const root = container.current
    if (!root || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = [...root.querySelectorAll('.about-line')]
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    cards.forEach((card) => { card.classList.add('reveal-ready'); observer.observe(card) })
    return () => observer.disconnect()
  }, [points])
  return <div className="about-side" ref={container}>
    {points.map((point, index) => <div className="about-line" key={point.id || index} style={{ '--reveal-delay': index * 100 + 'ms' }}>
      <span>{point.number || String(index + 1).padStart(2, '0')}</span>
      <strong>{point.title}</strong><p>{point.description}</p>
    </div>)}
  </div>
}

function renderHighlightedTitle(title) {
  const text = String(title || '').trim()
  const words = text.split(/\s+/).filter(Boolean)

  if (words.length < 3) {
    return text
  }

  const lead = words.slice(0, -2).join(' ')
  const highlight = words.slice(-2).join(' ')

  return (
    <>
      {lead}
      <span> {highlight}</span>
    </>
  )
}

async function loadSiteContent() {
  try {
    const savedContent = await loadDocument(
      CMS_KEYS.SITE_CONTENT,
    )

    if (savedContent) {
      return mergeSiteContent(
        DEFAULT_SITE_CONTENT,
        savedContent,
      )
    }
  } catch (error) {
    console.error(
      'No se pudo cargar la configuración del sitio.',
      error,
    )
  }

  return mergeSiteContent(
    DEFAULT_SITE_CONTENT,
    readLocalFallback(
      'plano-labs-site-content',
      null,
    ),
  )
}

async function loadServices() {
  try {
    const savedServices = await loadDocument(
      CMS_KEYS.SERVICES,
    )

    if (Array.isArray(savedServices)) {
      return savedServices
    }
  } catch (error) {
    console.error(
      'No se pudieron cargar los servicios.',
      error,
    )
  }

  const localServices = readLocalFallback(
    'plano-labs-services',
    null,
  )

  if (Array.isArray(localServices)) {
    return localServices
  }

  return DEFAULT_SERVICES
}

async function loadAboutPoints() {
  try {
    const savedAboutPoints = await loadDocument(
      CMS_KEYS.ABOUT_POINTS,
    )

    if (Array.isArray(savedAboutPoints)) {
      return savedAboutPoints
    }
  } catch (error) {
    console.error(
      'No se pudieron cargar los puntos de Nosotros.',
      error,
    )
  }

  const localAboutPoints = readLocalFallback(
    'plano-labs-about-points',
    null,
  )

  if (Array.isArray(localAboutPoints)) {
    return localAboutPoints
  }

  return DEFAULT_ABOUT_POINTS
}

function normalizeImages(images) {
  if (!Array.isArray(images)) {
    return []
  }

  return images
    .map((image, index) => {
      if (typeof image === 'string') {
        return {
          id: `image-${index}`,
          url: image,
        }
      }

      if (image?.url) {
        return {
          id: image.id || `image-${index}`,
          url: image.url,
        }
      }

      return null
    })
    .filter(Boolean)
}

function normalizeVideos(videos) {
  if (!Array.isArray(videos)) {
    return []
  }

  return videos
    .map((video, index) => {
      if (typeof video === 'string') {
        return {
          id: `video-${index}`,
          url: video,
        }
      }

      if (video?.url) {
        return {
          id: video.id || `video-${index}`,
          url: video.url,
        }
      }

      return null
    })
    .filter(Boolean)
}

function getPortfolioImages(item) {
  const images = []

  if (item.coverImage) {
    images.push({
      id: 'cover',
      url: item.coverImage,
    })
  } else if (item.image) {
    images.push({
      id: 'cover',
      url: item.image,
    })
  }

  const screenshots = normalizeImages(
    item.screenshots || [],
  )

  const regularImages = normalizeImages(
    item.images || [],
  )

  ;[...screenshots, ...regularImages].forEach(
    (image) => {
      if (
        image.url &&
        !images.some(
          (existing) =>
            existing.url === image.url,
        )
      ) {
        images.push(image)
      }
    },
  )

  return images
}

function getMediaItems(item, isPortfolio = false) {
  const images = isPortfolio
    ? getPortfolioImages(item)
    : normalizeImages(
        item.images ||
          (item.image
            ? [
                {
                  id: 'cover',
                  url: item.image,
                },
              ]
            : []),
      )

  const videos = normalizeVideos(
    item.videos ||
      (item.video
        ? [item.video]
        : []),
  )

  const coverImage =
    item.coverImage ||
    item.image ||
    images[0]?.url ||
    ''

  const media = []

  if (coverImage) {
    media.push({
      id: 'cover',
      type: 'image',
      url: coverImage,
    })
  }

  images.forEach((image) => {
    if (
      image.url &&
      image.url !== coverImage
    ) {
      media.push({
        id: image.id,
        type: 'image',
        url: image.url,
      })
    }
  })

  videos.forEach((video) => {
    media.push({
      id: video.id,
      type: 'video',
      url: video.url,
    })
  })

  return media
}

function MediaCarousel({
  item,
  isPortfolio = false,
}) {
  const media = getMediaItems(
    item,
    isPortfolio,
  )

  const [currentIndex, setCurrentIndex] =
    useState(0)

  useEffect(() => {
    setCurrentIndex(0)
  }, [item?.id])

  if (media.length === 0) {
    return (
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border:
            '1px solid rgba(245,245,242,0.12)',
        }}
      >
        <div className="catalog-placeholder">
          <div className="catalog-shape"></div>
        </div>
      </div>
    )
  }

  const currentMedia = media[currentIndex]

  const previousMedia = () => {
    setCurrentIndex((current) =>
      current === 0
        ? media.length - 1
        : current - 1,
    )
  }

  const nextMedia = () => {
    setCurrentIndex((current) =>
      current === media.length - 1
        ? 0
        : current + 1,
    )
  }

  return (
    <div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          border:
            '1px solid rgba(245,245,242,0.12)',
          background: '#0B0D10',
        }}
      >
        {currentMedia.type === 'video' ? (
          <video
            src={currentMedia.url}
            controls
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              background: '#000',
            }}
          />
        ) : (
          <img
            src={currentMedia.url}
            alt={
              item.title ||
              'PLANO LABS'
            }
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        )}

        {media.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousMedia}
              aria-label="Imagen anterior"
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform:
                  'translateY(-50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border:
                  '1px solid rgba(245,245,242,0.35)',
                background:
                  'rgba(11,13,16,0.75)',
                color: '#F5F5F2',
                cursor: 'pointer',
                fontSize: '22px',
              }}
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextMedia}
              aria-label="Siguiente imagen"
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform:
                  'translateY(-50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border:
                  '1px solid rgba(245,245,242,0.35)',
                background:
                  'rgba(11,13,16,0.75)',
                color: '#F5F5F2',
                cursor: 'pointer',
                fontSize: '22px',
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {media.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingTop: '12px',
            paddingBottom: '4px',
          }}
        >
          {media.map(
            (mediaItem, index) => (
              <button
                key={mediaItem.id}
                type="button"
                onClick={() =>
                  setCurrentIndex(index)
                }
                style={{
                  flex: '0 0 auto',
                  width: '72px',
                  height: '54px',
                  padding: 0,
                  overflow: 'hidden',
                  border:
                    index === currentIndex
                      ? '2px solid #B8FF3D'
                      : '1px solid rgba(245,245,242,0.18)',
                  background:
                    '#0B0D10',
                  cursor: 'pointer',
                }}
              >
                {mediaItem.type ===
                'video' ? (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems:
                        'center',
                      justifyContent:
                        'center',
                      color:
                        '#B8FF3D',
                      fontSize:
                        '18px',
                    }}
                  >
                    ▶
                  </div>
                ) : (
                  <img
                    src={
                      mediaItem.url
                    }
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit:
                        'cover',
                      display:
                        'block',
                    }}
                  />
                )}
              </button>
            ),
          )}
        </div>
      )}

      {media.length > 1 && (
        <p
          style={{
            marginTop: '8px',
            fontSize: '12px',
            color: '#8B9098',
            textAlign: 'center',
          }}
        >
          {currentIndex + 1} / {media.length}
        </p>
      )}
    </div>
  )
}

/*
 * Íconos de los botones de contacto.
 * Van dibujados en el código (sin librerías) y toman el color del botón.
 */
function ContactIcon({ name, size = 18 }) {
  const shared = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    focusable: 'false',
    style: {
      marginRight: '10px',
      flexShrink: 0,
    },
  }

  if (name === 'whatsapp') {
    return (
      <svg {...shared} fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    )
  }

  if (name === 'linkedin') {
    return (
      <svg {...shared} fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.5H3V9.75zm7 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.85h-4v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-2 1.35-2 2.74v5.29h-4V9.75z" />
      </svg>
    )
  }

  if (name === 'instagram') {
    return (
      <svg
        {...shared}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r="1.1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    )
  }

  if (name === 'fiverr') {
    // "fi" con punto final, dibujado con trazos (no depende de ninguna tipografía)
    return (
      <svg
        {...shared}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.5 20V9.6c0-2.3 1.2-3.6 3.6-3.6h.9" />
        <path d="M5.5 11.4h7" />
        <path d="M16.2 11.4V20" />
        <circle
          cx="16.2"
          cy="6.6"
          r="1.3"
          fill="currentColor"
          stroke="none"
        />
        <circle
          cx="20.8"
          cy="19.2"
          r="1.1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    )
  }

  return (
    <svg
      {...shared}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7.5l8.5 6 8.5-6" />
    </svg>
  )
}

/*
 * Arma el link de una red social a partir de lo que se cargó en el
 * administrador: acepta el link completo, "usuario" o "@usuario".
 */
function normalizeSocialLink(value, host, baseUrl) {
  const text = String(value || '').trim()

  if (!text) {
    return ''
  }

  if (/^https?:\/\//i.test(text)) {
    return text
  }

  if (text.toLowerCase().includes(host)) {
    return `https://${text}`
  }

  return `${baseUrl}${text.replace(/^[@/]+/, '')}`
}

/**
 * Convierte un usuario de Instagram (con o sin @) o su URL completa
 * en un enlace seguro a un perfil. Los valores vacíos o inválidos
 * se omiten, sin generar links rotos.
 */
function getClientInstagram(value) {
  const text = String(value || '').trim()
  if (!text) return null

  let username = text.replace(/^@/, '')

  if (/^(https?:\/\/)?(www\.)?instagram\.com\//i.test(text)) {
    try {
      const parsed = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`)
      if (!['instagram.com', 'www.instagram.com'].includes(parsed.hostname.toLowerCase())) return null
      username = parsed.pathname.split('/').filter(Boolean)[0] || ''
    } catch {
      return null
    }
  }

  if (!/^[a-zA-Z0-9._]{1,30}$/.test(username)) return null
  if (['p', 'reel', 'reels', 'stories', 'explore', 'accounts', 'direct'].includes(username.toLowerCase())) return null

  return {
    label: `@${username}`,
    url: `https://www.instagram.com/${username}/`,
  }
}

function DetailModal({
  item,
  type,
  onClose,
  onEmail,
  contactEmail,
  whatsapp,
}) {
  if (!item) {
    return null
  }

  const features =
    typeof item.features === 'string'
      ? item.features
          .split('\n')
          .map((feature) =>
            feature.trim(),
          )
          .filter(Boolean)
      : Array.isArray(
            item.features,
          )
        ? item.features
        : []

  const isPortfolio =
    type === 'portfolio'

  const clientInstagram = isPortfolio
    ? getClientInstagram(item.clientInstagram)
    : null

  const cleanWhatsapp = String(
    whatsapp || '',
  ).replace(/\D/g, '')

  const whatsappLink = cleanWhatsapp
    ? `https://wa.me/${cleanWhatsapp}`
    : '#contacto'

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={isPortfolio ? "portfolio-detail-backdrop" : undefined}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background:
          'rgba(0,0,0,0.88)',
        overflowY: 'auto',
        padding: '24px',
      }}
    >
      <div
        className={isPortfolio ? "portfolio-detail-panel" : undefined}
        onClick={(event) =>
          event.stopPropagation()
        }
        style={{
          width:
            'min(1100px, 100%)',
          margin: '0 auto',
          background: '#0B0D10',
          border:
            '1px solid rgba(245,245,242,0.14)',
          padding:
            'clamp(20px, 4vw, 42px)',
          position: 'relative',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border:
              '1px solid rgba(245,245,242,0.25)',
            background:
              '#0B0D10',
            color:
              '#F5F5F2',
            cursor:
              'pointer',
            fontSize:
              '22px',
            zIndex: 2,
          }}
        >
          ×
        </button>

        <div
          style={{
            marginBottom: '28px',
          }}
        >
          <p className="section-label">
            {isPortfolio
              ? '03 / PORTFOLIO'
              : '04 / CATÁLOGO'}
          </p>

          <h2
            style={{
              marginTop: '10px',
              paddingRight:
                '50px',
            }}
          >
            {item.title}
          </h2>

          {(item.category ||
            item.type) && (
            <p
              style={{
                marginTop:
                  '10px',
                color:
                  '#B8FF3D',
                textTransform:
                  'uppercase',
                letterSpacing:
                  '0.08em',
                fontSize:
                  '12px',
              }}
            >
              {item.category ||
                item.type}
            </p>
          )}
        </div>

        <MediaCarousel
          item={item}
          isPortfolio={
            isPortfolio
          }
        />

        {isPortfolio ? (
          <div
            style={{
              marginTop:
                '36px',
            }}
          >
            {item.description && (
              <div
                style={{
                  marginBottom:
                    '30px',
                }}
              >
                <p className="section-label">
                  SOBRE EL PROYECTO
                </p>

                <p
                  style={{
                    marginTop:
                      '12px',
                    color:
                      '#F5F5F2',
                    lineHeight:
                      1.8,
                    whiteSpace:
                      'pre-line',
                  }}
                >
                  {item.description}
                </p>
              </div>
            )}

            {(item.client || clientInstagram) && (
              <div className="portfolio-client-info">
                <p className="section-label">CLIENTE</p>

                {item.client && (
                  <p className="portfolio-client-name">
                    {item.client}
                  </p>
                )}

                {clientInstagram && (
                  <a
                    className="portfolio-client-instagram"
                    href={clientInstagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Visitar el Instagram de ${item.client || clientInstagram.label}`}
                    aria-label={`Abrir Instagram de ${item.client || clientInstagram.label} en otra pestaña`}
                  >
                    <ContactIcon name="instagram" size={17} />
                    <span>{clientInstagram.label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}

            {item.link && (
              <div
                style={{
                  marginTop:
                    '30px',
                }}
              >
                <p className="section-label">
                  PROYECTO
                </p>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-button contact-button-primary"
                  style={{
                    display:
                      'inline-flex',
                    marginTop:
                      '12px',
                  }}
                  onClick={(
                    event,
                  ) =>
                    event.stopPropagation()
                  }
                >
                  Visitar proyecto
                  <span>↗</span>
                </a>
              </div>
            )}
          </div>
        ) : (
          <div
            className="detail-catalog-layout"
            style={{
              display: 'grid',
              gridTemplateColumns:
                'minmax(0, 1.6fr) minmax(240px, 0.8fr)',
              gap: '40px',
              marginTop:
                '36px',
            }}
          >
            <div className="detail-catalog-content">
              {item.description && (
                <div
                  style={{
                    marginBottom:
                      '28px',
                  }}
                >
                  <p
                    style={{
                      color:
                        '#F5F5F2',
                      lineHeight:
                        1.8,
                      whiteSpace:
                        'pre-line',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              )}

              {features.length >
                0 && (
                <div
                  style={{
                    marginBottom:
                      '28px',
                  }}
                >
                  <p className="section-label">
                    CARACTERÍSTICAS
                  </p>

                  <div
                    style={{
                      display:
                        'grid',
                      gap:
                        '10px',
                      marginTop:
                        '14px',
                    }}
                  >
                    {features.map(
                      (
                        feature,
                        index,
                      ) => (
                        <div
                          key={`${feature}-${index}`}
                          style={{
                            display:
                              'flex',
                            gap:
                              '10px',
                            alignItems:
                              'flex-start',
                          }}
                        >
                          <span
                            style={{
                              color:
                                '#B8FF3D',
                              flexShrink:
                                0,
                            }}
                          >
                            +
                          </span>

                          <p>
                            {
                              feature
                            }
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {item.commercialInfo && (
                <div>
                  <p className="section-label">
                    INFORMACIÓN
                  </p>

                  <p
                    style={{
                      marginTop:
                        '10px',
                      whiteSpace:
                        'pre-line',
                    }}
                  >
                    {
                      item.commercialInfo
                    }
                  </p>
                </div>
              )}
            </div>

            <div
              className="detail-catalog-actions"
              style={{
                borderLeft:
                  '1px solid rgba(245,245,242,0.12)',
                paddingLeft:
                  '28px',
                alignSelf:
                  'start',
              }}
            >
              <div
                style={{
                  marginBottom:
                    '24px',
                }}
              >
                <p className="section-label">
                  PRECIO
                </p>

                <strong
                  style={{
                    display:
                      'block',
                    marginTop:
                      '8px',
                    color:
                      '#F5F5F2',
                    fontSize:
                      '24px',
                  }}
                >
                  {item.price ||
                    '$ Consultar'}
                </strong>
              </div>

              <a
                href={whatsappLink}
                target={
                  whatsapp
                    ? '_blank'
                    : undefined
                }
                rel={
                  whatsapp
                    ? 'noreferrer'
                    : undefined
                }
                className="contact-button contact-button-primary"
                style={{
                  display:
                    'flex',
                  width:
                    '100%',
                  justifyContent:
                    'center',
                  marginBottom:
                    '12px',
                }}
                onClick={
                  onClose
                }
              >
                <ContactIcon name="whatsapp" />
                Consultar
                <span>↗</span>
              </a>

              <a
                href={`mailto:${contactEmail}`}
                className="contact-button"
                style={{
                  display:
                    'flex',
                  width:
                    '100%',
                  justifyContent:
                    'center',
                }}
                onClick={(
                  event,
                ) => {
                  event.preventDefault()

                  if (onEmail) {
                    onEmail()
                  }
                }}
              >
                <ContactIcon name="mail" />
                Contactar por mail
                <span>↗</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const CONTACT_GENERIC_ERROR =
  'No pudimos enviar tu consulta. Probá de nuevo en unos minutos.'

function EmailModal({
  onClose,
}) {
  const [form, setForm] =
    useState({
      name: '',
      clientEmail: '',
      phone: '',
      message: '',
      website: '',
    })

  const [status, setStatus] =
    useState('idle')

  const [errorMessage, setErrorMessage] =
    useState('')

  const handleChange = (
    event,
  ) => {
    const {
      name,
      value,
    } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (
    event,
  ) => {
    event.preventDefault()

    if (status === 'sending') {
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch(
        '/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email:
              form.clientEmail.trim(),
            phone: form.phone.trim(),
            message:
              form.message.trim(),
            website: form.website,
          }),
        },
      )

      let data = {}

      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        setErrorMessage(
          data.error ||
            CONTACT_GENERIC_ERROR,
        )

        setStatus('error')
        return
      }

      setStatus('success')
    } catch (error) {
      console.error(
        'No se pudo enviar la consulta.',
        error,
      )

      setErrorMessage(
        CONTACT_GENERIC_ERROR,
      )

      setStatus('error')
    }
  }

  const labelStyle = {
    display: 'grid',
    gap: '8px',
  }

  const labelTextStyle = {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  }

  const fieldStyle = {
    width: '100%',
    padding: '14px',
    border:
      '1px solid rgba(245,245,242,0.18)',
    background: '#0B0D10',
    color: '#F5F5F2',
    outline: 'none',
  }

  const isSending =
    status === 'sending'

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background:
          'rgba(0,0,0,0.88)',
        overflowY: 'auto',
        padding: '24px',
      }}
    >
      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        style={{
          width:
            'min(650px, 100%)',
          margin:
            '40px auto',
          background:
            '#0B0D10',
          border:
            '1px solid rgba(245,245,242,0.14)',
          padding:
            'clamp(20px, 4vw, 42px)',
          position:
            'relative',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position:
              'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius:
              '50%',
            border:
              '1px solid rgba(245,245,242,0.25)',
            background:
              '#0B0D10',
            color:
              '#F5F5F2',
            cursor:
              'pointer',
            fontSize:
              '22px',
          }}
        >
          ×
        </button>

        <p className="section-label">
          CONTACTO POR MAIL
        </p>

        {status === 'success' ? (
          <>
            <h2
              style={{
                marginTop:
                  '10px',
                paddingRight:
                  '45px',
              }}
            >
              ¡Gracias!
            </h2>

            <p
              style={{
                marginTop:
                  '14px',
                lineHeight:
                  1.7,
              }}
            >
              Recibimos tu consulta.
              Te vamos a contactar a
              la brevedad.
            </p>

            <button
              type="button"
              className="contact-button contact-button-primary"
              onClick={onClose}
              style={{
                width:
                  '100%',
                justifyContent:
                  'center',
                border:
                  'none',
                cursor:
                  'pointer',
                marginTop:
                  '28px',
              }}
            >
              Cerrar
            </button>
          </>
        ) : (
          <>
            <h2
              style={{
                marginTop:
                  '10px',
                paddingRight:
                  '45px',
              }}
            >
              Contanos tu idea.
            </h2>

            <p
              style={{
                marginTop:
                  '14px',
                lineHeight:
                  1.7,
              }}
            >
              Dejanos tus datos y tu
              consulta. Te vamos a
              responder a la
              brevedad.
            </p>

            <form
              onSubmit={
                handleSubmit
              }
              style={{
                display:
                  'grid',
                gap: '16px',
                marginTop:
                  '28px',
              }}
            >
              <label
                style={
                  labelStyle
                }
              >
                <span
                  style={
                    labelTextStyle
                  }
                >
                  Nombre
                </span>

                <input
                  name="name"
                  type="text"
                  value={
                    form.name
                  }
                  onChange={
                    handleChange
                  }
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder="Tu nombre"
                  style={
                    fieldStyle
                  }
                />
              </label>

              <label
                style={
                  labelStyle
                }
              >
                <span
                  style={
                    labelTextStyle
                  }
                >
                  Email
                </span>

                <input
                  name="clientEmail"
                  type="email"
                  value={
                    form.clientEmail
                  }
                  onChange={
                    handleChange
                  }
                  required
                  maxLength={160}
                  autoComplete="email"
                  placeholder="tu@email.com"
                  style={
                    fieldStyle
                  }
                />
              </label>

              <label
                style={
                  labelStyle
                }
              >
                <span
                  style={
                    labelTextStyle
                  }
                >
                  Número de teléfono
                </span>

                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  value={
                    form.phone
                  }
                  onChange={
                    handleChange
                  }
                  required
                  maxLength={40}
                  autoComplete="tel"
                  placeholder="+54 9 260 000 0000"
                  style={
                    fieldStyle
                  }
                />
              </label>

              <label
                style={
                  labelStyle
                }
              >
                <span
                  style={
                    labelTextStyle
                  }
                >
                  Consulta
                </span>

                <textarea
                  name="message"
                  value={
                    form.message
                  }
                  onChange={
                    handleChange
                  }
                  required
                  rows="6"
                  maxLength={4000}
                  placeholder="Contanos qué necesitás..."
                  style={{
                    ...fieldStyle,
                    resize:
                      'vertical',
                  }}
                />
              </label>

              <input
                name="website"
                type="text"
                value={
                  form.website
                }
                onChange={
                  handleChange
                }
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position:
                    'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                }}
              />

              {status ===
                'error' && (
                <p
                  role="alert"
                  style={{
                    margin: 0,
                    color:
                      '#ff6b6b',
                    lineHeight:
                      1.6,
                  }}
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="contact-button contact-button-primary"
                disabled={
                  isSending
                }
                style={{
                  width:
                    '100%',
                  justifyContent:
                    'center',
                  border:
                    'none',
                  cursor:
                    isSending
                      ? 'wait'
                      : 'pointer',
                  opacity:
                    isSending
                      ? 0.7
                      : 1,
                }}
              >
                {isSending
                  ? 'Enviando...'
                  : 'Enviar consulta'}

                <span>↗</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function PrivateAccessDialog({ onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog ref={dialogRef} className="private-access-dialog" aria-labelledby="private-access-title" onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close() }}>
      <div className="private-access-content">
        <button type="button" className="private-access-close" aria-label="Cerrar" onClick={() => dialogRef.current.close()}>×</button>
        <p className="section-label">PLANO LABS</p>
        <h2 id="private-access-title">Acceso privado</h2>
        <p>Ingresá para gestionar el contenido del sitio.</p>
        <a className="private-access-link" href="/admin">Ingresar <span aria-hidden="true">↗</span></a>
      </div>
    </dialog>
  )
}

function MobileCarousel({ items, className, children, interval = 4200 }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [mobile, setMobile] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 650px)')
    const update = () => setMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!mobile || paused || items.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      if (document.hidden || !trackRef.current) return
      const next = (Math.round(trackRef.current.scrollLeft / trackRef.current.clientWidth) + 1) % items.length
      trackRef.current.scrollTo({ left: next * trackRef.current.clientWidth, behavior: 'smooth' })
    }, interval)
    return () => window.clearInterval(timer)
  }, [mobile, paused, items.length, interval])

  const moveTo = (index) => {
    trackRef.current?.scrollTo({ left: index * trackRef.current.clientWidth, behavior: 'smooth' })
    setActive(index)
  }

  return <div className="mobile-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
    <div className={className} ref={trackRef} onScroll={(event) => {
      if (!mobile || !event.currentTarget.clientWidth) return
      setActive(Math.min(items.length - 1, Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth)))
    }}>
      {children}
    </div>
    {mobile && items.length > 1 && <div className="mobile-carousel-controls" aria-label="Controles del carrusel">
      <button type="button" aria-label="Anterior" onClick={() => moveTo((active - 1 + items.length) % items.length)}>‹</button>
      <span className="mobile-carousel-count">{active + 1} / {items.length}</span>
      <button type="button" aria-label="Siguiente" onClick={() => moveTo((active + 1) % items.length)}>›</button>
    </div>}
  </div>
}

function PublicSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [catalog, setCatalog] =
    useState([])

  const [portfolio, setPortfolio] =
    useState(DEFAULT_PORTFOLIO)

  const [services, setServices] =
    useState(DEFAULT_SERVICES)

  const [aboutPoints, setAboutPoints] =
    useState(
      DEFAULT_ABOUT_POINTS,
    )

  const [siteContent, setSiteContent] =
    useState(
      DEFAULT_SITE_CONTENT,
    )

  const [selectedItem, setSelectedItem] =
    useState(null)

  const [selectedType, setSelectedType] =
    useState(null)

  const [showEmailModal, setShowEmailModal] =
    useState(false)

  const [showPrivateAccess, setShowPrivateAccess] = useState(false)
  const privateAccessClicks = useRef([])
  const activatePrivateAccess = () => {
    const now = Date.now()
    const recent = privateAccessClicks.current.filter((time) => now - time < 1800)
    recent.push(now)
    if (recent.length >= 3) {
      privateAccessClicks.current = []
      setShowPrivateAccess(true)
    } else {
      privateAccessClicks.current = recent
    }
  }

  const logoMarqueeRef = useRef(null)
  const [publicDataLoaded, setPublicDataLoaded] = useState(false)

  // En pantallas táctiles, el carrusel conserva su avance automático,
  // pero el usuario puede desplazarlo libremente con el dedo.
  useEffect(() => {
    const viewport = logoMarqueeRef.current
    if (!viewport || portfolio.length < 2) return

    const media = window.matchMedia('(max-width: 900px)')
    const group = viewport.querySelector('.portfolio-marquee-group')
    if (!group) return

    let frame = 0
    let lastFrame = 0
    let pausedUntil = 0
    let pointerHeld = false
    let focused = false
    let visible = true

    const pause = () => { pausedUntil = performance.now() + 2500 }
    const onPointerDown = () => { pointerHeld = true }
    const onPointerUp = () => { pointerHeld = false; pause() }
    const onFocusIn = () => { focused = true }
    const onFocusOut = () => { focused = false; pause() }
    const onWheel = () => { pause() }

    const tick = (now) => {
      frame = window.requestAnimationFrame(tick)
      if (!media.matches) return

      const width = group.getBoundingClientRect().width
      if (!width) return

      // Las tres copias son idénticas: recentrar evita llegar a un extremo.
      // Nunca interrumpimos el gesto activo del visitante.
      if (!pointerHeld) {
        if (viewport.scrollLeft < width * 0.5) viewport.scrollLeft += width
        if (viewport.scrollLeft >= width * 1.5) viewport.scrollLeft -= width
      }

      const elapsed = lastFrame ? Math.min(now - lastFrame, 64) : 0
      lastFrame = now
      if (!pointerHeld && !focused && visible && now > pausedUntil) {
        viewport.scrollLeft += (elapsed * width) / 24000
      }
    }

    const setMode = () => {
      window.cancelAnimationFrame(frame)
      lastFrame = 0
      if (media.matches) {
        viewport.scrollLeft = group.getBoundingClientRect().width
        frame = window.requestAnimationFrame(tick)
      } else {
        viewport.scrollLeft = 0
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      lastFrame = 0
    })
    observer.observe(viewport)

    viewport.addEventListener('pointerdown', onPointerDown, { passive: true })
    viewport.addEventListener('pointerup', onPointerUp, { passive: true })
    viewport.addEventListener('pointercancel', onPointerUp, { passive: true })
    viewport.addEventListener('focusin', onFocusIn)
    viewport.addEventListener('focusout', onFocusOut)
    viewport.addEventListener('wheel', onWheel, { passive: true })
    media.addEventListener('change', setMode)
    setMode()

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      media.removeEventListener('change', setMode)
      viewport.removeEventListener('pointerdown', onPointerDown)
      viewport.removeEventListener('pointerup', onPointerUp)
      viewport.removeEventListener('pointercancel', onPointerUp)
      viewport.removeEventListener('focusin', onFocusIn)
      viewport.removeEventListener('focusout', onFocusOut)
      viewport.removeEventListener('wheel', onWheel)
    }
  }, [portfolio])

  // La página de FAQ está en otra ruta. Al volver, recuperar el píxel guardado
  // (esperando a que el contenido asincrónico termine de ocupar su altura).
  useEffect(() => {
    if (!publicDataLoaded) return
    let saved
    try {
      saved = JSON.parse(window.sessionStorage.getItem(FAQ_RETURN_POSITION_KEY) || 'null')
      window.sessionStorage.removeItem(FAQ_RETURN_POSITION_KEY)
    } catch {
      return
    }
    if (!saved || !Number.isFinite(saved.y) ||
        Date.now() - saved.savedAt > 30 * 60 * 1000 ||
        window.location.hash) return

    let timer
    let attempts = 0
    let cancelled = false
    const restore = () => {
      if (cancelled) return
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll >= saved.y || attempts >= 25) {
        window.scrollTo({ top: saved.y, left: 0, behavior: 'instant' })
      } else {
        attempts += 1
        timer = window.setTimeout(restore, 120)
      }
    }
    timer = window.setTimeout(restore, 0)
    return () => { cancelled = true; window.clearTimeout(timer) }
  }, [publicDataLoaded])

  const detailHistoryRef = useRef(false)

  const loadRequestRef = useRef(0)

  const loadPublicData = async () => {
    const requestId =
      ++loadRequestRef.current

    try {
      let publications =
        await loadDocument(
          CMS_KEYS.PUBLICATIONS,
        )

      if (!Array.isArray(publications)) {
        publications =
          readLocalFallback(
            'plano-labs-publications',
            [],
          )
      }

      if (
        Array.isArray(publications) &&
        publications.length
      ) {
        const publishedPublications =
          publications
            .filter(
              (publication) =>
                publication.published,
            )
            .map(
              (
                publication,
                index,
              ) => ({
                ...publication,
                order:
                  Number(
                    publication.order,
                  ) ||
                  index + 1,
                images:
                  normalizeImages(
                    publication.images,
                  ),
                videos:
                  normalizeVideos(
                    publication.videos ||
                      (publication.video
                        ? [
                            publication.video,
                          ]
                        : []),
                  ),
                coverImage: catalogCover(publication),
              }),
            )
            .sort(
              (a, b) =>
                Number(a.order) -
                Number(b.order),
            )
            .map(
              (
                publication,
                index,
              ) => ({
                ...publication,
                number:
                  String(
                    index + 1,
                  ).padStart(
                    2,
                    '0',
                  ),
              }),
            )

        if (
          requestId !==
          loadRequestRef.current
        ) {
          return
        }

        setCatalog(
          publishedPublications,
        )
      } else {
        setCatalog([])
      }

      let savedPortfolio =
        await loadDocument(
          CMS_KEYS.PORTFOLIO,
        )

      if (!Array.isArray(savedPortfolio)) {
        savedPortfolio =
          readLocalFallback(
            'plano-labs-portfolio',
            [],
          )
      }

      if (
        Array.isArray(savedPortfolio) &&
        savedPortfolio.length
      ) {
        const publishedProjects =
          savedPortfolio
            .filter(
              (project) =>
                project.published,
            )
            .map(
              (
                project,
                index,
              ) => ({
                ...project,
                order:
                  Number(
                    project.order,
                  ) ||
                  index + 1,
                link:
                  project.link ||
                  '',
                shortDescription:
                  project.shortDescription ||
                  '',
                images:
                  normalizeImages(
                    project.images ||
                      (project.image
                        ? [
                            {
                              id: 'cover',
                              url: project.image,
                            },
                          ]
                        : []),
                  ),
                screenshots:
                  normalizeImages(
                    project.screenshots ||
                      [],
                  ),
                videos:
                  normalizeVideos(
                    project.videos ||
                      (project.video
                        ? [
                            project.video,
                          ]
                        : []),
                  ),
                coverImage:
                  project.coverImage ||
                  project.image ||
                  project.images?.[0]
                    ?.url ||
                  project.screenshots?.[0]
                    ?.url ||
                  '',
              }),
            )
            .sort(
              (a, b) =>
                Number(a.order) -
                Number(b.order),
            )
            .map(
              (
                project,
                index,
              ) => ({
                ...project,
                number:
                  String(
                    index + 1,
                  ).padStart(
                    2,
                    '0',
                  ),
              }),
            )

        if (
          requestId !==
          loadRequestRef.current
        ) {
          return
        }

        setPortfolio(
          publishedProjects,
        )
      } else {
        setPortfolio(DEFAULT_PORTFOLIO)
      }

      const [
        loadedSiteContent,
        loadedServices,
        loadedAboutPoints,
      ] = await Promise.all([
        loadSiteContent(),
        loadServices(),
        loadAboutPoints(),
      ])

      if (
        requestId !==
        loadRequestRef.current
      ) {
        return
      }

      setSiteContent(
        loadedSiteContent,
      )

      setServices(
        Array.isArray(
          loadedServices,
        )
          ? loadedServices
          : DEFAULT_SERVICES,
      )

      setAboutPoints(
        Array.isArray(
          loadedAboutPoints,
        )
          ? loadedAboutPoints
          : DEFAULT_ABOUT_POINTS,
      )
    } catch (error) {
      console.error(
        'No se pudieron cargar los datos públicos.',
        error,
      )
    } finally {
      if (requestId === loadRequestRef.current) setPublicDataLoaded(true)
    }
  }

  useEffect(() => {
    loadPublicData()

    const handleStorage = () => {
      loadPublicData()
    }

    window.addEventListener(
      'storage',
      handleStorage,
    )

    return () => {
      window.removeEventListener(
        'storage',
        handleStorage,
      )
    }
  }, [])

  useEffect(() => {
    const handleFocus = () => {
      loadPublicData()
    }

    window.addEventListener(
      'focus',
      handleFocus,
    )

    return () => {
      window.removeEventListener(
        'focus',
        handleFocus,
      )
    }
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      if (
        detailHistoryRef.current
      ) {
        detailHistoryRef.current =
          false

        setSelectedItem(null)
        setSelectedType(null)

        document.body.style.overflow =
          ''
      }
    }

    window.addEventListener(
      'popstate',
      handlePopState,
    )

    return () => {
      window.removeEventListener(
        'popstate',
        handlePopState,
      )
    }
  }, [])

  const content =
    siteContent || DEFAULT_SITE_CONTENT

  const customOfferImage = content.customOffer?.image || '/plano-labs/web-a-medida.png'
  const customOffer = {
    ...DEFAULT_SITE_CONTENT.customOffer,
    ...(content.customOffer || {}),
    id: 'web-a-medida',
    category: 'SOLUCIÓN A MEDIDA',
    type: 'Servicio',
    coverImage: customOfferImage,
    images: [{ id: 'custom-cover', url: customOfferImage }],
  }

  const whatsappNumber =
    content.contact?.whatsapp ||
    ''

  const linkedinUrl =
    content.contact?.linkedin ||
    ''

  const normalizedLinkedinUrl =
    linkedinUrl &&
    !/^https?:\/\//i.test(
      linkedinUrl,
    )
      ? `https://${linkedinUrl}`
      : linkedinUrl

  const instagramLink = normalizeSocialLink(
    content.contact?.instagram,
    'instagram.com',
    'https://www.instagram.com/',
  )

  const fiverrLink = normalizeSocialLink(
    content.contact?.fiverr,
    'fiverr.com',
    'https://www.fiverr.com/',
  )

  const contactEmail =
    content.contact?.email ||
    DEFAULT_EMAIL

  const cleanWhatsapp = String(
    whatsappNumber || '',
  ).replace(/\D/g, '')

  const whatsappLink =
    cleanWhatsapp
      ? `https://wa.me/${cleanWhatsapp}`
      : '#contacto'

  const openDetail = (
    item,
    type,
  ) => {
    setSelectedItem(item)
    setSelectedType(type)

    document.body.style.overflow =
      'hidden'

    const detailHash =
      `${type}-${item.id}`

    window.history.pushState(
      {
        planoLabsDetail: true,
        detailType: type,
        detailId: item.id,
      },
      '',
      `#${detailHash}`,
    )

    detailHistoryRef.current =
      true
  }

  const closeDetail = () => {
    if (
      detailHistoryRef.current
    ) {
      window.history.back()
      return
    }

    setSelectedItem(null)
    setSelectedType(null)

    document.body.style.overflow =
      ''
  }

  const openEmail = () => {
    setShowEmailModal(true)
    document.body.style.overflow =
      'hidden'
  }

  const closeEmail = () => {
    setShowEmailModal(false)

    document.body.style.overflow =
      detailHistoryRef.current
        ? 'hidden'
        : ''
  }

  return (
    <main className="site">
      <header className="navbar">
        <a
          href="#inicio"
          className="logo"
          aria-label="Ir al inicio"
          onClick={() => {
            if (
              detailHistoryRef.current
            ) {
              window.history.back()
            } else {
              closeDetail()
            }

            closeEmail()
          }}
        >
          <img
            src={logo}
            alt="PLANO LABS"
          />
        </a>

        <button type="button" className="mobile-menu-toggle" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span aria-hidden="true">•••</span>
        </button>
        <nav id="main-navigation" className={menuOpen ? 'menu-open' : ''} onClick={(event) => { if (event.target.closest('a')) setMenuOpen(false) }}>
          <a href="#inicio">
            Inicio
          </a>

          <a href="#universo">
            Universo
          </a>

          <a href="#portfolio">
            Portfolio
          </a>

          <a href="#catalogo">
            Catálogo
          </a>

          <a href="#contacto">
            Contacto
          </a>
        </nav>
      </header>

      <section
        id="inicio"
        className="hero"
      >
        <div className="pl2-hero-layout">
          <div className="pl2-hero-portrait" aria-hidden="true">
            {content.home.portrait ? (
              <img src={content.home.portrait} alt="" loading="eager" />
            ) : (
              <div className="pl2-hero-placeholder" />
            )}
          </div>
          <div className="pl2-hero-copy">
            <p className="eyebrow">{content.home.eyebrow}</p>
            <h1>{renderHighlightedTitle(content.home.title)}</h1>
            <p className="hero-description">{content.home.description}</p>
            <a href="#universo" className="hero-button">{content.home.button}</a>
          </div>
        </div>
      </section>

      <UniverseSection />

      <section id="portfolio" className="portfolio portfolio-showcase">
        <div className="portfolio-header">
          <div>
            <p className="section-label">02 / PORTFOLIO</p>
            <h2>Proyectos <span>reales.</span></h2>
          </div>
          <div className="portfolio-heading-side">
            <p className="portfolio-intro">Ya confiaron en nosotros.</p>
            <span className="portfolio-heading-arrow" aria-hidden="true">↓</span>
          </div>
        </div>
        {portfolio.length === 0 ? (
          <p className="portfolio-empty">Próximamente encontrarás aquí nuestros proyectos.</p>
        ) : (
          <div className="portfolio-marquee" ref={logoMarqueeRef} aria-label="Marcas que confiaron en PLANO LABS. En celular, deslizá para explorar los proyectos.">
            <div className="portfolio-marquee-track">
              {[0, 1, 2].map((repeat) => (
                <div className="portfolio-marquee-group" key={repeat} aria-hidden={repeat !== 0 ? true : undefined}>
                  {portfolio.map((project) => {
                    const name = `${project.title || ''} ${project.client || ''}`.toLowerCase()
                    const brandLogo = project.logo || project.clientLogo ||
                      (name.includes('matero') ? '/portfolio-logos/Legado%20Matero.png' :
                       name.includes('magia') ? '/portfolio-logos/Magia%20Consciente.png' :
                       name.includes('gabriel') ? '/portfolio-logos/san-gabriel-transparent.png' :
                       project.coverImage || project.image)
                    return (
                      <button
                        key={`${repeat}-${project.id}`}
                        type="button"
                        className="portfolio-floating-logo"
                        tabIndex={repeat === 0 ? 0 : -1}
                        onClick={() => openDetail(project, 'portfolio')}
                        aria-label={`Conocer proyecto ${project.title}`}
                      >
                        {brandLogo ? <img src={brandLogo} alt="" loading="lazy" /> : <span>{project.title}</span>}
                        <span className="portfolio-logo-hint">Conocer proyecto ↗</span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section
        id="catalogo"
        className="catalog"
      >
        <div className="catalog-header">
          <div>
            <p className="section-label">
              04 / CATÁLOGO
            </p>

            <h2>
              Una web a la medida de
              <span>
                {' '}
                tu próximo paso.
              </span>
            </h2>
          </div>

          <p className="catalog-intro">
            Elegí la solución que mejor
            acompaña el momento de tu
            proyecto.
          </p>
        </div>

        {catalog.length ===
        0 ? (
          <div
            style={{
              padding:
                '60px 20px',
              textAlign:
                'center',
              border:
                '1px solid rgba(245,245,242,0.12)',
            }}
          >
            <p>
              Próximamente
              encontrarás aquí
              nuestros productos y
              servicios.
            </p>
          </div>
        ) : (
          <div className="catalog-grid">
            {catalog.map(
              (item) => (
                <article
                  className="catalog-cover-card catalog-cinematic-banner"
                  key={item.id}
                  onClick={() =>
                    openDetail(
                      item,
                      'catalog',
                    )
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(
                    event,
                  ) => {
                    if (
                      event.key ===
                        'Enter' ||
                      event.key ===
                        ' '
                    ) {
                      openDetail(
                        item,
                        'catalog',
                      )
                    }
                  }}
                  aria-label={`Conocer solución ${item.title}`}
                >
                  <div className="catalog-cover-media">
                    <span className="catalog-cover-number">
                      {item.number}
                    </span>

                    {item.coverImage ? (
                      <img
                        src={
                          item.coverImage
                        }
                        alt={
                          item.title
                        }
                        loading="lazy"
                      />
                    ) : (
                      <div className="catalog-placeholder">
                        <div className="catalog-shape"></div>
                      </div>
                    )}
                    <span className="catalog-cover-wash" aria-hidden="true" />
                  </div>

                  <div className="catalog-cover-copy">
                    <p className="catalog-category">
                      {item.category || 'SOLUCIÓN DIGITAL'}
                    </p>

                    <h3>{item.title}</h3>

                    <p className="catalog-description">
                      {item.description}
                    </p>

                    <div className="catalog-cover-action">
                      <strong>{item.price || '$ Consultar'}</strong>
                      <span>Conocé la solución <span aria-hidden="true">↗</span></span>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        )}
        <button type="button" className="custom-offer" onClick={() => openDetail(customOffer, 'catalog')}>
          <span className="custom-offer-art" aria-hidden="true"><img src={customOfferImage} alt="" /></span>
          <span className="custom-offer-copy">
            <span className="custom-offer-label">UNA SOLUCIÓN PARA TU PROYECTO</span>
            <strong>{customOffer.title}</strong>
            <span>{customOffer.description}</span>
          </span>
          <span className="custom-offer-cta">Descubrí tu propuesta <span aria-hidden="true">↗</span></span>
        </button>
      </section>

      <a className="faq-banner faq-between-sections" href="/preguntas-frecuentes" onClick={rememberFaqPosition}>
        <span className="faq-banner-icon" aria-hidden="true">?</span>
        <span className="faq-banner-copy"><span>ESTAMOS PARA AYUDARTE</span><strong>¿Te quedaron dudas?</strong><span>Encontrá respuestas sobre nuestras webs y cómo trabajamos.</span></span>
        <span className="faq-banner-link">Ver preguntas frecuentes <span aria-hidden="true">↗</span></span>
      </a>

      <section
        id="contacto"
        className="contact"
      >
        <div className="contact-universe-decor" aria-hidden="true">
          <span className="contact-universe-orbit contact-universe-orbit-one" />
          <span className="contact-universe-orbit contact-universe-orbit-two" />
          <span className="contact-universe-orbit contact-universe-orbit-three" />
          <span className="contact-universe-star contact-universe-star-one" />
          <span className="contact-universe-star contact-universe-star-two" />
          <span className="contact-universe-star contact-universe-star-three" />
          <span className="contact-universe-star contact-universe-star-four" />
        </div>
        <div className="contact-inner">
          <div className="contact-header">
            <p className="section-label">
              {content.contact.eyebrow}
            </p>

            <h2>Hagamos realidad tu idea.</h2>

            <p>
              {
                content.contact
                  .description
              }
            </p>
          </div>

          <div className="contact-actions">
            <a
              href={
                whatsappLink
              }
              className="contact-button contact-button-primary"
              target={
                whatsappNumber
                  ? '_blank'
                  : undefined
              }
              rel={
                whatsappNumber
                  ? 'noreferrer'
                  : undefined
              }
            >
              <ContactIcon name="whatsapp" />
              WhatsApp
              <span>↗</span>
            </a>

            <a
              href={
                normalizedLinkedinUrl ||
                '#contacto'
              }
              className="contact-button"
              target={
                normalizedLinkedinUrl
                  ? '_blank'
                  : undefined
              }
              rel={
                normalizedLinkedinUrl
                  ? 'noreferrer'
                  : undefined
              }
            >
              <ContactIcon name="linkedin" />
              LinkedIn
              <span>↗</span>
            </a>

            {instagramLink && (
              <a
                href={instagramLink}
                className="contact-button"
                target="_blank"
                rel="noreferrer"
              >
                <ContactIcon name="instagram" />
                Instagram
                <span>↗</span>
              </a>
            )}

            {fiverrLink && (
              <a
                href={fiverrLink}
                className="contact-button"
                target="_blank"
                rel="noreferrer"
              >
                <ContactIcon name="fiverr" />
                Fiverr
                <span>↗</span>
              </a>
            )}

            <button
              type="button"
              className="contact-button"
              onClick={
                openEmail
              }
            >
              <ContactIcon name="mail" />
              Contactar por mail
              <span>↗</span>
            </button>
          </div>
        </div>

        <div className="contact-footer">
          <div
            style={{
              display:
                'flex',
              flexDirection:
                'column',
              gap: '8px',
            }}
          >
            <button type="button" className="footer-brand" onClick={activatePrivateAccess}>PLANO LABS</button>

            <span>
              DONDE LAS IDEAS
              TOMAN FORMA.
            </span>

            <a
              href={`mailto:${contactEmail}`}
              onClick={(
                event,
              ) => {
                event.preventDefault()
                openEmail()
              }}
              style={{
                color:
                  '#F5F5F2',
                transition:
                  'color 0.2s ease',
              }}
            >
              {contactEmail}
            </a>
          </div>
          <a href="#inicio" className="footer-back-to-top" aria-label="Volver al inicio de PLANO LABS">
            <img src={logo} alt="" />
            <span>↑ VOLVER AL INICIO</span>
          </a>
        </div>
      </section>

      {showPrivateAccess && <PrivateAccessDialog onClose={() => setShowPrivateAccess(false)} />}

      {selectedItem && (
        <DetailModal
          item={selectedItem}
          type={selectedType}
          onClose={
            closeDetail
          }
          onEmail={
            openEmail
          }
          contactEmail={
            contactEmail
          }
          whatsapp={
            whatsappNumber
          }
        />
      )}

      {showEmailModal && (
        <EmailModal
          onClose={
            closeEmail
          }
        />
      )}
    </main>
  )
}

function App() {
  const path =
    window.location.pathname

  if (
    path === '/admin' ||
    path === '/admin/login'
  ) {
    return <Login />
  }

  if (
    path === '/admin/dashboard'
  ) {
    return <Admin />
  }

  if (
    path === '/preguntas-frecuentes'
  ) {
    return <PreguntasFrecuentes />
  }

  return <PublicSite />
}

export default App
