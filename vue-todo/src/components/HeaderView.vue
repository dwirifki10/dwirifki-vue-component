<template>
  <div class="container">
	<div class="mb-5">
       <img alt="Vue Logo" src="../assets/logo.png" width="100" height="100">
       <h3 class="fw-bold mt-3">{{ msg }}</h3>
       <b-button variant="success" pill class="btn btn-md mt-3" @click="deleteCache">Delete Cache</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderView',
  props: { 
    msg: String 
  },
  methods: {
    deleteCache(){
      this.$swal.fire({
        title: "Are you sure to delete cache ?",
        text: "This data will be permanently deleted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      }).then((result) => {
        if(result.isConfirmed){
          localStorage.removeItem("items");
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Deleted Cache',
            showConfirmButton: false,
            timer: 2000
          })
          window.location.reload();
        }
      })
    }
  }
}
</script>

<style scoped>
 h3 {
    color: #42b983;
  }
</style>