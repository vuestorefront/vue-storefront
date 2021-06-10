import Vue from 'vue';
import { getStoryblokQueryParams } from '../helpers'

export default Vue.extend({
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  filters: {
    pretty (value: any) {
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
});
