<template>
  <div class="cms-content" v-if="data" v-html="data.content" />
</template>

<script>
export default {
  name: 'CmsData',
  props: {
    id: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  created () {
    this.$store.dispatch(
      'cms/loadCms',
      {
        id: this.id,
        type: this.type
      }
    )
  },
  computed: {
    data () {
      return this.$store.getters[`cms/get${this.type}`](this.id)
    }
  }
}
</script>
