<template>
  <div class="container">
    <HeaderView v-bind:msg="msg"/>
    <b-form class="mb-5" @submit.prevent="store(message)">
      <div class="row">
        <div class="col-lg-10 mt-3">
            <b-form-input
              id="input-1"
              v-model="message"
              type="text"
              class="col-lg-6"
              placeholder="Enter your message..."
              autofocus>
            </b-form-input>
          </div>
          <div class="col-lg-2 mt-3">
             <b-button type="submit" variant="primary" class="w-100">Submit</b-button>
          </div>
          <div class="container">
            <b-alert show variant="warning" v-if="isNotValid" class="mb-3 mt-3">
              This item is required
            </b-alert>
          </div>
          <div class="container">
            <b-alert
              class="mt-3"
              :show="dismissCountDown"
              variant="success"
              @dismissed="dismissCountDown=0"
              @dismiss-count-down="countDownChanged">
              <p class="fw-bold">Hebat !</p> 
              <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
              <b-progress
                variant="success"
                :max="dismissSecs"
                :value="dismissCountDown"
                height="4px"
              ></b-progress>
            </b-alert>
          </div>
        </div>
    </b-form>
      <b-form-group id="input-group-2" label="Search something :" label-for="input-2" class="text-start">
        <b-form-input
          id="input-2" 
          type="text" 
          v-model="messageQuery" 
          placeholder="Search..."
          class="w-25"></b-form-input>
      </b-form-group>
    <p class="text-end">Total : {{ total }}</p>
    <!-- Fix Bug -->
    <TableView v-bind:items="searchQuery" v-bind:prevItems="items"/>  
  </div>
</template>


<script>
import TableView from '@/components/TableView.vue'
import HeaderView from '@/components/HeaderView.vue'
import { mapGetters } from 'vuex'

/* Fix Bug ID */
const nanoid = require("nanoid");

export default {
  name: 'Home',
  components: {
    TableView,
    HeaderView
  },
  data() {
    return {
      dismissCountDown: 0,
      dismissSecs: 10,
      isNotValid: false,
      msg: "Welcome To Vue JS App",
      message: "",
      messageQuery: "",
      items: []
    }
  },
  mounted(){
    const items = this.$store.getters['todo/getItems'];
    this.items = items ? items : [];
  },
  computed: {
    searchQuery(){
      if(this.messageQuery) {
        return this.items.filter((item) => {
          return this.messageQuery.toLowerCase().split(' ').every(query => item.message.toLowerCase().includes(query))});
      }else {
        return this.items;
      }
    },
    total(){
      return this.searchQuery.length;
    },
    ...mapGetters({ getItems: 'todo/getItems'})
  },
  watch: {
    total(total){
      if(total >= 4){
        this.showAlert();
        this.$swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Great!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    },
    getItems(items){
      this.items = items;
    }
  },
  methods: {
    store(message){
      if(this.message){
        this.$store.dispatch('todo/store', {
          id: nanoid.nanoid(),
          message: message,
          description: "No Content yet"
        });
        this.isNotValid = false;
        this.message = "";
      }else{
        this.isNotValid = true;
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  },
}
</script>
