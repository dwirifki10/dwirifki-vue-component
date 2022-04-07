<template>
  <v-container>
    <ListNews />
  </v-container>
</template>

<script>
import ListNews from "@/components/ListNews.vue";

export default {
  name: "Home",
  components: { ListNews },
};
</script>
