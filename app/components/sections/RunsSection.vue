<script setup lang="ts">
import { runEvents, sessionTypeLabels, weeklyRhythm } from '~/data/events'
import type { RunEvent, SessionType } from '~/types'

const typeFilter = ref<'all' | SessionType>('all')
const distanceFilter = ref<'all' | 'short' | 'mid' | 'long'>('all')
const selected = ref<RunEvent | null>(null)
const registeredIds = ref<Set<string>>(new Set())
const confirmFlash = ref(false)

const typeOptions: { id: 'all' | SessionType; label: string }[] = [
  { id: 'all', label: 'All types' },
  { id: 'easy', label: 'Easy' },
  { id: 'tempo', label: 'Tempo' },
  { id: 'intervals', label: 'Speed' },
  { id: 'long', label: 'LSD' },
]

const distanceOptions = [
  { id: 'all' as const, label: 'Any distance' },
  { id: 'short' as const, label: '≤ 7 KM' },
  { id: 'mid' as const, label: '8–12 KM' },
  { id: 'long' as const, label: '≥ 13 KM' },
]

const filtered = computed(() =>
  runEvents.filter((e) => {
    if (typeFilter.value !== 'all' && e.type !== typeFilter.value) return false
    if (distanceFilter.value === 'short' && e.distanceKm > 7) return false
    if (distanceFilter.value === 'mid' && (e.distanceKm < 8 || e.distanceKm > 12)) return false
    if (distanceFilter.value === 'long' && e.distanceKm < 13) return false
    return true
  }),
)

function openDetail(event: RunEvent) {
  selected.value = event
  confirmFlash.value = false
}

function closeDetail() {
  selected.value = null
  confirmFlash.value = false
}

function register(event: RunEvent) {
  if (event.status === 'full' || registeredIds.value.has(event.id)) return
  const next = new Set(registeredIds.value)
  next.add(event.id)
  registeredIds.value = next
  confirmFlash.value = true
}

function spotsLeft(event: RunEvent) {
  return Math.max(0, event.capacity - event.registered - (registeredIds.value.has(event.id) ? 1 : 0))
}

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-PH', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeDetail()
  }
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})

