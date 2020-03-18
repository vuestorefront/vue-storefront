<template>
  <div id="my_account">
    <div class="bg-cl-secondary py35 pl20">
      <div class="container">
        <breadcrumbs
          :with-homepage="true"
          :routes="[]"
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
                <router-link :to="localizedRoute(page.link)" class="cl-accent">
                  {{ page.title }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-9">
          <no-ssr>
            <component :is="this.$props.activeBlock" />
          </no-ssr>
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
import MyRecentlyViewed from '../components/core/blocks/MyAccount/MyRecentlyViewed'
import NoSSR from 'vue-no-ssr'
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed'
import { registerModule } from '@vue-storefront/core/lib/modules'

export default {
  data () {
    return {
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
  components: {
    Breadcrumbs,
    MyProfile,
    MyShippingDetails,
    MyNewsletter,
    MyOrders,
    MyOrder,
    MyRecentlyViewed,
    'no-ssr': NoSSR
  },
  beforeCreate () {
    registerModule(RecentlyViewedModule)
  },
  mixins: [MyAccount],
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
