<template>
  <div id="my_account">
    <div class="bg-lightgray py35 pl20">
      <div class="container">
        <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" activeRoute="My Account" />
        <h1>My Account</h1>
      </div>
    </div>

    <div class="container pt45 pb70">
      <div class="row pl20 pt0">
        <div class="col-sm-3">
          <nav class="static-menu serif h4 mb35">
            <ul class="m0 p0">
              <li class="mb10" v-for="page in navigation"><a :href="page.link" class="c-black">{{page.title}}</a></li>
            </ul>
          </nav>
        </div>
        <div class="col-sm-9">
          <my-profile id="profile" :is-active="activeSection.profile" :edit-mode="editMode"></my-profile>
          <my-shipping-details id="shipping_details" :is-active="activeSection.shipping" :edit-mode="editMode"></my-shipping-details>
          <my-newsletter id="newsletter" :is-active="activeSection.newsletter" :edit-mode="editMode"></my-newsletter>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { corePage } from 'lib/themes'
  import Breadcrumbs from '../components/core/Breadcrumbs'
  import MyProfile from '../components/core/blocks/MyAccount/MyProfile'
  import MyShippingDetails from '../components/core/blocks/MyAccount/MyShippingDetails'
  import MyNewsletter from '../components/core/blocks/MyAccount/MyNewsletter'

  export default {
    name: 'MyAccount',
    components: {
      Breadcrumbs,
      MyProfile,
      MyShippingDetails,
      MyNewsletter
    },
    created () {
      this.$bus.$on('myAccount.activateSection', (sectionName) => {
        this.activateSection(sectionName)
      })
      this.$bus.$on('myAccount.updateUser', (updatedData) => {
        if (updatedData) {
          this.$store.dispatch('user/update', { customer: updatedData })
        }
        this.editMode = true
        this.activateSection()
      })
      this.$bus.$on('myAccount.changePassword', (passwordData) => {
        this.$store.dispatch('user/changePassword', passwordData)
      })
    },
    destroyed () {
      this.$bus.$off('myAccount.activateSection')
      this.$bus.$off('myAccount.updateUser')
      this.$bus.$off('myAccount.changePassword')
    },
    data () {
      return {
        navigation: [
          { title: 'My profile', link: '#profile' },
          { title: 'My shipping details', link: '#shipping_details' },
          { title: 'My newsletter', link: '#newsletter' },
          { title: 'My orders', link: '/my-account' },
          { title: 'My loyalty card', link: '/my-account' },
          { title: 'My product reviews', link: '/my-account' }
        ],
        activeSection: {
          profile: false,
          shipping: false,
          newsletter: false
        },
        editMode: true
      }
    },
    methods: {
      activateSection (sectionToActivate) {
        for (let section in this.activeSection) {
          this.activeSection[section] = false
        }
        if (sectionToActivate) {
          this.activeSection[sectionToActivate] = true
          this.editMode = false
        }
      }
    },
    mixins: [corePage('MyAccount')]
  }
</script>

<style lang="scss">
  @import '../css/text.scss';
  @import '~theme/css/global_vars';
  $lightgray: map-get($colors, lightgray);

  #my_account {
    input[type=text], input[type=email], input[type=tel], select {
      @extend .h4;
      padding: 10px 0;
      border: none;
      border-bottom: 1px solid #BDBDBD;
      width: calc(100% - 35px);
    }
    input::-webkit-input-placeholder {
      color: #BDBDBD;
    }
    input:-moz-placeholder {
      color: #BDBDBD;
    }
    input:focus, select:focus {
      outline: none;
      border-color: black;
      transition: 0.3s all;
    }
    select {
      -moz-appearance: none;
      -webkit-appearance: none;
      border-radius: 0;
      background-color: transparent;
    }
    h4 {
      @extend .weight-200;
    }
    .button-disabled {
      opacity: 0.3;
      pointer-events: none;
    }
    .validation-error{
      color: red;
      display: block;
    }
    .number-circle {
      width: 35px;
      height: 35px;
    }
    .line {
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 17px;
        z-index: -1;
        width: 1px;
        height: 100%;
        background-color: $lightgray;
      }
    }

    .checkboxStyled {
      width: 23px;
      position: relative;
      display: inline-block;

      label {
        cursor: pointer;
        position: absolute;
        width: 23px;
        height: 23px;
        top: 0;
        left: 0;
        background: #FFF;
        border:1px solid #8E8E8E;

        &:after {
          content: '';
          position: absolute;
          width: 11px;
          height: 5px;
          background: transparent;
          top: 6px;
          left: 5px;
          border: 3px solid #FFF;
          border-top: none;
          border-right: none;
          transform: rotate(-45deg);
        }
      }

      input[type=checkbox]:checked + label {
        background: #8E8E8E;
      }
    }

    .checkboxText {
      display: inline-block;
      cursor: pointer;
      
      span {
        vertical-align: middle;
      }
    }
  }
</style>