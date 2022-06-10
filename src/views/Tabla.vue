<template>
  <div>
    <v-scroll-y-reverse-transition>
      <v-alert v-show="muestramensaje1" border="left" color="indigo" dark>
        la tabla se completa con los datos obtenidos de la pagina
        https://raw.githubusercontent.com/ariel2martin/presentacion/master/dist/derivados.json
        y los ordena
        <v-btn
          class="mx-3"
          :color="Complementario3"
          @click="muestramensaje1 = false"
        >
          Cerrar
        </v-btn>
      </v-alert>
    </v-scroll-y-reverse-transition>
    <v-scroll-y-reverse-transition>
      <v-alert v-show="muestramensaje2" border="left" color="indigo" dark>
        El gráfico se construye en un tag SVG de HTML5 y su escala se calcula
        dinámicamente
        <v-btn
          class="mx-3"
          :color="Complementario3"
          @click="muestramensaje2 = false"
        >
          Cerrar
        </v-btn>
      </v-alert>
    </v-scroll-y-reverse-transition>
    <v-scroll-y-reverse-transition>
      <v-sheet width="600px" elevation="2" id="grafico" v-show="muestragrafico">
        <v-select v-model="selected" :items="datosgrafico" filled></v-select>

        <svg viewBox="0 0 620 530">
          <!-- en 620 tiene que caber las separaciones del eje x -->
          <!--linea del eje x es desplazada 500px abajo-->
          <g targetVal="targetVal" style="transform: translate(20px, 500px)">
            <!-- la linea -->
            <line x1="0" y1="1" x2="600" y2="1" />
            <!-- las rayitas -->
            <g v-for="(select, index) in targetVal" :key="index">
              <line y1="0" y2="7" v-bind="{ x1: index * 10, x2: index * 10 }" />
              <!-- el texto de las rayitas -->
              <text v-if="index % 12 === 0" v-bind="{ x: index * 10, y: 20 }">
                {{ 2016 + index / 12 }}
              </text>
            </g>
          </g>

          <!--linea del eje y  la clase la rota 90grados-->
          <g style="transform: translate(20px, 0px) rotate(90deg)">
            <line x1="500" y1="1" :x2="500 - getMax / getEscala" y2="1" />
            <g
              v-for="(n, idx) in getMaxRange"
              :key="idx"
              :getEscala="getEscala"
            >
              <line
                y1="0"
                y2="7"
                v-bind="{ x1: 500 - n * 10, x2: 500 - n * 10 }"
              />
              <text v-if="n % 10 === 0" v-bind="{ x: 500 - n * 10 - 5, y: 20 }">
                {{ n * getEscala }}K
              </text>
            </g>
          </g>

          <!-- bars -->
          <!-- recordar que svg rect se dibuja de arriba para abajo. hay que compensar su posicion Y usando v-bind -->
          <g v-for="(select, index) in targetVal" class="bars" :key="index">
            <rect
              v-bind="{
                x: index * 10 + 20,
                y: 500 - (select * 10) / getEscala,
              }"
              width="9"
              :height="(select * 10) / getEscala"
            />
          </g>
        </svg>
      </v-sheet>
    </v-scroll-y-reverse-transition>
    <v-data-table
      :headers="tableheader"
      :items="tableData"
      :items-per-page="12"
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
      multi-sort
      :search="search"
      :custom-filter="filterText"
    >
      <template v-slot:top>
        <v-toolbar-title> </v-toolbar-title>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            label="Busca y filtra"
            class="mx-4"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-switch
            v-model="muestragrafico"
            label="gráfico"
            class="mt-2"
          ></v-switch>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">More info about {{ item.name }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
