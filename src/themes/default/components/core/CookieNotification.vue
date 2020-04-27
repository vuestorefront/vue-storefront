<template>
  <transition name="fade" appear>
    <div class="cookie fixed w-100 bg-cl-th-accent cl-tertiary" v-if="isOpen">
      <div class="container">
        <div class="row between-xs middle-xs px15">
          <div class="col-xs-10 start-xs">
            <span class="pr5">
              {{ message }}
            </span>
            <router-link :to="localizedRoute(detailsLink)" :title="detailsLinkText" class="cl-bg-tertiary">
              {{ detailsLinkText }}
            </router-link>
          </div>
          <div class="col-xs-2 end-xs">
            <i
              class="material-icons icon p15 pointer"
              @click="accept"
              @keyup.enter="accept"
              data-testid="closeCookieButton"
              tabindex="0"
              role="button"
            >
              close
            </i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import i18n from '@vue-storefront/i18n'
export default {
  props: {
    detailsLinkText: {
      type: String,
      default: i18n.t('See details')
    },
    detailsLink: {
      type: String,
      default: '/privacy'
    },
    message: {
      type: String,
      default: i18n.t('We use cookies to give you the best shopping experience.')
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    accept () {
      this.setVisited()
      this.isOpen = false
    },
    setVisited () {
      this.$store.dispatch('claims/set', { claimCode: 'cookiesAccepted', value: true })
    }
  },
  mounted () {
    this.$store.dispatch('claims/check', { claimCode: 'cookiesAccepted' }).then((cookieClaim) => {
      if (!cookieClaim) {
        this.isOpen = true
        this.$store.dispatch('claims/set', { claimCode: 'cookiesAccepted', value: false })
      } else {
        this.isOpen = !cookieClaim.value
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon: color(black);
$bg-icon: color(suva-gray);
$z-index: map-get($z-index, overlay) - 1;

.cookie {
  z-index: $z-index;
  bottom: 0;
}

.icon:hover {
  color: $color-icon;
  background-color: $bg-icon;
}
</style>
