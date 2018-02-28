<template>
  <div id="my_account">
    <div class="bg-cl-secondary py35 pl20">
      <div class="container">
        <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" active-route="My Account" />
        <h1>{{ $t('My Account') }}</h1>
      </div>
    </div>

    <div class="container pt45 pb70">
      <div class="row pl20 pt0">
        <div class="col-md-3 side-menu">
          <nav class="static-menu serif h4 mb35">
            <ul class="m0 p0">
              <li class="mb10" v-for="(page, index) in navigation" :key="index">
                <a :href="page.link" class="cl-accent" @click="notify(page.title)">{{ page.title }}</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-9">
          <my-profile id="profile" :is-active="activeSection.profile" :edit-mode="editMode"/>
          <my-shipping-details id="shipping_details" :is-active="activeSection.shipping" :edit-mode="editMode"/>
          <my-newsletter id="newsletter" :is-active="activeSection.newsletter" :edit-mode="editMode"/>
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
$bg-secondary: color(secondary, $colors-background);
$color-tertiary: color(tertiary);
$color-secondary: color(secondary);
$color-error: color(error);
$color-white: color(white);
$color-black: color(black);

#my_account {
  input[type=text], input[type=email], input[type=tel], select {
    @extend .h4;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid $color-tertiary;
    width: calc(100% - 35px);
  }
  input::-webkit-input-placeholder {
    color: $color-tertiary;
  }
  input:-moz-placeholder {
    color: $color-tertiary;
  }
  input:focus, select:focus {
    outline: none;
    border-color: $color-black;
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
    color: $color-error;
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
      background-color: $bg-secondary;
    }
  }

  .checkboxStyled {
    width: 23px;
    position: relative;
    display: table-cell;

    label {
      cursor: pointer;
      position: absolute;
      width: 23px;
      height: 23px;
      top: 0;
      left: 0;
      background: $color-white;
      border:1px solid $color-secondary;

      &:after {
        content: '';
        position: absolute;
        width: 11px;
        height: 5px;
        background: transparent;
        top: 6px;
        left: 5px;
        border: 3px solid $color-white;
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
      }
    }

    input[type=checkbox]:checked + label {
      background: $color-secondary;
    }
  }

  .checkboxText {
    display: table-cell;
    cursor: pointer;
    padding-left: 10px;

    span {
      vertical-align: middle;
    }
  }

  .side-menu {
    display: block;

    @media (max-width: 991px) {
      display: none;
    }

    .static-menu {
      ul {
        list-style: none;
      }

      a {
        position: relative;
      }

      a::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: $color-tertiary;
      }

      a:hover::after,
      .router-link-active::after {
        opacity: 0;
      }
    }

    .static-content {
      font-size: 1.2em;
      line-height: 2.1em;

      *:first-of-type {
        margin-top: 0;
      }
    }
  }

  .link {
    text-decoration: underline;
  }

  .bottom-button {
    @media (max-width: 767px) {
      text-align: center;
      padding-left: 0px !important;
    }
  }

  .col-xs-12 {
    @media (max-width: 767px) {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
}
</style>
