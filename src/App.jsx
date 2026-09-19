import { useEffect, useRef, useState } from 'react'

import './App.css'

import logo from './assets/logo.png'

import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'

import {
  CMS_KEYS,
  loadDocument,
  mergeSiteContent,
  readLocalFallback,
} from './cms'

const DEFAULT_EMAIL = 'plano.labs.ideas@gmail.com'

const DEFAULT_SITE_CONTENT = {
  home: {
    eyebrow: 'CREACIÓN DIGITAL · ESTRATEGIA · RESULTADOS',
    title: 'Donde las ideas toman forma.',
    description:
      'Diseñamos experiencias digitales que combinan estrategia, tecnología y creatividad.',
    button: 'Conocé nuestros servicios',
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

  contact: {
    eyebrow: '05 / CONTACTO',
    title: 'Hagamos algo realidad.',
    description:
      '¿Tenés una idea, un proyecto o simplemente querés saber qué podemos hacer por vos? Hablemos.',
    whatsapp: '',
    linkedin: '',
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

/*
 * Renderiza un título editable desde el administrador.
 *
 * Para conservar el estilo visual de la marca,
 * las dos últimas palabras se resaltan con el acento.
 */
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

/*
 * Carga la configuración general del sitio.
 */
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

/*
 * Carga los servicios.
 */
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

/*
 * Carga los puntos de Nosotros.
 */
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

            {item.client && (
              <div
                style={{
                  marginBottom:
                    '28px',
                }}
              >
                <p className="section-label">
                  CLIENTE
                </p>

                <p
                  style={{
                    marginTop:
                      '8px',
                    color:
                      '#F5F5F2',
                  }}
                >
                  {item.client}
                </p>
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
            style={{
              display: 'grid',
              gridTemplateColumns:
                'minmax(0, 1.6fr) minmax(240px, 0.8fr)',
              gap: '40px',
              marginTop:
                '36px',
            }}
          >
            <div>
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

function PublicSite() {
  const [catalog, setCatalog] =
    useState([])

  const [portfolio, setPortfolio] =
    useState([])

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

  const detailHistoryRef = useRef(false)

  /*
   * Evita que una carga vieja de Supabase
   * sobrescriba una carga más reciente.
   */
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
                coverImage:
                  publication.coverImage ||
                  publication.images?.[0]
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
        setPortfolio([])
      }

      /*
       * IMPORTANTE:
       * Estas tres funciones son async.
       * Antes se estaban pasando las Promises
       * directamente a setState.
       */
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

        <nav>
          <a href="#inicio">
            Inicio
          </a>

          <a href="#servicios">
            Servicios
          </a>

          <a href="#nosotros">
            Nosotros
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
        <p className="eyebrow">
          {content.home.eyebrow}
        </p>

        <h1>
          {renderHighlightedTitle(
            content.home.title,
          )}
        </h1>

        <p className="hero-description">
          {content.home.description}
        </p>

        <a
          href="#servicios"
          className="hero-button"
        >
          {content.home.button}
        </a>
      </section>

      <section
        id="servicios"
        className="services"
      >
        <div className="services-header">
          <div>
            <p className="section-label">
              {content.services.eyebrow}
            </p>

            <h2>
              {renderHighlightedTitle(
                content.services.title,
              )}
            </h2>
          </div>

          <p className="services-intro">
            {
              content.services
                .description
            }
          </p>
        </div>

        <div className="services-grid">
          {services.map(
            (
              service,
              index,
            ) => (
              <article
                className="service-card"
                key={
                  service.id ||
                  index
                }
              >
                <div className="service-top">
                  <span>
                    {service.number ||
                      String(
                        index + 1,
                      ).padStart(
                        2,
                        '0',
                      )}
                  </span>

                  <div className="service-mark">
                    <span></span>
                    <span></span>
                  </div>
                </div>

                <div className="service-content">
                  <h3>
                    {
                      service.title
                    }
                  </h3>

                  <p>
                    {
                      service.description
                    }
                  </p>
                </div>

                <div className="service-arrow">
                  ↗
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      <section
        id="nosotros"
        className="about"
      >
        <div className="about-header">
          <p className="section-label">
            {content.about.eyebrow}
          </p>

          <h2>
            {renderHighlightedTitle(
              content.about.title,
            )}
          </h2>
        </div>

        <div className="about-content">
          <div className="about-main">
            <p className="about-lead">
              {content.about.lead}
            </p>

            <p>
              {
                content.about
                  .description
              }
            </p>
          </div>

          <div className="about-side">
            {aboutPoints.map(
              (
                point,
                index,
              ) => (
                <div
                  className="about-line"
                  key={
                    point.id ||
                    index
                  }
                >
                  <span>
                    {point.number ||
                      String(
                        index + 1,
                      ).padStart(
                        2,
                        '0',
                      )}
                  </span>

                  <strong>
                    {
                      point.title
                    }
                  </strong>

                  <p>
                    {
                      point.description
                    }
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="portfolio"
      >
        <div className="portfolio-header">
          <div>
            <p className="section-label">
              03 / PORTFOLIO
            </p>

            <h2>
              Proyectos que
              <span>
                {' '}
                toman forma.
              </span>
            </h2>
          </div>

          <p className="portfolio-intro">
            Una selección de trabajos y
            experiencias desarrolladas por
            PLANO LABS.
          </p>
        </div>

        {portfolio.length ===
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
              nuestros proyectos.
            </p>
          </div>
        ) : (
          <div className="portfolio-grid">
            {portfolio.map(
              (project) => (
                <article
                  className="project-card"
                  key={
                    project.id
                  }
                  onClick={() =>
                    openDetail(
                      project,
                      'portfolio',
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
                        project,
                        'portfolio',
                      )
                    }
                  }}
                  style={{
                    cursor:
                      'pointer',
                  }}
                >
                  <div className="project-image">
                    <span>
                      {
                        project.number
                      }
                    </span>

                    {project.coverImage ? (
                      <img
                        src={
                          project.coverImage
                        }
                        alt={
                          project.title
                        }
                        style={{
                          width:
                            '100%',
                          height:
                            '100%',
                          objectFit:
                            'cover',
                          display:
                            'block',
                        }}
                      />
                    ) : (
                      <div className="project-placeholder">
                        <div className="project-shape"></div>
                      </div>
                    )}
                  </div>

                  <div className="project-info">
                    <div>
                      <p className="project-category">
                        {
                          project.category
                        }
                      </p>

                      <h3>
                        {
                          project.title
                        }
                      </h3>
                    </div>

                    <p>
                      {project.shortDescription ||
                        project.description}
                    </p>
                  </div>
                </article>
              ),
            )}
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
              Soluciones para
              <span>
                {' '}
                llevar tu idea más
                lejos.
              </span>
            </h2>
          </div>

          <p className="catalog-intro">
            Conocé nuestros productos y
            servicios disponibles. Cada
            propuesta está pensada para
            resolver una necesidad
            concreta.
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
                  className="catalog-card"
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
                  style={{
                    cursor:
                      'pointer',
                  }}
                >
                  <div className="catalog-image">
                    <span>
                      {
                        item.number
                      }
                    </span>

                    {item.coverImage ? (
                      <img
                        src={
                          item.coverImage
                        }
                        alt={
                          item.title
                        }
                        style={{
                          width:
                            '100%',
                          height:
                            '100%',
                          objectFit:
                            'cover',
                          display:
                            'block',
                        }}
                      />
                    ) : (
                      <div className="catalog-placeholder">
                        <div className="catalog-shape"></div>
                      </div>
                    )}
                  </div>

                  <div className="catalog-info">
                    <div className="catalog-top">
                      <p className="catalog-category">
                        {
                          item.category
                        }
                      </p>

                      <span className="catalog-arrow">
                        ↗
                      </span>
                    </div>

                    <h3>
                      {
                        item.title
                      }
                    </h3>

                    <p className="catalog-description">
                      {
                        item.description
                      }
                    </p>

                    <div className="catalog-bottom">
                      <strong>
                        {item.price ||
                          '$ Consultar'}
                      </strong>

                      <span>
                        Ver ficha
                        <span>
                          ↗
                        </span>
                      </span>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        )}
      </section>

      <section
        id="contacto"
        className="contact"
      >
        <div className="contact-inner">
          <div className="contact-header">
            <p className="section-label">
              {content.contact.eyebrow}
            </p>

            <h2>
              {
                content.contact
                  .title
              }
            </h2>

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
              LinkedIn
              <span>↗</span>
            </a>

            <button
              type="button"
              className="contact-button"
              onClick={
                openEmail
              }
            >
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
            <span>
              PLANO LABS
            </span>

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

          <a
            href="/admin"
            className="admin-access"
          >
            ADMIN
          </a>
        </div>
      </section>

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

  return <PublicSite />
}

export default App