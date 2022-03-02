<template>
  <div>
    <v-data-table
      :headers="tableheader"
      :items="tableData"
      :items-per-page="5"
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
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
//import { Table, TableColumn } from "element-ui";
import axios from "axios";
export default {
  components: {
    //  [Table.name]: Table,
    //  [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      elSwitch: true,
      result: [{ name: "agua" }],
      loading: true,
      tableheader: [
        {
          text: "Derived",
          align: "start",
          sortable: true,
          value: "concepto",
        },
        { text: "Year", groupable: true, value: "año" },
        { text: "Month", value: "mes" },
        { text: "Cubic meter", align: "end", sortable: false, value: "m3" },
      ],
      tableData: [],
    };
  },

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
    this.getData();
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
    async getData() {
      const axiosHeaders = {
        headers: {},
        params: {},
      };

      await axios
        .get("./derivados.json", axiosHeaders)
        .then((res) => {
          for (var i in res.data) this.tableData.push(res.data[i]);
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          return;
        });
    },
  },
};
</script>
