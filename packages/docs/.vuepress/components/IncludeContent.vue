<template>
  <Content :page-key="$site.pages.find(p => p.path === '/' + contentKey + '.html').key" />
</template>

<script>
export default {
  props: ['content-key']
}
</script>
