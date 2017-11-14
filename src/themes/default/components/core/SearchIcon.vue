<template>
    <i class="material-icons md-18" @click="searchClick">search</i>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

export default {
  methods: {
    searchClick () {
      EventBus.$emit('notification', {
        type: 'success',
        message: 'This feature is not implemented yet :( There is issue #33 for Search Widget',
        action1: { label: 'OK', action: 'close' }
      })
    }
  },
  mixins: [coreComponent('core/SearchIcon')]
}
</script>

<style scoped>

</style>
