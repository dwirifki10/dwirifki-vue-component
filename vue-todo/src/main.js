import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'
import { ModalPlugin } from 'bootstrap-vue'


Vue.use(VueSweetalert2)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(ModalPlugin)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
