<template>
  <div class="max-w-4xl mx-auto px-6 py-16 animate-fade-up">
    <h1 class="text-4xl font-extrabold text-white text-center mb-3">Programs</h1>
    <p class="text-slate-400 text-center mb-10">
      Here are a few live demo apps I created, and code samples I have developed.
      Feel free to copy and use them.
    </p>

    <div class="space-y-4">
      <!-- ============ OHGO Camera App ============ -->
      <section class="sample" :class="{ 'border-brand/50': open === 0, 'acc-open-parent': open === 0 }">
        <button class="acc-btn" :aria-expanded="open === 0" @click="toggle(0)">
          <span class="text-slate-100">OHGO API App: View cameras throughout Ohio</span>
          <span class="toggle">{{ open === 0 ? '−' : '+' }}</span>
        </button>
        <div class="acc-panel" :class="{ 'acc-open': open === 0 }">
          <div class="acc-inner">
            <div class="px-6 pb-6">
          <p class="text-slate-400 text-sm mb-4">
            Hit the "Show Random Camera" button for a random Ohio camera that updates
            every second, or pick a specific camera from the dropdown.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <button
              class="px-5 py-2.5 rounded-xl bg-brand text-white font-semibold shadow-lg shadow-brand/40 hover:bg-brand-dark transition-colors"
              @click="selectRandomCamera"
            >Show Random Camera</button>
            <select
              v-model.number="cameraIndex"
              class="w-full sm:w-auto max-w-full rounded-xl bg-surface border border-white/15 px-4 py-2.5 text-white focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition"
              @change="applySelectedCamera"
            >
              <option :value="null" disabled>— Pick a camera —</option>
              <option v-for="(cam, i) in cameras" :key="i" :value="i">{{ cam.mainRoute }}</option>
            </select>
          </div>
          <div v-if="selectedCamera" class="text-center">
            <p class="text-brand-light font-semibold mb-3">Street View name: {{ selectedCamera.mainRoute }}</p>
            <img
              :src="selectedCamera.largeUrl"
              alt="Ohio traffic camera image"
              class="mx-auto max-w-full rounded-xl border border-white/10"
              @error="handleImageError"
            />
          </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ GitHub API App ============ -->
      <section class="sample" :class="{ 'border-brand/50': open === 1, 'acc-open-parent': open === 1 }">
        <button class="acc-btn" :aria-expanded="open === 1" @click="toggle(1)">
          <span class="text-slate-100">JavaScript: Github API app</span>
          <span class="toggle">{{ open === 1 ? '−' : '+' }}</span>
        </button>
        <div class="acc-panel" :class="{ 'acc-open': open === 1 }">
          <div class="acc-inner">
            <div class="px-6 pb-6">
          <p class="text-slate-400 text-sm mb-4">
            Type a Github username below and hit enter to see their profile.
          </p>
          <form class="flex gap-2 max-w-md mx-auto mb-6" @submit.prevent="getProfile">
            <input
              v-model="username"
              type="text"
              placeholder="Username (e.g. testing42)"
              class="flex-grow rounded-xl bg-surface border border-white/15 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition"
            />
            <button
              type="submit"
              class="px-5 py-2.5 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition-colors"
            >Submit</button>
          </form>

          <p v-if="ghError" class="text-center text-red-400 text-sm">{{ ghError }}</p>

          <div v-if="user" class="max-w-md mx-auto bg-surface-card border border-white/10 rounded-2xl overflow-hidden">
            <div class="bg-brand/20 border-b border-white/10 px-4 py-3 text-center">
              <h3 class="font-bold text-white">{{ user.name || user.login }}</h3>
            </div>
            <div class="p-5 text-center">
              <img :src="user.avatar_url" alt="Avatar" class="mx-auto rounded-full w-32 h-32 mb-4 border-2 border-brand/50" />
              <div class="flex justify-center gap-4 text-sm text-slate-300 mb-4">
                <span><strong class="text-brand-light">{{ user.public_repos }}</strong> repos</span>
                <span><strong class="text-brand-light">{{ user.public_gists }}</strong> gists</span>
                <span>Member since <strong class="text-brand-light">{{ memberSince }}</strong></span>
              </div>
              <p v-if="user.blog" class="text-sm text-slate-400 break-all mb-1">Website: {{ user.blog }}</p>
              <p v-if="user.email" class="text-sm text-slate-400 mb-4">Email: {{ user.email }}</p>
              <a
                :href="user.html_url"
                target="_blank"
                rel="noopener"
                class="inline-block px-5 py-2 rounded-xl border border-white/15 text-sm font-semibold text-slate-200 hover:border-brand hover:text-brand-light transition-colors"
              >Visit Github</a>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ 3D Star ============ -->
      <section class="sample" :class="{ 'border-brand/50': open === 2, 'acc-open-parent': open === 2 }">
        <button class="acc-btn" :aria-expanded="open === 2" @click="toggle(2)">
          <span class="text-slate-100">3D interactable rotating Mario star</span>
          <span class="toggle">{{ open === 2 ? '−' : '+' }}</span>
        </button>
        <div class="acc-panel" :class="{ 'acc-open': open === 2 }">
          <div class="acc-inner">
            <div
              class="relative"
              :style="{ backgroundImage: `url(${starBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
            >
              <p class="text-brand-light text-sm text-center py-3 bg-black/60">
                This is a 3D rotating star that you can drag to rotate and zoom with your mouse or scroll wheel.
              </p>
              <div ref="starContainer" class="w-full h-[60vh]"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ AI Image Slider ============ -->
      <section class="sample" :class="{ 'border-brand/50': open === 3, 'acc-open-parent': open === 3 }">
        <button class="acc-btn" :aria-expanded="open === 3" @click="toggle(3)">
          <span class="text-slate-100">Flux AI Comfyui Image slider</span>
          <span class="toggle">{{ open === 3 ? '−' : '+' }}</span>
        </button>
        <div class="acc-panel" :class="{ 'acc-open': open === 3 }">
          <div class="acc-inner">
            <div class="px-6 pb-6">
          <p class="text-slate-400 text-sm mb-4">
            A custom slideshow I created with 3 locally generated AI images.
          </p>
          <div class="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black">
            <div
              v-for="(slide, i) in aiSlides"
              :key="i"
              class="absolute inset-0 transition-opacity duration-[1500ms]"
              :class="i === currentSlide ? 'opacity-100' : 'opacity-0'"
            >
              <img :src="slide.src" :alt="slide.caption" class="w-full h-full object-contain" />
              <div class="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs text-center py-2">
                {{ slide.caption }}
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ Script samples ============ -->
      <section
        v-for="(sample, i) in samples"
        :key="sample.title"
        class="sample"
        :class="{ 'border-brand/50': open === i + 4, 'acc-open-parent': open === i + 4 }"
      >
        <button class="acc-btn" :aria-expanded="open === i + 4" @click="toggle(i + 4)">
          <span class="text-slate-100">{{ sample.title }}</span>
          <span class="toggle">{{ open === i + 4 ? '−' : '+' }}</span>
        </button>
        <div class="acc-panel" :class="{ 'acc-open': open === i + 4 }">
          <div class="acc-inner">
            <div class="px-6 pb-6">
          <div class="flex justify-end mb-2">
            <button
              class="text-xs px-3 py-1.5 rounded-lg border border-white/15 text-slate-300 hover:border-brand hover:text-brand-light transition-colors"
              @click="copy(sample.code, i + 4)"
            >
              {{ copiedIndex === i + 4 ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-brand-light overflow-x-auto leading-relaxed"><code>{{ sample.code }}</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import camerasData from '../assets/cameras.json';
import bearImage from '../assets/bearhottub.png';
import landscapeImage from '../assets/prettylandscape.png';
import redheadImage from '../assets/redheadcountry.png';
import starBackground from '../assets/IrF.gif';

const cameras = camerasData.links;

export default {
  data() {
    return {
      open: null,
      copiedIndex: null,

      // OHGO camera app
      cameras,
      cameraIndex: 0,
      selectedCamera: { ...cameras[0] },
      refreshTimer: null,

      // Github app
      username: '',
      user: null,
      ghError: null,

      // 3D star
      starBackground,
      starStarted: false,

      // AI slideshow
      currentSlide: 0,
      slideTimer: null,
      aiSlides: [
        { src: bearImage, caption: 'Bear creatures in a hottub drinking coffee.' },
        { src: landscapeImage, caption: 'Beautiful Landscape.' },
        { src: redheadImage, caption: 'Red headed woman in a farm.' },
      ],

      samples: [
        {
          title: 'PowerShell: Move a file to multiple PCs',
          code: `# The location of the host.txt file must be given below.
Set-Location "C:\\location\\here"
$computers = get-content C:\\Users\\amorales\\Documents\\hosts.txt

foreach ($computer in $computers) {
    $remoteFilePath = \\\\$computer\\c$\\Users\\Public\\Documents\\presentation.mp4
    Copy-Item -Path \\\\server\\marketing\\store\\StoreMBRBoard.mp4 -Destination $remoteFilePath -Force
    Write-Host "I've just copied the file to $remoteFilePath"
}`,
        },
        {
          title: 'Bash: Restart a service for 1 hour',
          code: `#!/bin/bash
read -p 'What service do you want to restart:' serv
lowerServ=$(echo $serv | tr '[:upper:]' '[:lower:]')

sudo systemctl stop $lowerServ.service
echo $lowerServ' service is disabled'
echo '                              '
echo 'waiting for 1 hour before service starts'

sleep 1h
sudo systemctl start $lowerServ.service
echo $lowerServ' service is enabled'`,
        },
        {
          title: 'PowerShell: Remotely clear Teams cache for all users',
          code: `Write-Host "Make sure the user's Teams has been quit completely"
Write-Host "This will clear the Teams cache for all users on the PC"

$Computer = Read-Host "Please Enter Computer Name: "

Invoke-Command -ComputerName $Computer -ScriptBlock {
    Get-ChildItem "C:\\Users\\*\\AppData\\Roaming\\Microsoft\\Teams\\*" -directory |
        Where name -in ('application cache','blob_storage','databases','GPUcache','IndexedDB','Local Storage','tmp','Temp','Cache') |
        ForEach { Remove-Item $_.FullName -Recurse -Force }
}`,
        },
        {
          title: "Python: Paste today's date",
          code: `from datetime import date
import pyperclip as pc
import pyautogui

now = date.today()
date = now.strftime("%m/%d/%y")

pc.copy(date)
pyautogui.click()
pc.paste(date)`,
        },
        {
          title: 'Python: Random number generator',
          code: `import random, sys

print('Do you want a random number between 1-10')
print('Please type yes or no')
answer = input()

realAnswer = answer.lower()
while realAnswer == 'yes':
    print(random.randint(1, 10))
    print('would you like another random number yes or no')
    answer = input()
    realAnswer = answer.lower()

print('No number for you')
sys.exit()`,
        },
      ],
    };
  },
  computed: {
    memberSince() {
      if (!this.user || !this.user.created_at) return '';
      return new Date(this.user.created_at).toLocaleDateString('en-US');
    },
  },
  mounted() {
    // Refresh the camera image every second, like the original app
    this.refreshTimer = setInterval(() => {
      if (this.selectedCamera) {
        this.selectedCamera.largeUrl =
          this.selectedCamera.largeUrl.split('?')[0] + '?timestamp=' + Date.now();
      }
    }, 1000);

    this.slideTimer = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.aiSlides.length;
    }, 5000);
  },
  unmounted() {
    clearInterval(this.refreshTimer);
    clearInterval(this.slideTimer);
  },
  methods: {
    toggle(index) {
      this.open = this.open === index ? null : index;
      if (index === 2 && this.open === 2) {
        this.$nextTick(this.initStar);
      }
    },

    // ---- OHGO camera app ----
    applySelectedCamera() {
      if (this.cameraIndex === null || !cameras[this.cameraIndex]) return;
      this.selectedCamera = { ...cameras[this.cameraIndex] };
    },
    selectRandomCamera() {
      this.cameraIndex = Math.floor(Math.random() * cameras.length);
      this.applySelectedCamera();
    },
    handleImageError() {
      console.warn('Image failed to load. Trying another random camera.');
      this.selectRandomCamera();
    },

    // ---- Github app ----
    async getProfile() {
      this.ghError = null;
      this.user = null;
      const name = this.username.trim() || 'testing42';
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(name)}`);
        if (!res.ok) throw new Error('not found');
        this.user = await res.json();
      } catch {
        this.ghError = `Error fetching profile for "${name}".`;
      }
    },

    // ---- 3D star (lazy-loads three.js the first time the panel opens) ----
    async initStar() {
      if (this.starStarted) return;
      const container = this.$refs.starContainer;
      if (!container) return;
      this.starStarted = true;

      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xf2f2f2, 4));

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 4;

      new GLTFLoader().load(
        new URL('../assets/starp.glb', import.meta.url).href,
        (gltf) => {
          scene.add(gltf.scene);
          gltf.scene.scale.set(3, 3, 3);
          camera.position.z = 5;
          const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
          };
          animate();
        },
        undefined,
        (err) => {
          console.error('An error occurred while loading the model:', err);
          this.starStarted = false;
        }
      );
    },

    // ---- copy button ----
    async copy(code, index) {
      try {
        await navigator.clipboard.writeText(code);
        this.copiedIndex = index;
        setTimeout(() => (this.copiedIndex = null), 2000);
      } catch (e) {
        // Clipboard API unavailable (e.g. insecure context) — ignore
      }
    },
  },
};
</script>

<style scoped>
.sample {
  background: #17171f;
  border: 1px solid rgb(255 255 255 / 0.1);
  border-radius: 1rem;
  overflow: hidden;
  transition: border-color 0.3s ease;
}
.acc-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  transition: background-color 0.2s ease;
}
.acc-btn:hover {
  background: rgb(255 255 255 / 0.05);
}
.toggle {
  color: #c084fc;
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}
.acc-open-parent .toggle {
  transform: rotate(180deg);
}
.acc-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s ease;
}
.acc-panel.acc-open {
  grid-template-rows: 1fr;
}
.acc-inner {
  overflow: hidden;
  min-height: 0;
}
</style>
