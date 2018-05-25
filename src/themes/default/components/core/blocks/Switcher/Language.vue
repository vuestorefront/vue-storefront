<template>
  <modal name="modal-switcher" :width="650">
    <p slot="header">
      {{ $t('Choose your country') }}
    </p>
    <div slot="content">
      <h3>United Kingdom</h3>
      <ul>
        <li>English</li>
      </ul>
      <h3>Italy</h3>
      <ul>
        <li>English</li>
        <li>Italiano</li>
      </ul>
    </div>
  </modal>
</template>
<script>
import Modal from 'theme/components/core/Modal.vue'

export default {
  components: {
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
  h3 {
    margin-bottom: 0.5em;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      display: inline-block;
      + li {
        margin-left: 1em;
      }
    }
  }
</style>
