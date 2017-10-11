<template>
    <button class="bg-transparent c-lightgray brdr-1 brdr-gray" @click="switchFilter()">
        {{ size }}
    </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  methods: {
    switchFilter () {
      console.log('Switch Filter')
    }
  },
  mixins: [coreComponent('core/SizeButton')]
}
</script>

<style scoped>

    button {
        width: 40px;
        height: 40px;
    }
    
</style>
