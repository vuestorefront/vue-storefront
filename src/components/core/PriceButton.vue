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
      required: true
    },
    code: {
      type: null,
      required: true
    },
    from: {
      type: null,
      required: true
    },
    to: {
      type: null,
      required: true
    },
    context: {
      type: null,
      default: ''
    }
  }
}
</script>
