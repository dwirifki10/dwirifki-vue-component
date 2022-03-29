<template>
  <div class="container">
    <div class="card mb-3">
      <img :src="item.urlToImage" class="card-img-top" alt="..." />
      <div class="card-body text-start">
        <h5 class="card-title text-center mb-5">
          {{ item.title }}
        </h5>
        <p class="card-text text-muted fw-bold">
          <small>{{ item.author }}</small>
        </p>
        <p class="card-text">{{ item.content }} {{ item.description }}</p>
        <p class="card-text">
          <small class="text-muted">{{ item.publishedAt }}</small>
        </p>
        <p class="card-text mb-5">
          <small class="text-muted">{{ item.url }}</small>
        </p>
        <div class="d-flex justify-content-between">
          <router-link :to="{ name: 'Home' }">
            <button type="button" class="btn btn-outline-success">
              Sebelumnya
            </button>
          </router-link>
          <router-link
            :to="{
              name: 'Detail',
              params: { id: getItems[Math.floor(Math.random() * 20)].title },
            }"
          >
            <button type="button" class="btn btn-outline-success">
              Selanjutnya
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      item: [],
    };
  },
  mounted() {
    this.checkValidateURL();
  },
  computed: {
    ...mapGetters({ getItems: "news/getItems" }),
  },
  watch: {
    $route() {
      this.checkValidateURL();
    },
  },
  methods: {
    checkValidateURL() {
      if (this.getItems.length === 0) {
        this.$router.push({ name: "Home" });
      } else {
        this.item = this.getItems.filter((item) => {
          return item.title === this.$route.params.id;
        })[0];
      }
    },
  },
};
</script>
