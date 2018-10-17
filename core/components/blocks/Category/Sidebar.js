export default {
  name: 'CategorySidebar',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  methods: {
    sortById (filters) {
      return [...filters].sort((a, b) => { return a.id - b.id })
    }
  }
}
