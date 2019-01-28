<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
export default {
  name: 'ContentType',
  props: {
    type: {
      type: String,
      default: null,
      required: false
    }
  },
  mounted () {
    this.$store.dispatch('prismic/load', {
      type: this.type
    })
  },
  computed: {
    data () {
      return this.$store.getters[`prismic/contentByType`]('cms_page')
    }
  }
}
</script>
