<script setup lang="ts">
import { communityMembers, communityStats } from '~/data/community'

const strip = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

function onPointerDown(e: PointerEvent) {
  if (!strip.value) return
  isDragging.value = true
  startX.value = e.clientX
  scrollLeft.value = strip.value.scrollLeft
  strip.value.setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value || !strip.value) return
  const dx = e.clientX - startX.value
  strip.value.scrollLeft = scrollLeft.value - dx
}

function onPointerUp(e: PointerEvent) {
  isDragging.value = false
  strip.value?.releasePointerCapture(e.pointerId)
}

const stats = [
  { label: 'Members', value: communityStats.members },
  { label: 'Weekly sessions', value: communityStats.weeklyRuns },
  { label: 'Collective km', value: communityStats.collectiveKm },
  { label: 'Upcoming events', value: communityStats.upcomingEvents },
]

const activeStory = ref(communityMembers[0]?.id ?? '')
const story = computed(() => communityMembers.find(m => m.id === activeStory.value) ?? communityMembers[0])
</script>

<template>
  <section id="community" class="border-b border-ink/10 bg-night">
    <div class="mx-auto max-w-site px-4 py-20 md:px-8 md:py-28">
      <div class="mb-10 grid gap-6 md:mb-14 md:grid-cols-12">
        <div class="md:col-span-7">
          <p class="section-label">04 — The People</p>
          <h2 class="mt-3 display-xl text-[clamp(2.5rem,7vw,5.5rem)]">
            THE PACK<br>AT SEVEN
          </h2>
        </div>
        <p class="self-end text-sm text-mute md:col-span-5">
          Faces from Maples Grove nights. Drag the strip. Sample profiles — simulated metrics labeled below.
        </p>
      </div>

      <div
        ref="strip"
        class="flex cursor-grab gap-3 overflow-x-auto pb-4 active:cursor-grabbing md:gap-5"
        style="scrollbar-width: thin;"
        data-cursor-hover
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
      >
        <button
          v-for="(member, i) in communityMembers"
          :key="member.id"
          type="button"
          class="group relative shrink-0 overflow-hidden bg-panel text-left"
          :class="i % 2 === 0 ? 'aspect-[3/4] w-[240px] md:w-[280px]' : 'aspect-[4/5] w-[200px] md:w-[240px] mt-8'"
          :aria-pressed="activeStory === member.id"
          @click="activeStory = member.id"
        >
          <img
            :src="member.image"
            :alt="`${member.name}, ${member.role}`"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width="400"
            height="500"
            draggable="false"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent opacity-90" />
          <div class="absolute inset-x-0 bottom-0 p-4">
            <p class="font-display text-xl uppercase tracking-tightest">{{ member.name }}</p>
            <p class="font-mono text-[10px] uppercase tracking-technical text-magenta">{{ member.role }}</p>
          </div>
        </button>
      </div>

      <div class="mt-10 grid gap-8 border border-ink/10 lg:grid-cols-12">
        <div class="bg-panel p-6 md:p-8 lg:col-span-5">
          <p class="section-label !text-magenta">Member note</p>
          <p v-if="story" class="mt-4 font-display text-3xl uppercase tracking-tightest">
            {{ story.name }}
          </p>
          <p v-if="story" class="mt-2 font-mono text-[10px] uppercase tracking-technical text-mute">
            {{ story.experience }} · {{ story.distanceWeekly }} / week
          </p>
          <p v-if="story" class="mt-6 text-lg leading-relaxed text-chrome">
            “{{ story.story }}”
          </p>
        </div>

        <div class="grid grid-cols-2 gap-px bg-ink/10 p-px lg:col-span-7 sm:grid-cols-4 lg:grid-cols-2">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-night p-5 md:p-7"
          >
            <p class="section-label">{{ stat.label }}</p>
            <p class="mt-3 font-display text-4xl tracking-tightest text-magenta md:text-5xl">
              {{ stat.value.toLocaleString() }}
            </p>
          </div>
        </div>
      </div>

      <p class="mt-4 font-mono text-[10px] uppercase tracking-technical text-mute">
        * Simulated club statistics for demonstration
      </p>
    </div>
  </section>
</template>
