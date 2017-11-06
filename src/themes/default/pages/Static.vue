<template>
  <div>
    <div class="bg-lightgray py35 pl20">
      <div class="container">
        <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" :active-route="$props.title" />
        <h2>{{ this.$props.title }}</h2>
      </div>
    </div>
    <div class="p45 pt0">
      <staticpage/>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/core/Breadcrumbs'
import staticpage from '../resource/lorem.md'
import Meta from 'src/lib/meta'

export default {
  components: {
    Breadcrumbs,
    staticpage
  },
  mixins: [Meta],
  meta () {
    return {
      title: this.$props.title
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
</style>
