/*
 * PLANO LABS — Formulario de contacto por mail
 *
 * Función serverless de Vercel: POST /api/contact
 *
 * - Recibe: { name, email, phone, message, website }
 * - Envía un mail a plano.labs.ideas@gmail.com usando Resend.
 * - La clave (RESEND_API_KEY) vive SOLO en las variables de entorno
 *   de Vercel. Nunca llega al navegador.
 * - El destinatario lo define el servidor, no el visitante, para que
 *   nadie pueda usar este endpoint para mandar mails a terceros.
 *
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   (obligatoria)
 *   CONTACT_TO       (opcional, por defecto plano.labs.ideas@gmail.com)
 *   CONTACT_FROM     (opcional, por defecto "PLANO LABS <onboarding@resend.dev>")
 */

const DEFAULT_TO = 'plano.labs.ideas@gmail.com'
const DEFAULT_FROM = 'PLANO LABS <onboarding@resend.dev>'

const LIMITS = {
  name: 120,
  email: 160,
  phone: 40,
  message: 4000,
}

function singleLine(value, max) {
  return String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, max)
}

function multiLine(value, max) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .trim()
    .slice(0, max)
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')

    return res
      .status(405)
      .json({ error: 'Método no permitido.' })
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error(
      'Falta la variable de entorno RESEND_API_KEY.',
    )

    return res.status(500).json({
      error:
        'El envío de consultas todavía no está configurado.',
    })
  }

  let body = req.body

  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }

  body = body || {}

  // Campo trampa: si un bot lo completa, respondemos OK sin enviar nada.
  if (body.website) {
    return res.status(200).json({ ok: true })
  }

  const name = singleLine(body.name, LIMITS.name)
  const email = singleLine(body.email, LIMITS.email)
  const phone = singleLine(body.phone, LIMITS.phone)
  const message = multiLine(body.message, LIMITS.message)

  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      error: 'Completá todos los campos para enviar la consulta.',
    })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: 'Revisá el email: no parece válido.',
    })
  }

  if (phone.replace(/\D/g, '').length < 6) {
    return res.status(400).json({
      error: 'Revisá el número de teléfono: parece incompleto.',
    })
  }

  const to = process.env.CONTACT_TO || DEFAULT_TO
  const from = process.env.CONTACT_FROM || DEFAULT_FROM

  const text = [
    'Nueva consulta desde la web de PLANO LABS',
    '',
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Teléfono: ${phone}`,
    '',
    'Consulta:',
    message,
  ].join('\n')

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">Nueva consulta desde la web de PLANO LABS</h2>
      <p style="margin: 0;"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 0;"><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
      <p style="margin: 16px 0 4px;"><strong>Consulta:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Al tocar "Responder" en Gmail, la respuesta va al potencial cliente.
        reply_to: email,
        subject: `Consulta desde PLANO LABS - ${name}`,
        text,
        html,
      }),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')

      console.error(
        'Resend rechazó el envío:',
        response.status,
        detail,
      )

      return res.status(502).json({
        error:
          'No pudimos enviar tu consulta. Probá de nuevo en unos minutos.',
      })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Error al enviar la consulta:', error)

    return res.status(502).json({
      error:
        'No pudimos enviar tu consulta. Probá de nuevo en unos minutos.',
    })
  }
}
