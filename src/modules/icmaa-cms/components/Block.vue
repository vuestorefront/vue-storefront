<template>
  <component :class="['cms-content']" :is="content" v-if="loaded && isValidComponent" />
</template>

<script>
import Block from 'icmaa-cms/mixins/Block'

export default {
  name: 'IcmaaCmsBlock',
  mixins: [ Block ]
}
</script>
