<script setup lang="ts">
const x = ref(0)
const y = ref(0)
const visible = ref(false)
const hovering = ref(false)
const enabled = ref(false)

onMounted(() => {
  const fine = window.matchMedia('(pointer: fine)').matches
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  enabled.value = fine && !reduce
  if (!enabled.value) return

  const onMove = (e: MouseEvent) => {
    x.value = e.clientX
    y.value = e.clientY
    visible.value = true
  }

  const onOver = (e: MouseEvent) => {
    const t = e.target as HTMLElement | null
    hovering.value = Boolean(t?.closest('a, button, [data-cursor-hover]'))
  }

  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mouseover', onOver, { passive: true })

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseover', onOver)
  })
})
</script>

<template>
  <div
    v-if="enabled"
    class="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
    :style="{
      transform: `translate(${x - 8}px, ${y - 8}px)`,
      opacity: visible ? 1 : 0,
    }"
    aria-hidden="true"
  >
    <div
      class="rounded-full bg-magenta transition-all duration-150"
      :class="hovering ? 'h-8 w-8 shadow-magenta' : 'h-3.5 w-3.5'"
    />
  </div>
</template>
