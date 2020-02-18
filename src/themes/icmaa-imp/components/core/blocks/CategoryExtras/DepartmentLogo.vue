<template>
  <router-link :to="link" :title="alt" @click.native="setCluster" data-test-id="DepartmentLogo">
    <img :src="url" :srcset="`${url} 1x, ${retinaUrl} 2x`" :alt="alt">
  </router-link>
</template>

<script>
export default {
  name: 'DepartmentLogo',
  props: {
    url: {
      type: String,
      required: true
    },
    retinaUrl: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    link: {
      type: [String, Object],
      required: true
    },
    cluster: {
      type: [String, Boolean],
      default: false
    }
  },
  methods: {
    setCluster () {
      this.$store.dispatch('user/setCluster', this.cluster)
    }
  }
}
</script>
