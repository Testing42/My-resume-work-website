<template>
  <header class="sticky top-0 z-50 backdrop-blur-md bg-surface/80 border-b border-white/10">
    <nav class="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
      <router-link to="/" class="group flex items-center gap-2">
        <span
          class="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-dark to-brand flex items-center justify-center text-white font-extrabold shadow-lg shadow-brand/30"
        >M</span>
        <span class="text-lg font-bold text-white group-hover:text-brand-light transition-colors">
          Welcome
        </span>
      </router-link>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-1">
        <li v-for="link in links" :key="link.to">
          <router-link
            :to="link.to"
            class="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            active-class="text-white bg-brand/20 border border-brand/40"
          >{{ link.label }}</router-link>
        </li>
      </ul>

      <!-- Mobile toggle -->
      <button
        class="md:hidden p-2 rounded-lg hover:bg-white/5 text-slate-300"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>
    </nav>

    <!-- Mobile nav -->
    <div class="mobile-nav-wrap md:hidden" :class="{ 'mobile-nav-open': menuOpen }">
      <div class="mobile-nav-inner">
        <ul class="px-6 pb-4 flex flex-col gap-1">
          <li v-for="link in links" :key="link.to">
            <router-link
              :to="link.to"
              class="block px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              active-class="text-white bg-brand/20 border border-brand/40"
              @click="menuOpen = false"
            >{{ link.label }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      links: [
        { to: '/', label: 'Home' },
        { to: '/codeSamples', label: 'Code Samples' },
        { to: '/contact', label: 'Contact' },
      ],
    };
  },
};
</script>

<style scoped>
.mobile-nav-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 1s ease;
}
.mobile-nav-wrap.mobile-nav-open {
  grid-template-rows: 1fr;
}
.mobile-nav-inner {
  overflow: hidden;
  min-height: 0;
}
.mobile-nav-inner li {
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.mobile-nav-open .mobile-nav-inner li {
  opacity: 1;
  transform: translateY(0);
}
.mobile-nav-open .mobile-nav-inner li:nth-child(1) { transition-delay: 0.05s; }
.mobile-nav-open .mobile-nav-inner li:nth-child(2) { transition-delay: 0.1s; }
.mobile-nav-open .mobile-nav-inner li:nth-child(3) { transition-delay: 0.15s; }
</style>
