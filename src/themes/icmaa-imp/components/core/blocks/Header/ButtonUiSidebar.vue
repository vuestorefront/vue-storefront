<template>
  <button-icon :icon="icon" :title="title" :qty="quantity" @click="openSidebarMenu" />
</template>

<script>
import { mapState } from 'vuex'
import ButtonIcon from 'theme/components/core/blocks/Header/ButtonIcon'

export default {
  name: 'ButtonUiSidebar',
  components: {
    ButtonIcon
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    uiState: {
      type: String,
      required: true
    },
    uiAction: {
      type: String,
      required: true
    },
    qtyGetter: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    ...mapState({
      isOpen: function (state) {
        return state.ui[this.uiState]
      }
    }),
    quantity () {
      return this.qtyGetter
        ? Number(this.$store.getters[this.qtyGetter])
        : 0
    }
  },
  methods: {
    openSidebarMenu () {
      this.$store.dispatch('ui/' + this.uiAction, !this.isOpen)
    }
  }
}
</script>
