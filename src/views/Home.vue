<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-brand-dark/30 via-brand/20 to-fuchsia-500/30 bg-[length:200%_200%] animate-gradient-x"
      ></div>
      <div class="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center animate-fade-up">
        <p class="text-brand-light font-semibold tracking-widest uppercase text-sm mb-3">
          Software Developer &amp; IT Professional
        </p>
        <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-6">
          Hi, I'm <span class="bg-gradient-to-r from-brand-light to-fuchsia-400 bg-clip-text text-transparent">Andres Morales</span>
        </h1>
        <p class="max-w-2xl mx-auto text-slate-300 text-lg leading-relaxed">
          Based in the Columbus Metro Area. If you need a Frontend Developer, Systems Developer,
          Linux Admin, Windows Admin, or Automation Developer — let's talk.
        </p>
        <div class="mt-8 flex justify-center gap-4">
          <router-link
            to="/contact"
            class="px-6 py-3 rounded-xl bg-brand text-white font-semibold shadow-lg shadow-brand/40 hover:bg-brand-dark transition-colors"
          >Get in touch</router-link>
          <router-link
            to="/codeSamples"
            class="px-6 py-3 rounded-xl border border-white/20 text-slate-200 font-semibold hover:border-brand hover:text-brand-light transition-colors"
          >View my work</router-link>
        </div>
      </div>
    </section>

    <!-- Slideshow -->
    <section class="max-w-3xl mx-auto px-6 mt-12 pb-12">
      <div
        class="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 aspect-[16/9] bg-surface-card"
        role="region"
        aria-label="Photo slideshow"
      >
        <transition name="slide" mode="out-in">
          <img
            :key="currentSlide"
            :src="slides[currentSlide].src"
            :alt="slides[currentSlide].alt"
            class="w-full h-full object-cover"
          />
        </transition>
        <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          <button
            v-for="(slide, i) in slides"
            :key="i"
            :aria-label="`Show slide ${i + 1}`"
            class="w-2.5 h-2.5 rounded-full transition-all"
            :class="i === currentSlide ? 'bg-brand w-6' : 'bg-white/40 hover:bg-white/70'"
            @click="currentSlide = i"
          ></button>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="max-w-5xl mx-auto px-6 pb-20">
      <h2 class="text-3xl font-bold text-white text-center mb-10">Skills &amp; Qualifications</h2>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="skill in skills"
          :key="skill.title"
          class="bg-surface-card border border-white/10 rounded-2xl p-6 hover:border-brand/50 hover:-translate-y-1 transition-all duration-300"
        >
          <div class="w-10 h-10 rounded-lg bg-brand/20 flex items-center justify-center mb-4">
            <span class="text-brand-light text-xl">{{ skill.icon }}</span>
          </div>
          <h3 class="text-white font-semibold mb-2">{{ skill.title }}</h3>
          <p class="text-slate-400 text-sm leading-relaxed">{{ skill.body }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import bestpic from '../assets/bestpic.png';
import purple from '../assets/purple.png';
import close from '../assets/close.png';

export default {
  data() {
    return {
      currentSlide: 0,
      timer: null,
      slides: [
        { src: close, alt: 'Close up picture of myself.' },
        { src: bestpic, alt: 'Picture of myself.' },
        { src: purple, alt: 'Picture of purple.' },
      ],
      skills: [
        {
          icon: '⌨️',
          title: 'Programming Languages & Datatypes',
          body: 'Golang, Terraform, C#, Python, JavaScript, PHP, PowerShell, Bash, CSS, HTML, Json, XML, MySQL, and SQL.',
        },
        {
          icon: '🖥️',
          title: 'Operating Systems',
          body: 'Linux and Windows Servers',
        },
        {
          icon: '🛠️',
          title: 'Type of Work Done',
          body: 'Telecommunication Infrastructure, Software Development, Infrastructure Engineering, Systems Engineering, Azure administration, AWS Administration, AI engineering, Windows Administration, Linux Administration',
        },
        {
          icon: '🧰',
          title: 'Key Programs Used',
          body: 'Azure, AWS, VMware, Active Directory, Group Policy, Git, ServiceNow, Splunk, Ollama, Docker, SQL Databases'
        },
        {
          icon: '🎓',
          title: 'Degrees & Certifications',
          body: 'Columbus State Community College: Associate of Software Development. CompTIA A+ Certification. CompTIA Network+ Certification. CompTIA Cloud+ Certification. Microsoft Certified: Azure Fundamentals. Microsoft Certified: Power Platform Fundamentals',
        },
        {
          icon: '📚',
          title: 'Currently Studying',
          body: 'Western Governors University: Cloud Computing.',
        },
      ],
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 4000);
  },
  unmounted() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
