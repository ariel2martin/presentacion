import Vue from "vue";
import VueRouter from "vue-router";



Vue.use(VueRouter);
//nombre igual que el path
const routes = [

  {
    path: "/graficodinamico",
    name: "graficodinamico",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/GraficoDinamico.vue"),
  },
  {
    path: "/",
    name: "graficodinamico ",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/GraficoDinamico.vue"),
  }, {
    path: "/relays",
    name: "relays",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/Relays.vue"),
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
      import(/* webpackChunkName: "datos"*/ "../views/Video.vue"),
  }, {
    path: "/carter",
    name: "carter",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/Carter.vue"),
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
