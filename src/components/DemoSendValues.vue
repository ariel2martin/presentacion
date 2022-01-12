<template>
  <v-card style="width: 320px">
    <v-card-title class="body-1"
      >Send values, can be changed by hand</v-card-title
    >

    <v-card-text>
      <blockquote class="blockquote">
        <v-form class="caption">
          <v-layout>
            <v-flex pa-4>
              <v-text-field
                hide-details="auto"
                type="number"
                v-model="mide"
                :messages="errorvalor"
                label="Start"
                class="body-1"
              />
            </v-flex>
            <v-flex pa-4>
              <v-text-field
                hide-details="auto"
                type="number"
                v-model="minimo"
                :messages="errormin"
                label="Min"
                class="body-1"
              />
            </v-flex>
            <v-flex pa-4>
              <v-text-field
                hide-details="auto"
                type="number"
                v-model="maximo"
                :messages="errormax"
                label="Max"
                class="body-1"
              />
            </v-flex>
          </v-layout>
          <v-layout style="align-items: flex-end">
            <v-flex pa-4>
              <v-text-field
                hide-details="auto"
                type="number"
                v-model="tempAmbiente"
                :disabled="desabilitado"
                :messages="errorambiente"
                label="Trend"
                class="body-1"
              />
            </v-flex>
            <v-flex pa-4>
              <v-text-field
                hide-details="auto"
                type="number"
                v-model="probableAperturaPuerta"
                :disabled="desabilitado"
                :messages="errorprobtemp"
                label="Probability"
                class="body-1"
              />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex pa-4>
              <v-btn
                color="primary"
                @click="start()"
                elevation="2"
                block
                :disabled="desabilitado"
              >
                Start
              </v-btn>
            </v-flex>
            <v-flex pa-4>
              <v-btn
                color="primary"
                @click="detener()"
                elevation="2"
                block
                :disabled="!desabilitado"
              >
                Stop&nbsp;
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </blockquote>
    </v-card-text>
  </v-card>
