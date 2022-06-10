import Vue from "vue";
import VueRouter from "vue-router";



Vue.use(VueRouter);

const routes = [


  {
    path: "/graficodinamico",
    name: "graficodinamico",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/GraficoDinamico.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/GraficoDinamico.vue"),
  }, {
    path: "./",
    name: "Prueba",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/Tabla.vue"),
  }, {
    path: "presentacion/",
    name: "Prueba2",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/Asign.vue"),
  }, {
    path: "/tabla",
    name: "tabla",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/Tabla.vue"),
  }, {
    path: "/asign",
    name: "asign",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/Asign.vue"),
  }, {
    path: "/peer",
    name: "peer",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/video.vue"),
  }, {
    path: "/sorteo",
    name: "sorteo",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/Sorteo.vue"),
  },];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
