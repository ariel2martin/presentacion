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
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <span>Menu</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>

          <template v-for="(item, index) in items">
            <v-list-item
              :href="item.href"
              :to="{ name: item.href }"
              :key="index"
            >
              <v-list-item-action>
                <v-icon light v-html="item.icon"></v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </perfect-scrollbar>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Demo</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-fade-transition mode="out-in">
        <div>
          <h1>Hello App34!</h1>
          <p>
            <!-- use router-link component for navigation. -->
            <!-- specify the link by passing the `to` prop. -->
            <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
            <router-link to="/about">Go to Foo</router-link>
            <router-link to="/vacio">Go to Bar</router-link>
          </p>
          <!-- route outlet -->
          <!-- component matched by the route will render here -->
          <router-view></router-view>
        </div>
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
        href: "/graficoDinamico",
        router: true,
        text: "Gráfico dinámico",
        icon: "mdi-folder",
      },
      {
        href: "inspire",
        router: true,
        text: "Shared with me",
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
