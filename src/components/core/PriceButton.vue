<template>
  <button>
    Core price button
  </button>
</template>

<script>
export default {
  name: 'PriceButton',
  props: {
    content: {
      type: null,
      default: ''
    },
    id: {
      type: null,
      default: ''
    },
    code: {
      type: null,
      default: ''
    },
    from: {
      type: null,
      default: ''
    },
    to: {
      type: null,
      default: ''
    },
    context: {
      type: null,
      default: ''
    }
  }
}
</script>
