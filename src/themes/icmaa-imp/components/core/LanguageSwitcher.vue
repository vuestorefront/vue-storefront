<template>
  <modal-switcher v-if="loadLanguagesModal" />
</template>

<script>
const ModalSwitcher = () => import(/* webpackChunkName: "vsf-languages-modal" */ 'theme/components/core/blocks/Switcher/Language.vue')

export default {
  components: {
    ModalSwitcher
  },
  data () {
    return {
      loadLanguagesModal: false
    }
  },
  beforeMount () {
    this.$bus.$on('modal-toggle-switcher', this.showLanguagesModal)
  },
  methods: {
    showLanguagesModal () {
      this.loadLanguagesModal = true
      this.$bus.$emit('modal-show', 'modal-switcher')
    }
  }
}
</script>
