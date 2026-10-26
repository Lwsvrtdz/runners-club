<template>
  <div class="relative min-h-screen overflow-x-hidden bg-night text-ink">
    <AppNav />
    <main>
      <slot />
    </main>
    <AppFooter />
    <ClientOnly>
      <SiteCursor />
    </ClientOnly>
  </div>
</template>
