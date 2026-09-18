import { useEffect, useState } from 'react'
import './Admin.css'

function Admin() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const defaultSiteContent = {
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
      email: 'plano.labs.ideas@gmail.com',
    },
  }

  const defaultServices = [
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

  const defaultAboutPoints = [
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

  const [siteContent, setSiteContent] = useState(() => {
    try {
      const saved = localStorage.getItem(
        'plano-labs-site-content',
      )

      if (!saved) {
        return defaultSiteContent
      }

      const parsed = JSON.parse(saved)

      return {
        home: {
          ...defaultSiteContent.home,
          ...(parsed.home || {}),
        },
        services: {
          ...defaultSiteContent.services,
          ...(parsed.services || {}),
        },
        about: {
          ...defaultSiteContent.about,
          ...(parsed.about || {}),
        },
        contact: {
          ...defaultSiteContent.contact,
          ...(parsed.contact || {}),
        },
      }
    } catch (error) {
      console.error(
        'No se pudo cargar la configuración:',
        error,
      )

      return defaultSiteContent
    }
  })

  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(
        'plano-labs-services',
      )

      if (!saved) {
        return defaultServices
      }

      const parsed = JSON.parse(saved)

      if (!Array.isArray(parsed)) {
        return defaultServices
      }

      return parsed
    } catch (error) {
      console.error(
        'No se pudieron cargar los servicios:',
        error,
      )

      return defaultServices
    }
  })

  const [aboutPoints, setAboutPoints] = useState(() => {
    try {
      const saved = localStorage.getItem(
        'plano-labs-about-points',
      )

      if (!saved) {
        return defaultAboutPoints
      }

      const parsed = JSON.parse(saved)

      if (!Array.isArray(parsed)) {
        return defaultAboutPoints
      }

      return parsed
    } catch (error) {
      console.error(
        'No se pudieron cargar los puntos de Nosotros:',
        error,
      )

      return defaultAboutPoints
    }
  })

  /* =========================
     CATEGORÍAS
  ========================= */

  const defaultCategories = [
    {
      id: 1,
      name: 'Sitios Web',
      description:
        'Diseño y desarrollo de sitios web.',
    },
    {
      id: 2,
      name: 'Inteligencia Artificial',
      description:
        'Soluciones y automatizaciones con IA.',
    },
  ]

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(
        'plano-labs-categories',
      )

      if (!saved) {
        return defaultCategories
      }

      const parsed = JSON.parse(saved)

      if (!Array.isArray(parsed)) {
        return defaultCategories
      }

      return parsed
    } catch (error) {
      console.error(
        'No se pudieron cargar las categorías:',
        error,
      )

      return defaultCategories
    }
  })

  /* =========================
     PUBLICACIONES
  ========================= */

  const defaultPublications = [
    {
      id: 1,
      order: 1,
      type: 'Servicio',
      title: 'Diseño y desarrollo web',
      category: 'Sitios Web',
      images: [],
      coverImage: '',
      description:
        'Diseñamos y desarrollamos sitios web modernos, profesionales y adaptados a cada proyecto.',
      price: '',
      features:
        'Diseño personalizado\nResponsive\nOptimización\nPublicación',
      commercialInfo:
        'Consultá por disponibilidad y presupuesto personalizado.',
      published: true,
    },
    {
      id: 2,
      order: 2,
      type: 'Servicio',
      title: 'Automatizaciones con IA',
      category: 'Inteligencia Artificial',
      images: [],
      coverImage: '',
      description:
        'Creamos soluciones con inteligencia artificial para automatizar tareas y mejorar procesos.',
      price: '',
      features:
        'Análisis de necesidades\nAutomatización\nIntegración con herramientas\nSoporte',
      commercialInfo:
        'Consultá por una propuesta personalizada.',
      published: true,
    },
    {
      id: 3,
      order: 3,
      type: 'Servicio',
      title: 'Producción audiovisual',
      category: 'Sitios Web',
      images: [],
      coverImage: '',
      description:
        'Creamos piezas audiovisuales pensadas para comunicar marcas, productos y proyectos.',
      price: '',
      features:
        'Concepto creativo\nEdición\nMotion graphics\nEntrega digital',
      commercialInfo:
        'Consultá por formatos y presupuesto.',
      published: false,
    },
  ]

  const [publications, setPublications] = useState(() => {
    try {
      const saved = localStorage.getItem(
        'plano-labs-publications',
      )

      if (!saved) {
        return defaultPublications
      }

      const parsed = JSON.parse(saved)

      if (!Array.isArray(parsed)) {
        return defaultPublications
      }

      return parsed.map((publication, index) => {
        if (
          publication.image &&
          (!publication.images ||
            publication.images.length === 0)
        ) {
          return {
            ...publication,
            order:
              Number.isFinite(
                Number(publication.order),
              ) &&
              Number(publication.order) > 0
                ? Number(publication.order)
                : index + 1,
            images: [
              {
                id: `legacy-${publication.id}`,
                url: publication.image,
              },
            ],
            coverImage:
              publication.coverImage ||
              publication.image,
          }
        }

        return {
          ...publication,
          order:
            Number.isFinite(
              Number(publication.order),
            ) &&
            Number(publication.order) > 0
              ? Number(publication.order)
              : index + 1,
          images: Array.isArray(
            publication.images,
          )
            ? publication.images
            : [],
          coverImage:
            publication.coverImage || '',
        }
      })
    } catch {
      return defaultPublications
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(
        'plano-labs-publications',
        JSON.stringify(publications),
      )
    } catch (error) {
      console.error(
        'No se pudieron guardar las publicaciones:',
        error,
      )
    }
  }, [publications])

  /* =========================
     PORTFOLIO
  ========================= */

  const defaultPortfolio = [
    {
      id: 1,
      order: 1,
      title: 'Proyecto de muestra',
      category: 'Sitios Web',
      client: 'Cliente de ejemplo',
      link: '',
      shortDescription:
        'Sitio web desarrollado para presentar la propuesta digital del cliente.',
      description:
        'Descripción larga del proyecto realizado por PLANO LABS.',
      image: '',
      screenshots: [],
      published: true,
    },
    {
      id: 2,
      order: 2,
      title: 'Proyecto digital',
      category: 'Inteligencia Artificial',
      client: 'Cliente de ejemplo',
      link: '',
      shortDescription:
        'Solución digital desarrollada para resolver una necesidad concreta del proyecto.',
      description:
        'Descripción larga de la solución digital desarrollada para el proyecto.',
      image: '',
      screenshots: [],
      published: true,
    },
    {
      id: 3,
      order: 3,
      title: 'Nuevo proyecto',
      category: 'Sitios Web',
      client: '',
      link: '',
      shortDescription: '',
      description:
        'Descripción larga del proyecto.',
      image: '',
      screenshots: [],
      published: false,
    },
  ]

  const [portfolio, setPortfolio] = useState(() => {
    try {
      const saved = localStorage.getItem(
        'plano-labs-portfolio',
      )

      if (!saved) {
        return defaultPortfolio
      }

      const parsed = JSON.parse(saved)

      if (!Array.isArray(parsed)) {
        return defaultPortfolio
      }

      return parsed.map((project, index) => ({
        ...project,
        order:
          Number.isFinite(
            Number(project.order),
          ) &&
          Number(project.order) > 0
            ? Number(project.order)
            : index + 1,
        image: project.image || '',
        link: project.link || '',
        shortDescription:
          project.shortDescription ||
          '',
        description:
          project.description || '',
        screenshots: Array.isArray(
          project.screenshots,
        )
          ? project.screenshots
          : [],
      }))
    } catch {
      return defaultPortfolio
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(
        'plano-labs-portfolio',
        JSON.stringify(portfolio),
      )
    } catch (error) {
      console.error(
        'No se pudo guardar el portfolio:',
        error,
      )
    }
  }, [portfolio])

  /* =========================
     MENÚ
  ========================= */

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '⌂',
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      icon: '◈',
    },
    {
      id: 'categorias',
      label: 'Categorías',
      icon: '▦',
    },
    {
      id: 'publicaciones',
      label: 'Publicaciones',
      icon: '□',
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: '◫',
    },
  ]

  const sectionTitles = {
    dashboard: {
      eyebrow: 'PANEL PRINCIPAL',
      title: 'Dashboard',
      description:
        'Administrá y controlá el contenido de PLANO LABS.',
    },
    configuracion: {
      eyebrow: 'CONTENIDO DEL SITIO',
      title: 'Configuración',
      description:
        'Editá las diferentes secciones del sitio público.',
    },
    categorias: {
      eyebrow: 'CATÁLOGO',
      title: 'Categorías',
      description:
        'Creá y administrá las categorías de tus publicaciones.',
    },
    publicaciones: {
      eyebrow: 'CATÁLOGO',
      title: 'Publicaciones',
      description:
        'Gestioná productos y servicios del catálogo.',
    },
    portfolio: {
      eyebrow: 'PROYECTOS',
      title: 'Portfolio',
      description:
        'Administrá los proyectos que aparecen en el sitio.',
    },
  }

  const currentSection = sectionTitles[activeSection]

  /* =========================
     CONTENIDO
  ========================= */

  const updateContent = (
    section,
    field,
    value,
  ) => {
    setSiteContent((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }))
  }

  /* =========================
     GUARDAR CONFIGURACIÓN
  ========================= */

  const saveSiteContent = () => {
    try {
      localStorage.setItem(
        'plano-labs-site-content',
        JSON.stringify(siteContent),
      )

      localStorage.setItem(
        'plano-labs-services',
        JSON.stringify(services),
      )

      localStorage.setItem(
        'plano-labs-about-points',
        JSON.stringify(aboutPoints),
      )

      alert(
        'Cambios guardados correctamente.',
      )
    } catch (error) {
      console.error(
        'No se pudo guardar la configuración:',
        error,
      )

      alert(
        'No se pudieron guardar los cambios.',
      )
    }
  }

  /* =========================
     GUARDAR CATEGORÍAS
  ========================= */

  const saveCategories = () => {
    try {
      localStorage.setItem(
        'plano-labs-categories',
        JSON.stringify(categories),
      )

      alert(
        'Categorías guardadas correctamente.',
      )
    } catch (error) {
      console.error(
        'No se pudieron guardar las categorías:',
        error,
      )

      alert(
        'No se pudieron guardar las categorías.',
      )
    }
  }

  /* =========================
     SERVICIOS
  ========================= */

  const updateService = (
    id,
    field,
    value,
  ) => {
    setServices((current) =>
      current.map((service) =>
        service.id === id
          ? {
              ...service,
              [field]: value,
            }
          : service,
      ),
    )
  }

  const addService = () => {
    setServices((current) => {
      const nextNumber = String(
        current.length + 1,
      ).padStart(2, '0')

      return [
        ...current,
        {
          id: Date.now(),
          number: nextNumber,
          title: 'NUEVO SERVICIO',
          description:
            'Descripción del nuevo servicio.',
        },
      ]
    })
  }

  const deleteService = (id) => {
    setServices((current) => {
      const filtered = current.filter(
        (service) => service.id !== id,
      )

      return filtered.map(
        (service, index) => ({
          ...service,
          number: String(
            index + 1,
          ).padStart(2, '0'),
        }),
      )
    })
  }

  /* =========================
     NOSOTROS
  ========================= */

  const updateAboutPoint = (
    id,
    field,
    value,
  ) => {
    setAboutPoints((current) =>
      current.map((point) =>
        point.id === id
          ? {
              ...point,
              [field]: value,
            }
          : point,
      ),
    )
  }

  const addAboutPoint = () => {
    setAboutPoints((current) => {
      const nextNumber = String(
        current.length + 1,
      ).padStart(2, '0')

      return [
        ...current,
        {
          id: Date.now(),
          number: nextNumber,
          title: 'NUEVO PUNTO',
          description:
            'Descripción del nuevo punto.',
        },
      ]
    })
  }

  const deleteAboutPoint = (id) => {
    setAboutPoints((current) => {
      const filtered = current.filter(
        (point) => point.id !== id,
      )

      return filtered.map(
        (point, index) => ({
          ...point,
          number: String(
            index + 1,
          ).padStart(2, '0'),
        }),
      )
    })
  }

  /* =========================
     CATEGORÍAS
  ========================= */

  const addCategory = () => {
    setCategories((current) => [
      ...current,
      {
        id: Date.now(),
        name: 'Nueva categoría',
        description:
          'Descripción de la categoría.',
      },
    ])
  }

  const updateCategory = (
    id,
    field,
    value,
  ) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === id
          ? {
              ...category,
              [field]: value,
            }
          : category,
      ),
    )
  }

  const deleteCategory = (id) => {
    setCategories((current) =>
      current.filter(
        (category) =>
          category.id !== id,
      ),
    )
  }

  /* =========================
     PUBLICACIONES
  ========================= */

  const addPublication = () => {
    setPublications((current) => {
      const highestOrder = current.reduce(
        (max, publication) => {
          const order = Number(
            publication.order,
          )

          return Number.isFinite(order) &&
            order > max
            ? order
            : max
        },
        0,
      )

      return [
        ...current,
        {
          id: Date.now(),
          order: highestOrder + 1,
          type: 'Servicio',
          title: 'Nueva publicación',
          category:
            categories[0]?.name || '',
          images: [],
          coverImage: '',
          description:
            'Descripción de la publicación.',
          price: '',
          features:
            'Característica 1\nCaracterística 2',
          commercialInfo:
            'Información comercial.',
          published: false,
        },
      ]
    })
  }

  const updatePublication = (
    id,
    field,
    value,
  ) => {
    setPublications((current) =>
      current.map((publication) =>
        publication.id === id
          ? {
              ...publication,
              [field]:
                field === 'order'
                  ? Math.max(
                      1,
                      Number(value) || 1,
                    )
                  : value,
            }
          : publication,
      ),
    )
  }

  const deletePublication = (id) => {
    setPublications((current) =>
      current.filter(
        (publication) =>
          publication.id !== id,
      ),
    )
  }

  /* =========================
     PROCESADOR DE IMÁGENES
  ========================= */

  const optimizeImage = (
    file,
    maxWidth = 1400,
    quality = 0.72,
  ) =>
    new Promise((resolve, reject) => {
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
      ]

      if (!allowedTypes.includes(file.type)) {
        reject(
          new Error(
            'Formato no compatible',
          ),
        )
        return
      }

      const reader = new FileReader()

      reader.onload = () => {
        const image =
          new Image()

        image.onload = () => {
          let width = image.width
          let height = image.height

          if (width > maxWidth) {
            const ratio =
              maxWidth / width

            width = maxWidth
            height = Math.round(
              height * ratio,
            )
          }

          const canvas =
            document.createElement(
              'canvas',
            )

          canvas.width = width
          canvas.height = height

          const context =
            canvas.getContext(
              '2d',
            )

          if (!context) {
            reject(
              new Error(
                'No se pudo procesar la imagen',
              ),
            )
            return
          }

          context.drawImage(
            image,
            0,
            0,
            width,
            height,
          )

          const result =
            canvas.toDataURL(
              'image/jpeg',
              quality,
            )

          resolve(result)
        }

        image.onerror = () => {
          reject(
            new Error(
              'No se pudo leer la imagen',
            ),
          )
        }

        image.src =
          reader.result
      }

      reader.onerror = () => {
        reject(
          new Error(
            'No se pudo leer el archivo',
          ),
        )
      }

      reader.readAsDataURL(file)
    })

  /* =========================
     IMÁGENES PUBLICACIONES
  ========================= */

  const handlePublicationImages = async (
    id,
    event,
  ) => {
    const files = Array.from(
      event.target.files || [],
    )

    if (!files.length) {
      return
    }

    const validFiles =
      files.filter((file) =>
        [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
        ].includes(file.type),
      )

    if (!validFiles.length) {
      alert(
        'Formato no compatible. Usá JPG, JPEG, PNG o WebP.',
      )

      event.target.value = ''
      return
    }

    const newImages = []

    for (const file of validFiles) {
      try {
        const optimized =
          await optimizeImage(
            file,
            1400,
            0.72,
          )

        newImages.push({
          id: `${Date.now()}-${Math.random()}`,
          url: optimized,
        })
      } catch (error) {
        console.error(
          `No se pudo procesar ${file.name}:`,
          error,
        )
      }
    }

    if (!newImages.length) {
      alert(
        'No se pudo procesar ninguna imagen.',
      )

      event.target.value = ''
      return
    }

    setPublications((current) =>
      current.map((publication) => {
        if (publication.id !== id) {
          return publication
        }

        const currentImages =
          Array.isArray(
            publication.images,
          )
            ? publication.images
            : []

        const updatedImages = [
          ...currentImages,
          ...newImages,
        ]

        return {
          ...publication,
          images: updatedImages,
          coverImage:
            publication.coverImage ||
            newImages[0]?.url ||
            '',
        }
      }),
    )

    event.target.value = ''
  }

  const removePublicationImage = (
    publicationId,
    imageId,
  ) => {
    setPublications((current) =>
      current.map((publication) => {
        if (
          publication.id !==
          publicationId
        ) {
          return publication
        }

        const imageToRemove =
          publication.images.find(
            (image) =>
              image.id === imageId,
          )

        const remainingImages =
          publication.images.filter(
            (image) =>
              image.id !== imageId,
          )

        let newCover =
          publication.coverImage

        if (
          imageToRemove &&
          imageToRemove.url ===
            publication.coverImage
        ) {
          newCover =
            remainingImages.length > 0
              ? remainingImages[0].url
              : ''
        }

        return {
          ...publication,
          images: remainingImages,
          coverImage: newCover,
        }
      }),
    )
  }

  const setPublicationCover = (
    publicationId,
    imageUrl,
  ) => {
    updatePublication(
      publicationId,
      'coverImage',
      imageUrl,
    )
  }

  const savePublications = () => {
    try {
      localStorage.setItem(
        'plano-labs-publications',
        JSON.stringify(
          publications,
        ),
      )

      alert(
        'Publicaciones guardadas correctamente.',
      )
    } catch (error) {
      console.error(
        'Error al guardar publicaciones:',
        error,
      )

      alert(
        'No se pudieron guardar las publicaciones. Alguna imagen puede seguir siendo demasiado pesada.',
      )
    }
  }

  const togglePublication = (id) => {
    setPublications((current) =>
      current.map((publication) =>
        publication.id === id
          ? {
              ...publication,
              published:
                !publication.published,
            }
          : publication,
      ),
    )
  }

  /* =========================
     PORTFOLIO
  ========================= */

  const addPortfolioProject = () => {
    setPortfolio((current) => {
      const highestOrder = current.reduce(
        (max, project) => {
          const order = Number(
            project.order,
          )

          return Number.isFinite(order) &&
            order > max
            ? order
            : max
        },
        0,
      )

      return [
        ...current,
        {
          id: Date.now(),
          order: highestOrder + 1,
          title: 'Nuevo proyecto',
          category:
            categories[0]?.name || '',
          client: '',
          link: '',
          shortDescription: '',
          description:
            'Descripción larga del proyecto.',
          image: '',
          screenshots: [],
          published: false,
        },
      ]
    })
  }

  const updatePortfolioProject = (
    id,
    field,
    value,
  ) => {
    setPortfolio((current) =>
      current.map((project) =>
        project.id === id
          ? {
              ...project,
              [field]:
                field === 'order'
                  ? Math.max(
                      1,
                      Number(value) || 1,
                    )
                  : value,
            }
          : project,
      ),
    )
  }

  const deletePortfolioProject = (
    id,
  ) => {
    setPortfolio((current) =>
      current.filter(
        (project) =>
          project.id !== id,
      ),
    )
  }

  const handlePortfolioImages =
    async (id, event) => {
      const files = Array.from(
        event.target.files || [],
      )

      if (!files.length) {
        return
      }

      const validFiles =
        files.filter((file) =>
          [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
          ].includes(file.type),
        )

      if (!validFiles.length) {
        alert(
          'Formato no compatible. Usá JPG, JPEG, PNG o WebP.',
        )

        event.target.value = ''
        return
      }

      const newImages = []

      for (const file of validFiles) {
        try {
          const optimized =
            await optimizeImage(
              file,
              1400,
              0.72,
            )

          newImages.push(
            optimized,
          )
        } catch (error) {
          console.error(
            `No se pudo procesar ${file.name}:`,
            error,
          )
        }
      }

      if (!newImages.length) {
        alert(
          'No se pudo procesar ninguna imagen.',
        )

        event.target.value = ''
        return
      }

      setPortfolio((current) =>
        current.map((project) => {
          if (project.id !== id) {
            return project
          }

          const currentScreenshots =
            Array.isArray(
              project.screenshots,
            )
              ? project.screenshots
              : []

          if (!project.image) {
            return {
              ...project,
              image:
                newImages[0] || '',
              screenshots: [
                ...currentScreenshots,
                ...newImages.slice(1),
              ],
            }
          }

          return {
            ...project,
            screenshots: [
              ...currentScreenshots,
              ...newImages,
            ],
          }
        }),
      )

      event.target.value = ''
    }

  const setPortfolioCover = (
    projectId,
    imageUrl,
  ) => {
    setPortfolio((current) =>
      current.map((project) => {
        if (
          project.id !== projectId
        ) {
          return project
        }

        if (
          project.image ===
          imageUrl
        ) {
          return project
        }

        const screenshots =
          Array.isArray(
            project.screenshots,
          )
            ? project.screenshots
            : []

        const newScreenshots =
          screenshots.filter(
            (image) =>
              image !== imageUrl,
          )

        if (
          project.image &&
          project.image !==
            imageUrl
        ) {
          newScreenshots.unshift(
            project.image,
          )
        }

        return {
          ...project,
          image: imageUrl,
          screenshots:
            newScreenshots,
        }
      }),
    )
  }

  const removePortfolioImage = (
    projectId,
    imageUrl,
  ) => {
    setPortfolio((current) =>
      current.map((project) => {
        if (
          project.id !==
          projectId
        ) {
          return project
        }

        const screenshots =
          Array.isArray(
            project.screenshots,
          )
            ? project.screenshots
            : []

        if (
          project.image ===
          imageUrl
        ) {
          if (
            screenshots.length > 0
          ) {
            return {
              ...project,
              image:
                screenshots[0],
              screenshots:
                screenshots.slice(1),
            }
          }

          return {
            ...project,
            image: '',
            screenshots: [],
          }
        }

        return {
          ...project,
          screenshots:
            screenshots.filter(
              (image) =>
                image !== imageUrl,
            ),
        }
      }),
    )
  }

  const togglePortfolioProject = (
    id,
  ) => {
    setPortfolio((current) =>
      current.map((project) =>
        project.id === id
          ? {
              ...project,
              published:
                !project.published,
            }
          : project,
      ),
    )
  }

  const savePortfolio = () => {
    try {
      localStorage.setItem(
        'plano-labs-portfolio',
        JSON.stringify(portfolio),
      )

      alert(
        'Portfolio guardado correctamente.',
      )
    } catch (error) {
      console.error(
        'Error al guardar portfolio:',
        error,
      )

      alert(
        'No se pudo guardar el portfolio. Alguna imagen puede seguir siendo demasiado pesada.',
      )
    }
  }

  /* =========================
     CAMPOS
  ========================= */

  const renderField = (
    label,
    value,
    onChange,
    textarea = false,
  ) => (
    <label className="admin-field">
      <span>{label}</span>

      {textarea ? (
        <textarea
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
        />
      ) : (
        <input
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
        />
      )}
    </label>
  )

  return (
    <main className="admin-layout">

      <aside className="admin-sidebar">

        <div className="admin-brand">
          <div className="admin-brand-mark">
            <span></span>
            <span></span>
          </div>

          <div>
            <strong>PLANO LABS</strong>
            <small>ADMIN</small>
          </div>
        </div>

        <div className="admin-sidebar-label">
          ADMINISTRACIÓN
        </div>

        <nav className="admin-menu">

          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`admin-menu-item ${
                activeSection ===
                item.id
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                setActiveSection(
                  item.id,
                )
              }
            >
              <span className="admin-menu-icon">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>

              {activeSection ===
                item.id && (
                <span className="admin-menu-active"></span>
              )}
            </button>
          ))}

        </nav>

        <div className="admin-sidebar-bottom">

          <a
            href="/"
            className="admin-sidebar-link"
          >
            <span>↗</span>
            Ver sitio
          </a>

          <a
            href="/admin"
            className="admin-sidebar-link admin-logout"
          >
            <span>←</span>
            Cerrar sesión
          </a>

        </div>

      </aside>

      <section className="admin-main">

        <header className="admin-topbar">

          <div className="admin-topbar-left">
            <span className="admin-status-dot"></span>
            <span>
              SISTEMA LOCAL
            </span>
          </div>

          <div className="admin-topbar-right">

            <span>PLANO LABS</span>

            <div className="admin-user">

              <div className="admin-user-avatar">
                PL
              </div>

              <div>
                <strong>
                  Administrador
                </strong>

                <small>
                  Cuenta principal
                </small>
              </div>

            </div>

          </div>

        </header>

        <div className="admin-content">

          <div className="admin-page-header">

            <div>

              <span className="admin-eyebrow">
                {
                  currentSection.eyebrow
                }
              </span>

              <h1>
                {
                  currentSection.title
                }
              </h1>

              <p>
                {
                  currentSection.description
                }
              </p>

            </div>

            <div className="admin-header-decoration">
              <span></span>
              <span></span>
            </div>

          </div>

          {/* =========================
              DASHBOARD
          ========================= */}

          {activeSection ===
            'dashboard' && (
            <div className="admin-dashboard">

              <div className="admin-stat-grid">

                <article className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span>
                      PUBLICACIONES
                    </span>

                    <strong>01</strong>
                  </div>

                  <div className="admin-stat-number">
                    {
                      publications.length
                    }
                  </div>

                  <p>
                    Productos y servicios
                  </p>
                </article>

                <article className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span>
                      CATEGORÍAS
                    </span>

                    <strong>02</strong>
                  </div>

                  <div className="admin-stat-number">
                    {
                      categories.length
                    }
                  </div>

                  <p>
                    Categorías creadas
                  </p>
                </article>

                <article className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span>
                      PORTFOLIO
                    </span>

                    <strong>03</strong>
                  </div>

                  <div className="admin-stat-number">
                    {portfolio.length}
                  </div>

                  <p>
                    Proyectos publicados
                  </p>
                </article>

                <article className="admin-stat-card admin-stat-accent">
                  <div className="admin-stat-top">
                    <span>
                      SITIO
                    </span>

                    <strong>04</strong>
                  </div>

                  <div className="admin-stat-status">
                    <span></span>
                    ACTIVO
                  </div>

                  <p>
                    Sitio funcionando correctamente
                  </p>
                </article>

              </div>

              <div className="admin-dashboard-grid">

                <section className="admin-panel">

                  <div className="admin-panel-header">
                    <div>
                      <span>
                        ACCESOS RÁPIDOS
                      </span>

                      <h2>
                        Gestionar contenido
                      </h2>
                    </div>
                  </div>

                  <div className="admin-quick-grid">

                    <button
                      onClick={() =>
                        setActiveSection(
                          'configuracion',
                        )
                      }
                    >
                      <span>◈</span>

                      <strong>
                        Configuración
                      </strong>

                      <small>
                        Editar contenido del sitio
                      </small>

                      <b>↗</b>
                    </button>

                    <button
                      onClick={() =>
                        setActiveSection(
                          'publicaciones',
                        )
                      }
                    >
                      <span>□</span>

                      <strong>
                        Publicaciones
                      </strong>

                      <small>
                        Productos y servicios
                      </small>

                      <b>↗</b>
                    </button>

                    <button
                      onClick={() =>
                        setActiveSection(
                          'categorias',
                        )
                      }
                    >
                      <span>▦</span>

                      <strong>
                        Categorías
                      </strong>

                      <small>
                        Organizar catálogo
                      </small>

                      <b>↗</b>
                    </button>

                    <button
                      onClick={() =>
                        setActiveSection(
                          'portfolio',
                        )
                      }
                    >
                      <span>◫</span>

                      <strong>
                        Portfolio
                      </strong>

                      <small>
                        Administrar proyectos
                      </small>

                      <b>↗</b>
                    </button>

                  </div>

                </section>

                <section className="admin-panel admin-system-panel">

                  <div className="admin-panel-header">
                    <div>
                      <span>
                        ESTADO
                      </span>

                      <h2>
                        Sistema
                      </h2>
                    </div>
                  </div>

                  <div className="admin-system-list">

                    <div>
                      <span>
                        <i></i>
                        Sitio público
                      </span>

                      <strong>
                        ACTIVO
                      </strong>
                    </div>

                    <div>
                      <span>
                        <i></i>
                        Administrador
                      </span>

                      <strong>
                        LOCAL
                      </strong>
                    </div>

                    <div>
                      <span>
                        <i></i>
                        Base de datos
                      </span>

                      <strong>
                        PENDIENTE
                      </strong>
                    </div>

                    <div>
                      <span>
                        <i></i>
                        Storage
                      </span>

                      <strong>
                        PENDIENTE
                      </strong>
                    </div>

                  </div>

                  <div className="admin-system-note">
                    La conexión con Supabase se configurará
                    en la siguiente etapa.
                  </div>

                </section>

              </div>

            </div>
          )}

          {/* =========================
              CONFIGURACIÓN
          ========================= */}

          {activeSection ===
            'configuracion' && (
            <div className="admin-settings">

              <section className="admin-editor-card">

                <div className="admin-editor-header">

                  <div>
                    <span>
                      01 / INICIO
                    </span>

                    <h2>
                      Página principal
                    </h2>
                  </div>

                  <span className="admin-editor-number">
                    01
                  </span>

                </div>

                <div className="admin-form-grid">

                  {renderField(
                    'Etiqueta superior',
                    siteContent.home.eyebrow,
                    (value) =>
                      updateContent(
                        'home',
                        'eyebrow',
                        value,
                      ),
                  )}

                  {renderField(
                    'Título principal',
                    siteContent.home.title,
                    (value) =>
                      updateContent(
                        'home',
                        'title',
                        value,
                      ),
                  )}

                  <div className="admin-field-full">
                    {renderField(
                      'Descripción',
                      siteContent.home
                        .description,
                      (value) =>
                        updateContent(
                          'home',
                          'description',
                          value,
                        ),
                      true,
                    )}
                  </div>

                  {renderField(
                    'Texto del botón',
                    siteContent.home.button,
                    (value) =>
                      updateContent(
                        'home',
                        'button',
                        value,
                      ),
                  )}

                </div>

              </section>

              <section className="admin-editor-card">

                <div className="admin-editor-header">

                  <div>
                    <span>
                      02 / SERVICIOS
                    </span>

                    <h2>
                      Sección de servicios
                    </h2>
                  </div>

                  <button
                    className="admin-add-button"
                    onClick={addService}
                  >
                    + Agregar servicio
                  </button>

                </div>

                <div className="admin-form-grid">

                  {renderField(
                    'Etiqueta',
                    siteContent.services
                      .eyebrow,
                    (value) =>
                      updateContent(
                        'services',
                        'eyebrow',
                        value,
                      ),
                  )}

                  {renderField(
                    'Título',
                    siteContent.services
                      .title,
                    (value) =>
                      updateContent(
                        'services',
                        'title',
                        value,
                      ),
                  )}

                  <div className="admin-field-full">
                    {renderField(
                      'Descripción general',
                      siteContent.services
                        .description,
                      (value) =>
                        updateContent(
                          'services',
                          'description',
                          value,
                        ),
                      true,
                    )}
                  </div>

                </div>

                <div className="admin-items-list">

                  {services.map(
                    (service) => (
                      <article
                        className="admin-item-card"
                        key={service.id}
                      >

                        <div className="admin-item-number">
                          {
                            service.number
                          }
                        </div>

                        <div className="admin-item-fields">

                          {renderField(
                            'Título',
                            service.title,
                            (value) =>
                              updateService(
                                service.id,
                                'title',
                                value,
                              ),
                          )}

                          {renderField(
                            'Descripción',
                            service.description,
                            (value) =>
                              updateService(
                                service.id,
                                'description',
                                value,
                              ),
                            true,
                          )}

                        </div>

                        <button
                          className="admin-delete-button"
                          onClick={() =>
                            deleteService(
                              service.id,
                            )
                          }
                        >
                          Eliminar
                        </button>

                      </article>
                    ),
                  )}

                </div>

              </section>

              <section className="admin-editor-card">

                <div className="admin-editor-header">

                  <div>
                    <span>
                      03 / NOSOTROS
                    </span>

                    <h2>
                      Información de la empresa
                    </h2>
                  </div>

                  <button
                    className="admin-add-button"
                    onClick={
                      addAboutPoint
                    }
                  >
                    + Agregar punto
                  </button>

                </div>

                <div className="admin-form-grid">

                  {renderField(
                    'Etiqueta',
                    siteContent.about
                      .eyebrow,
                    (value) =>
                      updateContent(
                        'about',
                        'eyebrow',
                        value,
                      ),
                  )}

                  {renderField(
                    'Título',
                    siteContent.about
                      .title,
                    (value) =>
                      updateContent(
                        'about',
                        'title',
                        value,
                      ),
                  )}

                  <div className="admin-field-full">
                    {renderField(
                      'Texto principal',
                      siteContent.about
                        .lead,
                      (value) =>
                        updateContent(
                          'about',
                          'lead',
                          value,
                        ),
                      true,
                    )}
                  </div>

                  <div className="admin-field-full">
                    {renderField(
                      'Descripción',
                      siteContent.about
                        .description,
                      (value) =>
                        updateContent(
                          'about',
                          'description',
                          value,
                        ),
                      true,
                    )}
                  </div>

                </div>

                <div className="admin-items-list">

                  {aboutPoints.map(
                    (point) => (
                      <article
                        className="admin-item-card"
                        key={point.id}
                      >

                        <div className="admin-item-number">
                          {
                            point.number
                          }
                        </div>

                        <div className="admin-item-fields">

                          {renderField(
                            'Título',
                            point.title,
                            (value) =>
                              updateAboutPoint(
                                point.id,
                                'title',
                                value,
                              ),
                          )}

                          {renderField(
                            'Descripción',
                            point.description,
                            (value) =>
                              updateAboutPoint(
                                point.id,
                                'description',
                                value,
                              ),
                            true,
                          )}

                        </div>

                        <button
                          className="admin-delete-button"
                          onClick={() =>
                            deleteAboutPoint(
                              point.id,
                            )
                          }
                        >
                          Eliminar
                        </button>

                      </article>
                    ),
                  )}

                </div>

              </section>

              <section className="admin-editor-card">

                <div className="admin-editor-header">

                  <div>
                    <span>
                      04 / CONTACTO
                    </span>

                    <h2>
                      Información de contacto
                    </h2>
                  </div>

                </div>

                <div className="admin-form-grid">

                  {renderField(
                    'Etiqueta',
                    siteContent.contact
                      .eyebrow,
                    (value) =>
                      updateContent(
                        'contact',
                        'eyebrow',
                        value,
                      ),
                  )}

                  {renderField(
                    'Título',
                    siteContent.contact
                      .title,
                    (value) =>
                      updateContent(
                        'contact',
                        'title',
                        value,
                      ),
                  )}

                  <div className="admin-field-full">
                    {renderField(
                      'Descripción',
                      siteContent.contact
                        .description,
                      (value) =>
                        updateContent(
                          'contact',
                          'description',
                          value,
                        ),
                      true,
                    )}
                  </div>

                  {renderField(
                    'WhatsApp',
                    siteContent.contact
                      .whatsapp,
                    (value) =>
                      updateContent(
                        'contact',
                        'whatsapp',
                        value,
                      ),
                  )}

                  {renderField(
                    'LinkedIn',
                    siteContent.contact
                      .linkedin,
                    (value) =>
                      updateContent(
                        'contact',
                        'linkedin',
                        value,
                      ),
                  )}

                </div>

              </section>

              <div className="admin-save-bar">
                <span>
                  Los cambios están almacenados localmente por ahora.
                </span>

                <button
                  className="admin-save-button"
                  onClick={saveSiteContent}
                >
                  Guardar cambios
                  <span>↗</span>
                </button>
              </div>

            </div>
          )}

          {/* =========================
              CATEGORÍAS
          ========================= */}

          {activeSection ===
            'categorias' && (
            <div className="admin-settings">

              <section className="admin-editor-card">

                <div className="admin-editor-header">

                  <div>
                    <span>
                      01 / CATEGORÍAS
                    </span>

                    <h2>
                      Gestionar categorías
                    </h2>
                  </div>

                  <button
                    className="admin-add-button"
                    onClick={addCategory}
                  >
                    + Nueva categoría
                  </button>

                </div>

                <div className="admin-form-grid">

                  <div className="admin-field-full">
                    <p>
                      Creá todas las categorías que necesites.
                      Más adelante podremos utilizarlas para
                      clasificar automáticamente productos,
                      servicios y proyectos.
                    </p>
                  </div>

                </div>

                <div className="admin-items-list">

                  {categories.map(
                    (
                      category,
                      index,
                    ) => (
                      <article
                        className="admin-item-card"
                        key={category.id}
                      >

                        <div className="admin-item-number">
                          {String(
                            index + 1,
                          ).padStart(
                            2,
                            '0',
                          )}
                        </div>

                        <div className="admin-item-fields">

                          {renderField(
                            'Nombre de categoría',
                            category.name,
                            (value) =>
                              updateCategory(
                                category.id,
                                'name',
                                value,
                              ),
                          )}

                          {renderField(
                            'Descripción',
                            category.description,
                            (value) =>
                              updateCategory(
                                category.id,
                                'description',
                                value,
                              ),
                            true,
                          )}

                        </div>

                        <button
                          className="admin-delete-button"
                          onClick={() =>
                            deleteCategory(
                              category.id,
                            )
                          }
                        >
                          Eliminar
                        </button>

                      </article>
                    ),
                  )}

                </div>

              </section>

              <div className="admin-save-bar">
                <span>
                  Las categorías se almacenan localmente por ahora.
                </span>

                <button
                  className="admin-save-button"
                  onClick={saveCategories}
                >
                  Guardar categorías
                  <span>↗</span>
                </button>
              </div>

            </div>
          )}

          {/* =========================
              PUBLICACIONES
          ========================= */}

          {activeSection ===
            'publicaciones' && (
            <div className="admin-settings">

              <section className="admin-editor-card">

                <div className="admin-editor-header">

                  <div>
                    <span>
                      01 / PUBLICACIONES
                    </span>

                    <h2>
                      Productos y servicios
                    </h2>
                  </div>

                  <button
                    className="admin-add-button"
                    onClick={
                      addPublication
                    }
                  >
                    + Nueva publicación
                  </button>

                </div>

                <div className="admin-form-grid">

                  <div className="admin-field-full">
                    <p>
                      Creá fichas comerciales completas para
                      productos y servicios. Las publicaciones
                      podrán mostrarse u ocultarse del catálogo.
                    </p>
                  </div>

                </div>

                <div className="admin-items-list">

                  {publications.map(
                    (
                      publication,
                      index,
                    ) => (
                      <article
                        className="admin-item-card"
                        key={
                          publication.id
                        }
                      >

                        <div className="admin-item-number">
                          {String(
                            index + 1,
                          ).padStart(
                            2,
                            '0',
                          )}
                        </div>

                        <div className="admin-item-fields">

                          <div className="admin-form-grid">

                            {renderField(
                              'Título',
                              publication.title,
                              (value) =>
                                updatePublication(
                                  publication.id,
                                  'title',
                                  value,
                                ),
                            )}

                            <label className="admin-field">
                              <span>
                                Orden
                              </span>

                              <input
                                type="number"
                                min="1"
                                step="1"
                                value={
                                  publication.order
                                }
                                onChange={(
                                  event,
                                ) =>
                                  updatePublication(
                                    publication.id,
                                    'order',
                                    event
                                      .target
                                      .value,
                                  )
                                }
                              />
                            </label>

                            <label className="admin-field">
                              <span>
                                Tipo
                              </span>

                              <select
                                value={
                                  publication.type
                                }
                                onChange={(
                                  event,
                                ) =>
                                  updatePublication(
                                    publication.id,
                                    'type',
                                    event
                                      .target
                                      .value,
                                  )
                                }
                              >
                                <option value="Producto">
                                  Producto
                                </option>

                                <option value="Servicio">
                                  Servicio
                                </option>
                              </select>
                            </label>

                            <label className="admin-field">
                              <span>
                                Categoría
                              </span>

                              <select
                                value={
                                  publication.category
                                }
                                onChange={(
                                  event,
                                ) =>
                                  updatePublication(
                                    publication.id,
                                    'category',
                                    event
                                      .target
                                      .value,
                                  )
                                }
                              >
                                <option value="">
                                  Seleccionar categoría
                                </option>

                                {categories.map(
                                  (
                                    category,
                                  ) => (
                                    <option
                                      key={
                                        category.id
                                      }
                                      value={
                                        category.name
                                      }
                                    >
                                      {
                                        category.name
                                      }
                                    </option>
                                  ),
                                )}
                              </select>
                            </label>

                            {renderField(
                              'Precio',
                              publication.price,
                              (value) =>
                                updatePublication(
                                  publication.id,
                                  'price',
                                  value,
                                ),
                            )}

                            <div className="admin-field-full">

                              <label className="admin-field">
                                <span>
                                  Imágenes
                                </span>

                                <input
                                  type="file"
                                  accept="image/jpeg,image/jpg,image/png,image/webp"
                                  multiple
                                  onChange={(
                                    event,
                                  ) =>
                                    handlePublicationImages(
                                      publication.id,
                                      event,
                                    )
                                  }
                                />
                              </label>

                              <p
                                style={{
                                  marginTop:
                                    '8px',
                                  fontSize:
                                    '13px',
                                }}
                              >
                                JPG, JPEG, PNG o WebP.
                                Podés seleccionar
                                varias imágenes
                                desde tu PC.
                                Las imágenes se
                                optimizan
                                automáticamente.
                              </p>

                              {publication.images &&
                                publication.images
                                  .length >
                                  0 && (
                                  <div
                                    style={{
                                      display:
                                        'grid',
                                      gridTemplateColumns:
                                        'repeat(auto-fit, minmax(140px, 1fr))',
                                      gap:
                                        '14px',
                                      marginTop:
                                        '18px',
                                      width:
                                        '100%',
                                    }}
                                  >

                                    {publication.images.map(
                                      (
                                        image,
                                      ) => {
                                        const isCover =
                                          image.url ===
                                          publication.coverImage

                                        return (
                                          <div
                                            key={
                                              image.id
                                            }
                                            style={{
                                              position:
                                                'relative',
                                              width:
                                                '100%',
                                              minWidth:
                                                0,
                                              border:
                                                isCover
                                                  ? '2px solid #B8FF3D'
                                                  : '1px solid rgba(245,245,242,0.12)',
                                              padding:
                                                '4px',
                                              background:
                                                '#0B0D10',
                                            }}
                                          >

                                            <button
                                              type="button"
                                              onClick={() =>
                                                setPublicationCover(
                                                  publication.id,
                                                  image.url,
                                                )
                                              }
                                              style={{
                                                display:
                                                  'block',
                                                width:
                                                  '100%',
                                                height:
                                                  '130px',
                                                padding:
                                                  0,
                                                border:
                                                  'none',
                                                cursor:
                                                  'pointer',
                                                background:
                                                  '#0B0D10',
                                              }}
                                            >
                                              <img
                                                src={
                                                  image.url
                                                }
                                                alt={
                                                  publication.title
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
                                            </button>

                                            <div
                                              style={{
                                                display:
                                                  'flex',
                                                alignItems:
                                                  'center',
                                                justifyContent:
                                                  'space-between',
                                                flexWrap:
                                                  'wrap',
                                                gap:
                                                  '8px',
                                                marginTop:
                                                  '6px',
                                              }}
                                            >

                                              <small
                                                style={{
                                                  color:
                                                    isCover
                                                      ? '#B8FF3D'
                                                      : '#8B9098',
                                                }}
                                              >
                                                {isCover
                                                  ? '★ PORTADA'
                                                  : 'Elegir portada'}
                                              </small>

                                              <button
                                                type="button"
                                                onClick={() =>
                                                  removePublicationImage(
                                                    publication.id,
                                                    image.id,
                                                  )
                                                }
                                                style={{
                                                  border:
                                                    'none',
                                                  cursor:
                                                    'pointer',
                                                  padding:
                                                    '5px 9px',
                                                  background:
                                                    'rgba(11,13,16,0.9)',
                                                  color:
                                                    '#F5F5F2',
                                                  fontSize:
                                                    '18px',
                                                }}
                                              >
                                                ×
                                              </button>

                                            </div>

                                          </div>
                                        )
                                      },
                                    )}

                                  </div>
                                )}

                              {publication.images &&
                                publication.images
                                  .length >
                                  0 && (
                                  <p
                                    style={{
                                      marginTop:
                                        '12px',
                                      fontSize:
                                        '12px',
                                    }}
                                  >
                                    Hacé clic sobre
                                    una imagen para
                                    convertirla en
                                    portada.
                                  </p>
                                )}

                            </div>

                            <div className="admin-field-full">
                              {renderField(
                                'Descripción',
                                publication.description,
                                (value) =>
                                  updatePublication(
                                    publication.id,
                                    'description',
                                    value,
                                  ),
                                true,
                              )}
                            </div>

                            <div className="admin-field-full">
                              {renderField(
                                'Características',
                                publication.features,
                                (value) =>
                                  updatePublication(
                                    publication.id,
                                    'features',
                                    value,
                                  ),
                                true,
                              )}
                            </div>

                            <div className="admin-field-full">
                              {renderField(
                                'Información comercial',
                                publication.commercialInfo,
                                (value) =>
                                  updatePublication(
                                    publication.id,
                                    'commercialInfo',
                                    value,
                                  ),
                                true,
                              )}
                            </div>

                          </div>

                          <div
                            style={{
                              display:
                                'flex',
                              alignItems:
                                'center',
                              justifyContent:
                                'space-between',
                              flexWrap:
                                'wrap',
                              gap:
                                '12px',
                              marginTop:
                                '20px',
                              paddingTop:
                                '20px',
                              borderTop:
                                '1px solid rgba(245,245,242,0.08)',
                            }}
                          >

                            <button
                              type="button"
                              className="admin-add-button"
                              onClick={() =>
                                togglePublication(
                                  publication.id,
                                )
                              }
                            >
                              {publication.published
                                ? '● Publicado'
                                : '○ Oculto'}
                            </button>

                            <button
                              type="button"
                              className="admin-delete-button"
                              onClick={() =>
                                deletePublication(
                                  publication.id,
                                )
                              }
                            >
                              Eliminar
                            </button>

                          </div>

                        </div>

                      </article>
                    ),
                  )}

                </div>

              </section>

              <div className="admin-save-bar">
                <span>
                  Las publicaciones se almacenan localmente por ahora.
                </span>

                <button
                  className="admin-save-button"
                  onClick={
                    savePublications
                  }
                >
                  Guardar publicaciones
                  <span>↗</span>
                </button>
              </div>

            </div>
          )}

          {/* =========================
              PORTFOLIO
          ========================= */}

          {activeSection ===
            'portfolio' && (
            <div className="admin-settings">

              <section className="admin-editor-card">

                <div className="admin-editor-header">

                  <div>
                    <span>
                      01 / PORTFOLIO
                    </span>

                    <h2>
                      Proyectos realizados
                    </h2>
                  </div>

                  <button
                    className="admin-add-button"
                    onClick={
                      addPortfolioProject
                    }
                  >
                    + Nuevo proyecto
                  </button>

                </div>

                <div className="admin-form-grid">

                  <div className="admin-field-full">
                    <p>
                      Cargá los proyectos realizados por PLANO LABS.
                      Podés agregar una descripción breve para la
                      tarjeta y una descripción larga para el detalle
                      completo del proyecto. También podés agregar
                      todas las imágenes y capturas que necesites y
                      elegir cuál será la portada.
                    </p>
                  </div>

                </div>

                <div className="admin-items-list">

                  {portfolio.map(
                    (
                      project,
                      index,
                    ) => {

                      const allImages = [
                        ...(project.image
                          ? [
                              project.image,
                            ]
                          : []),
                        ...(project.screenshots ||
                          []),
                      ]

                      return (
                        <article
                          className="admin-item-card"
                          key={
                            project.id
                          }
                        >

                          <div className="admin-item-number">
                            {String(
                              index + 1,
                            ).padStart(
                              2,
                              '0',
                            )}
                          </div>

                          <div className="admin-item-fields">

                            <div className="admin-form-grid">

                              {renderField(
                                'Nombre del proyecto',
                                project.title,
                                (value) =>
                                  updatePortfolioProject(
                                    project.id,
                                    'title',
                                    value,
                                  ),
                              )}

                              <label className="admin-field">
                                <span>
                                  Orden
                                </span>

                                <input
                                  type="number"
                                  min="1"
                                  step="1"
                                  value={
                                    project.order
                                  }
                                  onChange={(
                                    event,
                                  ) =>
                                    updatePortfolioProject(
                                      project.id,
                                      'order',
                                      event
                                        .target
                                        .value,
                                    )
                                  }
                                />
                              </label>

                              <label className="admin-field">
                                <span>
                                  Categoría
                                </span>

                                <select
                                  value={
                                    project.category
                                  }
                                  onChange={(
                                    event,
                                  ) =>
                                    updatePortfolioProject(
                                      project.id,
                                      'category',
                                      event
                                        .target
                                        .value,
                                    )
                                  }
                                >
                                  <option value="">
                                    Seleccionar categoría
                                  </option>

                                  {categories.map(
                                    (
                                      category,
                                    ) => (
                                      <option
                                        key={
                                          category.id
                                        }
                                        value={
                                          category.name
                                        }
                                      >
                                        {
                                          category.name
                                        }
                                      </option>
                                    ),
                                  )}
                                </select>
                              </label>

                              {renderField(
                                'Cliente',
                                project.client || '',
                                (value) =>
                                  updatePortfolioProject(
                                    project.id,
                                    'client',
                                    value,
                                  ),
                              )}

                              {renderField(
                                'Link del proyecto',
                                project.link || '',
                                (value) =>
                                  updatePortfolioProject(
                                    project.id,
                                    'link',
                                    value,
                                  ),
                              )}

                              <div className="admin-field-full">
                                {renderField(
                                  'Descripción breve',
                                  project.shortDescription ||
                                    '',
                                  (value) =>
                                    updatePortfolioProject(
                                      project.id,
                                      'shortDescription',
                                      value,
                                    ),
                                  true,
                                )}

                                <p
                                  style={{
                                    marginTop:
                                      '8px',
                                    fontSize:
                                      '13px',
                                  }}
                                >
                                  Texto corto que aparecerá
                                  directamente en la tarjeta
                                  del Portfolio.
                                </p>
                              </div>

                              <div className="admin-field-full">
                                {renderField(
                                  'Descripción larga',
                                  project.description ||
                                    '',
                                  (value) =>
                                    updatePortfolioProject(
                                      project.id,
                                      'description',
                                      value,
                                    ),
                                  true,
                                )}

                                <p
                                  style={{
                                    marginTop:
                                      '8px',
                                    fontSize:
                                      '13px',
                                  }}
                                >
                                  Texto completo que aparecerá
                                  al abrir el proyecto.
                                </p>
                              </div>

                              <div className="admin-field-full">

                                <label className="admin-field">
                                  <span>
                                    Imágenes del proyecto
                                  </span>

                                  <input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    multiple
                                    onChange={(
                                      event,
                                    ) =>
                                      handlePortfolioImages(
                                        project.id,
                                        event,
                                      )
                                    }
                                  />
                                </label>

                                <p
                                  style={{
                                    marginTop:
                                      '8px',
                                    fontSize:
                                      '13px',
                                  }}
                                >
                                  JPG, JPEG, PNG o WebP.
                                  Podés seleccionar
                                  varias imágenes
                                  desde tu PC.
                                  Las imágenes se
                                  optimizan
                                  automáticamente.
                                </p>

                                {allImages.length >
                                  0 && (
                                  <div
                                    style={{
                                      display:
                                        'grid',
                                      gridTemplateColumns:
                                        'repeat(auto-fit, minmax(140px, 1fr))',
                                      gap:
                                        '14px',
                                      marginTop:
                                        '18px',
                                      width:
                                        '100%',
                                    }}
                                  >

                                    {allImages.map(
                                      (
                                        imageUrl,
                                        imageIndex,
                                      ) => {

                                        const isCover =
                                          imageUrl ===
                                          project.image

                                        return (
                                          <div
                                            key={`${project.id}-${imageIndex}`}
                                            style={{
                                              position:
                                                'relative',
                                              width:
                                                '100%',
                                              minWidth:
                                                0,
                                              aspectRatio:
                                                '16 / 10',
                                              overflow:
                                                'hidden',
                                              border:
                                                isCover
                                                  ? '2px solid #B8FF3D'
                                                  : '1px solid rgba(245,245,242,0.12)',
                                              background:
                                                '#0B0D10',
                                              cursor:
                                                'pointer',
                                            }}
                                            onClick={() =>
                                              setPortfolioCover(
                                                project.id,
                                                imageUrl,
                                              )
                                            }
                                          >

                                            <img
                                              src={
                                                imageUrl
                                              }
                                              alt={`Imagen ${
                                                imageIndex +
                                                1
                                              } del proyecto`}
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

                                            {isCover && (
                                              <span
                                                style={{
                                                  position:
                                                    'absolute',
                                                  left:
                                                    '8px',
                                                  bottom:
                                                    '8px',
                                                  padding:
                                                    '5px 8px',
                                                  background:
                                                    '#B8FF3D',
                                                  color:
                                                    '#0B0D10',
                                                  fontFamily:
                                                    'Montserrat, sans-serif',
                                                  fontSize:
                                                    '11px',
                                                  fontWeight:
                                                    '700',
                                                  letterSpacing:
                                                    '0.04em',
                                                }}
                                              >
                                                ★ PORTADA
                                              </span>
                                            )}

                                            <button
                                              type="button"
                                              onClick={(
                                                event,
                                              ) => {
                                                event.stopPropagation()

                                                removePortfolioImage(
                                                  project.id,
                                                  imageUrl,
                                                )
                                              }}
                                              style={{
                                                position:
                                                  'absolute',
                                                top:
                                                  '7px',
                                                right:
                                                  '7px',
                                                width:
                                                  '32px',
                                                height:
                                                  '32px',
                                                border:
                                                  'none',
                                                cursor:
                                                  'pointer',
                                                background:
                                                  'rgba(11,13,16,0.92)',
                                                color:
                                                  '#F5F5F2',
                                                fontSize:
                                                  '20px',
                                                lineHeight:
                                                  '1',
                                                display:
                                                  'flex',
                                                alignItems:
                                                  'center',
                                                justifyContent:
                                                  'center',
                                              }}
                                              aria-label="Eliminar imagen"
                                            >
                                              ×
                                            </button>

                                          </div>
                                        )
                                      },
                                    )}

                                  </div>
                                )}

                              </div>

                            </div>

                            <div
                              style={{
                                display:
                                  'flex',
                                alignItems:
                                  'center',
                                justifyContent:
                                  'space-between',
                                flexWrap:
                                  'wrap',
                                gap:
                                  '12px',
                                marginTop:
                                  '20px',
                                paddingTop:
                                  '20px',
                                borderTop:
                                  '1px solid rgba(245,245,242,0.08)',
                              }}
                            >

                              <button
                                type="button"
                                className="admin-add-button"
                                onClick={() =>
                                  togglePortfolioProject(
                                    project.id,
                                  )
                                }
                              >
                                {project.published
                                  ? '● Publicado'
                                  : '○ Oculto'}
                              </button>

                              <button
                                type="button"
                                className="admin-delete-button"
                                onClick={() =>
                                  deletePortfolioProject(
                                    project.id,
                                  )
                                }
                              >
                                Eliminar
                              </button>

                            </div>

                          </div>

                        </article>
                      )
                    },
                  )}

                </div>

              </section>

              <div className="admin-save-bar">

                <span>
                  Los proyectos se almacenan localmente por ahora.
                </span>

                <button
                  type="button"
                  className="admin-save-button"
                  onClick={
                    savePortfolio
                  }
                >
                  Guardar portfolio
                  <span>↗</span>
                </button>

              </div>

            </div>
          )}

        </div>

      </section>

    </main>
  )
}

export default Admin