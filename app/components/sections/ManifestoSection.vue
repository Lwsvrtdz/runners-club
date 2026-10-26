<script setup lang="ts">
const { el, visible } = useScrollReveal(0.2)

const lines = [
  { text: 'NOT A RACE.', accent: false },
  { text: 'NOT A FLEX.', accent: false },
  { text: 'JUST US —', accent: true },
  { text: 'AT 7PM.', accent: true },
]
</script>

<template>
  <section
    id="manifesto"
    ref="el"
    class="relative overflow-hidden border-b border-ink/10 bg-night"
  >
    <div class="mx-auto max-w-site px-4 py-20 md:px-8 md:py-28 lg:py-36">
      <div class="mb-12 flex items-end justify-between gap-6 md:mb-20">
        <p class="section-label">01 — Manifesto</p>
        <p class="max-w-xs text-right text-sm text-mute">
          Night runs. Real schedules. A pack that waits in Maples Grove.
        </p>
      </div>

      <div class="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-8">
          <h2 class="display-xl space-y-2 text-[clamp(2.5rem,8vw,7rem)]">
            <span
              v-for="(line, i) in lines"
              :key="line.text"
              class="block transition-all duration-700"
              :class="[
                line.accent ? 'text-magenta' : 'text-ink',
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
              ]"
              :style="{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }"
            >
              {{ line.text }}
            </span>
          </h2>
        </div>

        <aside class="flex flex-col justify-end gap-8 lg:col-span-4">
          <div
            class="border border-magenta/40 bg-panel p-6 transition-all duration-700"
            :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
            :style="{ transitionDelay: visible ? '500ms' : '0ms' }"
          >
            <p class="font-mono text-[10px] uppercase tracking-technical text-magenta">Field note</p>
            <p class="mt-4 text-lg leading-snug text-chrome">
              We don’t sell transformation. We hold a start time at
              <span class="text-ink"> Maples Grove</span> and a rule:
              <span class="text-magenta"> no one gets dropped.</span>
            </p>
          </div>

          <ul class="space-y-4">
            <li
              v-for="(item, i) in [
                'Monday 7PM — easy, conversational.',
                'Friday 7PM — speed that builds you.',
                'Weekends — LSD for the long game.',
              ]"
              :key="item"
              class="flex gap-3 border-t border-ink/10 pt-4 transition-all duration-700"
              :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
              :style="{ transitionDelay: visible ? `${600 + i * 100}ms` : '0ms' }"
            >
              <span class="font-mono text-xs text-magenta">0{{ i + 1 }}</span>
              <span class="text-sm text-chrome md:text-base">{{ item }}</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>

    <div class="bg-magenta px-4 py-8 text-carbon md:px-8">
      <div class="mx-auto flex max-w-site flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p class="font-display text-3xl uppercase tracking-tightest md:text-5xl">
          CAVITE IS OUR TRACK.
        </p>
        <p class="max-w-sm font-mono text-[11px] uppercase tracking-technical text-carbon/80">
          Protocol · Show up at 7 · Hold pace · Leave space · Stay human
        </p>
      </div>
    </div>
  </section>
</template>
