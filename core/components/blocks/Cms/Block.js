export default {
  name: 'CmsBlock',
  props: {
    id: {
      type: Number,
      default: null,
      required: false
    },
    identifier: {
      type: String,
      default: null,
      required: false
    },
    sync: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  asyncData ({ store, route, context }) {
    // @TODO to cover SSR need find a way to pass props identifier/id to the asyncData()
    // for now it is not possible but assuming from some info it could be available later
    // we try to dispatch 'single' action which actually dispatch list to prefetch data anyway
    return new Promise((resolve, reject) => {
      store.dispatch('cms_block/single', {
        value: this.identifier
      }).then(res => {
        return resolve(res)
      })
    })
  },
  computed: {
    data () {
      if (this.id) {
        return this.$store.getters[`cms_block/cmsBlockId`](this.id)
      } else if (this.identifier) {
        return this.$store.getters[`cms_block/cmsBlockIdentifier`](this.identifier)
      }
    }
  }
}
