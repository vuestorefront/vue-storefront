<template>
  <div id="Category">
    Core Category
  </div>
</template>

<script>
export default {
  name: 'category',
  data () {
    return {
      categoryName: this.$route.params.name
    }
  }
}
</script>

<style scoped>

</style>
