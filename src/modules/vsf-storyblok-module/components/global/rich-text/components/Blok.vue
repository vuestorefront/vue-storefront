<template>
  <div class="sb-blok">
    <component
      v-for="contentItem in content"
      :key="contentItem.type + (Math.random() * Math.random())"
      :item="contentItem"
      :is="contentItem.component"
    />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {

  }
}
</script>
