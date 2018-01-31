<template>
  <span @click.stop="next()" v-if="type === 'next'">
    <i class="material-icons p15">keyboard_arrow_right</i>
  </span>
  <span @click.stop="back()" v-else>
    <i class="material-icons p15">keyboard_arrow_left</i>
  </span>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SubBtn',
  props: {
    id: [String, Number],
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
<style scoped>
  .material-icons {
    cursor: pointer;
  }
</style>
