<template>
  <modal name="modal-switcher" :width="650">
    <p slot="header">
      {{ $t('Change language') }}
    </p>
    <div slot="content">
      <form @submit.prevent="subscribe" novalidate>
        <button-full
          class="mb35"
          type="submit"
          @click.native="$v.email.$touch"
        >
          {{ $t('Update settings') }}
        </button-full>
      </form>
    </div>
  </modal>
</template>
<script>
import Modal from 'theme/components/core/Modal.vue'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'

export default {
  components: {
    ButtonFull,
    Modal
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-switcher')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
