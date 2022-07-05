<template>
  <v-card class="mx-auto">
    <v-system-bar :color="Complementario1" dark> </v-system-bar>

    <v-toolbar color="indigo" dark>
      <v-toolbar-title>
        Código en C++ y dispositivo electrónico para encender aparatos
        electricos desde una pagina web
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <v-container fluid>
      <v-card>
        <v-row dense>
          <v-col>
            <ul class="mt-3">
              <li>El dispositivo se convierte en un servidor web</li>
              <li>
                En su pagina 192.168.2.222 se configuran los passwords de acceso
              </li>
              <li>Además es un repetidor wifi</li>
              <li>Su reloj se sincroniza tras conectarse a internet</li>
              <li>
                En la pagina \web se puede encender-apagar los aparatos
                electricos, encender durante x minutos y programar para que
                encienda a cierta hora y apague a cierta otra
              </li>
              <li>
                Tiene un efecto de barrido muy bonito en el display para mostrar
                la hora y el estado de los relays
              </li>
              <li>
                Esta aplicacion demo corre en la red interna, tal como está no
                se la puede acceder desde el exterior
              </li>

              <li>
                En la carpeta Nodemcu Relays se encuentra el codigo para subir a
                un ESP8266 usando Visual Studio Code con el plugin Platformio
              </li>
            </ul>
          </v-col>
          <v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/7c2XHYd6ot8?controls=0"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
      <v-space></v-space>
      <v-row class="mt-5">
        <v-col></v-col>
        <v-col sm-12
          ><img src="@/assets/img/relays.jpg" style="max-width: 500px"
        /></v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import config from "../../configuraciones.js";

export default {
  components: { config },
  data() {
    return {
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
};
</script>
