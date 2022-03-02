import Vue from "vue";
import VueRouter from "vue-router";

import GraficoDinamico from "../views/GraficoDinamico.vue";
import GraficoEjemplo from "../views/GraficoEjemplo.vue";
import FileSelect from "../views/FileSelect.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/FileSelect",
    name: "FileSelect",
    component: FileSelect,
  },
  {
    path: "/GraficoEjemplo",
    name: "GraficoEjemplo",
    component: GraficoEjemplo,
  },

  {
    path: "/graficoDinamico",
    name: "GraficoDinamico",
    component: GraficoDinamico,
  },
  {
    path: "/",
    name: "home",
    component: GraficoDinamico,
  },
  {
    path: "/Tabla",
    name: "tabla",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/Tabla.vue"),
  }, {
    path: "/Asign",
    name: "Asign",
    component: () =>
      import(/* webpackChunkName: "datos"*/ "../views/Asign.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
