<template>
  <div>
    <v-alert border="left" :color="Complementario1" dark v-if="muestramensaje">
      <p>
        Videoconferencia en una sola direccion mediante conexion peer to peer,
        no requiere servidor.
      </p>
      Comience eligiendo "emisor", además abra esta misma página en otro
      dispositivo o en otro navegador y allí elija "receptor"
      <v-btn
        class="mx-3"
        :color="Complementario3"
        @click="muestramensaje = false"
      >
        Cerrar
      </v-btn>
    </v-alert>

    <v-container>
      <v-snackbar v-model="snackbarAlert3" color="red darken-1">
        {{ textosnackbarAlert3 }}
      </v-snackbar>
      <v-snackbar v-model="snackbarAlert4" color="red darken-1">
        {{ textosnackbarAlert4 }}
      </v-snackbar>
      <v-row no-gutters>
        <v-col class="mx-0 mb-3">
          <v-btn
            block
            elevation="2"
            large
            :color="this.coloremisor"
            :disabled="this.deshabilitaemisor"
            v-on:click="this.esemisor"
          >
            emisor</v-btn
          >
          <v-expand-transition>
            <v-container>
              <v-textarea
                v-show="muestra_textcodigoemisor"
                v-on:focus="$event.target.select()"
                ref="textcodigoemisor"
                append-outer-icon="mdi-content-copy"
                @click:append-outer="copiartexto()"
                no-resize
                filled
                wrap="soft"
                class="caption"
                :value="this.codigoemisor"
              ></v-textarea>
            </v-container>
          </v-expand-transition>
          <v-expand-transition>
            <v-container>
              <v-row no-gutters v-show="muestra_codigoreceptorcopiado">
                <v-col cols="12" sm="6" md="8">
                  <v-textarea
                    id="codigoreceptorcopiado"
                    no-resize
                    rows="3"
                    wrap="soft"
                    filled
                    color="red"
                    class="caption"
                    value="Pegue aquí"
                  ></v-textarea>
                </v-col>
                <v-col cols="6" md="4">
                  <v-btn
                    color="blue-grey"
                    class="ma-2 white--text"
                    id="procesacodigoreceptor"
                  >
                    Procesar
                    <v-icon right dark> mdi-location-enter </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-expand-transition>
          <v-expand-transition>
            <v-card
              class="mx-auto"
              v-show="muestra_pasoscodigoemisor"
              :color="Complementario1"
            >
              <v-card-text>
                <div class="">
                  {{ textosnackbar1 }}
                </div>
              </v-card-text>
              <v-card-text>
                <div class="">
                  {{ textosnackbar2 }}
                </div>
              </v-card-text>
              <v-card-text>
                <div class="">
                  {{ textosnackbar3 }}
                </div>
              </v-card-text>
            </v-card>
          </v-expand-transition>
          <v-expand-transition>
            <v-card
              class="mx-auto"
              max-width="344"
              v-show="muestra_mensajeVideoTransmitiendo"
            >
              <v-card-text>
                <div class="text--primary">
                  Ya se está transmitiendo video desde este navegador
                </div>
              </v-card-text>
            </v-card>
          </v-expand-transition>
          <v-snackbar v-model="snackbar1" :color="Complementario3">
            {{ textosnackbar1 }}
          </v-snackbar>
          <v-snackbar v-model="snackbar2" :color="Complementario4">
            {{ textosnackbar2 }}
          </v-snackbar>
          <v-snackbar v-model="snackbar3" :color="Complementario5">
            {{ textosnackbar3 }}
          </v-snackbar>
          <v-snackbar v-model="snackbarAlert2" color="red darken-1">
            {{ textosnackbarAlert2 }}
          </v-snackbar>
          <v-snackbar v-model="snackbar6" :color="Complementario3">
            {{ textosnackbar6 }}
          </v-snackbar>
        </v-col>
        <v-divider class="mx-4" vertical></v-divider>
        <v-col class="mx-0 mb-3">
          <v-btn
            block
            elevation="2"
            large
            :disabled="this.deshabilitareceptor"
            v-on:click="this.esreceptor"
            :color="this.colorreceptor"
            class="text-center"
          >
            receptor
          </v-btn>

          <v-expand-transition>
            <v-container>
              <v-row no-gutters v-show="muestra_textcodigoemisorcopiado">
                <v-col cols="12" sm="6" md="8">
                  <v-textarea
                    id="textcodigoemisorcopiado"
                    no-resize
                    rows="3"
                    wrap="soft"
                    filled
                    color="red"
                    class="caption"
                    value="
                  Pegue aquí "
                  ></v-textarea>
                </v-col>
                <v-col cols="6" md="4">
                  <v-btn
                    color="blue-grey"
                    class="ma-2 white--text"
                    id="procesacodigoemisor"
                  >
                    Procesar
                    <v-icon right dark> mdi-location-enter </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-expand-transition>
          <v-expand-transition>
            <v-container>
              <v-textarea
                v-show="muestra_textcodigoreceptor"
                v-on:focus="$event.target.select()"
                ref="textcodigoreceptor"
                append-outer-icon="mdi-content-copy"
                @click:append-outer="copiartextoreceptor()"
                no-resize
                filled
                wrap="soft"
                class="caption"
                :value="this.codigoreceptor"
              ></v-textarea>
            </v-container>
          </v-expand-transition>
          <v-snackbar v-model="snackbarAlert1" color="red darken-1">
            {{ textosnackbarAlert1 }}
          </v-snackbar>
          <v-snackbar v-model="snackbar4" :color="Complementario3">
            {{ textosnackbar4 }}
          </v-snackbar>
          <v-snackbar v-model="snackbar5" :color="Complementario4">
            {{ textosnackbar5 }}
          </v-snackbar>
          <video src="" id="video" style="width: 100%" autoplay="true"></video>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ABadge from "@/components/ABadge.vue";
