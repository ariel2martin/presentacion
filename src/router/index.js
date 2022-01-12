import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Vacio from '../views/Vacio.vue';
import GraficoDinamico from '../views/GraficoDinamico.vue';
Vue.use(VueRouter);




const routes = [
  {

    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/vacio',
    name: 'Vacio',
    component: Vacio
  },
  {
    path: '/graficoDinamico',
    name: 'GraficoDinamico',
    component: GraficoDinamico
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
