<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link :to="{ name: 'Home' }">
        <div class="d-flex align-center">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2 hidden-sm-and-down"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 mr-16"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          />
        </div>
      </router-link>
      <v-spacer></v-spacer>
      <div class="d-flex mr-0">
        <v-text-field
          label="Cari Berita"
          class="pt-7"
          v-model="title"
        ></v-text-field>
        <v-btn icon class="mt-5" @click="searchNews(title)">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute class="blue pt-16">
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="yellow--text">
          <v-list-item
            @click="storeSourceName(item.source.name)"
            class="white--text mb-5 mt-5"
            v-for="item in getItems"
            :key="item.index"
          >
            <b-img
              :src="item.urlToImage"
              rounded="circle"
              width="45"
              height="45"
              alt="Circle image"
            ></b-img>
            <v-list-item-title
              style="font-size: 15px"
              class="ml-5 text-uppercase"
            >
              {{ item.source.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Load Template -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      group: null,
      title: "",
    };
  },
  computed: {
    ...mapGetters({ getItems: "news/getItems" }),
  },
  methods: {
    ...mapMutations({
      setSourceName: "news/setSourceName",
      setSearchNews: "news/setSearchNews",
    }),
    storeSourceName(value) {
      this.setSourceName(value);
    },
    searchNews(title) {
      this.setSearchNews(title);
    },
  },
};
</script>
