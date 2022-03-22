<template>
    <div class="mt-3">
      <b-table
        striped hover :items="items"
        :fields="fields"
        responsive="sm"
        >
        <template #cell(no)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(update)="rowUpdate">
          <div>
            <button
              class="btn btn-warning btn-sm text-white fw-bold"
              v-b-modal="'my-modal'" @click.prevent="showModal(rowUpdate.item.message, rowUpdate.item.id)"
              >
              Update  
            </button>
            <b-modal 
              id="my-modal" 
              title="Update Message" 
              hide-header-close
              ok-only
              hide-footer>
              <input type="hidden" v-model="id">
              <b-form>
                <b-form-textarea
                  id="textarea"
                  v-model="newMessage"
                  placeholder="Enter New Message..."
                  rows="3"
                  max-rows="6"
                  required></b-form-textarea>
              </b-form>
               <b-button 
                class="mt-3"  
                block 
                @click="hideModal">
                Close
              </b-button>
              <b-button 
                class="mt-3" 
                style="margin-left: 3%;"
                variant="primary" 
                block 
                @click="modify">
                Change
              </b-button>
            </b-modal>
          </div>
        </template>
        <template #cell(delete)="rowDelete">
          <button
            class="btn btn-danger btn-sm fw-bold"
            @click="destroy(rowDelete.item.id)"
            >
            Delete
            </button>
        </template>  
      </b-table>
    </div>
</template>

<script>
export default {
  name: 'TableView',
  props: { 
    items: Array, 
    prevItems: Array 
  },
  data() {
    return {
      id: null,
      modalShow: false,
      newMessage: "",
      fields: [
        {key: "no"},
        {key: "message"},
        {key: "update"},
        {key: "delete"}
      ]
    }
  },
  methods: {
    destroy(id){
      this.$swal.fire({
        title: "Are you sure ?",
        text: "This data will be permanently deleted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      })
      .then((result) => {
        if(result.isConfirmed) {
          const indexObj = this.prevItems.findIndex((e) => e.id == id);
          this.prevItems.splice(indexObj, 1);
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Deleted Data',
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
    },
    modify(){
      let result = this.prevItems.filter((item) => item.id === this.id);
      result.map((res) => res.message = this.newMessage);
      localStorage.setItem("items",  JSON.stringify(this.items));
      this.hideModal();
      this.$swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successfully Updated Data',
        showConfirmButton: false,
        timer: 2000
      })
    },
    showModal(data, id){
      this.newMessage = data;
      this.id = id;
    },
    hideModal(){
      this.$bvModal.hide("my-modal");
    }
  },
}
</script>