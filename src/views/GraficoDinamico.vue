<template>
  <v-container>
    <v-row no-gutters>
      <v-col class="mx-1 mb-3">
        <DemoSendValues cual="Demo1" />
      </v-col>
      <v-col class="mx-1 mb-3">
        <DemoReciveGrafico cual="Demo1" chartId="chartlinealExample" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DemoSendValues from "@/components/DemoSendValues.vue";
import DemoReciveGrafico from "@/components/DemoReciveGrafico.vue";
export default {
  name: "graficoDinamico",
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
<style>
.theme--dark.v-card {
  background-color: #27293d;
  color: rgba(255, 255, 255, 0.1);
  color: #ffffffcc;

  border: 0;

  margin-bottom: 30 px;
  box-shadow: 0 1px 20px 0px rgb(0 0 0 / 10%);
}
</style>
