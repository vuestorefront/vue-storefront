<template>
<Content :page-key="$site.pages.find(p => p.path === '/core/' + contentKey + '.html').key" />
</template>

<script>
export default {
  props: ['content-key']
}
</script>