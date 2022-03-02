<template>
  <v-card style="width: 320px">
    <v-card-title class="body-1"
      >It sends values, try changing them</v-card-title
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
                :error-messages="errorvalor"
                label="Start"
                class="body-1"
              />
            </v-flex>
            <v-flex pa-4>
              <v-text-field
                hide-details="auto"
                type="number"
                v-model="minimo"
                :error-messages="errormin"
                label="Min"
                class="body-1"
              />
            </v-flex>
            <v-flex pa-4>
              <v-text-field
                hide-details="auto"
                type="number"
                v-model="maximo"
                :error-messages="errormax"
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
                :error-messages="errorambiente"
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
                :error-messages="errorprobpuerta"
                label="Prob1 %"
                class="body-1"
              />
            </v-flex>
            <v-flex pa-4>
              <v-text-field
                hide-details="auto"
                type="number"
                v-model="probableCambioTemp"
                :disabled="desabilitado"
                :error-messages="errorprobtemp"
                label="Prob2 %"
                class="body-1"
              />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex pa-4>
              <v-btn
                color="success"
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
                color="success"
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
  name: "DemoSendValues",

  components: {},
  props: {
    cual: String,
  },
  data() {
    return {
      desabilitado: false,
      mac: JSON.parse(JSON.stringify(this.cual)),
      deviceSubscribeMide: "",

      mide: 5,
      minimo: -10,
      maximo: 10,
      deviceSubscribeTminSet: "",
      deviceSubscribeTmaxSet: "",
      probableCambioTemp: 50,
      tempAmbiente: 25,
      velMedicion: 1,
      deviceSubscribePuerta: "",
      puerta: "Normal",
      probableAperturaPuerta: 75,

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
      this.deviceSubscribeMide = "ssos/" + this.mac + "/temp/mide";
      this.deviceSubscribePuerta = "ssos/" + this.mac + "/temp/puerta";
      this.enviamedicion();
      this.enviaPuerta();
      setInterval1 = setInterval(this.enviamedicion, this.velMedicion * 1000);
      setInterval2 = setInterval(this.enviaPuerta, this.velMedicion * 1000);
    },
    enviamedicion() {
      let huboerror = false;
      this.errorvelocidad = "";
      if (isNaN(this.velMedicion) || this.velMedicion.length < 1) {
        this.errorvelocidad = "number";
        huboerror = true;
      }
      this.errorambiente = "";
      if (isNaN(this.tempAmbiente) || this.tempAmbiente.length < 1) {
        this.errorambiente = "number";
        huboerror = true;
      }
      this.errorvalor = "";
      if (isNaN(this.mide) || this.mide.length < 1) {
        this.errorvalor = "number";
        huboerror = true;
      }
      this.errormin = "";
      if (isNaN(this.minimo) || this.minimo.length < 1) {
        this.errormin = "number";
        huboerror = true;
      }
      this.errormax = "";
      if (isNaN(this.maximo) || this.maximo.length < 1) {
        this.errormax = "number";
        huboerror = true;
      }
      this.errorprobtemp = "";
      if (
        isNaN(this.probableCambioTemp) ||
        this.probableCambioTemp.length < 1
      ) {
        this.errorprobtemp = "number";
        huboerror = true;
      }
      this.errorprobpuerta = "";
      if (
        isNaN(this.probableAperturaPuerta) ||
        this.probableAperturaPuerta.length < 1
      ) {
        this.errorprobpuerta = "number";
        huboerror = true;
      }
      if (huboerror) {
        this.detener();
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
        this.puerta = "Normal";
      }
      if (this.puerta == "Normal") {
        if (Math.floor(Math.random() * 100 <= this.probableCambioTemp)) {
          this.mide = parseFloat(
            parseFloat(this.mide) + (Math.round(Math.random() * 10) - 5)
          ).toFixed(0);
        }
      }
      if (this.puerta == "Trend") {
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
      if (Math.floor(Math.random() * 100 <= this.probableAperturaPuerta)) {
        this.puerta = "Trend";
        nuxt.$emit(this.deviceSubscribePuerta, "Trend");
      } else {
        this.puerta = "Normal";
        nuxt.$emit(this.deviceSubscribePuerta, "Normal");
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
