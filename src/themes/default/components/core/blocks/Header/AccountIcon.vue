<template>
  <div class="inline-flex relative dropdown"
       data-testid="accountButton"
       @click.self="goToAccount">
    <button
      type="button"
      class="bg-cl-transparent brdr-none p0"
      :aria-label="$t('Open my account')"
    >
      <i class="material-icons block">account_circle</i>
    </button>
    <div v-if="currentUser" class="dropdown-content bg-cl-primary align-left sans-serif lh20 weight-400">
      <div class="py5">
        <div v-for="(page, index) in navigation" :key="index" @click="notify(page.title)">
          <router-link class="no-underline block py10 px15" :to="localizedRoute(page.link)">
            {{ page.title }}
          </router-link>
        </div>
      </div>
      <div class="py5 brdr-top-1 brdr-cl-bg-secondary">
        <a href="#" class="no-underline block py10 px15" @click.prevent="logout">
          {{ $t('Logout') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import AccountIcon from '@vue-storefront/core/components/blocks/Header/AccountIcon'

export default {
  mixins: [AccountIcon],
  data () {
    return {
      navigation: [
        { title: i18n.t('My profile'), link: '/my-account' },
        { title: i18n.t('My shipping details'), link: '/my-account/shipping-details' },
        { title: i18n.t('My newsletter'), link: '/my-account/newsletter' },
        { title: i18n.t('My orders'), link: '/my-account/orders' },
        { title: i18n.t('My loyalty card'), link: '#' },
        { title: i18n.t('My product reviews'), link: '#' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

.dropdown {

  button {
    pointer-events: none;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    width: 160px;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }

  a {
    opacity: .6;

    &:hover,
    &:focus {
      background-color: $color-icon-hover;
      opacity: 1;
    }

  }

  @media (min-width: 768px) {
    &:hover .dropdown-content {
      display: block;
    }
  }

}
</style>
