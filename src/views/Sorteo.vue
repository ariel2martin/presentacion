<template>
  <div>
    <input type="file" id="file" />
    <v-data-table
      :headers="tableheader"
      :items="tableData"
      :items-per-page="10"
      class="elevation-1"
      multi-sort
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-switch
            v-model="elSwitch"
            label="Single expand"
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
import ABadge from "@/components/ABadge.vue";
export default {
  components: { ABadge },
  data() {
    return {
      elSwitch: true,
      result: [{ name: "agua" }],
      tableheader: [
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "nombre",
        },

        { text: "num", value: "posicion" },
      ],
      tableData: [],
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
    let qe = localStorage.getItem("listado");
    this.llenaListado(qe);
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
  methods: {
    parseCSV(text) {
      // Obtenemos las lineas del texto
      let lines = text.replace(/\r/g, "").split("\n");
      return lines.map((line) => {
        // Por cada linea obtenemos los valores
        let values = line.split(",");
        return values;
      });
    },

    reverseMatrix(matrix) {
      let output = [];
      // Por cada fila
      matrix.forEach((values, row) => {
        // Vemos los valores y su posicion
        values.forEach((value, col) => {
          // Si la posición aún no fue creada
          if (output[col] === undefined) output[col] = [];
          output[col][row] = value;
        });
      });
      return output;
    },
    creaJson(matrix) {
      let arrobj = [];

      for (var i in matrix) {
        var row = matrix[i];
        arrobj.push({
          nombre: row[0],
          posicion: row[1],
          adicional: row[2],
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

        localStorage.setItem("listado", output);
        this.llenaListado(output);
      };
      // Leemos el contenido del archivo seleccionado
      reader.readAsBinaryString(file);
    },
    llenaListado(datos) {
      console.log("aqui");
      for (var i in datos) this.tableData.push(datos[i]);
    },
  },
};
</script>
