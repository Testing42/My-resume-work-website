<template>
  <div class="max-w-6xl mx-auto px-6 py-16 animate-fade-up">
    <h1 class="text-4xl font-extrabold text-white text-center mb-3">Contact</h1>
    <p class="text-slate-400 text-center mb-10 max-w-2xl mx-auto">
      Pick a time on the calendar below to book a meeting with me.
    </p>

    <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-stretch">
      <!-- Left: what to expect -->
      <div class="bg-surface-card border border-white/10 rounded-2xl p-8 flex flex-col justify-center">
        <h2 class="text-xl font-bold text-white mb-4">What to expect</h2>
        <ul class="space-y-3 text-sm text-slate-300">
          <li v-for="item in expectations" :key="item" class="flex gap-3">
            <span class="text-brand mt-0.5">&#9679;</span>
            <span>{{ item }}</span>
          </li>
        </ul>

        <p v-if="calendlyError" class="text-center text-red-400 text-sm mt-8">{{ calendlyError }}</p>
      </div>

      <!-- Right: Calendly inline widget -->
      <!-- Calendly inline widget begin -->
      <div class="bg-surface-card border border-white/10 rounded-2xl p-4 overflow-hidden">
        <div
          ref="calendlyWidget"
          class="calendly-inline-widget"
          :data-url="CALENDLY_INLINE_URL"
          style="min-width:320px;height:720px;"
        ></div>
      </div>
      <!-- Calendly inline widget end -->
    </div>
  </div>
</template>

<script>
// ------------------------------------------------------------------
// CALENDLY SETUP
// The inline calendar needs a *specific event type* URL. If you change
// the event in Calendly, copy its link and paste it here.
// The two query params strip Calendly's description block and cookie
// banner so the calendar fits without scrolling.
// ------------------------------------------------------------------
const CALENDLY_INLINE_URL =
  'https://calendly.com/morcomputation/30min?hide_event_type_details=1&hide_gdpr_banner=1';

// Calendly's widget script/style must be injected from JS: <script> and <link>
// tags are not allowed inside a Vue template.
function loadCalendlyWidget() {
  if (window.Calendly) return Promise.resolve(window.Calendly);

  if (!document.getElementById('calendly-widget-css')) {
    const link = document.createElement('link');
    link.id = 'calendly-widget-css';
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => resolve(window.Calendly);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default {
  data() {
    return {
      calendlyError: null,
      CALENDLY_INLINE_URL,
      expectations: [
        'A 30 minute video call, at a time that works for you.',
        'We start with what you are trying to build or fix.',
        'You leave with concrete next steps, and a follow-up email.',
      ],
    };
  },
  mounted() {
    this.initCalendlyInline();
  },
  methods: {
    async initCalendlyInline() {
      const el = this.$refs.calendlyWidget;
      if (!el) return;
      try {
        const Calendly = await loadCalendlyWidget();
        // Calendly's own auto-scan already embedded it (direct page load)
        if (el.querySelector('iframe') || el.dataset.calendlyInit) return;
        el.dataset.calendlyInit = 'true';
        Calendly.initInlineWidget({ url: CALENDLY_INLINE_URL, parentElement: el });
      } catch {
        this.calendlyError =
          'Calendly could not be reached. Check your connection or ad blocker, then refresh.';
      }
    },
  },
};
</script>
