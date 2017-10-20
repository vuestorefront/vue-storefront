<template>
  <footer>
    <div class="upper-footer p50 bg-lightgray">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <h3 class="c-black weight-400">Departments</h3>
            <div class="mt15">
              <router-link class="c-darkgray" to="/c/women-20" exact>Women fashion</router-link>
            </div>
            <div class="mt15">
              <router-link class="c-darkgray" to="/c/men-11" exact>Men's fashion</router-link>
            </div>
            <div class="mt15">
              <router-link class="c-darkgray" to="/" exact>Kidswear</router-link>
            </div>
            <div class="mt15">
              <router-link class="c-darkgray" to="/" exact>Home</router-link>
            </div>
          </div>
          <div class="col-md-3">
            <h3 class="c-black weight-400">My account</h3>
            <div class="mt15">
              <router-link class="c-darkgray" to="/" exact>My orders</router-link>
            </div>
            <div class="mt15">
              <router-link class="c-darkgray" to="/" exact>Size guide</router-link>
            </div>
            <div class="mt15">
              <router-link class="c-darkgray" to="/" exact>Delivery</router-link>
            </div>
            <div class="mt15">
              <router-link class="c-darkgray" to="/" exact>Gift card</router-link>
            </div>
          </div>
          <div class="col-md-3">
            <h3 class="c-black weight-400">Help</h3>
            <div class="mt15">
              <router-link class="c-darkgray" to="/" exact>Store locator</router-link>
            </div>
            <div class="mt15">
              <router-link class="c-darkgray" to="/" exact>Customer service 24/7</router-link>
            </div>
            <div class="mt15">
              <router-link class="c-darkgray" to="/" exact>Order from catalog</router-link>
            </div>
          </div>
          <div class="col-md-3">
            <h3 class="c-black weight-400">Join Fashion Club</h3>
            <h6 class="c-lightgray weight-400">Sign up for our loyalty program, earn points, get rewards and buy cheaper</h6>
            <button-outline :text="'Subscribe'" color="dark" />
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row middle-md">
        <div class="col-md-3" >
          United States (US)
        </div>
        <div class="col-md-9 end-md">
          <ul class="links">
            <li><router-link class="c-black mr15" to="/legal" exact>Legal notice</router-link></li>
            <li><router-link class="c-black" to="/privacy" exact>Privacy policy</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { coreComponent } from 'lib/themes'

import ButtonOutline from '../../../theme/ButtonOutline.vue'

export default {
  components: {
    ButtonOutline
  },
  mixins: [coreComponent('core/blocks/Footer/Footer')]
}
</script>

<style scoped>
  .upper-footer {
    display: flex;
    align-items: center;
  }
  .links {
    list-style-type: none;
  }
  .links li {
    display: inline-flex;
  }
</style>
