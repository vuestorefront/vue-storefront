<template>
  <div class="search-ico">
    Core Search Icon
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'search-icon',
  computed: {
    ...mapState({
      isOpen: state => state.ui.searchpanel
    })
  },
  methods: {
    toggleSearchpanel () {
      this.$bus.$emit('focusSearchInput')
      this.$store.commit('ui/setSearchpanel', !this.isOpen)
    }
  }
}
</script>
