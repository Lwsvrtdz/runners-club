export default defineNuxtPlugin(() => {
  const { isDark } = useClubTheme()

  useHead(() => ({
    meta: [
      {
        name: 'theme-color',
        content: isDark.value ? '#0B0B0C' : '#F1EEF3',
      },
    ],
  }))
})
