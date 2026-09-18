import { useEffect, useRef, useState } from 'react'

import './App.css'

import logo from './assets/logo.png'

import Login from './pages/Login.jsx'

import Admin from './pages/Admin.jsx'

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

function loadSiteContent() {
  try {
    const savedSiteContent = localStorage.getItem(
      'plano-labs-site-content',
    )

    if (!savedSiteContent) {
      return DEFAULT_SITE_CONTENT
    }

    const parsedContent = JSON.parse(savedSiteContent)

    return {
      ...DEFAULT_SITE_CONTENT,
      ...parsedContent,

      home: {
        ...DEFAULT_SITE_CONTENT.home,
        ...(parsedContent.home || {}),
      },

      services: {
        ...DEFAULT_SITE_CONTENT.services,
        ...(parsedContent.services || {}),
      },

      about: {
        ...DEFAULT_SITE_CONTENT.about,
        ...(parsedContent.about || {}),
      },

      contact: {
        ...DEFAULT_SITE_CONTENT.contact,
        ...(parsedContent.contact || {}),
      },
    }
  } catch (error) {
    console.error(
      'No se pudo cargar la configuración del sitio.',
      error,
    )

    return DEFAULT_SITE_CONTENT
  }
}

function loadServices() {
  try {
    const savedServices = localStorage.getItem(
      'plano-labs-services',
    )

    if (!savedServices) {
      return DEFAULT_SERVICES
    }

    const parsedServices = JSON.parse(savedServices)

    if (!Array.isArray(parsedServices)) {
      return DEFAULT_SERVICES
    }

    return parsedServices
  } catch (error) {
    console.error(
      'No se pudieron cargar los servicios.',
      error,
    )

    return DEFAULT_SERVICES
  }
}

function loadAboutPoints() {
  try {
    const savedAboutPoints = localStorage.getItem(
      'plano-labs-about-points',
    )

    if (!savedAboutPoints) {
      return DEFAULT_ABOUT_POINTS
    }

    const parsedAboutPoints = JSON.parse(
      savedAboutPoints,
    )

    if (!Array.isArray(parsedAboutPoints)) {
      return DEFAULT_ABOUT_POINTS
    }

    return parsedAboutPoints
  } catch (error) {
    console.error(
      'No se pudieron cargar los puntos de Nosotros.',
      error,
    )

    return DEFAULT_ABOUT_POINTS
  }
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
                  flex:
                    '0 0 auto',
                  width: '72px',
                  height: '54px',
                  padding: 0,
                  overflow: 'hidden',
                  border:
                    index ===
                    currentIndex
                      ? '2px solid #B8FF3D'
                      : '1px solid rgba(245,245,242,0.18)',
                  background:
                    '#0B0D10',
                  cursor:
                    'pointer',
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
          {currentIndex + 1} /{' '}
          {media.length}
        </p>
      )}
    </div>
  )
}