import config from "../../configuraciones.js";
import simplepeer from "simple-peer";

export default {
  components: { ABadge, config },
  data() {
    return {
      muestramensaje: true,
      coloremisor: "secondary",
      colorreceptor: "secondary",
      deshabilitaemisor: false,
      deshabilitareceptor: false,
      codigoemisor: "",
      codigoemisorcopiado: "",
      codigoreceptor: "",
      codigoreceptorcopiado: "",
      muestra_textcodigoemisor: false,
      muestra_pasoscodigoemisor: false,
      muestra_codigoreceptorcopiado: false,
      muestra_textcodigoemisorcopiado: false,
      muestra_textcodigoreceptor: false,
      muestra_mensajeVideoTransmitiendo: false,
      snackbar1: false,
      snackbar2: false,
      snackbar3: false,
      snackbar4: false,
      snackbar5: false,
      snackbar6: false,
      textosnackbar1:
        "1) Copie el texto, puede ayudarse con el icono copiar. (en un servidor web de aplicaciones estos pasos serían automáticos)",
      textosnackbar2:
        '2) Abra esta aplicación en otro navegador, en este dispositivo o en otro. Esta vez elija "Receptor" y allí pegue el coóigo. para llevar el código no use gmail porque inserta lineas, puede usar whatsapp',
      textosnackbar3:
        "3) Mas adelante volverá a esta pantalla a pegar la respuesta",
      textosnackbar4: "4) Pegue el código y haga click en Procesar",
      textosnackbar5:
        "5) Copie el código obtenido y llévelo hacia la pagina donde está el emisor",
      textosnackbar6:
        "Muy bien, en la página receptor se está mostrando el video proveniente de la webcam habilitada por ésta página",

      snackbarAlert1: false,
      textosnackbarAlert1:
        'este código no es válido, debería empezar con {"type":"offer" y terminar con \\r \\n"}',
      snackbarAlert2: false,
      textosnackbarAlert2:
        'este código no es válido, debería empezar con {"type":"answer" y terminar con \\r \\n"}',
      snackbarAlert3: false,
      textosnackbarAlert3:
        "Error en la conexión peer to peer, reinicie ambas páginas: emisor y receptor",
      snackbarAlert4: false,
      textosnackbarAlert4:
        "La camara no está disponible, aqui no puede ser el emisor",
      Complementario1: config.colors.complemento1,
      Complementario2: config.colors.complemento2,
      Complementario3: config.colors.complemento3,
      Complementario4: config.colors.complemento4,
      Complementario5: config.colors.complemento5,

      defaultPeerConection: {
        initiator: false,
        channelConfig: {},
        channelName: "<random string>",
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
          ],
        },
        offerOptions: {},
        answerOptions: {},
        sdpTransform: function (sdp) {
          return sdp;
        },
        stream: false,
        streams: [],
        trickle: true,
        allowHalfTrickle: false,
        wrtc: {}, // RTCPeerConnection/RTCSessionDescription/RTCIceCandidate
        objectMode: false,
      },
      /*
            { urls: 'stun:stun.counterpath.com' },
            { urls: 'stun:stun.xten.com' },
            {
                urls: 'turn:numb.viagenie.ca',
                credential: 'muazkh',
                username: 'webrtc@live.com'
            },
            { urls: 'stun:stunserver.org' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun.voiparound.com' },
            { urls: 'stun:stun.voipstunt.com' },
            { urls: 'stun:stun.voipbuster.com' },
            { urls: 'stun:stun.1und1.de' },
            { urls: 'stun:stun2.l.google.com:19302' }
    */
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
    document
      .querySelector("#procesacodigoemisor")
      .removeEventListener("click", (ev) => {
        this.procesacodigoemisor(p);
      });

    document
      .querySelector("#textcodigoemisorcopiado")
      .removeEventListener("click", (ev) => {
        document.querySelector("#textcodigoemisorcopiado").value = "";
      });

    document
      .querySelector("#codigoreceptorcopiado")
      .removeEventListener("click", (ev) => {
        document.querySelector("#codigoreceptorcopiado").value = "";
      });

    document
      .querySelector("#procesacodigoreceptor")
      .removeEventListener("click", (ev) => {
        this.procesacodigoreceptor(peer);
      });

    //console.log("destroyed");
  },
  methods: {
    async copiartexto() {
      //await navigator.clipboard.writeText(this.codigo);
      //alert("Copied!");

      this.$refs.textcodigoemisor.focus();

      document.execCommand("copy");
      this.snackbar1 = false;
      this.snackbar2 = true;
      setTimeout(this.muestraLaRecepcion, 5000);
      this.muestra_textcodigoemisor = false;
      //console.log(s);
    },
    muestraLaRecepcion() {
      this.muestra_codigoreceptorcopiado = true;
      this.snackbar3 = true;
    },
    async copiartextoreceptor() {
      this.$refs.textcodigoreceptor.focus();
      document.execCommand("copy");
    },
    esemisor() {
      this.coloremisor = "primary";
      this.deshabilitareceptor = true;
      this.muestra_textcodigoemisor = true;
      //ahora abro la camara
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msgGetUserMedia;

      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          {
            video: true,
            audio: true,
          },
          this.loadCamera,
          this.loadFail
        );
      }
    },
    loadCamera(stream) {
      /* con esto se ve en pantalla
      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = URL.createObjectURL(stream);
      }
*/
      console.log("camara conectada");

      const peer = new simplepeer({
        initiator: true,
        trickle: false,
        stream: stream,
      });

      peer.on("error", (err) => {
        this.snackbarAlert3 = true;
        console.log("error", err);
      });

      peer.on("signal", (data) => {
        // aqui se declara el emisor y se crea un codigo type:offer en la variable data
        //console.log("SIGNAL en emisor", JSON.stringify(data));
        //
        this.codigoemisor = JSON.stringify(data);
        this.snackbar1 = true;
        this.muestra_pasoscodigoemisor = true;
      });

      document
        .querySelector("#codigoreceptorcopiado")
        .addEventListener("click", (ev) => {
          document.querySelector("#codigoreceptorcopiado").value = "";
        });

      document
        .querySelector("#procesacodigoreceptor")
        .addEventListener("click", (ev) => {
          this.procesacodigoreceptor(peer);
        });

      peer.on("connect", () => {
        console.log("CONNECT");
        peer.send("Soy el emisor");
        // exito al conectar con su peer
        this.muestra_mensajeVideoTransmitiendo = true;
      });

      peer.on("data", (data) => {
        console.log("data: " + data);
      });
    },

    loadFail() {
      console.log("La camara no está disponible");
      this.snackbarAlert4 = true;
    },
    procesacodigoreceptor(peer) {
      let codigo = document.querySelector("#codigoreceptorcopiado").value;
      if (
        this.Left(codigo, 16) == '{"type":"answer"' &&
        this.Right(codigo, 3) == 'n"}'
      ) {
        peer.signal(JSON.parse(codigo));

        this.muestra_pasoscodigoemisor = false;
        this.muestra_codigoreceptorcopiado = false;
      } else {
        this.snackbarAlert2 = true;
      }
    },

    esreceptor() {
      this.colorreceptor = "primary";
      this.deshabilitaemisor = true;
      this.muestra_textcodigoemisorcopiado = true;
      this.snackbar4 = true;

      const p = new simplepeer({
        initiator: false,
        trickle: false,
      });

      p.on("error", (err) => {
        this.snackbarAlert3 = true;
        console.log("error", err);
      });

      p.on("signal", (data) => {
        //console.log("SIGNAL en receptor", JSON.stringify(data));
        this.muestra_textcodigoreceptor = true;
        this.codigoreceptor = JSON.stringify(data);
        this.muestra_textcodigoemisorcopiado = false;
        this.snackbar5 = true;
      });

      document
        .querySelector("#textcodigoemisorcopiado")
        .addEventListener("click", (ev) => {
          document.querySelector("#textcodigoemisorcopiado").value = "";
        });

      document
        .querySelector("#procesacodigoemisor")
        .addEventListener("click", (ev) => {
          this.procesacodigoemisor(p);
        });

      p.on("connect", () => {
        console.log("CONNECT");
        p.send("soy el receptor");
        this.muestra_textcodigoreceptor = false;
      });

      p.on("data", (data) => {
        console.log("data: " + data);
      });
      p.on("stream", (stream) => {
        // got remote video stream, now let's show it in a video tag
        var video = document.querySelector("video");

        if ("srcObject" in video) {
          video.srcObject = stream;
        } else {
          video.src = window.URL.createObjectURL(stream); // for older browsers
        }

        video.play();
      });
    },
    procesacodigoemisor(p) {
      let codigo = document.querySelector("#textcodigoemisorcopiado").value;

      if (
        this.Left(codigo, 15) == '{"type":"offer"' &&
        this.Right(codigo, 3) == `n"}`
      ) {
        p.signal(JSON.parse(codigo));
      } else {
        this.snackbarAlert1 = true;
      }
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
  },
};
</script>
<style>
body {
  background: #121212;
}
</style>
