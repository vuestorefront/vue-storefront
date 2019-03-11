<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
export default {
  name: 'ContentId',
  props: {
    contentId: {
      type: String,
      default: null,
      required: true
    },
    filter: {
      type: String,
      default: '',
      required: false
    },
    filterOption: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    data () {
      return this.$store.getters[`prismic/contentById`](this.contentId)
    }
  }
}
</script>
