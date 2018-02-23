import { htmlDecode } from 'core/filters'

function getMeta (vm) {
  const { meta } = vm.$options
  if (meta) {
    return typeof meta === 'function'
      ? meta.call(vm)
      : meta
  }
}

const clientMeta = {
  mounted () {
    this.setMeta()
  },
  // SSR support for components without any async data
  // Meta tags can be passed by router.meta object
  asyncData ({ store, route }) {
    return new Promise((resolve, reject) => {
      if (typeof route.meta.title !== 'undefined') {
        store.commit('meta/title', route.meta.title)
      }
      if (typeof route.meta.description !== 'undefined') {
        store.commit('meta/description', route.meta.description)
      }
      return resolve()
    })
  },
  methods: {
    setMeta () {
      const meta = getMeta(this)

      if (typeof meta !== 'undefined') {
        if (meta.title) {
          document.title = htmlDecode(meta.title + this.$store.state.meta.suffix)
          this.$store.commit('meta/title', meta.title)
        }

        if (meta.description) {
          document.querySelector('meta[name="description"]').setAttribute('content', meta.description)
          this.$store.commit('meta/description', meta.description)
        }
      }
    }
  }
}

export default clientMeta
