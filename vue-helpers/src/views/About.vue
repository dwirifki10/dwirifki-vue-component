<template>
  <div class="container">
   <h3 class="fw-bold">About Page</h3>
    <p class="fw-bold text-secondary">Created by : Dwi Rifki Novianto</p>
     <div class="row gx-5">
       <div class="col d-flex justify-content-center" 
         v-for="item in items" 
         :key="item.index">
         <div class="card mt-3 mb-3" style="width: 18rem;">
            <img v-bind:src="require(`../assets/img/` + item.image)"
              class="card-img-top" 
              height="200" 
              width="200"
              v-bind:alt="item.image">
            <div class="card-body">
              <h5 class="card-title fw-bold">{{ item.title }}</h5>
              <p class="card-text">{{ item.message }}</p>
              <a :href="item.link" class="btn btn-success">Go to Website</a>
            </div>
          </div>
       </div>
     </div>
  </div>
</template>
<script>
  export default {
    name: "About",
    data() {
      return {
        items: [
          { 
            image: "vue.jpeg",
            title: "Vue Js",
            message: "Vue is a JavaScript framework for building user interfaces Unlike other monolithic frameworks.",
            link: "https://vuejs.org/"
          },
          { 
            image: "boostrap.png",
            title: "Bootstrap-Vue",
            message: "Bootstrap-Vue is a component library based entirely on the hugely popular Bootstrap frontend CSS framework.",
            link: "https://sweetalert2.github.io/"
          },
          { 
            image: "sweetalert.png",
            title: "Sweet Alert", 
            message: "Sweet Alert is a way to customize alerts in your websites. It allows you to change from a standard JavaScript.",
            link: "https://bootstrap-vue.org/"
          }
        ]
      }
    }
  }
</script>
<style scoped>
  p {
    font-size: 15px;
  }
</style>