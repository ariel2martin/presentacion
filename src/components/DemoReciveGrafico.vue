<template>
  <div>
    <v-card style="width: 32rem">
      <v-card-title>
        <v-container>
          <v-row>
            <h6 class="body-2 grey--text text--lighten-1">Temperature</h6>
          </v-row>
          <v-row>
            <v-col>
              <h3 class="headline">
                <v-icon color="blue darken-2">mdi-wifi</v-icon>
                {{ mac }}
              </h3>
            </v-col>
            <v-col>
              <ABadge class="pa-2" type="success">{{ v_mide }}</ABadge>
              &nbsp;
              <ABadge class="pa-2" type="info">{{ puerta }}</ABadge>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
      <v-card-text>
        <line-chart
          style="height: 220px"
          ref="chartLineal"
          :chart-data="chartLineal.chartData"
          :gradient-colors="chartLineal.gradientColors"
          :gradient-stops="chartLineal.gradientStops"
          :extra-options="chartLineal.extraOptions"
          :chartId="chartId"
        >
        </line-chart>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import ABadge from "@/components/ABadge";
import config from "../../configuraciones.js";
import { nuxt } from "@/main";

let cantDeValores = 15;

let chartOptions = {
  fill: true,
  borderColor: config.colors.primary,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.primary,
  pointBorderColor: "rgba(255,255,255,0)",
  pointHoverBackgroundColor: config.colors.primary,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
};

export default {
  middleware: "authenticated",
  name: "DemoReciveGrafico",
  components: {
    LineChart,
    ABadge,
  },

  props: {
    cual: String,
    chartId: String,
  },
  data() {
    return {
      mac: JSON.parse(JSON.stringify(this.cual)),
      deviceSubscribeMide:
        "ssos/" + JSON.parse(JSON.stringify(this.cual)) + "/temp/mide",
      deviceSubscribePuerta:
        "ssos/" + JSON.parse(JSON.stringify(this.cual)) + "/temp/puerta",
      valores: [],
      etiquetas: [],
      ultimamedicion: {},
      chartLineal: {
        chartData: {
          datasets: [
            {
              ...chartOptions,
              data: this.valores,
            },
          ],
          labels: this.etiquetas,
        },
        extraOptions: {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          responsive: true,
          tooltips: {
            backgroundColor: "#f5f5f5",
            titleFontColor: "#333",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
          },
          scales: {
            yAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.0)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  suggestedMin: -5,
                  suggestedMax: 5,
                  padding: 20,
                  fontColor: "#9a9a9a",
                },
              },
            ],

            xAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(225,78,202,0.1)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  autoSkip: false,
                  autoSkipPadding: 1,
                  padding: 20,
                  fontColor: "#9a9a9a",
                },
              },
            ],
          },
        },
        categories: [],
        gradientColors: [
          "rgba(76, 211, 150, 0.1)",
          "rgba(53, 183, 125, 0)",
          "rgba(119,52,169,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },
      v_mide: "",

      mide: "",
      minimo: "",
      maximo: "",

      puerta: "",
      deviceSubscribeTminSet: "",
      deviceSubscribeTmaxSet: "",
      TminSet: "",
      TmaxSet: "",
      deviceSubscribeVivo: "",

      aislada: "",
      vivo: "",
    };
  },

  methods: {
    subscribirse() {
      let sp = [];

      nuxt.$on(this.deviceSubscribeMide, (message) => {
        //this.mide = message;
        //console.log("el chartid: " + this.chartId + " escuchó: " + message);
        sp = message.toString().split(";");

        this.updateChart(sp[0].replace('"', ""), sp[1], sp[2].replace('"', ""));
      });

      nuxt.$on(this.deviceSubscribePuerta, (message) => {
        if (message == '"Trend"' || message == "Trend") {
          this.puerta = "Trend";
        } else {
          this.puerta = "";
        }
      });
    },
    desubscribirse() {
      nuxt.$off(this.deviceSubscribeMide);
      nuxt.$off(this.deviceSubscribePuerta);
    },
    updateChart(valor, min, max) {
      valor = Number(valor);
      min = Number(min);
      max = Number(max);

      // en vez de true en el OR va this.ultimamedicion.medido != valor   para evitar repetidos
      if (this.ultimamedicion.medido === undefined || true) {
        this.ultimamedicion.medido = valor;
        if (this.valores.length >= cantDeValores) {
          this.valores.splice(0, 1);
          this.etiquetas.splice(0, 1);
        }
        let date = new Date();
        let seconds = "0" + date.getSeconds();
        seconds = seconds.slice(-2);
        let minutes = "0" + date.getMinutes();
        minutes = minutes.slice(-2);
        let hour = "0" + date.getHours();
        hour = hour.slice(-2);
        let month = date.getMonth() + 1; // beware: January = 0; February = 1, etc.
        month = "0" + month;
        month = month.slice(-2);
        let day = "0" + date.getDate();
        day = day.slice(-2);
        this.etiquetas.push(
          //day + "/" + month + " " + hour + ":" + minutes + ":" + seconds
          minutes + ":" + seconds
        );

        this.v_mide = valor + "°";
        this.valores.push(valor);

        //console.log(this.graficoConfiguracion.scales.yAxes[0].ticks.min);
        let nuevochartData = {
          datasets: [
            {
              ...chartOptions,
              data: this.valores,
            },
          ],
          labels: this.etiquetas,
        };

        if (this.$refs.chartLineal != undefined) {
          this.$refs.chartLineal.updateGradients(nuevochartData);
        }
        //console.log("voy a cambiar", nuevochartData.datasets[0].data);
        this.chartLineal.chartData = nuevochartData;
      }
      if (
        this.ultimamedicion.min === undefined ||
        this.ultimamedicion.min != min ||
        this.ultimamedicion.max != max
      ) {
        this.ultimamedicion.min = min;
        this.ultimamedicion.max = max;
        let nuevograficoConfiguracion = {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          responsive: true,
          tooltips: {
            backgroundColor: "#f5f5f5",
            titleFontColor: "#333",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
          },
          scales: {
            yAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.0)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  suggestedMin: min,
                  suggestedMax: max,
                  padding: 10,
                  fontColor: "#9a9a9a",
                },
              },
            ],

            xAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(225,78,202,0.1)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  autoSkip: false,
                  autoSkipPadding: 1,
                  padding: 20,
                  fontColor: "#9a9a9a",
                },
              },
            ],
          },
        };

        this.chartLineal.extraOptions = nuevograficoConfiguracion;
      }
    },
  },
  mounted() {
    // this.updateChart(0, 0, 0);
    this.subscribirse();
  },
  created() {},
  beforeDestroy() {
    this.desubscribirse();
    //this.$refs.chartLineal.$destroy();  // inutil, no vale la pena
  },
};
</script>
