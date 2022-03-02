<template>
  <div></div>
</template>
<script>
import ABadge from "@/components/ABadge.vue";
export default {
  components: { ABadge },
  data() {
    return {
      elSwitch: true,
      result: [{ name: "agua" }],

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
    Left(s, n) {
      if (n > s.length) n = s.length;
      return s.substring(0, n);
    },
    Right(s, n) {
      var t = s.length;
      if (n > t) n = t;
      return s.substring(t - n, t);
    },
    ExtractNumber(value) {
      var n = parseInt(value);
      return n == null || isNaN(n) ? 0 : n;
    },
  },
};
</script>
