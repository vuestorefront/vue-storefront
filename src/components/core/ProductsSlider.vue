<template>
  <div>
    Core Products Slider
  </div>
</template>

<script>
  export default {
    name: 'ProductsSlider',
    props: {
      title: {
        type: String,
        required: false
      },
      products: {
        type: Array,
        required: true
      },
      config: {
        type: Object,
        required: false
      }
    }
  }
</script>
