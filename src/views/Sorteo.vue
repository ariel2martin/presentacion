<template>
  <div>
    <input type="file" id="file" />

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          elevation="2"
          :color="Complementario1"
          large
          @click="daNumero()"
          v-bind="attrs"
          v-on="on"
        >
          Numerar
        </v-btn>
      </template>
      <span
        >Asigna numero a los que les falta, a partir del numero mayor de
        ellos</span
      >
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          elevation="2"
          :color="Complementario1"
          large
          @click="vaciar()"
          v-bind="attrs"
          v-on="on"
        >
          Vaciar
        </v-btn>
      </template>
      <span>vacía el listado</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          elevation="2"
          :color="Complementario1"
          large
          @click="agrupar()"
          v-bind="attrs"
          v-on="on"
        >
          agrupar
        </v-btn>
      </template>
      <span>Asigna grupo al azar</span>
    </v-tooltip>
    <v-overlay :value="overlay">
      <v-card class="mx-auto" max-width="450" :color="Complementario2">
        <v-card-text>
          <p class="text-h5 text--primary">¿cuantos grupos va a armar?</p>

          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Grupos</th>
                  <th class="text-left">composición</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in gruposPosibles"
                  :key="item.name"
                  @click="eligeCantGrupos(item)"
                >
                  <td class="text-center">{{ item.cuantos }}</td>
                  <td>{{ item.texto }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <v-card-actions>
          <v-btn
            elevation="2"
            :color="Complementario3"
            @click="overlay = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    <v-container>
      <v-data-table
        :headers="tableheader"
        :items="listado"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Listado de jugadores</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editJugador(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteJugador(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>
    <v-overlay :value="logoespera">
      <v-progress-circular
        :size="150"
        :width="17"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import ABadge from "@/components/ABadge.vue";
import config from "../../configuraciones.js";
export default {
  components: { ABadge, config },
  data() {
    return {
      gruposPosibles: [],
      listado: [],
      result: [{ name: "agua" }],
      tableheader: [
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "nombre",
        },

        { text: "num", value: "posicion" },
        { text: "grupo", value: "grupo" },

        { text: "", value: "actions" },
      ],
      overlay: false,
      logoespera: false,

      Complementario1: config.colors.complemento1,
      Complementario2: config.colors.complemento2,
      Complementario3: config.colors.complemento3,
      Complementario4: config.colors.complemento4,
      Complementario5: config.colors.complemento5,
    };
  },
  //{ text: "grupo", value: "grupo" },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    document
      .getElementById("file")

      .addEventListener("input", this.readFile, false);
    //change

    this.listadoAgrega(JSON.parse(localStorage.getItem("listado")));

    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
  watch: {
    logoespera(val) {
      val &&
        setTimeout(() => {
          this.logoespera = false;
          this.overlay = false;
        }, 3000);
    },
  },
  methods: {
    parseCSV(text) {
      // Obtenemos las lineas del texto
      let lines = text.replace(/\r/g, "").split("\n");

      return lines.map((line) => {
        // Por cada linea un nuevo array con los campos
        let values = line.split(",");
        return values.map((a) => {
          //a cada campo le hacemos Trim()
          let cada = a.replace(/^\s+|\s+$/gm, "");
          return cada;
        });
      });
    },

    creaJson(matrix) {
      let arrobj = [];

      for (var i in matrix) {
        var row = matrix[i];
        arrobj.push({
          nombre: row[0],
          posicion: row[1],
          grupo: row[2],
          adicional: row[3],
        });
      }
      return arrobj;
    },
    readFile(evt) {
      let file = evt.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        // Cuando el archivo se terminó de cargar
        let lines = this.parseCSV(e.target.result);
        let output = this.creaJson(lines);
        //console.log(lines);

        this.listadoAgrega(output);
      };
      // Leemos el contenido del archivo seleccionado
      reader.readAsBinaryString(file);
    },
    listadoAgrega(datos) {
      //this.listado.push(datos);

      for (var i in datos) {
        if (datos[i].nombre > " ") {
          if (!this.duplicado(datos[i].nombre)) this.listado.push(datos[i]);
        }
      }
      localStorage.setItem("listado", JSON.stringify(this.listado));
    },
    listadoActualiza() {
      localStorage.setItem("listado", JSON.stringify(this.listado));
    },
    vaciar() {
      this.listado = [];
      localStorage.setItem("listado", JSON.stringify(this.listado));
    },
    daNumero() {
      let mayor = 0;
      for (let i = 0; i < this.listado.length; i++) {
        if (this.listado[i].posicion > mayor) mayor = this.listado[i].posicion;
      }

      for (let i = 0; i < this.listado.length; i++) {
        if (this.listado[i].posicion == undefined) {
          this.listado[i].posicion = ++mayor;
        }
      }
      this.listadoActualiza();
    },
    duplicado(nombr) {
      if (this.listado.find((e) => e.nombre == nombr) == undefined) {
        return false;
      } else {
        return true;
      }
    },
    agrupar() {
      this.gruposPosibles = [];
      let personas = this.listado.length;
      let aux1;
      let aux2;
      let grupos1, elementos1, grupos2, elementos2;
      for (let t = 2; t <= personas / 2 + 1; t++) {
        aux2 = "";
        grupos2 = personas % t;
        grupos1 = Math.floor(t - grupos2);
        elementos1 = Math.floor(personas / t);
        elementos2 = Math.ceil(personas / t);
        if (grupos1 > 1) {
          aux1 = grupos1.toString() + " grupos de " + elementos1.toString();
        } else {
          aux1 = grupos1.toString() + " grupo de " + elementos1.toString();
        }
        if (grupos2 > 0) {
          if (grupos2 > 1) {
            aux2 =
              " y\n" +
              grupos2.toString() +
              " grupos de " +
              elementos2.toString();
          } else {
            aux2 =
              " y\n" +
              grupos2.toString() +
              " grupo de " +
              elementos2.toString();
          }
        } else {
          grupos2 = 0;
          elementos2 = 0;
        }

        this.gruposPosibles.push({
          cuantos: t,
          texto: aux1 + aux2,
          grupos1: grupos1,
          elementos1: elementos1,
          grupos2: grupos2,
          elementos2: elementos2,
        });
      }
      this.overlay = !this.overlay;
    },
    eligeCantGrupos(cuantos) {
      this.logoespera = true;

      //a cada elemento le pone un numero al azar
      //luego se ordena por ese numero
      //y finalmente, con ese orden, se asignan los grupos
      for (let i = 0; i < this.listado.length; i++) {
        this.listado[i].random = Math.random();
      }
      this.listado.sort(function (a, b) {
        if (a.random > b.random) {
          return 1;
        }
        if (a.random < b.random) {
          return -1;
        }

        return 0;
      });

      let g = 0;
      let pos = 0;
      for (let i = 0; i < cuantos.grupos1; i++) {
        for (let j = 0; j < cuantos.elementos1; j++) {
          this.listado[pos].grupo = "G" + (g + 1).toString();
          pos++;
        }
        g++;
      }

      for (let i = 0; i < cuantos.grupos2; i++) {
        for (let j = 0; j < cuantos.elementos2; j++) {
          this.listado[pos].grupo = "G" + (g + 1).toString();
          pos++;
        }
        g++;
      }
      listadoActualiza();
    },
    editJugador(item) {
      console.log(item);
    },
    deleteJugador(item) {
      let donde = this.listado.findIndex((i) => i === item);

      if (donde > -1) {
        this.listado.splice(donde, 1);
        this.listadoActualiza();
      } else alert("No puedo manejar este nombre: " + item.nombre);
    },
  },
};
</script>
