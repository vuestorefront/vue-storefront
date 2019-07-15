<template>
  <modal name="modal-sizeguide" :width="620">
    <div slot="header">
      Size Guide
    </div>
    <div slot="content">
      <SizeGuideContent />
    </div>
  </modal>
</template>

<script>
import { mapState } from 'vuex'
import Modal from 'theme/components/core/Modal'
import SizeGuideContent from 'theme/components/theme/blocks/Static/Example'

export default {
  name: 'SizeGuide',
  computed: {
    ...mapState({
      activeElem: state => state.ui.authElem
    })
  },
  components: {
    Modal,
    SizeGuideContent
  },
  methods: {
    close (e) {
      if (e) localStorage.removeItem('redirect')
      this.$bus.$emit('modal-hide', 'modal-sizeguide')
    }
  }
}
</script>

<style scoped>
    .modal {
        font-size: 18px;
    }
    .modal-content {
        max-height: 80%;
    }
</style>
