<template>
  <div class="container">
    <h3 class="fw-bold text-muted">Berita Terkini</h3>
    <ListNews />
  </div>
</template>

<script>
import ListNews from "@/components/ListNews.vue";

export default {
  name: "Home",
  components: { ListNews },
};
</script>
