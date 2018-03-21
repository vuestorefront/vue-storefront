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
              <li class="mb10" v-for="(page, index) in navigation" :key="index">
                <a
                  :href="page.link"
                  class="relative cl-accent"
                  @click="notify(page.title)"
                >
                  {{ page.title }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-9">
          <my-profile
            id="profile"
            :is-active="activeSection.profile"
            :edit-mode="editMode"
          />
          <my-shipping-details
            id="shipping_details"
            :is-active="activeSection.shipping"
            :edit-mode="editMode"
          />
          <my-newsletter
            id="newsletter"
            :is-active="activeSection.newsletter"
            :edit-mode="editMode"
          />
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

export default {
  components: {
    Breadcrumbs,
    MyProfile,
    MyShippingDetails,
    MyNewsletter
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
