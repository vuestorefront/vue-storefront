<template>
  <div
    class="inline-flex relative dropdown"
    data-testid="accountButton"
    @click.self="goToAccount();showMenu = true;"
    @keyup.enter="goToAccount"
    tabindex="0"
    role="button"
    @mouseover="showMenu = true"
    @mouseout="showMenu = false"
    :aria-label="$t('Open my account')"
  >
    <button
      type="button"
      class="bg-cl-transparent brdr-none p0"
    >
      <i class="material-icons block">account_circle</i>
    </button>

    <no-ssr>
      <div v-show="currentUser" :class="['dropdown-content bg-cl-primary align-left sans-serif lh20 weight-400', !showMenu ? 'dropdown-content__hidden' : '']">
        <div class="py5">
          <div v-for="(page, index) in navigation" :key="index" @click="notify(page.title)">
            <router-link @click.native="showMenu = false" class="no-underline block py10 px15" :to="localizedRoute(page.link)">
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
    </no-ssr>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import AccountIcon from '@vue-storefront/core/compatibility/components/blocks/Header/AccountIcon'

export default {
  mixins: [AccountIcon],
  components: {
    'no-ssr': NoSSR
  },
  data () {
    return {
      showMenu: false,
      navigation: [
        { title: this.$t('My profile'), link: '/my-account' },
        { title: this.$t('My shipping details'), link: '/my-account/shipping-details' },
        { title: this.$t('My newsletter'), link: '/my-account/newsletter' },
        { title: this.$t('My orders'), link: '/my-account/orders' },
        { title: this.$t('My loyalty card'), link: '#' },
        { title: this.$t('My product reviews'), link: '#' },
        { title: this.$t('My Recently viewed products'), link: '/my-account/recently-viewed' }
      ]
    }
  },
  methods: {
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: this.$t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: this.$t('OK') }
        })
      }
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
    &:hover .dropdown-content:not(.dropdown-content__hidden),
    &:focus .dropdown-content:not(.dropdown-content__hidden) {
      display: block;
    }

    &:focus-within {
      background-color: $color-icon-hover;
      opacity: 1;
      .dropdown-content:not(.dropdown-content__hidden) {
        display: block;
      }
    }
  }

}
</style>
