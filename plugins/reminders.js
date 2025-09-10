
import moment from 'moment-timezone'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Uso correcto: ${usedPrefix + command} <mensaje> a las <hora> o en <tiempo>`

  let reminderTime
  let message

  const atTimeRegex = /a las (\d{1,2}(?::\d{2})?)\s?(de la (noche|tarde|mañana))?/i
  const inTimeRegex = /en (\d+)\s(minutos?|horas?|dias?)/i

  const atMatch = text.match(atTimeRegex)
  const inMatch = text.match(inTimeRegex)

  if (atMatch) {
    const timeStr = atMatch[1]
    const period = atMatch[3]
    message = text.replace(atMatch[0], '').trim()

    let [hour, minute] = timeStr.split(':')
    hour = parseInt(hour)
    minute = minute ? parseInt(minute) : 0

    if (period) {
        const p = period.toLowerCase()
        if (p === 'noche' && hour < 12) {
            hour += 12
        } else if (p === 'tarde' && hour < 12) {
            hour += 12
        }
    }
    
    const now = moment().tz('America/Asuncion')
    reminderTime = now.clone().hour(hour).minute(minute).second(0)

    if (reminderTime.isBefore(now)) {
      reminderTime.add(1, 'day')
    }
  } else if (inMatch) {
    const amount = parseInt(inMatch[1])
    const unit = inMatch[2].replace(/s$/, '') // remove plural 's'
    message = text.replace(inMatch[0], '').trim()

    reminderTime = moment().tz('America/Asuncion').add(amount, unit)
  } else {
    throw "No pude entender la hora. Intenta con formatos como 'a las 10 de la noche', 'en 5 minutos'."
  }

  if (!global.db.data.reminders) {
    global.db.data.reminders = []
  }

  global.db.data.reminders.push({
    jid: m.sender,
    message: message,
    time: reminderTime.valueOf()
  })

  m.reply(`Ok, te recordaré: "${message}" a las ${reminderTime.format('HH:mm')} del ${reminderTime.format('DD/MM/YYYY')}`)
}

handler.help = ['recuerdame <mensaje> a las <hora> | en <tiempo>']
handler.tags = ['tools']
handler.command = /^(recuerdame|recordarme)$/i

export default handler
