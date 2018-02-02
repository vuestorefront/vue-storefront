<template>
  <div class="compare-icon" v-if="hasCompare">
    Core Compare Icon
    <router-link to="/compare">compare</router-link>
  </div>
</template>

<script>
  export default {
    name: 'CompareIcon',
    props: {
      product: {
        type: Object,
        required: false,
        default: () => {}
      }
    },
    computed: {
      hasCompare () {
        return this.$store.state.compare.compare
      }
    }
  }
</script>
