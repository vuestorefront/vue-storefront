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
    color: black;
    background: white;
}
.dark {
    color: black;
    border-color: black;
}
.dark:hover {
    color: white;
    background: black;
}
</style>