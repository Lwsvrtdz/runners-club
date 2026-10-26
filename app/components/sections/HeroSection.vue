<script setup lang="ts">
import { runEvents, weeklyRhythm } from '~/data/events'

const nextRun = runEvents.find(e => e.status !== 'full') ?? runEvents[0]
const prefersReduced = usePreferredReducedMotion()
const { y } = useWindowScroll()

const parallax = computed(() => {
  if (prefersReduced.value === 'reduce') return 0
  return Math.min(y.value * 0.12, 80)
})

const heroImage = 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=1600&q=80&auto=format&fit=crop'
</script>

<template>
  <section id="top" class="relative min-h-[100svh] overflow-hidden border-b border-ink/10 pt-20">
    <div class="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
      <div
        class="h-full w-full"
        style="background-image: linear-gradient(#FF2EC8 1px, transparent 1px), linear-gradient(90deg, #FF2EC8 1px, transparent 1px); background-size: 56px 56px;"
      />
    </div>

    <div class="relative mx-auto grid max-w-site gap-8 px-4 pb-10 md:grid-cols-12 md:px-8 md:pb-16 lg:min-h-[calc(100svh-5rem)] lg:items-end">
      <div class="relative z-10 md:col-span-7 lg:col-span-8 lg:pb-8">
        <div class="mb-6 flex flex-wrap items-center gap-3">
          <span class="bg-magenta px-2 py-1 font-mono text-[10px] uppercase tracking-technical text-carbon">
            Maples Grove · GenTri
          </span>
          <span class="tech-meta text-mute">Mon Easy</span>
          <span class="tech-meta text-mute">Fri Speed</span>
          <span class="tech-meta text-mute">Weekend LSD</span>
        </div>

        <h1 class="display-xl text-[clamp(3rem,10vw,8.5rem)] text-ink">
          <span class="block">WE LACE UP</span>
          <span class="block text-magenta">AT SEVEN.</span>
          <span class="block">EVERY WEEK.</span>
        </h1>

        <p class="mt-6 max-w-md text-base leading-relaxed text-chrome md:text-lg">
          7PM Runners Club — night kilometres in Maples Grove, General Trias, Cavite. Show up. Find your pace. Run with us.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a href="#runs" class="btn-primary">
            See the schedule
          </a>
          <a href="#manifesto" class="btn-ghost">
            Meet the club
          </a>
        </div>

        <ul class="mt-10 hidden gap-6 border-t border-ink/10 pt-6 sm:flex">
          <li v-for="slot in weeklyRhythm" :key="slot.day" class="min-w-0">
            <p class="font-mono text-[10px] uppercase tracking-technical text-magenta">{{ slot.day }}</p>
            <p class="mt-1 text-sm font-semibold">{{ slot.time }}</p>
            <p class="text-xs text-mute">{{ slot.focus }}</p>
          </li>
        </ul>
      </div>

      <div class="relative md:col-span-5 lg:col-span-4 lg:pb-8">
        <div class="relative aspect-[4/5] overflow-hidden bg-panel">
          <img
            :src="heroImage"
            alt="Night run under streetlights"
            class="h-full w-full object-cover transition-transform duration-700 will-change-transform"
            :style="{ transform: `translateY(${parallax * 0.15}px) scale(1.06)` }"
            width="800"
            height="1000"
            loading="eager"
            fetchpriority="high"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />

          <svg
            class="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 400 500"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M 40 420 C 90 360, 110 300, 160 260 S 260 180, 300 140 S 340 80, 360 40"
              stroke="#0B0B0C"
              stroke-width="6"
              opacity="0.5"
            />
            <path
              d="M 40 420 C 90 360, 110 300, 160 260 S 260 180, 300 140 S 340 80, 360 40"
              stroke="#FF2EC8"
              stroke-width="3"
              stroke-linecap="round"
              stroke-dasharray="1"
              pathLength="1"
              class="route-draw"
            />
            <circle cx="40" cy="420" r="7" fill="#FF2EC8" class="animate-pulse-dot" />
            <circle cx="360" cy="40" r="7" fill="#F5F5F7" />
          </svg>

          <div class="absolute bottom-4 left-4 right-4 border border-magenta/40 bg-night/80 p-3 backdrop-blur-sm">
            <p class="section-label !text-magenta">Upcoming</p>
            <p class="mt-1 font-display text-xl uppercase tracking-tightest text-ink">
              {{ nextRun?.title }}
            </p>
            <p class="mt-1 font-mono text-[10px] tracking-technical text-chrome">
              {{ nextRun?.date }} · {{ nextRun?.time }} · {{ nextRun?.distanceKm }} KM
            </p>
          </div>
        </div>

        <p
          class="absolute -left-3 top-1/4 hidden writing-vertical font-mono text-[10px] uppercase tracking-technical text-mute lg:block"
          aria-hidden="true"
        >
          MAPLES GROVE — CAVITE
        </p>
      </div>
    </div>

    <div class="overflow-hidden border-t border-ink/10 bg-magenta py-2 text-carbon">
      <div class="flex w-max animate-ticker whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-technical">
        <span class="px-6">MONDAY 7PM · EASY</span>
        <span class="px-6">FRIDAY 7PM · SPEED</span>
        <span class="px-6">WEEKENDS · LSD</span>
        <span class="px-6">MAPLES GROVE · GENERAL TRIAS</span>
        <span class="px-6">SHOW UP · FIND YOUR PACE</span>
        <span class="px-6">MONDAY 7PM · EASY</span>
        <span class="px-6">FRIDAY 7PM · SPEED</span>
        <span class="px-6">WEEKENDS · LSD</span>
        <span class="px-6">MAPLES GROVE · GENERAL TRIAS</span>
        <span class="px-6">SHOW UP · FIND YOUR PACE</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.route-draw {
  stroke-dashoffset: 1;
  animation: draw-route 1.8s ease forwards 0.3s;
}

@media (prefers-reduced-motion: reduce) {
  .route-draw {
    stroke-dashoffset: 0;
    animation: none;
  }
}
</style>
