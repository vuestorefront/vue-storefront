import { getStoryblokQueryParams } from '../helpers'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  filters: {
    pretty (value) {
      return value
    }
  },
  computed: {
    isStoryblokPreview () {
      const { id } = getStoryblokQueryParams(this.$route)
      return !!id
    }
  },
  metaInfo: {
    meta: [
      { charset: 'utf-8', vmid: 'charset' }
    ]
  }
}
