<template>
  <component :class="['cms-content']" :is="content" v-if="loaded" />
</template>

<script>
import Block from 'icmaa-cms/components/Block'

export default {
  mixins: [ Block ]
}
</script>
