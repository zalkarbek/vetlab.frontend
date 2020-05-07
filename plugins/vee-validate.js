import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

// Register it globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
