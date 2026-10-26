<script setup lang="ts">
import { clubRoutes } from '~/data/routes'
import type { ClubRoute } from '~/types'

const activeId = ref(clubRoutes[0]?.id ?? '')
const active = computed(() => clubRoutes.find(r => r.id === activeId.value) ?? clubRoutes[0])
const drawn = ref(true)

function selectRoute(route: ClubRoute) {
  if (route.id === activeId.value) return
  drawn.value = false
  activeId.value = route.id
  nextTick(() => {
    requestAnimationFrame(() => {
      drawn.value = true
    })
  })
}

const difficultyLabel = (d: ClubRoute['difficulty']) =>
  ({ easy: 'Easy', moderate: 'Moderate', hard: 'Hard' })[d]
</script>

<template>
  <section id="routes" class="border-b border-ink/10 bg-panel">
    <div class="mx-auto max-w-site px-4 py-20 md:px-8 md:py-28">
      <div class="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="font-mono text-[10px] uppercase tracking-technical text-magenta">03 — Route Lab</p>
          <h2 class="mt-3 font-display text-[clamp(2.5rem,7vw,5.5rem)] uppercase leading-[0.85] tracking-tightest">
            MAPLES<br>GROVE
          </h2>
        </div>
        <p class="max-w-sm text-sm text-mute">
          Routes from our home base in General Trias. Select a line to redraw telemetry. Demo SVG — not a live map.
        </p>
      </div>

      <div class="grid gap-6 lg:grid-cols-12">
        <div class="order-2 flex flex-col gap-2 lg:order-1 lg:col-span-4">
          <button
            v-for="route in clubRoutes"
            :key="route.id"
            type="button"
            class="border px-4 py-4 text-left transition-colors"
            :class="activeId === route.id
              ? 'border-magenta bg-magenta text-carbon'
              : 'border-ink/15 bg-transparent text-ink hover:border-magenta/50'"
            :aria-pressed="activeId === route.id"
            @click="selectRoute(route)"
          >
            <div class="flex items-baseline justify-between gap-3">
              <span class="font-display text-xl uppercase tracking-tightest">{{ route.name }}</span>
              <span class="font-mono text-sm">{{ route.distanceKm }} KM</span>
            </div>
            <p class="mt-1 text-xs opacity-70">{{ route.tagline }}</p>
          </button>
        </div>

        <div class="order-1 lg:order-2 lg:col-span-8">
          <div class="relative aspect-[5/4] overflow-hidden border border-ink/10 bg-night md:aspect-[16/10]">
            <div
              class="pointer-events-none absolute inset-0 opacity-20"
              style="background-image: radial-gradient(circle at 1px 1px, #7A7A84 1px, transparent 0); background-size: 24px 24px;"
              aria-hidden="true"
            />

            <svg
              v-if="active"
              class="absolute inset-0 h-full w-full"
              viewBox="0 0 520 400"
              fill="none"
              role="img"
              :aria-label="`Route visualization for ${active.name}`"
            >
              <path
                v-for="route in clubRoutes"
                :key="`ghost-${route.id}`"
                :d="route.path"
                stroke="#1F1F22"
                stroke-width="3"
                fill="none"
              />
              <path
                :key="active.id"
                :d="active.path"
                :stroke="active.color"
                stroke-width="3.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                pathLength="1"
                stroke-dasharray="1"
                :stroke-dashoffset="drawn ? 0 : 1"
                class="route-path"
              />
              <g v-for="(pt, i) in active.points" :key="`${active.id}-pt-${i}`">
                <circle
                  :cx="pt.x"
                  :cy="pt.y"
                  :r="i === 0 || i === active.points.length - 1 ? 6 : 3.5"
                  :fill="i === 0 ? '#FF2EC8' : active.color"
                />
              </g>
              <text
                v-if="active.points[0]"
                :x="active.points[0].x + 10"
                :y="active.points[0].y - 10"
                fill="#FF2EC8"
                font-size="10"
                font-family="IBM Plex Mono, monospace"
              >
                START
              </text>
              <text
                v-if="active.points.length"
                :x="(active.points.at(-1)?.x ?? 0) - 40"
                :y="(active.points.at(-1)?.y ?? 0) - 12"
                :fill="active.color"
                font-size="10"
                font-family="IBM Plex Mono, monospace"
              >
                FINISH
              </text>
            </svg>

            <div class="absolute left-3 top-3 border border-ink/15 bg-night/80 px-3 py-2 backdrop-blur-sm">
              <p class="font-mono text-[9px] uppercase tracking-technical text-mute">Home base</p>
              <p class="font-mono text-[10px] text-magenta">MAPLES GROVE · CAVITE</p>
            </div>
          </div>

          <div
            v-if="active"
            class="mt-4 grid grid-cols-2 gap-3 border border-ink/10 bg-night/40 p-4 sm:grid-cols-4 md:p-5"
          >
            <div>
              <p class="section-label">Distance</p>
              <p class="mt-1 font-mono text-xl text-magenta">{{ active.distanceKm }} KM</p>
            </div>
            <div>
              <p class="section-label">Elevation</p>
              <p class="mt-1 font-mono text-xl">+{{ active.elevationM }} M</p>
            </div>
            <div>
              <p class="section-label">Est. duration</p>
              <p class="mt-1 font-mono text-xl">{{ active.durationMin }} MIN</p>
            </div>
            <div>
              <p class="section-label">Difficulty</p>
              <p class="mt-1 font-mono text-xl uppercase">{{ difficultyLabel(active.difficulty) }}</p>
            </div>
          </div>

          <div v-if="active" class="mt-4 flex flex-col gap-2 border-t border-ink/10 pt-4 sm:flex-row sm:justify-between">
            <p class="text-sm text-mute">
              <span class="text-ink">{{ active.start }}</span>
              →
              <span class="text-ink">{{ active.finish }}</span>
            </p>
            <p class="max-w-lg text-sm text-chrome">{{ active.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.route-path {
  transition: stroke-dashoffset 1.2s ease;
}

@media (prefers-reduced-motion: reduce) {
  .route-path {
    transition: none;
  }
}
</style>
