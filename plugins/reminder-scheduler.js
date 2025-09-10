
let scheduler = {
  isRunning: false,
  run: (conn) => {
    if (scheduler.isRunning) return
    scheduler.isRunning = true
    setInterval(async () => {
      if (!global.db.data.reminders) {
        return
      }

      const now = Date.now()
      const reminders = global.db.data.reminders.filter(r => r.time <= now)

      for (const reminder of reminders) {
        await conn.sendMessage(reminder.jid, { text: `⏰ ¡Recordatorio! ⏰\n\n${reminder.message}` })
      }

      global.db.data.reminders = global.db.data.reminders.filter(r => r.time > now)
    }, 60 * 1000) // Run every minute
  }
}

export default scheduler
