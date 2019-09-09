<template>
  <modal name="modal-onboard" class="modal-onboard">
    <div class="content relative flex middle-xs">
      <i slot="close" class="modal-close material-icons p15 cl-bg-tertiary" @click="close">close</i>
      <img src="/assets/logo.svg" :alt="$t(defaultTitle)" class="logo">

      <div class="copy align-center cl-secondary">
        <p class="h1">
          Welcome to Vue Storefront!
        </p>
        <div class="h4">
          <p>
            Vue Storefront is a PWA storefront for eCommerce.
            It is and always will be in the open source.
            Anyone can use and support the project,
            we want it to be a tool for the improvement of the shopping experience.
          </p>
          <p>
            This demo is synchronized with Magento 2.2.0.
          </p>
          <p>
            <strong>
              If you want to use the solution or join our passionate PWA community - feel free to contact us via
              <a href="mailto:contributors@vuestorefront.io" class="cl-success"> e-mail</a>
              or
              <a href="https://vuestorefront.slack.com/" class="cl-success"> Slack</a>.
            </strong>
          </p>
          <p>
            <button type="button" class="show-demo mt35 ripple brdr-none bg-cl-th-success pointer cl-white h4" @click="close">
              Show me the demo
            </button>
          </p>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import Modal from 'theme/components/core/Modal.vue'
import config from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  data () {
    const storeView = currentStoreView()
    return {
      defaultTitle: storeView.seo.defaultTitle ? storeView.seo.defaultTitle : config.seo.defaultTitle
    }
  },
  components: {
    Modal
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-onboard')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
$z-index-notification: map-get($z-index, notification);

.modal-onboard {
  z-index: $z-index-notification + 1;
}

.content {
  min-height: 600px;
  overflow: hidden;

  @media (max-width: 600px) {
    display: block;
    padding: 40px 20px;
  }
}

.copy {
  @media (min-width: 601px) {
    max-width: 62%;
    margin-left: 30%;
  }
}

.logo {
  display: block;
  margin: auto;

  @media (min-width: 601px) {
    position: absolute;
    width: 48%;
    top: 0;
    bottom: 0;
    transform: translateX(-48%)
  }
}

.show-demo {
  height: 60px;
  width: 270px;
  border-radius: 60px;
}
</style>
