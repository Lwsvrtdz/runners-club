export type ClubTheme = 'dark' | 'light'

const STORAGE_KEY = '7pm-theme'

function readStoredTheme(): ClubTheme {
  if (!import.meta.client) return 'dark'
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' ? 'light' : 'dark'
  }
  catch {
    return 'dark'
  }
}

function applyThemeClass(theme: ClubTheme) {
  if (!import.meta.client) return
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  root.style.colorScheme = theme
}

export function useClubTheme() {
  const theme = useState<ClubTheme>('club-theme', () => 'dark')

  const isDark = computed(() => theme.value === 'dark')
  const isLight = computed(() => theme.value === 'light')
  const label = computed(() => (isDark.value ? 'Night' : 'Day'))

  function setTheme(next: ClubTheme) {
    theme.value = next
    applyThemeClass(next)
    if (import.meta.client) {
      try {
        localStorage.setItem(STORAGE_KEY, next)
      }
      catch {
        // ignore quota / private mode
      }
    }
  }

  function toggleTheme() {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  onMounted(() => {
    setTheme(readStoredTheme())
  })

  return {
    theme,
    isDark,
    isLight,
    label,
    setTheme,
    toggleTheme,
  }
}
