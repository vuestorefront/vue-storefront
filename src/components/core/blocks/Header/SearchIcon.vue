<template>
  <div class="search-ico">
    Core Search Icon
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventBus from 'src/event-bus/event-bus'

export default {
  name: 'search-icon',
  computed: {
    ...mapState({
      isOpen: state => state.ui.searchpanel
    })
  },
  methods: {
    toggleSearchpanel () {
      EventBus.$emit('focusSearchInput')
      this.$store.commit('ui/setSearchpanel', !this.isOpen)
    }
  }
}
</script>
