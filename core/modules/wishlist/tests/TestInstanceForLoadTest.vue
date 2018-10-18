<template>

</template>

<script>
export default {
  created () {
    this.$store.dispatch('wishlist/load')
  }
}
</script>