</template>
<script>
import { nuxt } from "../main";
var setInterval1;
var setInterval2;
export default {
  layout: "demo",

  components: {},
  props: ["cual"],
  data() {
    return {
      desabilitado: false,
      mac: JSON.parse(JSON.stringify(this.cual)),
      deviceSubscribeMide: "",

      mide: 3,
      minimo: -10,
      maximo: 10,
      deviceSubscribeTminSet: "",
      deviceSubscribeTmaxSet: "",
      probableCambioTemp: 50,
      tempAmbiente: 25,
      velMedicion: 1,
      deviceSubscribePuerta: "",
      puerta: "cerrada",
      probableAperturaPuerta: 50,

      errorvelocidad: "",
      errorambiente: "",
      errorvalor: "",
      errormin: "",
      errormax: "",
      errorprobtemp: "",
      errorprobpuerta: "",
    };
  },

  methods: {
    start() {
      this.desabilitado = true;

      //ex topic: "userid/did/variableId/sdata"
      this.deviceSubscribeMide = "ssos/" + this.mac + "/temp/mide";
      this.deviceSubscribePuerta = "ssos/" + this.mac + "/temp/puerta";
      this.deviceSubscribeTminSet = "ssos/" + this.mac + "/temp/TminSet";
      this.deviceSubscribeTmaxSet = "ssos/" + this.mac + "/temp/TmaxSet";

      nuxt.$on(this.deviceSubscribePuerta, (message) => {
        this.puerta = this.replaceAll(message.toString(), '"', "");
      });
      nuxt.$on(this.deviceSubscribeTminSet, (message) => {
        this.minimo = parseInt(this.replaceAll(message.toString(), '"', ""));
      });
      nuxt.$on(this.deviceSubscribeTmaxSet, (message) => {
        this.maximo = parseInt(this.replaceAll(message.toString(), '"', ""));
      });

      this.enviamedicion();
      this.enviaPuerta();
      setInterval1 = setInterval(this.enviamedicion, this.velMedicion * 1000);
      setInterval2 = setInterval(this.enviaPuerta, this.velMedicion * 1000);
    },
    enviamedicion() {
      let huboerror = false;
      this.errorvelocidad = "";
      if (isNaN(this.velMedicion) || this.velMedicion.length < 1) {
        this.errorvelocidad = "no es numero";
        huboerror = true;
      }
      this.errorambiente = "";
      if (isNaN(this.tempAmbiente) || this.tempAmbiente.length < 1) {
        this.errorambiente = true;
        huboerror = true;
      }
      this.errorvalor = "";
      if (isNaN(this.mide) || this.mide.length < 1) {
        this.errorvalor = "no es numero";
        huboerror = true;
      }
      this.errormin = "";
      if (isNaN(this.minimo) || this.minimo.length < 1) {
        this.errormin = "no es numero";
        huboerror = true;
      }
      this.errormax = "";
      if (isNaN(this.maximo) || this.maximo.length < 1) {
        this.errormax = "no es numero";
        huboerror = true;
      }
      this.errorprobtemp = "";
      if (
        isNaN(this.probableCambioTemp) ||
        this.probableCambioTemp.length < 1
      ) {
        this.errorprobtemp = "no es numero";
        huboerror = true;
      }
      this.errorprobpuerta = "";
      if (
        isNaN(this.probableAperturaPuerta) ||
        this.probableAperturaPuerta.length < 1
      ) {
        this.errorprobpuerta = "no es numero";
        huboerror = true;
      }
      if (huboerror) {
        return;
      }
      if (this.velMedicion < 1) {
        this.velMedicion = 1;
      }
      if (this.probableCambioTemp > 99) {
        this.probableCambioTemp = 99;
      }
      if (this.probableCambioTemp < 0) {
        this.probableCambioTemp = 0;
      }

      if (this.probableAperturaPuerta > 99) {
        this.probableAperturaPuerta = 99;
      }
      if (this.probableAperturaPuerta < 0) {
        this.probableAperturaPuerta = 0;
      }
      if (this.probableAperturaPuerta == 0) {
        this.puerta = "cerrada";
      }
      if (this.puerta == "cerrada") {
        if (Math.floor(Math.random() * 100 <= this.probableCambioTemp)) {
          this.mide = parseFloat(
            parseFloat(this.mide) + (Math.round(Math.random() * 10) - 5)
          ).toFixed(0);
        }
      }
      if (this.puerta == "abierta") {
        let t = Math.round(Math.random() * 10) - 5;
        if (
          (this.mide < this.tempAmbiente && t > 0) ||
          (this.mide > this.tempAmbiente && t < 0)
        ) {
          this.mide = parseFloat(parseFloat(this.mide) + t).toFixed(0);
        }
      }

      let mensaje = this.mide + ";" + this.minimo + ";" + this.maximo;
      nuxt.$emit(this.deviceSubscribeMide, JSON.stringify(mensaje));
    },
    enviaPuerta() {
      if (this.puerta == "cerrada") {
        if (Math.floor(Math.random() * 100 <= this.probableAperturaPuerta)) {
          this.puerta = "abierta";
          nuxt.$emit(this.deviceSubscribePuerta, "abierta");
        }
      } else {
        if (Math.floor(Math.random() * 100 <= this.probableAperturaPuerta)) {
          this.puerta = "cerrada";
          nuxt.$emit(this.deviceSubscribePuerta, "cerrada");
        }
      }
    },
    detener() {
      this.desabilitado = false;
      clearInterval(setInterval1);
      clearInterval(setInterval2);
    },
    replaceAll(string, search, replace) {
      return string.split(search).join(replace);
    },
  },
  mounted() {
    this.start();
  },
  created() {},
};
</script>
<style scoped>
.blockquote {
  border-left: none;
  border: 1px solid #344675;
  padding: 20px;
  font-size: 0.9625rem;
  line-height: 1.8;
}
</style>
