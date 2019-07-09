<template>
  <component :class="['cms-content']" :is="content" v-if="loaded" />
</template>

<script>
import Block from 'src/modules/icmaa-cms/components/Block'

export default {
  mixins: [ Block ]
}
</script>
