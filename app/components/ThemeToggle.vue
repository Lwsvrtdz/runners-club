<script setup lang="ts">
const { isDark, toggleTheme } = useClubTheme()
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 border border-ink/20 px-3 py-2 font-mono text-[10px] uppercase tracking-technical transition-colors hover:border-magenta hover:text-magenta"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-pressed="isDark"
    @click="toggleTheme"
  >
    <span
      class="h-1.5 w-1.5 rounded-full transition-colors"
      :class="isDark ? 'bg-magenta' : 'bg-ink'"
      aria-hidden="true"
    />
    <span>{{ isDark ? 'Night' : 'Day' }}</span>
  </button>
</template>
