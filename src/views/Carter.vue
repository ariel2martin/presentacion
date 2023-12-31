<template>
  <v-container>
    <v-card class="mx-auto" max-width="600s" v-show="!vtemporizador">
      <v-card-text>
        <p class="text-h4 titulo">Reglas del juego</p>

        <div class="text--primary">
          son tres personajes, creativo1, creativo2 y observador en cada roda se
          rotarán los roles <br />
          creativo1 elige un tema y lanza el contador de tiempo<br />
          la aplicacion eligirá al azar una propuesta, la leerá y lanzará el
          contador de tiempo<br />
          creativo1 da una idea sobre éstey detiene el conador de tiempoque le
          corresponde<br />
          creativo 2 rebate la idea y detiene el contador de tiempo que le
          corresponde<br />
          al finalizar cualquiera de los tiempos maxomos, el observador hara lo
          suyo<br />
          todos votan al mejor
        </div>
      </v-card-text>
      <v-card-actions>
        <select class="form-control" id="voces" v-model="selectedVoice">
          <option
            v-for="(voice, index) in voiceList"
            :key="index"
            :data-lang="voice.lang"
            :value="index"
          >
            {{ voice.name }} ({{ voice.lang }})
          </option>
        </select>
      </v-card-actions>
    </v-card>
    <p></p>
    <v-container class="bg-surface-variant" v-show="vcategorias">
      <v-row align="center" justify="center">
        <v-col v-for="(n, index) in lista" :key="index" cols="12" sm="3">
          <v-card
            loading
            @click="
              leer(lista[index].titulo);

              vcategorias = false;
              vsubcategorias = index;
            "
          >
            <v-card-title>{{ lista[index].titulo }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      class="bg-surface-variant"
      v-for="(n, index) in lista"
      :key="index"
      v-show="index == vsubcategorias"
    >
      <v-chip
        v-for="(n, q) in lista[index].contenido"
        :key="q"
        variant="outlined"
        @click="
          leer(lista[index].contenido[q]);
          muestrareloj();
        "
      >
        {{ lista[index].contenido[q] }}
      </v-chip>
      <v-btn
        variant="tonal"
        @click="
          vcategorias = true;
          vsubcategorias = 99;
        "
      >
        volver
      </v-btn>
    </v-container>
    <v-container v-show="vtemporizador">
      <v-row align="center" justify="center">
        <div class="text-center">
          <v-progress-circular
            @click="
              stoptimer(1);
              countdown(timer2show, 2, timer2);
            "
            class="v-progress-circular--visible"
            :rotate="90"
            :size="300"
            :width="30"
            :value="timer1"
            color="red"
          >
            {{ timer1show }}
          </v-progress-circular>
        </div></v-row
      >
      <p></p>
      <v-row align="center" justify="center">
        <div class="text-center">
          <v-progress-circular
            @click="
              stoptimer(2);
              countdown(timer1show, 1, timer1);
            "
            class="v-progress-circular--visible"
            :rotate="90"
            :size="300"
            :width="30"
            :value="timer2"
            color="red"
          >
            {{ timer2show }}
          </v-progress-circular>
        </div>
      </v-row>
      <v-row>
        <v-btn
          variant="tonal"
          @click="
            stoptimer();

            timer1 = 100;
            timer2 = 100;
            timer1show = '2:30';
            timer2show = '2:00';
            stoptimer1 = 999;
            stoptimer2 = 999;
            countdown(timer1show, 1, timer1);
          "
        >
          Resetear reloj
        </v-btn>
        <v-btn
          variant="tonal"
          @click="
            stoptimer();

            timer1 = 100;
            timer2 = 100;
            timer1show = '2:30';
            timer2show = '2:00';
            stoptimer1 = 999;
            stoptimer2 = 999;
            vtemporizador = false;
            vcategorias = true;
            vsubcategorias = 99;
          "
        >
          Volver a empezar
        </v-btn></v-row
      >
    </v-container>
  </v-container>
</template>
<script>
import ABadge from "@/components/ABadge.vue";
import config from "../../configuraciones.js";
import axios from "axios";

import soundfin1 from "@/assets/mp3/fin1.mp3";
import soundfin2 from "@/assets/mp3/fin2.mp3";
export default {
  components: { ABadge, config },
  data() {
    return {
      isLoading: true,
      name: "",
      selectedVoice: 0,
      synth: window.speechSynthesis,
      voiceList: [],
      leerTexto: new window.SpeechSynthesisUtterance(),
      vcategorias: true,
      vsubcategorias: 99,
      vtemporizador: false,
      timer1: 100,
      timer2: 100,
      timer1show: "2:30",
      timer2show: "2:00",
      stoptimer1: 999,
      stoptimer2: 999,
      audiofin1: new Audio(soundfin1),
      audiofin2: new Audio(soundfin2),

      lista: [
        {
          titulo: "historia",
          contenido: {
            1: "b",
            2: "d",
          },
        },
        {
          titulo: "el unico",
          contenido: {
            1: "no se habla de Bruno",
            2: "las vacas no vuelan",
          },
        },
        {
          titulo: "politica",
          contenido: {
            1: "K es caca",
            2: "ni la derecha ni la izq son quienes mejoran el futuro, la tecnologia si",
          },
        },
      ],
    };
  },

  beforeCreate() {
    //console.log("beforeCreate");
  },
  created() {
    //console.log("created");
  },
  beforeMount() {
    //console.log("beforeMount");
  },
  mounted() {
    // wait for voices to load
    // I can't get FF to work without calling this first
    // Chrome works on the onvoiceschanged function
    this.voiceList = this.synth.getVoices();

    if (this.voiceList.length) {
      this.isLoading = false;
    }

    this.synth.onvoiceschanged = () => {
      this.voiceList = this.synth.getVoices();
      // give a bit of delay to show loading screen
      // just for the sake of it, I suppose. Not the best reason
      setTimeout(() => {
        this.isLoading = false;
      }, 800);
    };

    this.listenForSpeechEvents();
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
    muestrareloj() {
      this.vcategorias = false;
      this.vsubcategorias = 99;
      this.vtemporizador = true;
      this.countdown(this.timer1show, 1);
    },
    stoptimer(cual) {
      if (cual == 1) window.clearTimeout(this.stoptimer1);
      else if (cual == 2) window.clearTimeout(this.stoptimer2);
      else {
        var id = window.setTimeout(function () {}, 0);
        while (id--) {
          window.clearTimeout(id); // will do nothing if no timeout with id is present
        }
      }
    },
    /**
     * React to speech events
     */
    listenForSpeechEvents() {
      this.leerTexto.onstart = () => {
        this.isLoading = true;
      };

      this.leerTexto.onend = () => {
        this.isLoading = false;
      };
    },

    /**
     * Shout at the user
     */
    leer(que, desde) {
      // it should be 'craic', but it doesn't sound right
      this.leerTexto.text = que;

      this.leerTexto.voice = this.voiceList[this.selectedVoice];

      this.synth.speak(this.leerTexto);
    },
    countdown(q, cual, desde = 100) {
      var minutes = parseInt(q.split(":")[0]);
      var seconds = parseInt(q.split(":")[1]);
      //console.log(minutes, "-", seconds);
      var endTime, hours, mins, msLeft, time;
      var porcentajemaximo;
      var vm = this;
      function twoDigits(n) {
        return n <= 9 ? "0" + n : n;
      }

      function updateTimer1() {
        msLeft = endTime - +new Date();
        vm.timer1 = parseInt(((msLeft / 1000) * desde) / porcentajemaximo);
        //console.log(vm.timer1);
        if (msLeft < 1000 || desde == 0) {
          vm.timer1show = "Se acabó!";
          vm.timer1 = 0;
          vm.audiofin1.play();
          vm.countdown(vm.timer2show, 2, vm.timer2);
        } else {
          time = new Date(msLeft);
          hours = time.getUTCHours();
          mins = time.getUTCMinutes();

          vm.timer1show =
            (hours ? hours + ":" + twoDigits(mins) : mins) +
            ":" +
            twoDigits(time.getUTCSeconds());

          vm.stoptimer1 = setTimeout(
            updateTimer1,
            time.getUTCMilliseconds() + 500
          );
        }
      }
      function updateTimer2() {
        msLeft = endTime - +new Date();
        vm.timer2 = parseInt(((msLeft / 1000) * desde) / porcentajemaximo);
        //console.log(vm.timer1);
        if (msLeft < 1000 || desde == 0) {
          vm.timer2show = "Se acabó!";
          vm.timer2 = 0;
          vm.audiofin2.play();
        } else {
          time = new Date(msLeft);
          hours = time.getUTCHours();
          mins = time.getUTCMinutes();

          vm.timer2show =
            (hours ? hours + ":" + twoDigits(mins) : mins) +
            ":" +
            twoDigits(time.getUTCSeconds());

          vm.stoptimer2 = setTimeout(
            updateTimer2,
            time.getUTCMilliseconds() + 500
          );
        }
      }
      endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;
      porcentajemaximo = 60 * minutes + seconds;
      if (cual == 1) updateTimer1();
      else updateTimer2();
    },

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
<style scoped>
.titulo {
  color: coral;
  background-color: aliceblue;
  text-align: center;
}

#voces {
  color: blue;
  text-align: left;
  margin: auto;
}
span {
  color: white;
}
</style>