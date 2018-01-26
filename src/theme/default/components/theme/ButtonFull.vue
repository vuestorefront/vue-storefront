<template>
  <div class="button-full px55 py20 center-xs ripple" tabindex="0" v-focus-clean="{class: 'no-outline'}">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'button-full',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.button-full {
    font-size: 16px;
    display: inline-flex;
    cursor: pointer;
    font-weight: 400;
    background: black;
    color: white;
}
.button-full:hover {
    background: #333333;
}

</style>
