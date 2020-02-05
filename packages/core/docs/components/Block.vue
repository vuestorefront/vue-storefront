<template>
  <div class="custom-block" :class="type"><p class="custom-block-title">{{ title }}</p> <p><slot /></p></div>
</template>

<script>
export default {
  props: ['title', 'type']
}
</script>