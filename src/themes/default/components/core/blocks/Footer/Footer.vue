<template>
  <footer>
    <div class="newsletter px40 bg-lightgray">
      <div class="container">
        <div class="newsletter-content m0 row center-xs start-md">
          <div class="col-md-9 col-xs-12 py10">
            <h3 class="c-black weight-400 m0">Subscribe to the newsletter and receive a coupon for 10% off</h3>
          </div>
          <div class="col-md-3 end-xs py25">
            <button-outline :text="'Subscribe'" @click.native="newsletterClick" color="dark" />
          </div>
        </div>
      </div>
    </div>
    <div class="upper-footer pt30 pb60 px40 bg-lightgray no-mobile">
      <div class="container">
        <div class="row center-xs">
          <div class="row col-lg-6 col-md-8 col-xs-12 start-md between-md between-xs">
            <div>
              <h3 class="c-black weight-400">Departments</h3>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/c/women-20" exact>Women fashion</router-link>
              </div>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/c/men-11" exact>Men's fashion</router-link>
              </div>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/" exact>Kidswear</router-link>
              </div>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/" exact>Home</router-link>
              </div>
            </div>
            <div>
              <h3 class="c-black weight-400">Orders</h3>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/order-tracking" exact>Track my order</router-link>
              </div>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/my-account" exact>My account</router-link>
              </div>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/delivery" exact>Delivery</router-link>
              </div>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/returns" exact>Return policy</router-link>
              </div>
            </div>
            <div>
              <h3 class="c-black weight-400">Help</h3>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/customer-service" exact>Customer service</router-link>
              </div>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/size-guide" exact>Size guide</router-link>
              </div>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/contact" exact>Contact us</router-link>
              </div>
            </div>
            <div>
              <h3 class="c-black weight-400">About us</h3>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/about-us" exact>About us</router-link>
              </div>
              <div class="mt15">
                <router-link class="c-gray-secondary" to="/store-locator" exact>Store locator</router-link>
              </div>
            </div>
          </div>
          <div class="row col-lg-6 col-md-4 mt30 center-xs end-xs">
            <a class="social-icon ml20" href="https://www.facebook.com/">
              <img src="/assets/social-icons/facebook.svg" alt="Facebook icon">
            </a>
            <a class="social-icon ml20" href="https://www.instagram.com">
              <img src="/assets/social-icons/instagram.svg" alt="Instagram icon">
            </a>
            <a class="social-icon ml20" href="https://www.pinterest.com">
              <img src="/assets/social-icons/pinterest.svg" alt="Pinterest icon">
            </a>
            <a class="social-icon ml20" href="https://www.youtube.com">
              <img src="/assets/social-icons/youtube.svg" alt="YouTube icon">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row middle-xs px15">
        <div class="col-md-3 c-lightgray-secondary">
          United States (US)
        </div>
        <div class="col-md-9 end-xs">
          <ul class="links">
            <li><router-link class="c-lightgray-secondary mr15" to="/legal" exact>Legal notice</router-link></li>
            <li><router-link class="c-lightgray-secondary" to="/privacy" exact>Privacy policy</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { coreComponent } from 'lib/themes'

import ButtonOutline from '../../../theme/ButtonOutline.vue'
import EventBus from 'src/event-bus/event-bus'

export default {
  methods: {
    newsletterClick () {
      EventBus.$emit('notification', {
        type: 'success',
        message: 'This feature is not implemented yet :( Newsletter is on our roadmap - issue #200!',
        action1: { label: 'OK', action: 'close' }
      })
    }
  },
  components: {
    ButtonOutline
  },
  mixins: [coreComponent('core/blocks/Footer/Footer')]
}
</script>

<style scoped>
  .newsletter {
    display: flex;
    border-bottom: 1px solid #E0E0E0;
  }
  .newsletter-content {
    align-items: center;
  }
  .upper-footer {
    display: flex;
  }
  .social-icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .links {
    list-style-type: none;
  }
  .links li {
    display: inline-flex;
  }
  @media (max-width: 595px) {
    .no-mobile {
      display: none;
    }
  }
</style>
