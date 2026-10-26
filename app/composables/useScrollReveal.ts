export function useScrollReveal(threshold = 0.18) {
  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)
  const prefersReduced = usePreferredReducedMotion()
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!import.meta.client || !el.value) return

    if (prefersReduced.value === 'reduce') {
      visible.value = true
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          visible.value = true
          observer?.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { el, visible }
}
