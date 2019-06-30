<template>
  <div :class="['cms-content']" v-if="loaded" v-html="block.content" />
</template>

<script>
import Block from 'src/modules/icmaa-cms/components/Block'

export default {
  mixins: [ Block ]
}
</script>
