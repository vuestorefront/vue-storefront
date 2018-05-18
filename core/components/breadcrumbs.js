import Vue from 'vue'

export default Vue.component('Breadcrumbs', {
  props: {
    routes: {
      type: Array,
      required: true
    },
    activeRoute: {
      type: String,
      required: true
    }
  }
})