function DetailModal({
  item,
  type,
  onClose,
  contactEmail,
  whatsapp,
}) {
  if (!item) {
    return null
  }

  const features =
    typeof item.features ===
    'string'
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

  const whatsappLink = whatsapp
    ? `https://wa.me/${String(
        whatsapp,
      ).replace(/\D/g, '')}`
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
            position:
              'absolute',
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
                <p
                  className="section-label"
                >
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
                onClick={
                  onClose
                }
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

function EmailModal({
  email,
  onClose,
}) {
  const [form, setForm] =
    useState({
      name: '',
      clientEmail: '',
      message: '',
    })

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

  const handleSubmit = (
    event,
  ) => {
    event.preventDefault()

    const subject =
      encodeURIComponent(
        `Consulta desde PLANO LABS - ${form.name}`,
      )

    const body =
      encodeURIComponent(
        `Nombre: ${form.name}\nEmail: ${form.clientEmail}\n\nConsulta:\n${form.message}`,
      )

    window.location.href =
      `mailto:${email}?subject=${subject}&body=${body}`
  }

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
          consulta. Se abrirá tu
          aplicación de correo
          para enviar el mensaje.
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
            style={{
              display:
                'grid',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontSize:
                  '12px',
                textTransform:
                  'uppercase',
                letterSpacing:
                  '0.08em',
              }}
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
              placeholder="Tu nombre"
              style={{
                width:
                  '100%',
                padding:
                  '14px',
                border:
                  '1px solid rgba(245,245,242,0.18)',
                background:
                  '#0B0D10',
                color:
                  '#F5F5F2',
                outline:
                  'none',
              }}
            />
          </label>

          <label
            style={{
              display:
                'grid',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontSize:
                  '12px',
                textTransform:
                  'uppercase',
                letterSpacing:
                  '0.08em',
              }}
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
              placeholder="tu@email.com"
              style={{
                width:
                  '100%',
                padding:
                  '14px',
                border:
                  '1px solid rgba(245,245,242,0.18)',
                background:
                  '#0B0D10',
                color:
                  '#F5F5F2',
                outline:
                  'none',
              }}
            />
          </label>

          <label
            style={{
              display:
                'grid',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontSize:
                  '12px',
                textTransform:
                  'uppercase',
                letterSpacing:
                  '0.08em',
              }}
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
              placeholder="Contanos qué necesitás..."
              style={{
                width:
                  '100%',
                padding:
                  '14px',
                border:
                  '1px solid rgba(245,245,242,0.18)',
                background:
                  '#0B0D10',
                color:
                  '#F5F5F2',
                outline:
                  'none',
                resize:
                  'vertical',
              }}
            />
          </label>

          <button
            type="submit"
            className="contact-button contact-button-primary"
            style={{
              width:
                '100%',
              justifyContent:
                'center',
              border:
                'none',
              cursor:
                'pointer',
            }}
          >
            Enviar consulta
            <span>↗</span>
          </button>
        </form>
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
    useState(loadServices())

  const [aboutPoints, setAboutPoints] =
    useState(
      loadAboutPoints(),
    )

  const [siteContent, setSiteContent] =
    useState(
      loadSiteContent(),
    )

  const [selectedItem, setSelectedItem] =
    useState(null)

  const [selectedType, setSelectedType] =
    useState(null)

  const [showEmailModal, setShowEmailModal] =
    useState(false)

  // Controla si existe una entrada de historial
  // correspondiente al detalle actualmente abierto.
  const detailHistoryRef = useRef(false)

  const loadPublicData = () => {
    try {
      const savedCatalog =
        localStorage.getItem(
          'plano-labs-publications',
        )

      if (savedCatalog) {
        const publications =
          JSON.parse(
            savedCatalog,
          )

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
                Number(
                  a.order,
                ) -
                Number(
                  b.order,
                ),
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

        setCatalog(
          publishedPublications,
        )
      } else {
        setCatalog([])
      }

      const savedPortfolio =
        localStorage.getItem(
          'plano-labs-portfolio',
        )

      if (savedPortfolio) {
        const projects =
          JSON.parse(
            savedPortfolio,
          )

        const publishedProjects =
          projects
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
                Number(
                  a.order,
                ) -
                Number(
                  b.order,
                ),
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

        setPortfolio(
          publishedProjects,
        )
      } else {
        setPortfolio([])
      }

      setSiteContent(
        loadSiteContent(),
      )

      setServices(
        loadServices(),
      )

      setAboutPoints(
        loadAboutPoints(),
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

    window.addEventListener(
      'storage',
      loadPublicData,
    )

    return () => {
      window.removeEventListener(
        'storage',
        loadPublicData,
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

  /*
   * NUEVO:
   * Escuchamos el botón Atrás del navegador.
   *
   * Cuando el usuario tiene una ficha abierta,
   * la ficha ocupa una entrada del historial.
   * Al volver atrás, cerramos solamente la ficha
   * y dejamos al usuario en la sección donde estaba.
   */
  useEffect(() => {
    const handlePopState = () => {
      if (detailHistoryRef.current) {
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
    siteContent

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

  const whatsappLink =
    whatsappNumber
      ? `https://wa.me/${String(
          whatsappNumber,
        ).replace(
          /\D/g,
          '',
        )}`
      : '#contacto'

  /*
   * NUEVO:
   * Abrir una ficha también crea una entrada
   * en el historial del navegador.
   */
  const openDetail = (
    item,
    type,
  ) => {
    setSelectedItem(item)
    setSelectedType(type)

    document.body.style.overflow =
      'hidden'

    const detailHash = `${type}-${item.id}`

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

  /*
   * NUEVO:
   * Al cerrar mediante X, usamos history.back()
   * para que el historial quede limpio.
   *
   * Si el cierre viene del botón Atrás,
   * no hacemos otro history.back().
   */
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
      ''
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
          {content.home.title.includes(
            'toman forma.',
          ) ? (
            <>
              Donde las ideas
              <span>
                {' '}
                toman forma.
              </span>
            </>
          ) : (
            content.home.title
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
              {content.services.title.includes(
                ' con intención.',
              ) ? (
                <>
                  Soluciones digitales
                  <span>
                    {' '}
                    con intención.
                  </span>
                </>
              ) : (
                content.services.title
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
            {content.about.title.includes(
              ' su forma.',
            ) ? (
              <>
                Ideas que encuentran
                <span>
                  {' '}
                  su forma.
                </span>
              </>
            ) : (
              content.about.title
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
                  tabIndex="0"
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
                  tabIndex="0"
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
          email={
            contactEmail
          }
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