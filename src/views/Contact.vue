<template>
  <div class="max-w-2xl mx-auto px-6 py-16 animate-fade-up">
    <h1 class="text-4xl font-extrabold text-white text-center mb-3">Contact</h1>
    <p class="text-slate-400 text-center mb-10">
      Send me a quick message below, or pick a time on the calendar further down
      to book a meeting with me.
    </p>

    <form
      name="contact"
      method="POST"
      netlify-honeypot="bot-field"
      data-netlify="true"
      class="bg-surface-card border border-white/10 rounded-2xl p-8 space-y-5"
      @submit="onSubmit"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p class="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </p>

      <div>
        <label class="block text-sm font-medium text-slate-300 mb-1.5" for="name">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          name="name"
          placeholder="Your name"
          required
          class="w-full rounded-xl bg-surface border border-white/15 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-300 mb-1.5" for="email">Email Address</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          class="w-full rounded-xl bg-surface border border-white/15 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-300 mb-1.5" for="message">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          name="message"
          rows="5"
          placeholder="How can I help?"
          required
          class="w-full rounded-xl bg-surface border border-white/15 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition resize-y"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full py-3 rounded-xl bg-brand text-white font-semibold shadow-lg shadow-brand/40 hover:bg-brand-dark transition-colors"
      >Submit</button>

      <p v-if="status" class="text-center text-sm" :class="status.ok ? 'text-emerald-400' : 'text-red-400'">
        {{ status.message }}
      </p>
    </form>

    <!-- Calendly scheduling section -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold text-white text-center mb-2">Schedule a meeting</h2>
      <p class="text-slate-400 text-center mb-6">
        Pick a time that works for you below.
      </p>

      <div class="flex justify-center mb-6">
        <button
          type="button"
          class="px-6 py-3 rounded-xl bg-brand text-white font-semibold shadow-lg shadow-brand/40 hover:bg-brand-dark transition-colors"
          @click="openCalendlyPopup"
        >Show available meeting times</button>
      </div>

      <!-- Direct inline embed: works once CALENDLY_EVENT_URL points to a specific event type -->
      <div v-if="showInline" class="overflow-hidden rounded-2xl border border-white/10">
        <div
          ref="calendlyWidget"
          class="calendly-inline-widget"
          :data-url="CALENDLY_EVENT_URL"
          style="min-width:320px;height:700px;"
        ></div>
      </div>
      <p v-else class="text-center text-slate-500 text-sm">
        Use the button above to pick a time.
      </p>

      <p v-if="calendlyError" class="text-center text-red-400 text-sm mt-3">{{ calendlyError }}</p>
    </div>
  </div>
</template>

<script>
// ------------------------------------------------------------------
// CALENDLY SETUP
// The URL below is your profile root, which works for popups.
// Inline embedding needs a *specific event type* URL, e.g.:
//   https://calendly.com/morcomputation/30min
// Find it in Calendly: Event Types -> your event -> "Copy" the link,
// then paste it below. The embedded calendar turns on automatically.
// ------------------------------------------------------------------
const CALENDLY_PROFILE_URL = 'https://calendly.com/morcomputation';
const CALENDLY_EVENT_URL = '';

export default {
  data() {
    return {
      form: { name: '', email: '', message: '' },
      status: null,
      calendlyError: null,
      calendlyTimer: null,
      CALENDLY_EVENT_URL,
    };
  },
  computed: {
    showInline() {
      return Boolean(CALENDLY_EVENT_URL);
    },
  },
  mounted() {
    if (CALENDLY_EVENT_URL) {
      this.setupCalendly();
    }
  },
  unmounted() {
    clearInterval(this.calendlyTimer);
  },
  methods: {
    waitForCalendly(then) {
      if (window.Calendly) {
        then();
        return;
      }
      let waited = 0;
      this.calendlyTimer = setInterval(() => {
        waited += 250;
        if (window.Calendly) {
          clearInterval(this.calendlyTimer);
          then();
        } else if (waited >= 10000) {
          clearInterval(this.calendlyTimer);
          this.calendlyError =
            'Calendly could not be reached. Check your connection or ad blocker, then refresh.';
        }
      }, 250);
    },
    openCalendlyPopup() {
      this.calendlyError = null;
      this.waitForCalendly(() => {
        try {
          window.Calendly.initPopupWidget({ url: CALENDLY_PROFILE_URL });
        } catch (err) {
          console.warn('Calendly popup failed to open:', err);
          // Fallback: open your Calendly page in a new tab
          window.open(CALENDLY_PROFILE_URL, '_blank', 'noopener');
        }
      });
    },
    setupCalendly() {
      const el = this.$refs.calendlyWidget;
      if (!el) return;

      const tryInit = () => {
        // Already embedded by Calendly's own auto-scan (direct page load)
        if (el.querySelector('iframe')) return true;
        if (window.Calendly && typeof window.Calendly.initInlineWidget === 'function') {
          try {
            window.Calendly.initInlineWidget({
              url: CALENDLY_EVENT_URL,
              parentElement: el,
            });
            return true;
          } catch (err) {
            console.warn('Calendly inline widget init failed:', err);
            this.calendlyError =
              'The Calendly widget was blocked. Check your network or ad blocker, then refresh.';
            return true; // stop retrying
          }
        }
        return false;
      };

      if (tryInit()) return;

      // Script not loaded yet — wait up to 10 seconds for it
      let waited = 0;
      this.calendlyTimer = setInterval(() => {
        waited += 250;
        if (tryInit()) {
          clearInterval(this.calendlyTimer);
        } else if (waited >= 10000) {
          clearInterval(this.calendlyTimer);
          this.calendlyError =
            'Calendly could not be reached. Check your connection or ad blocker, then refresh.';
        }
      }, 250);
    },
    async onSubmit(e) {
      e.preventDefault();
      try {
        const body = new URLSearchParams({
          'form-name': 'contact',
          'bot-field': '',
          name: this.form.name,
          email: this.form.email,
          message: this.form.message,
        });
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        });
        if (res.ok) {
          this.status = { ok: true, message: 'Thanks! Your message has been sent.' };
          this.form = { name: '', email: '', message: '' };
        } else {
          this.status = { ok: false, message: 'Something went wrong. Please try again.' };
        }
      } catch {
        this.status = { ok: false, message: 'Form submission needs the deployed site (Netlify). It will not send in local preview.' };
      }
    },
  },
};
</script>
