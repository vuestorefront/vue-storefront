<template>
  <button
    type="button"
    class="bg-cl-transparent brdr-none inline-flex"
    @click="openMyAccount(); gotoAccount();"
    @mouseover="showDropdown"
    @mouseout="hideDropdown"
    :aria-label="$t('Open my account')"
  >
    <div class="dropdown relative">
      <i class="material-icons md-18 block">account_circle</i>
      <div
        v-if="currentUser"
        :class="dropdownOpen ? 'dropdown-content show-dropdown' : 'dropdown-content'"
      >
        <p>
          {{ $t("You're logged in as ") }} {{ currentUser.firstname }}
        </p>
        <hr>
        <div class="section-wrapper w-100">
          <router-link class="no-underline" :to="{ name: 'my-account' }">
            {{ $t('My account') }}
          </router-link>
        </div>
        <div class="section-wrapper w-100">
          <a href="#" class="no-underline" @click.stop="clickLogout">
            {{ $t('Logout') }}
          </a>
        </div>
      </div>
    </div>
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  data () {
    return {
      dropdownOpen: false,
      screenWidth: null
    }
  },
  mounted () {
    this.screenWidth = window.innerWidth
  },
  methods: {
    showDropdown () {
      if (this.currentUser) {
        this.dropdownOpen = true
      }
    },
    hideDropdown () {
      this.dropdownOpen = false
    },
    clickLogout () {
      this.logout()
      this.hideDropdown()
    },
    openMyAccount () {
      if (this.screenWidth <= 768 && this.currentUser) {
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
$color-white: color(white);
$bg-secondary: color(secondary, $colors-background);

.dropdown {
  .dropdown-content {
    display: none;
    position: absolute;
    right: -15px;
    margin-top: 15px;
    padding: 0px 10px 10px 10px;
    text-align: center;
    background-color: $color-white;
    min-width: 120px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 0;

    .section-wrapper {
      display: table;

      .no-underline {
        display: table-cell;
        vertical-align: middle;
        height: 30px;

        &:hover {
          background: $bg-secondary;
        }
      }
    }

    @media (min-width: 768px) {
      &:hover, &.show-dropdown {
        display: block;
      }
    }
  }
}
</style>
