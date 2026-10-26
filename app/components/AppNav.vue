<script setup lang="ts">
const { formatted, sessionStatus } = useLocalTime()
const { y } = useWindowScroll()
const mobileOpen = ref(false)

const scrolled = computed(() => y.value > 40)

const links = [
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#runs', label: 'Runs' },
  { href: '#routes', label: 'Routes' },
  { href: '#community', label: 'Community' },
  { href: '#journal', label: 'Journal' },
]

watch(mobileOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="scrolled || mobileOpen ? 'border-b border-ink/10 bg-night/95 backdrop-blur-sm' : 'bg-transparent'"
  >
    <div class="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-3">
      <a href="#top" class="flex items-center gap-2" @click="closeMobile">
        <img
          src="/logo.png"
          alt="7PM Runners Club"
          class="h-10 w-auto rounded-sm md:h-12"
          width="160"
          height="48"
        >
      </a>

      <nav class="hidden items-center gap-7 lg:flex" aria-label="Primary">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="font-body text-xs font-semibold uppercase tracking-wide text-ink/70 transition-colors hover:text-magenta"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="hidden items-center gap-4 xl:flex">
        <ThemeToggle />
        <div class="text-right">
          <p class="font-mono text-[10px] tracking-technical text-magenta">
            {{ formatted }}
          </p>
          <p class="font-mono text-[9px] uppercase tracking-technical text-mute">
            {{ sessionStatus }}
          </p>
        </div>
        <a href="#join" class="btn-primary !py-2.5 !text-xs">
          Join the Club
        </a>
      </div>

      <div class="flex items-center gap-2 lg:hidden">
        <ThemeToggle />
        <span class="hidden font-mono text-[10px] tracking-technical text-magenta sm:inline">{{ formatted }}</span>
        <button
          type="button"
          class="border border-ink/20 px-3 py-2 font-mono text-[10px] uppercase tracking-technical transition-colors hover:border-magenta hover:text-magenta"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          @click="mobileOpen = !mobileOpen"
        >
          {{ mobileOpen ? 'Close' : 'Menu' }}
        </button>
      </div>

      <div class="hidden items-center gap-3 lg:flex xl:hidden">
        <ThemeToggle />
        <a href="#join" class="btn-primary !py-2.5 !text-xs">
          Join
        </a>
      </div>
    </div>

    <div
      id="mobile-nav"
      class="border-t border-ink/10 bg-night lg:hidden"
      :class="mobileOpen ? 'block' : 'hidden'"
    >
      <nav class="flex flex-col px-4 py-6" aria-label="Mobile">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="border-b border-ink/10 py-4 font-display text-3xl uppercase tracking-tightest"
          @click="closeMobile"
        >
          {{ link.label }}
        </a>
        <a href="#join" class="btn-primary mt-6" @click="closeMobile">
          Join the Club
        </a>
        <p class="mt-4 font-mono text-[10px] uppercase tracking-technical text-mute">
          {{ sessionStatus }}
        </p>
        <p class="mt-1 font-mono text-[10px] uppercase tracking-technical text-mute">
          Maples Grove · Gen. Trias, Cavite
        </p>
      </nav>
    </div>
  </header>
</template>