watch(selected, (val) => {
  if (!import.meta.client) return
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<template>
  <section id="runs" class="border-b border-ink/10 bg-night">
    <div class="mx-auto max-w-site px-4 py-20 md:px-8 md:py-28">
      <div class="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="section-label">02 — Upcoming Runs</p>
          <h2 class="mt-3 display-xl text-[clamp(2.5rem,7vw,5.5rem)]">
            CLUB<br>CALENDAR
          </h2>
        </div>
        <p class="max-w-sm text-sm text-mute">
          Built around our weekly rhythm. Demo interactions only — nothing is booked on a server.
        </p>
      </div>

      <div class="mb-8 grid gap-3 border border-ink/10 bg-panel p-4 sm:grid-cols-3">
        <div v-for="slot in weeklyRhythm" :key="slot.day" class="border border-ink/10 p-4">
          <p class="font-mono text-[10px] uppercase tracking-technical text-magenta">{{ slot.day }}</p>
          <p class="mt-2 font-display text-2xl uppercase tracking-tightest">{{ slot.focus }}</p>
          <p class="mt-1 text-sm text-chrome">{{ slot.time }} · {{ slot.detail }}</p>
        </div>
      </div>

      <div class="mb-8 flex flex-col gap-4 border border-ink/10 bg-panel/50 p-4 md:flex-row md:items-center md:justify-between">
        <div class="flex flex-wrap gap-2" role="group" aria-label="Filter by session type">
          <button
            v-for="opt in typeOptions"
            :key="opt.id"
            type="button"
            class="px-3 py-2 font-mono text-[10px] uppercase tracking-technical transition-colors"
            :class="typeFilter === opt.id ? 'bg-magenta text-carbon' : 'bg-night text-ink hover:bg-magenta hover:text-carbon'"
            :aria-pressed="typeFilter === opt.id"
            @click="typeFilter = opt.id"
          >
            {{ opt.label }}
          </button>
        </div>
        <label class="flex items-center gap-3 font-mono text-[10px] uppercase tracking-technical text-mute">
          Distance
          <select
            v-model="distanceFilter"
            class="border border-ink/20 bg-night px-3 py-2 text-ink"
          >
            <option v-for="d in distanceOptions" :key="d.id" :value="d.id">
              {{ d.label }}
            </option>
          </select>
        </label>
      </div>

      <div v-if="filtered.length === 0" class="border border-dashed border-ink/20 py-16 text-center">
        <p class="font-display text-2xl uppercase">No sessions match</p>
        <button type="button" class="btn-ghost mt-4" @click="typeFilter = 'all'; distanceFilter = 'all'">
          Reset filters
        </button>
      </div>

      <ul v-else class="divide-y divide-ink/10 border-y border-ink/10" role="list">
        <li
          v-for="event in filtered"
          :key="event.id"
          class="group grid cursor-pointer grid-cols-12 gap-3 py-6 transition-colors hover:bg-panel md:gap-4"
          data-cursor-hover
          tabindex="0"
          role="button"
          :aria-label="`View details for ${event.title}`"
          @click="openDetail(event)"
          @keydown.enter="openDetail(event)"
          @keydown.space.prevent="openDetail(event)"
        >
          <div class="col-span-3 md:col-span-1">
            <span class="font-display text-2xl text-magenta md:text-3xl">{{ event.number }}</span>
          </div>
          <div class="col-span-9 md:col-span-4">
            <p class="font-display text-xl uppercase tracking-tightest md:text-2xl group-hover:text-magenta">
              {{ event.title }}
            </p>
            <p class="mt-1 tech-meta text-mute">
              {{ sessionTypeLabels[event.type] }} · {{ event.difficulty }}
            </p>
          </div>
          <div class="col-span-6 md:col-span-2">
            <p class="text-sm font-semibold">{{ formatDate(event.date) }}</p>
            <p class="tech-meta text-mute">{{ event.time }}</p>
          </div>
          <div class="col-span-6 md:col-span-2">
            <p class="font-mono text-lg">{{ event.distanceKm }} KM</p>
            <p class="tech-meta text-mute">{{ event.pace }}</p>
          </div>
          <div class="col-span-8 md:col-span-2">
            <p class="text-sm text-chrome">{{ event.meetingPoint }}</p>
            <p class="mt-1 tech-meta" :class="event.status === 'full' ? 'text-magenta' : 'text-mute'">
              <template v-if="registeredIds.has(event.id)">You're in (demo)</template>
              <template v-else-if="event.status === 'full'">Full</template>
              <template v-else>{{ spotsLeft(event) }} spots · {{ event.status }}</template>
            </p>
          </div>
          <div class="col-span-4 flex items-start justify-end md:col-span-1">
            <span class="font-mono text-[10px] uppercase tracking-technical text-mute transition-colors group-hover:text-magenta">
              Open →
            </span>
          </div>
        </li>
      </ul>
    </div>

    <Teleport to="body">
      <div
        v-if="selected"
        class="fixed inset-0 z-[60] flex items-end justify-center bg-night/80 p-0 md:items-center md:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="run-detail-title"
        @click.self="closeDetail"
      >
        <div class="max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-ink/10 bg-panel shadow-magenta">
          <div class="flex items-start justify-between border-b border-ink/10 p-5 md:p-7">
            <div>
              <p class="section-label !text-magenta">Session {{ selected.number }}</p>
              <h3 id="run-detail-title" class="mt-2 font-display text-3xl uppercase tracking-tightest md:text-4xl">
                {{ selected.title }}
              </h3>
            </div>
            <button type="button" class="btn-ghost !px-3 !py-2 !text-xs" @click="closeDetail">
              Close
            </button>
          </div>

          <div class="grid gap-6 p-5 md:grid-cols-2 md:p-7">
            <dl class="space-y-3 font-mono text-xs uppercase tracking-technical">
              <div class="flex justify-between border-b border-ink/10 pb-2">
                <dt class="text-mute">Date</dt>
                <dd>{{ formatDate(selected.date) }} · {{ selected.time }}</dd>
              </div>
              <div class="flex justify-between border-b border-ink/10 pb-2">
                <dt class="text-mute">Distance</dt>
                <dd>{{ selected.distanceKm }} KM</dd>
              </div>
              <div class="flex justify-between border-b border-ink/10 pb-2">
                <dt class="text-mute">Pace / effort</dt>
                <dd>{{ selected.pace }} · {{ selected.effort }}</dd>
              </div>
              <div class="flex justify-between border-b border-ink/10 pb-2">
                <dt class="text-mute">Elevation</dt>
                <dd>+{{ selected.elevationM }} M</dd>
              </div>
              <div class="flex justify-between border-b border-ink/10 pb-2">
                <dt class="text-mute">Meet</dt>
                <dd class="max-w-[60%] text-right normal-case tracking-normal">{{ selected.meetingPoint }}</dd>
              </div>
              <div class="flex justify-between pb-2">
                <dt class="text-mute">Type</dt>
                <dd>{{ sessionTypeLabels[selected.type] }}</dd>
              </div>
            </dl>

            <div>
              <p class="text-sm leading-relaxed text-chrome">{{ selected.description }}</p>
              <div class="mt-5 border border-magenta/30 bg-night p-4">
                <p class="font-mono text-[10px] uppercase tracking-technical text-magenta">Route preview</p>
                <p class="mt-2 text-sm text-chrome">{{ selected.routePreview }}</p>
                <svg class="mt-4 h-20 w-full" viewBox="0 0 300 60" fill="none" aria-hidden="true">
                  <path
                    d="M 10 45 C 50 40, 70 20, 110 25 S 170 50, 210 30 S 260 10, 290 20"
                    stroke="#FF2EC8"
                    stroke-width="2"
                  />
                  <circle cx="10" cy="45" r="4" fill="#FF2EC8" />
                  <circle cx="290" cy="20" r="4" fill="#F5F5F7" />
                </svg>
              </div>
            </div>
          </div>

          <div class="border-t border-ink/10 p-5 md:p-7">
            <div
              v-if="confirmFlash || registeredIds.has(selected.id)"
              class="mb-4 border border-magenta bg-magenta/15 px-4 py-3 text-sm"
              role="status"
            >
              You're on the list for this demo session. No data was saved to a server.
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <button
                type="button"
                class="btn-primary"
                :disabled="selected.status === 'full' && !registeredIds.has(selected.id)"
                :class="{ 'opacity-40 cursor-not-allowed': selected.status === 'full' && !registeredIds.has(selected.id) }"
                @click="register(selected)"
              >
                <template v-if="registeredIds.has(selected.id)">Registered (demo)</template>
                <template v-else-if="selected.status === 'full'">Session full</template>
                <template v-else>Join this run</template>
              </button>
              <p class="tech-meta text-mute">
                Capacity {{ selected.capacity }} · {{ spotsLeft(selected) }} remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>
