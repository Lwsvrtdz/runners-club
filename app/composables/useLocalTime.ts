export function useLocalTime() {
  const now = useNow({ interval: 1000 })

  const formatted = computed(() => {
    const d = now.value
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    const ss = String(d.getSeconds()).padStart(2, '0')
    return `${hh}:${mm}:${ss}`
  })

  const sessionStatus = computed(() => {
    const day = now.value.getDay()
    const hour = now.value.getHours()
    const isMon = day === 1
    const isFri = day === 5
    const isWeekend = day === 0 || day === 6

    if (isMon && hour >= 18 && hour < 21) return 'MONDAY EASY · LIVE WINDOW'
    if (isFri && hour >= 18 && hour < 21) return 'FRIDAY SPEED · LIVE WINDOW'
    if (isWeekend && hour >= 5 && hour < 10) return 'WEEKEND LSD · GO LONG'
    if (hour === 18 || hour === 19) return 'ALMOST 7PM · LACE UP'
    if (hour >= 19 && hour < 21) return 'PRIME TIME · NIGHT PACK'
    return 'MAPLES GROVE · STAND BY'
  })

  const timezone = computed(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    catch {
      return 'Asia/Manila'
    }
  })

  return { now, formatted, sessionStatus, timezone }
}
