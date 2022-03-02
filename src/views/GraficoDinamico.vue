<template>
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
