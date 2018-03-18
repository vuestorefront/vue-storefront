<template>
  <div class="my-orders">
    Core My orders
  </div>
</template>

<script>
export default {
  name: 'MyOrders',
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    }
  }
}
</script>
