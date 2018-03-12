<template>
  <button
    class="inline-flex end-xs p15"
    v-if="type === 'next'"
    type="button"
    @click.stop="next()"
    :aria-label="$t('Show subcategories')"
  >
    <i class="material-icons">keyboard_arrow_right</i>
  </button>
  <button
    class="inline-flex p15"
    v-else
    type="button"
    @click.stop="back()"
    :aria-label="$t('Back')"
  >
    <i class="material-icons">keyboard_arrow_left</i>
  </button>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SubBtn',
  props: {
    id: {
      type: null,
      default: ''
    },
    type: {
      type: String,
      default: 'next'
    }
  },
  computed: {
    ...mapState({
      submenu: state => state.ui.submenu
    })
  },
  methods: {
    next () {
      this.$store.commit('ui/setSubmenu', {
        id: this.id,
        depth: ++this.submenu.depth
      })
    },
    back () {
      this.$store.commit('ui/setSubmenu', {
        depth: --this.submenu.depth
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  button {
    opacity: 0.6;

    &:hover,
    &:focus {
      opacity: 1;
    }
  }
</style>
