<template>
  <div id="my_account">
    <div class="bg-cl-secondary py35 pl20">
      <div class="container">
        <breadcrumbs
          :routes="[{name: 'Homepage', route_link: '/'}]"
          active-route="My Account"
        />
        <h1>
          {{ $t('My Account') }}
        </h1>
      </div>
    </div>

    <div class="container pt45 pb70">
      <div class="row px20 pt0">
        <div class="col-md-3 hidden-xs hidden-sm block">
          <nav class="static-menu serif h4 mb35">
            <ul class="m0 p0">
              <li class="mb20" v-for="(page, index) in navigation" :key="index" @click="notify(page.title)">
                <router-link :to="localizedRoute(page.link)" class="cl-accent">{{ page.title }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-9">
          <component :is="this.$props.activeBlock" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccount from '@vue-storefront/core/pages/MyAccount'
import Breadcrumbs from '../components/core/Breadcrumbs'
import MyProfile from '../components/core/blocks/MyAccount/MyProfile'
import MyShippingDetails from '../components/core/blocks/MyAccount/MyShippingDetails'
import MyNewsletter from '../components/core/blocks/MyAccount/MyNewsletter'
import MyOrders from '../components/core/blocks/MyAccount/MyOrders'
import MyOrder from '../components/core/blocks/MyAccount/MyOrder'
import i18n from '@vue-storefront/i18n'

export default {
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
  },
  components: {
    Breadcrumbs,
    MyProfile,
    MyShippingDetails,
    MyNewsletter,
    MyOrders,
    MyOrder
  },
  mixins: [MyAccount]
}
</script>

<style lang="scss">
@import '~theme/css/base/text';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-tertiary: color(tertiary);

.static-menu {
  ul {
    list-style: none;
  }

  a {
    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: $color-tertiary;
    }

    &:hover,
    &.router-link-exact-active {
      &:after {
        opacity: 0;
      }
    }
  }
}
</style>
