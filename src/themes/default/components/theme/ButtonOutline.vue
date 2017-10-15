<template>
  <div class="button-outline uppercase px40 py15" :class="{ light : color === 'light', dark : color === 'dark' }">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'button-outline',
  props: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.button-outline {
    font-size: 16px;
    border: 2px solid;
    display: inline-flex;
    cursor: pointer;
    font-weight: 400;
}
.light {
    color: white;
    border-color: white;
}
.light:hover {
    color: #000;
    background: white;
}
.dark {
    color: #000;
    border-color: #000;
}
.dark:hover {
    color: white;
    background: #000;
}
</style>