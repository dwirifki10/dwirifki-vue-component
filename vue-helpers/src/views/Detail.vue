<template>
	<div class="container">
		<router-link :to="{name: 'Home'}">
			<b-button  class="mb-4 btn btn-sm" variant="outline-success">
				Back To Home
			</b-button>
		</router-link>
		<h3 class="mb-3 mt-3 fw-bold">{{ items.message }}</h3>
		<p>{{ items.description }}</p>
		<b-form class="mt-5" @submit.prevent="add()">
			<b-form-textarea 
				id="textarea-small"
				v-model="description"
				placeholder="Enter your description..."
				class="w-100"
				rows="3"
				max-rows="6"
			></b-form-textarea>				
            <b-button type="submit" variant="primary" class="w-100 mt-3">Submit</b-button>
		</b-form>
		<b-alert show variant="warning" v-if="isNotValid" class="mb-3 mt-3">
        This item is required
        </b-alert>
	</div>
</template>

<script>
/* eslint-disable no-mixed-spaces-and-tabs */
// import { mapGetters } from 'vuex'
export default {
  name: "Detail",
  data() {
	return {
		description: "",
		isNotValid: false,
		items: []
	 }
  },
  mounted() {
  	const result = this.$store.getters['todo/getItems'].find((item) => {
  		return item.id == this.$route.params.id
  	});
		(result == undefined) ? this.$router.push({name: "Home"}) : this.items = result;
  },
  methods: {
  	add(){
  		if(this.description){
  			this.$store.dispatch('todo/add', {
  				id: this.items.id,
  				description: this.description
  			});
  			this.isNotValid = false;
  			this.description = "";
  		}else{
  			this.isNotValid = true;
  		}
  	}
  }
}
</script>