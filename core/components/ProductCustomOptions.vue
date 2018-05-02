<template>
  <div>
    <div class="between-md" v-for="option in product.custom_options" :key="option.option_id">
      <label for="">{{ option.title }}</label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductCustomOptions',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>
