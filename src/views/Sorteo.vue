<template>
  <div>
    <input type="file" id="file" />

    <v-btn elevation="2" color="primary" large @click="this.daNumero"
      >Numerar
    </v-btn>

    <v-btn elevation="2" color="primary" large @click="this.Vaciar"
      >Vaciar
    </v-btn>
    <v-data-table
      :headers="tableheader"
      :items="listado"
      :items-per-page="10"
      class="elevation-1"
      multi-sort
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-switch label="Single expand" class="mt-2"></v-switch>
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
      ],
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

    creaJson(matrix) {
      let arrobj = [];

      for (var i in matrix) {
        var row = matrix[i];
        arrobj.push({
          nombre: row[0].trim(),
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
        if (!this.duplicado(datos[i].nombre)) this.listado.push(datos[i]);
      }
      localStorage.setItem("listado", JSON.stringify(this.listado));
    },
    listadoActualiza() {
      localStorage.setItem("listado", JSON.stringify(this.listado));
    },
    Vaciar() {
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
  },
};
</script>
