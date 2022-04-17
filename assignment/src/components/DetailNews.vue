<template>
  <v-container>
    <v-card class="mx-auto mt-10" max-width="1000">
      <v-img
        class="white--text align-end"
        height="500px"
        v-bind:src="require(`../assets/img/${this.item.urlToImage}`)"
      >
        <v-card-title>General</v-card-title>
      </v-img>
      <v-card-subtitle class="pb-3">
        <h5>{{ item.title }}</h5>
      </v-card-subtitle>
      <v-card-text class="text--primary">
        <div class="pb-3">
          <div class="d-flex justify-space-between">
            <span>{{ item.author }}</span>
            <span>{{ moment(item.publishedAt) }}</span>
          </div>
        </div>
        <div v-html="item.description" class="mb-3 text-justify"></div>
        <div v-html="item.content" class="text-justify"></div>
        <div class="pt-5">
          <a :href="item.url" target="_blank" class="text-decoration-none">
            Github Selengkapnya ...
          </a>
        </div>
      </v-card-text>
      <v-card-actions>
        <router-link :to="{ name: 'Home' }" class="text-decoration-none">
          <v-btn color="orange" text> Kembali </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "DetailNews",
  data() {
    return {
      item: [],
    };
  },
  mounted() {
    this.getDetailNews();
  },
  computed: {
    ...mapGetters({
      getItems: "news/getItems",
      getSearchItems: "news/getSearchItems",
    }),
  },
  methods: {
    moment(item) {
      return moment(item).format("DD MMMM YYYY");
    },
    getDetailNews() {
      let data = this.getItems.filter((item) => {
        return item.title === this.$route.params.id;
      });
      if (data.length === 0) {
        data = this.getSearchItems.filter((item) => {
          return (item.title = this.$route.params.id);
        });
        if (data.length === 0) {
          this.$router.push({ name: "Home" });
        }
      }
      this.item = data[0];
    },
  },
};
</script>
