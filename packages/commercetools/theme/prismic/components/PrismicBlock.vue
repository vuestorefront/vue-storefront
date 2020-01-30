<template>
  <div>
      <div v-if="block.type === 'html'" v-html="$prismic.asHtml(block.document)" />
      <prismic-image v-if="block.type === 'image'" :field="block.document" />
      <div v-if="block.type === 'text'" v-html="$prismic.asText(block.document)" />
      <prismic-embed v-if="block.type === 'embed'" :field="block.document" />
      <prismic-link v-if="block.type === 'link'" :field="block.document.url">{{block.document.url}}</prismic-link>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      required: true
    }
  }
}
</script>
