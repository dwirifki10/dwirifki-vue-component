<template>
  <v-container>
    <h3 class="font-weight-bold blue-grey--text text-center mt-3 mb-5">
      Berita Terkini ( {{ items.length }} )
    </h3>
    <div class="text-center pb-4">
      <v-btn depressed color="primary" @click="destroyCache" class="mr-10">
        Hapus Cache
      </v-btn>
      <v-btn depressed color="primary" @click="reloadData"> Muat Ulang </v-btn>
    </div>
    <v-row>
      <v-col lg="12">
        <v-card
          class="mx-auto"
          max-width="660"
          v-for="item in items"
          :key="item.index"
        >
          <v-img
            class="white--text align-end"
            height="400px"
            :src="item.urlToImage"
          >
            <v-card-title>General</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-5"> {{ item.title }} </v-card-subtitle>
          <v-card-text class="text--primary">
            <div class="pb-3">{{ item.author }}</div>
            <div>{{ item.description }}</div>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between pb-3 mb-10">
            <v-btn rounded small color="blue-grey" class="white--text">
              {{ item.source.name }}
            </v-btn>
            <b-icon-facebook font-scale="1.2" />
            <b-icon-twitter font-scale="1.2" />
            <b-icon-google font-scale="1.2" />
            <b-icon-linkedin font-scale="1.2" />
            <router-link :to="{ name: 'Detail', params: { id: item.title } }">
              <v-btn small depressed color="primary"> Read More </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-intersect="handleLoadMore" v-if="isFetchReady"></div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ListNews",
  data() {
    return {
      items: [],
      isFetchReady: true,
      page: 1,
    };
  },
  mounted() {
    this.fetchItems();
  },
  computed: {
    ...mapGetters({
      getItems: "news/getItems",
      getErrors: "news/getErrors",
      getPage: "news/getPage",
      getSourceName: "news/getSourceName",
      getSearchNews: "news/getSearchNews",
    }),
  },
  watch: {
    getItems(state) {
      this.items = [...state];
    },
    getSourceName(value) {
      if (value) {
        this.items = this.getItems.filter((item) => {
          return value == item.source.name;
        });
      } else {
        this.items = this.getItems;
      }
    },
    async getSearchNews(title) {
      if (title) {
        this.items = await this.searchItems(title);
        this.isFetchReady = false;
      } else {
        this.items = this.getItems;
        this.isFetchReady = true;
      }
    },
    getErrors(state) {
      if (state) {
        this.$swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Oops too many request, You have made too many requests recently",
        });
        this.isFetchReady = false;
      }
    },
  },
  methods: {
    ...mapActions({
      storeItems: "news/storeItems",
      searchItems: "news/searchItems",
    }),
    fetchItems() {
      this.items = this.getItems;
      this.page = this.getPage;
      if (this.items.length === 0) {
        this.storeItems(this.page++);
      }
    },
    handleLoadMore() {
      if (this.items.length >= 50) {
        this.isFetchReady = false;
      } else {
        setTimeout(() => {
          this.storeItems(this.page++);
        }, 500);
      }
    },
    destroyCache() {
      localStorage.clear();
      location.reload();
    },
    reloadData() {
      this.items = this.getItems;
    },
  },
};
</script>
