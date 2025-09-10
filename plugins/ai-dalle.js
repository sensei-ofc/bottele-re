import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const prompt = args.join(' ')
  if (!prompt) return m.reply(
`✿ *Generador de Imágenes AI*

Sigue las instrucciones:
✎ *Uso correcto ›* ${usedPrefix + command} <texto para la imagen>
✎ *Ejemplo ›* ${usedPrefix + command} gatito kawaii con fondo rosa

Recuerda que la imagen puede tardar unos segundos en generarse.
↺ Sé paciente mientras se crea tu imagen.`, m)

  try {
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } })

    const api = `https://myapiadonix.casacam.net/ai/iaimagen?prompt=${encodeURIComponent(prompt)}`
    const res = await fetch(api)
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

    const buffer = await res.buffer()

    await conn.sendMessage(
      m.chat,
      {
        image: buffer,
        caption: `
✿ *¡Imagen Generada!*

Detalles:
✎ *Prompt ›* ${prompt}
↺ Disfruta tu nueva creación.
        `.trim(),
        footer: 'Adonix API'
      },
      { quoted: m }
    )

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

  } catch (e) {
    console.error('Error generando imagen:', e)
    await conn.sendMessage(m.chat, { react: { text: '✖️', key: m.key } })
    m.reply('✿ *Error ›* No se pudo generar la imagen, inténtalo más tarde.', m)
  }
}

handler.command = ['imgia', 'iaimg']
handler.help = ['imgia']
handler.tags = ['ia']

export default handler
