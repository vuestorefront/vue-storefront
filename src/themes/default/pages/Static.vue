<template>
  <div>
    <div class="bg-lightgray p45">
      <h5 class="mt0 c-lightgray">{{ breadcrumbs }}</h5>
      <h2>{{ this.$props.title }}</h2>
    </div>
    <div class="p45 pt0">
      <staticpage/>
    </div>
  </div>
</template>

<script>
import staticpage from '../resource/lorem.md'
import Meta from 'src/lib/meta'

export default {
  components: {
    staticpage
  },
  mixins: [Meta],
  meta () {
    return {
      title: this.$props.title
    }
  },
  data () {
    return {
      breadcrumbs: 'Homepage / ' + this.$props.title
    }
  },
  props: ['page', 'title'],
  watch: {
    '$route': 'validateRoute'
  },
  methods: {
    validateRoute () {
      this.setMeta()
    }
  }
}
</script>

<style scoped>
  .hidden {
    display: none;
  }
</style>
