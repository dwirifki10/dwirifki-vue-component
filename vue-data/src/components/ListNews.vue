<template>
  <div class="container mt-4">
    <div class="col-lg-12 d-flex justify-content-center">
      <div class="alert alert-warning col-lg-6" role="alert">
        If you just visited this page, please refresh again
      </div>
    </div>
    <button class="btn btn-success mb-4" @click="destroy">Hapus Cache</button>
    <div class="row justify-content-between">
      <div class="col-lg-6 mb-5" v-for="item in items" :key="item.index">
        <router-link
          :to="{ name: 'Detail', params: { id: item.title } }"
          class="text-decoration-none"
        >
          <div class="card" style="width: 100%; height: 100%">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  :src="item.urlToImage"
                  alt="..."
                  class="img-fluid"
                  style="height: 200px; width: 100%"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body text-start">
                  <p class="card-text text-muted fw-bold">
                    <small>{{ item.author }}</small>
                  </p>
                  <h6 class="card-title text-dark">{{ item.title }}</h6>
                  <p class="card-text">
                    <small class="text-muted">
                      {{ item.publishedAt }}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ListNews",
  data() {
    return {
      items: [],
    };
  },
  async created() {
    this.items = this.getItems;
    if (this.items.length === 0) {
      await this.storeItems();
    }
  },
  computed: {
    ...mapGetters({
      getItems: "news/getItems",
      getErrors: "news/getErrors",
    }),
  },
  methods: {
    ...mapActions({ storeItems: "news/storeItems" }),
    destroy() {
      localStorage.removeItem("items");
      location.reload();
    },
  },
};
</script>
