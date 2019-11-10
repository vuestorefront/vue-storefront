<template>
  <div id="my_account">
    <div class="">
      <div class="container">
        <breadcrumbs
          :with-homepage="true"
          active-route="My Account"
        />
        <h1>
          {{ $t('My Account') }}
        </h1>
      </div>
    </div>

    <div class="">
      <div class="">
        <div class="">
          <nav class="">
            <ul class="">
              <li class="" v-for="(page, index) in navigation" :key="index" @click="notify(page.title)">
                <template v-if="page.action">
                  <span @click="page.action">
                    {{ page.title }}
                  </span>
                </template>
                <template v-else>
                  <router-link :to="localizedRoute(page.link)">
                    {{ page.title }}
                  </router-link>
                </template>
              </li>
            </ul>
          </nav>
        </div>
        <div class="">
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

export default {
  mixins: [MyAccount],
  data () {
    return {
      navigation: [
        { title: this.$t('My profile'), link: '/my-account' },
        { title: this.$t('My orders'), link: '/my-account/orders' },
        { title: this.$t('My shipping details'), link: '/my-account/shipping-details' },
        { title: this.$t('My newsletter'), link: '/my-account/newsletter' },
        { title: this.$t('My product reviews'), link: '#' },
        { title: this.$t('Logout'), action: this.logout }
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
  methods: {
    logout () {
      this.$store.dispatch('user/logout', { silent: false })
        .then(() => {
          this.$router.push(this.localizedRoute('/'))
        })
    }
  }
}
</script>
