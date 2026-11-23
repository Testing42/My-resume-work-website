import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CodeSamples from '../views/CodeSamples.vue';
import Contact from '../views/Contact.vue';

const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: 'Home', description: 'Morcomputation - Andres Morales, software developer and IT professional.' },
  },
  {
    path: '/codeSamples',
    component: CodeSamples,
    meta: { title: 'Code Samples', description: 'Code samples of automation scripts in Powershell, Bash, Python, and JavaScript.' },
  },
  {
    path: '/contact',
    component: Contact,
    meta: { title: 'Contact', description: 'Ways to contact Andres Morales directly.' },
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Morcomputation` : 'Morcomputation';
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description);
  }
});

export default router;
