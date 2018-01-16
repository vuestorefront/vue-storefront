<template>
  <div class="account-icon inline-flex dropdown">
    <i class="material-icons md-18" @click="gotoAccount">account_circle</i>
    <div v-if="currentUser" class="dropdown-content">
      <p>You're logged in as {{ currentUser.firstname }}</p>
      <hr>
      <div class="section-wrapper">
        <router-link class="no-underline" :to="{ name: 'my-account' }">My account</router-link>
      </div>
      <div class="section-wrapper">
        <a href="#" class="no-underline" @click="logout">Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { coreComponent } from 'lib/themes'

export default {
  computed: {
    ...mapState({
      currentUser: state => state.user.current
    })
  },
  methods: {
    logout () {
      this.$bus.$emit('user-before-logout')
    }
  },
  mixins: [coreComponent('core/blocks/Header/AccountIcon')]
}
</script>

<style lang="scss" scoped>
  @import '../../../../css/global_vars.scss';

  .dropdown {
    position: relative;
    display: inline-block;

    i {
      display: block;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      margin-top: 15px;
      padding: 0px 10px 10px 10px;
      text-align: center;
      background-color: map-get($colors, white);
      min-width: 120px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;

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
    }

    &:hover .dropdown-content {
      display: block;
    }
  }    
</style>