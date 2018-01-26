<template>
  <div class="account-icon inline-flex" @click="openMyAccount">
    <div class="dropdown" @mouseover="hoverIcon">
      <i class="material-icons md-18" @click="gotoAccount">account_circle</i>
      <div v-if="currentUser" :class="showDropdown ? 'dropdown-content show-dropdown' : 'dropdown-content'">
        <p>You're logged in as {{ currentUser.firstname }}</p>
        <hr>
        <div class="section-wrapper">
          <router-link class="no-underline" :to="{ name: 'my-account' }" @click="hideDropdown">My account</router-link>
        </div>
        <div class="section-wrapper">
          <a href="#" class="no-underline" @click="clickLogout">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  data () {
    return {
      showDropdown: false,
      screenWidth: null
    }
  },
  mounted () {
    this.screenWidth = window.innerWidth
  },
  methods: {
    hoverIcon () {
      if (this.currentUser) {
        this.showDropdown = true
        setTimeout(() => {
          this.showDropdown = false
        }, 3000)
      }
    },
    clickLogout () {
      this.logout()
      this.hideDropdown()
    },
    hideDropdown () {
      this.showDropdown = false
    },
    openMyAccount () {
      if (this.screenWidth <= 768 && this.currentUser) {
        this.$router.push('/my-account')
      }
    }
  },
  mixins: [coreComponent('core/blocks/Header/AccountIcon')]
}
</script>

<style lang="scss" scoped>
  @import '../../../../css/global_vars.scss';

  .dropdown {
    position: relative;

    i {
      display: block;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      right: -15px;
      margin-top: 15px;
      padding: 0px 10px 10px 10px;
      text-align: center;
      background-color: map-get($colors, white);
      min-width: 120px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 0;

      .section-wrapper {
        display: table;
        width: 100%;

        .no-underline {
          display: table-cell;
          vertical-align: middle;
          height: 30px;

          &:hover {
            background: map-get($colors, lightgray);
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