<template>
  <button>
    <!--
        Filter button for category size
        props:
        "label" - text displayed at filter
        "id" - filter ID
        "code" - filter code
        "context"
        data to display:
        {{ label }}
      -->
  </button>
</template>

<script>
export default {
  name: 'SizeButton',
  props: ['label', 'id', 'code', 'context']
}
</script>