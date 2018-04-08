<template>
  <div class="inline-flex relative dropdown">
    <button
      type="button"
      class="bg-cl-transparent brdr-none p0"
      @click="openMyAccount(); gotoAccount();"
      :aria-label="$t('Open my account')"
    >
      <i class="material-icons block">account_circle</i>
    </button>
    <div
      :class="dropdownOpen ? 'dropdown-content bg-cl-primary show-dropdown' : 'dropdown-content bg-cl-primary'"
      v-if="currentUser"
    >
      <div class="py5 align-left sans-serif lh20 weight-400">
        <router-link class="no-underline block py10 px15" :to="{ name: 'my-account' }">
          {{ $t('My account') }}
        </router-link>
      </div>
      <div class="py5 align-left sans-serif lh20 weight-400 brdr-top-1 brdr-cl-bg-secondary">
        <a href="#" class="no-underline block py10 px15" @click.prevent="clickLogout">
          {{ $t('Logout') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  methods: {
    clickLogout () {
      this.logout()
      this.$router.push('/')
    },
    openMyAccount () {
      if (this.currentUser) {
        this.$router.push('/my-account')
      }
    }
  },
  mixins: [coreComponent('blocks/Header/AccountIcon')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

.dropdown {

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
