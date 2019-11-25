<template>
  <footer>
    <div class="footer-navigation t-bg-black t-py-4">
      <div class="t-container t-px-4">
        <div class="t--mx-4 lg:t-flex">
          <div class="t-flex t-w-full t-flex-wrap t-items-center t-justify-center t-leading-looser" data-v-5687d0d6="">
            <div class="t-hidden t-flex-expand lg:t-flex" data-v-5687d0d6="" /> <div class="copyright t-px-4 lg:t-flex t-text-white t-text-xs t-uppercase" data-v-5687d0d6="">
              © Impericon is a Division of IC Music and Apparel GmbH
            </div>
          </div>
        </div>
      </div>
    </div>
    <back-to-top bottom="20px" right="20px" visibleoffset="200">
      <button type="button" class="btn-top button no-outline brdr-none cl-white bg-cl-mine-shaft :bg-cl-th-secondary py10 px10">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
          <path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z" fill="white" />
        </svg>
      </button>
    </back-to-top>
    <language-switcher v-if="multistoreEnabled" />
  </footer>
</template>

<script>
import config from 'config'
import { mapGetters } from 'vuex'
import CurrentPage from 'theme/mixins/currentPage'
import LanguageSwitcher from '../../LanguageSwitcher.vue'
import Newsletter from 'theme/components/core/blocks/Footer/Newsletter'
import BackToTop from 'theme/components/core/BackToTop'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import FlagIcon from 'theme/components/core/blocks/FlagIcon'
import RetinaImage from 'theme/components/core/blocks/RetinaImage'

export default {
  name: 'MainFooter',
  components: {
    MaterialIcon,
    FlagIcon,
    Newsletter,
    LanguageSwitcher,
    BackToTop
  },
  mixins: [ CurrentPage ],
  computed: {
    ...mapGetters('icmaaCmsBlock', ['getJsonBlockByIdentifier']),
    footer () {
      return this.getJsonBlockByIdentifier('footer')
    },
    languages () {
      return this.footer.languages
    },
    multistoreEnabled () {
      return config.storeViews.multistore
    },
    socialMediaIcons () {
      return this.footer.socialMediaIcons
    },
    carrierLogos () {
      return this.footer.carrierLogos
    },
    metaNavigation () {
      return this.footer.metaNavigation
    },
    copyright () {
      return this.footer.copyright
    }
  }
}
</script>
