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

export default {
  data () {
    return {
      breadcrumbs: 'Homepage / ' + this.$props.title
    }
  },
  props: ['page', 'title'],
  components: {
    staticpage
  }
}
</script>

<style scoped>
  .hidden {
    display: none;
  }
</style>