//import { Table, TableColumn } from "element-ui";
import axios from "axios";
import _ from "lodash";
import { TweenMax } from "gsap"; //tiene que ser la version 1.19, mas nuevas no
import config from "../../configuraciones.js";
export default {
  components: { config },
  data() {
    return {
      show: true,
      muestramensaje1: true,
      muestramensaje2: true,
      muestragrafico: false,
      loading: true,
      search: "",
      tableheader: [
        {
          text: "Derivado",
          align: "start",
          sortable: true,
          value: "concepto",
        },
        { text: "Año", groupable: true, value: "año" },
        { text: "Mes", value: "mes" },
        { text: "metros cúbicos", align: "end", sortable: false, value: "m3" },
      ],
      tableData: [],
      selected: [],
      targetVal: [],
      datosgrafico: [],

      Complementario1: config.colors.complemento1,
      Complementario2: config.colors.complemento2,
      Complementario3: config.colors.complemento3,
      Complementario4: config.colors.complemento4,
      Complementario5: config.colors.complemento5,
    };
  },

  beforeCreate() {
    //console.log("beforeCreate");
  },
  created() {
    this.getData();
    //console.log("created");
  },
  beforeMount() {
    //console.log("beforeMount");
  },
  mounted() {
    //console.log("mounted");
  },
  beforeUpdate() {
    //console.log("beforeUpdate");
  },
  updated() {
    //console.log("updated");
  },
  beforeDestroy() {
    //console.log("beforeDestroy");
  },
  destroyed() {
    //console.log("destroyed");
  },
  methods: {
    filterText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleLowerCase()
          .indexOf(search.toLocaleLowerCase()) !== -1
      );
    },
    async getData() {
      const axiosHeaders = {
        headers: {},
        params: {},
      };

      await axios
        .get(
          "https://raw.githubusercontent.com/ariel2martin/presentacion/master/dist/derivados.json",
          axiosHeaders
        )
        .then((res) => {
          // if (res.data[i].concepto == "Nafta Grado 3 (Ultra)")
          for (var i in res.data) this.tableData.push(res.data[i]);

          this.loading = false;
          //console.warn(this.tableData);
        })
        .catch((e) => {
          console.log(e);
          return;
        });

      this.tableData.sort(function (a, b) {
        if (a.concepto > b.concepto) {
          return 1;
        }
        if (a.concepto < b.concepto) {
          return -1;
        }

        if (a.concepto == b.concepto) {
          if (a.año > b.año) {
            return 1;
          }
          if (a.año < b.año) {
            return -1;
          }

          if (a.año == b.año) {
            if (parseInt(a.mes) > parseInt(b.mes)) {
              return 1;
            }
            if (parseInt(a.mes) < parseInt(b.mes)) {
              return -1;
            }
            return 0;
          }
        }
      });

      let primeravez = true;
      let cambioconcepto = "nada";
      let puntero = 0;
      let valor = 0;
      // *
      for (var i in this.tableData) {
        if (cambioconcepto != this.tableData[i].concepto) {
          if (cambioconcepto != "nada") {
            primeravez = false;
            puntero++;
          }
          cambioconcepto = this.tableData[i].concepto;
          this.datosgrafico.push({
            text: cambioconcepto,
            value: [],
          });
        }
        //console.warn(puntero);
        valor = Math.floor(parseInt(this.tableData[i].m3) / 1000);
        if (primeravez) {
          this.selected.push(valor);
          this.targetVal.push(valor);
          this.datosgrafico[0].value.push(valor);
        } else {
          this.datosgrafico[puntero].value.push(valor);
        }
      }
      //* /
      //console.log(this.targetVal);
    },
  },
  computed: {
    getMax() {
      //console.log("elMax: ", Math.max.apply(Math, this.selected) * 10);
      if (Math.max.apply(Math, this.selected) == "-Infinity") {
        //console.log("uno");
        return 1;
      } else {
        //console.log("dos");
        return Math.max.apply(Math, this.selected) * 10;
      }
    },
    getMaxRange() {
      //en el instante inicial no se trajeron los datos pero si se completo el grafico, el || 0 es para que si no hay nada al menos devuelva cero
      const maxi =
        parseInt(Math.max.apply(Math, this.selected) / this.getEscala) || 0;

      return _.range(maxi);
    },
    getEscala() {
      //console.warn(        "Escala     1:",        parseInt(Math.max.apply(Math, this.selected) / 50) + 1 || 1      );
      return parseInt(Math.max.apply(Math, this.selected) / 50) + 1 || 1;
    },
  },
  watch: {
    selected(newValue, oldValue) {
      //console.log(this.targetVal);
      // Create a dummy object that will get updated by GSAP
      const tweenedData = {};
      //console.log("1: ", tweenedData);
      // Update function that is invoked on each tween step
      // we use this to push the data
      const update = function () {
        const obj = Object.values(tweenedData);
        obj.pop();
        this.targetVal = obj;

        //console.log("2: ", tweenedData);
      };

      // Create an object to hold the source data to be tweened and the
      // function pointer for update events
      const tweenSourceData = { onUpdate: update, onUpdateScope: this };
      let key;
      for (let i = 0; i < oldValue.length; i++) {
        // Turn the current index into a string
        key = i.toString();
        tweenedData[key] = oldValue[i];
        tweenSourceData[key] = newValue[i];
        //console.log("3: ", tweenedData);
      }

      // Tween over the our target dummy object, but only for the specific key
      TweenMax.to(tweenedData, 1, tweenSourceData); ///esto es lo que hace correr a la funcion UPDATE, es propio de la libreria gsap
    },
  },
};
</script>
<style scoped lang="scss">
@use "sass:math";
@import "./configuraciones.scss";
body {
  font-family: "Mada", sans-serif;
  background: $background;
}

#grafico {
  text-align: center;
  max-width: 100%;
  margin: 30px auto;
  display: table;
  background: $background;
}

span {
  color: white;
}

svg {
  width: 80%;
  text {
    fill: grey;
    font-family: "Mada", sans-serif;
  }
}

line {
  stroke: #555;
  stroke-width: 2px;
}

select {
  font-family: "Mada", sans-serif;
  background: #444;
  color: #ccc;
  border: 0;
  width: 200px;
  margin: 0 0 25px;
  outline: 0;
  cursor: pointer;
  height: 35px;
  option {
    font-family: "Mada", sans-serif;
  }
}

$max: 62;
$color: math.div(300, $max);

@for $i from 1 through $max {
  .bars:nth-child(#{$i}) rect {
    fill: hsl(($i - 10) * ($color * 1.25), ($i - 1) * $color * 1%, 40%);
  }
}
</style>
