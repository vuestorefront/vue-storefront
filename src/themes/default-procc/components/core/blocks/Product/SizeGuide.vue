<template>
  <modal name="modal-sizeguide" :width="620">
    <div slot="header" v-if="!'Disabled by Dan -> not needed, not translated'">
      Size Guide
    </div>
    <div slot="content">
<!--      <SizeGuideContent />-->
<!--      // ProCC sizeChart-->
      <size-chart-view class="align-center" :product="getCurrentProduct" />
    </div>
  </modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex'  // Updated by Dan
import Modal from 'theme/components/core/Modal'
import SizeGuideContent from 'theme/components/theme/blocks/Static/Example'

import SizeChartView from 'theme/components/procc/Product/SizeChartView.vue' // By ProCC

export default {
  name: 'SizeGuide',
  computed: {
    ...mapGetters({ // Added by Dan
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    ...mapState({
      activeElem: state => state.ui.authElem
    })
  },
  components: {
    Modal,
    SizeChartView, // By ProCC
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
