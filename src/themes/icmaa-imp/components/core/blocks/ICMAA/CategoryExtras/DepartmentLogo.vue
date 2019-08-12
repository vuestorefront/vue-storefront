<template>
  <router-link :to="link" :title="alt">
    <img :src="url" :srcset="`${url} 1x, ${retinaUrl} 2x`" :alt="alt">
  </router-link>
</template>

<script>
export default {
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
      type: String,
      required: true
    }
  }
}
</script>
