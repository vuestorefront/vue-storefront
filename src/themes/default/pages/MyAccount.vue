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
                <router-link :to="page.link" class="cl-accent">{{ page.title }}</router-link>
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
import { corePage } from 'core/lib/themes'
import Breadcrumbs from '../components/core/Breadcrumbs'
import MyProfile from '../components/core/blocks/MyAccount/MyProfile'
import MyShippingDetails from '../components/core/blocks/MyAccount/MyShippingDetails'
import MyNewsletter from '../components/core/blocks/MyAccount/MyNewsletter'
import MyOrders from '../components/core/blocks/MyAccount/MyOrders'

export default {
  components: {
    Breadcrumbs,
    MyProfile,
    MyShippingDetails,
    MyNewsletter,
    MyOrders
  },
  mixins: [corePage('MyAccount')]
}
</script>

<style lang="scss">
@import '~theme/css/base/text';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-tertiary: color(tertiary);

#my_account {
  select {
    @extend .h4;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid $color-tertiary;
    width: 100%;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    background-color: transparent;
  }
}

.static-menu {
  ul {
    list-style: none;
  }

  a {
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: $color-tertiary;
    }

    &:hover,
    .router-link-active {
      &:after {
        opacity: 0;
      }
    }
  }
}
</style>
