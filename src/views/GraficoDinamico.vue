<template>
  <div>
    <v-alert border="left" color="indigo" dark>
      El primer módulo envía mensajes, el segundo módulo los escucha para
      graficarlos adaptando dinámicamente sus ejes
    </v-alert>
    <v-alert border="left" color="indigo lighten-2" dark>
      Los mensajes que envía comienzan con un valor de referencia luego hay un
      porcentaje de probabilidad (Prob2) de que el valor cambie, y otro
      porcentaje de probabilidad (Prob1) que ese cambio sea en la dirección del
      valor de tendencia (Trend)
    </v-alert>
    <v-container>
      <v-row no-gutters>
        <v-col class="mx-0 mb-3">
          <DemoSendValues cual="Demo1" />
        </v-col>
        <v-col class="mx-0 mb-3">
          <DemoReciveGrafico cual="Demo1" chartId="chartlinealExample" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DemoSendValues from "@/components/DemoSendValues.vue";
import DemoReciveGrafico from "@/components/DemoReciveGrafico.vue";
export default {
  name: "GraficoDinamico",
  components: {
    DemoSendValues,
    DemoReciveGrafico,
  },
  data() {
    return {};
  },

  mounted() {},
  created() {},

  methods: {},
};
</script>
