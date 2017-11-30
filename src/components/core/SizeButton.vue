<template>
  <button>
    <!--
      Filter button for category size
      props:
      {{ label }} - text displayed at filter
      {{ id }} - filter ID
      {{ code }} - filter code
      {{ context }}
      -->
    Core size button
  </button>
</template>

<script>
export default {
  name: 'size-button',
  props: ['label', 'id', 'code', 'context']
}
</script>