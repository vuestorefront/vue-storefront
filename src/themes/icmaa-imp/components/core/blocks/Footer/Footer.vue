<template>
  <footer>
    <div class="t-bg-white t-py-6">
      <div class="t-container t-px-4">
        <div class="t--mx-4 md:t-flex">
          <div class="t-mb-6 t-px-4 md:t-w-1/3 md:t-mb-0">
            <div class="social-media">
              <h4 class="t-hidden md:t-block t-text-sm t-text-base-tone t-mb-4">
                {{ $t("You can find us on") }}
              </h4>
              <div class="t-flex t-flex-wrap t-justify-between xl:t-justify-start">
                <template v-for="(icon, index) in socialMediaIcons">
                  <a :key="index" :href="icon.href" :title="icon.name" target="_blank" class="t-flex t-flex-fix t-items-center t-justify-center t-w-10 t-h-10 t-rounded-full t-bg-base-light t-text-white md:t-w-8 md:t-h-8 lg:t-w-10 lg:t-h-10 xl:t-mr-4">
                    <material-icon :icon="icon.icon" icon-set="icmaa" class="t-flex md:t-text-lg lg:t-text-2xl" />
                  </a>
                </template>
              </div>
            </div>
            <div class="country t-hidden md:t-block t-mt-4" v-if="multistoreEnabled">
              <h4 class="t-text-sm t-text-base-tone t-mb-4">
                {{ $t('Choose your country') }}
              </h4>
              <div class="t-flex t-flex-wrap t--mx-2">
                <template v-for="(store, index) in languages">
                  <a :href="store.href" :title="store.label" :key="index" class="t-mx-2 t-mb-2">
                    <flag-icon :iso="store['iso-code']" width="20" height="20" />
                  </a>
                </template>
              </div>
            </div>
          </div>
          <div class="service-carrier t-px-4 t-mb-4 md:t-w-1/3 md:t-mb-0 md:t-justify-start md:t-content-start">
            <h4 class="t-hidden md:t-block t-text-sm t-text-base-tone t-mb-4">
              {{ $t("Payments & Shipping") }}
            </h4>
            <div class="logos t-flex t-justify-between t-flex-wrap t--mx-2">
              <template v-for="(name, path) in carrierLogos">
                <div :key="path" class="t-flex t-flex-initial t-w-1/3 t-justify-center t-px-2 t-pb-4">
                  <div class="t-flex t-flex-initial t-h-12 t-w-full t-py-2 t-px-1 t-items-center t-justify-center t-border t-border-base-lighter t-rounded-sm">
                    <div :class="path" class="t-flex t-max-w-full" />
                  </div>
                </div>
              </template>
            </div>
          </div>
          <newsletter class="t-px-4 md:t-w-1/3 md:t-mb-0" />
        </div>
      </div>
    </div>
    <div class="footer-navigation t-bg-black t-py-4" ref="footerNavigation">
      <div class="t-container t-px-4">
        <div class="t--mx-4 lg:t-flex">
          <div class="t-flex t-w-full t-flex-wrap t-items-center t-justify-center t-leading-looser">
            <template v-for="(link, index) in metaNavigation">
              <router-link :to="link.route" class="t-flex-initial t-px-4 t-text-white t-text-xs t-uppercase" :key="index">
                {{ link.name }}
              </router-link>
            </template>
            <div class="t-hidden t-flex-expand lg:t-flex" />
            <div class="copyright t-px-4 t-hidden lg:t-flex t-text-white t-text-xs t-uppercase" v-html="copyright" />
          </div>
        </div>
      </div>
    </div>
    <back-to-top :visible-offset-bottom="footerNavigationOffset" />
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

import throttle from 'lodash-es/throttle'

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
  data () {
    return {
      footerNavigationOffset: 0
    }
  },
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
  },
  methods: {
    setFooterNavigationOffset: throttle(function () {
      this.footerNavigationOffset = this.$refs.footerNavigation.clientHeight
    }, 500)
  },
  mounted () {
    window.addEventListener('resize', this.setFooterNavigationOffset)
    this.$nextTick(this.setFooterNavigationOffset)
  }
}
</script>

<style lang="scss" scoped>

@import "theme/css/base/_sprite-footer-logos.scss";

.service-carrier .logos {
  @include retina-sprites($retina-groups)
}

</style>
