import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue"
import Setup from "./views/Setup.vue"
import Reveal from "./views/Reveal.vue"

export const router = createRouter({
    history: createWebHistory(),
    routes: [
      { name: 'home', path: '/', component: Home },
      { name: 'setup', path: '/setup', component: Setup },
      { name: 'reveal', path: '/reveal', component: Reveal },
    ],
  })
  