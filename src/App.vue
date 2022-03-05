<template>
  <v-app>
    <v-navigation-drawer app class="fondito" v-model="drawer" temporary>
      <perfect-scrollbar>
        <v-icon
          small
          style="margin-left: 92%; color: grey"
          @click="drawer = !drawer"
        >
          mdi-close
        </v-icon>

        <v-list>
          <v-card style="background: transparent">
            <v-list-item class="pb-3">
              <v-list-item-avatar>
                <v-img
                  src="https://yt3.ggpht.com/yti/APfAmoFJiLdXTD8iWB7ZTrnKfIwNSZiA6XmiqLkj3ewd5A=s88-c-k-c0x00ffffff-no-rj-mo"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Ariel Martin</v-list-item-title>
                <v-list-item-subtitle
                  >ariel2martin@gmail.com</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-list>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item :href="item.href" :to="{ name: item.href }" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </perfect-scrollbar>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Demo</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    selectedItem: 0,
    items: [
      {
        href: "GraficoDinamico",
        router: true,
        text: "Gráfico dinámico",
        icon: "mdi-folder",
      },
      {
        href: "GraficoEjemplo",
        router: true,
        text: "Ejemplo de gráfico",
        icon: "mdi-account-multiple",
      },
      {
        href: "tabla",
        router: true,
        text: "Table",
        icon: "mdi-account-multiple",
      },
      {
        href: "Asign",
        router: true,
        text: "Aplicar",
        icon: "mdi-account-multiple",
      },
      {
        href: "Sorteo",
        router: true,
        text: "Sorteo",
        icon: "mdi-account-multiple",
      },
    ],
  }),
};
</script>
<style scoped>
.fondito:before {
  overflow: hidden;
  content: " ";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  opacity: 0.3;
  background-image: url("assets/img/green-leaf.png");
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
}

.ps {
  height: inherit;
}
</style>
