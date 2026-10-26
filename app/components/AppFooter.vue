<script setup lang="ts">
import { runEvents, weeklyRhythm } from '~/data/events'

const nextRun = runEvents.find(e => e.status !== 'full') ?? runEvents[0]
const { formatted } = useLocalTime()

const socials = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Strava', href: '#' },
]
</script>

<template>
  <footer class="border-t border-ink/10 bg-panel text-ink">
    <div class="mx-auto grid max-w-site gap-10 px-4 py-14 md:grid-cols-12 md:px-8 md:py-20">
      <div class="md:col-span-4">
        <img src="/logo.png" alt="7PM Runners Club" class="h-14 w-auto" width="200" height="56">
        <p class="mt-4 max-w-xs text-sm text-mute">
          Night runs in Maples Grove, General Trias, Cavite. Monday easy. Friday speed. Weekend LSD.
        </p>
      </div>

      <div class="md:col-span-3">
        <p class="section-label">Weekly rhythm</p>
        <ul class="mt-3 space-y-2">
          <li v-for="slot in weeklyRhythm" :key="slot.day" class="text-sm">
            <span class="font-semibold text-magenta">{{ slot.day }}</span>
            <span class="text-mute"> · {{ slot.time }} · {{ slot.focus }}</span>
          </li>
        </ul>
      </div>

      <div class="md:col-span-2">
        <p class="section-label">Next session</p>
        <p v-if="nextRun" class="mt-3 font-display text-xl uppercase tracking-tightest">
          {{ nextRun.title }}
        </p>
        <p class="mt-2 font-mono text-xs tracking-technical text-chrome">
          {{ nextRun?.date }} · {{ nextRun?.time }}
        </p>
        <a href="#runs" class="mt-4 inline-block text-sm uppercase tracking-wide text-ink underline decoration-magenta underline-offset-4">
          View calendar
        </a>
      </div>

      <div class="md:col-span-3">
        <p class="section-label">Meet us</p>
        <p class="mt-3 text-sm">Maples Grove</p>
        <p class="mt-1 text-sm text-mute">General Trias, Cavite</p>
        <ul class="mt-4 space-y-2">
          <li v-for="s in socials" :key="s.label">
            <a :href="s.href" class="text-sm text-ink/80 transition-colors hover:text-magenta">
              {{ s.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-ink/10">
      <div class="mx-auto flex max-w-site flex-col gap-3 px-4 py-5 md:flex-row md:items-end md:justify-between md:px-8">
        <p class="font-mono text-[10px] uppercase tracking-technical text-mute">
          © {{ new Date().getFullYear() }} 7PM Runners Club · Demo site · No data stored
        </p>
        <p class="font-display text-3xl leading-none tracking-tightest text-ink/10 md:text-5xl">
          19:00
        </p>
        <p class="font-mono text-[10px] tracking-technical text-magenta">
          TS {{ formatted }}
        </p>
      </div>
    </div>
  </footer>
</template>
