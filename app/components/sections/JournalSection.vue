<script setup lang="ts">
import { journalArticles, journalCategories } from '~/data/journal'
import type { JournalArticle, JournalCategory } from '~/types'

const category = ref<JournalCategory | 'all'>('all')
const openArticle = ref<JournalArticle | null>(null)

const filtered = computed(() =>
  category.value === 'all'
    ? journalArticles
    : journalArticles.filter(a => a.category === category.value),
)

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-PH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

watch(openArticle, (val) => {
  if (!import.meta.client) return
  document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') openArticle.value = null
  }
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <section id="journal" class="border-b border-ink/10 bg-deep">
    <div class="mx-auto max-w-site px-4 py-20 md:px-8 md:py-28">
      <div class="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="section-label">05 — Club Journal</p>
          <h2 class="mt-3 display-xl text-[clamp(2.5rem,7vw,5.5rem)]">
            NIGHT<br>NOTES
          </h2>
        </div>
        <p class="max-w-xs text-sm text-mute">
          Stories from Maples Grove — training, culture, and the people who show up at seven.
        </p>
      </div>

      <div class="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Journal categories">
        <button
          v-for="cat in journalCategories"
          :key="cat.id"
          type="button"
          role="tab"
          class="border px-3 py-2 font-mono text-[10px] uppercase tracking-technical transition-colors"
          :class="category === cat.id ? 'border-magenta bg-magenta text-carbon' : 'border-ink/20 bg-transparent hover:border-magenta'"
          :aria-selected="category === cat.id"
          @click="category = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <div v-if="filtered.length === 0" class="py-16 text-center">
        <p class="font-display text-2xl uppercase">No stories in this category</p>
      </div>

      <div v-else class="grid gap-8 md:grid-cols-12">
        <article
          v-for="(article, i) in filtered"
          :key="article.id"
          class="group flex flex-col border-t border-ink/15 pt-6"
          :class="i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5' : 'md:col-span-4'"
        >
          <button
            type="button"
            class="text-left"
            data-cursor-hover
            @click="openArticle = article"
          >
            <div
              class="relative mb-5 overflow-hidden bg-panel"
              :class="i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'"
            >
              <img
                :src="article.image"
                :alt="article.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                width="800"
                height="500"
              >
              <span class="absolute left-3 top-3 bg-magenta px-2 py-1 font-mono text-[9px] uppercase tracking-technical text-carbon">
                {{ article.category }}
              </span>
            </div>
            <p class="tech-meta text-mute">
              {{ formatDate(article.date) }} · {{ article.readTime }} · {{ article.author }}
            </p>
            <h3
              class="mt-2 font-display uppercase leading-[0.95] tracking-tightest transition-colors group-hover:text-magenta"
              :class="i === 0 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'"
            >
              {{ article.title }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-chrome">{{ article.excerpt }}</p>
            <span class="mt-4 inline-block font-mono text-[10px] uppercase tracking-technical text-magenta">
              Read story →
            </span>
          </button>
        </article>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="openArticle"
        class="fixed inset-0 z-[60] flex items-end justify-center bg-night/80 md:items-center md:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="journal-title"
        @click.self="openArticle = null"
      >
        <article class="max-h-[92vh] w-full max-w-3xl overflow-y-auto bg-panel">
          <div class="relative aspect-[21/9] bg-night">
            <img
              :src="openArticle.image"
              :alt="openArticle.title"
              class="h-full w-full object-cover"
            >
            <button
              type="button"
              class="absolute right-4 top-4 bg-paper px-3 py-2 font-mono text-[10px] uppercase tracking-technical text-night"
              @click="openArticle = null"
            >
              Close
            </button>
          </div>
          <div class="p-6 md:p-10">
            <p class="tech-meta text-mute">
              {{ openArticle.category }} · {{ formatDate(openArticle.date) }} · {{ openArticle.readTime }}
            </p>
            <h3 id="journal-title" class="mt-3 font-display text-4xl uppercase tracking-tightest md:text-5xl">
              {{ openArticle.title }}
            </h3>
            <p class="mt-2 text-sm text-mute">By {{ openArticle.author }}</p>
            <p class="mt-8 text-lg leading-relaxed text-chrome">{{ openArticle.body }}</p>
          </div>
        </article>
      </div>
    </Teleport>
  </section>
</template>
