// breadcrumbs functionality will be rewritten, and this component is theme-specific
export default {
  name: 'Breadcrumbs',
  props: {
    routes: {
      type: Array,
      required: true
    },
    activeRoute: {
      type: String,
      default: ''
    }
  }
}
