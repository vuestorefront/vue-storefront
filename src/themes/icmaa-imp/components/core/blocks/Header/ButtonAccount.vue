<template>
  <button-icon icon="person" title="My Account" @click="toggleAccount" />
</template>

<script>
import ButtonIcon from 'theme/components/core/blocks/Header/ButtonIcon'

export default {
  name: 'ButtonAccount',
  components: {
    ButtonIcon
  },
  methods: {
    toggleAccount () {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    }
  }
}
</script>
