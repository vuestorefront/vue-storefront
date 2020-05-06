<template>
  <div class="header">
    <div class="header__top">
      <div class="header__logo">
        <img class="header__logo" src="/logo.png" />
      </div>
      <div class="header__logo-mobile">
        <img src="/logomini.png" />
      </div>
      <ul>
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><a href="#">Browse</a></li>
        <li><a href="#">Our stores</a></li>
      </ul>
      <div class="header__links">
        <nuxt-link to="/"><button class="circle-button">
          <font-awesome-icon :icon="['fas', 'home']" />
        </button></nuxt-link>
        <button class="circle-button">
          <font-awesome-icon :icon="['fas', 'user']" />
        </button>
        <div class="divider" />
        <button class="circle-button header__cart" @click="toggleCartSidebar()">
          <span>{{ cartGetters.getFormattedPrice(totals.subtotal) }} </span>
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
        </button>
      </div>
    <CartSidebar />
    </div>
    <div class="header__bottom">
      <input type="text" placeholder="Find products"/>
    </div>
  </div>
</template>

<script>
import { useCart, cartGetters } from '@vue-storefront/commercetools';
import uiState from '~/assets/ui-state';
const { toggleCartSidebar } = uiState;
import CartSidebar from '~/components/CartSidebar.vue';
import { computed } from '@vue/composition-api';
export default {
  setup () {
    const { cart } = useCart();
    const totals = computed(() => cartGetters.getTotals(cart.value));

    return {
      cart,
      toggleCartSidebar,
      cartGetters,
      totals
    };
  },
  components: {
    CartSidebar
  }
};
</script>

<style lang="scss" scoped>
@import "../pages/main.scss";

.header {
  font-family: 'Montserrat', sans-serif;
  @include for-desktop {
    padding: 0 80px;
  }
  height: 100px;
  
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
  }
  &__bottom {
    @include for-desktop {
      display: none;
    }
    input {
      width: 100%;
      border-radius: 10px;
      height: 45px;
      border: 0;
      padding: 0 15px;
      box-sizing: border-box;
      font-size: 14px;
    }
  }

  @include for-mobile {
    background: #EB5256;
    color: white;
    border-radius: 0 0 20px 20px;
    padding: 0 15px;
    height: 130px;
  }

  &__cart {
    @include for-desktop {
      width: auto;
      border-radius: 100px;
      padding: 0 .60em 0 .12em;

    }

    span {
      font-size: .8em;
      font-weight: bold;
      margin: 0 8px;
      @include for-mobile {
        display: none
      }
    }
  }

  .divider {
    @include for-mobile {
      display: none;
    }
  }
  &__links {
    margin: 0 -9px;
    display: flex;
    align-items: center;
    flex-grow: 2;
    justify-content: flex-end;

    > div, button {
      margin: 0 9px;
    }
  }

  img {
    display: block;
    max-height: 100px;
    width: 200px;
  }

  ul {
    list-style-type: none;
    flex-grow: 2;
    display: flex;
    font-size: .9em;
    text-transform: uppercase;
    justify-content: flex-end;
    @include for-mobile {
      display: none;
    }
  }

  li {
    margin: 0 9px;

    a {
      letter-spacing: .02em;
    }
  }
  
  &__logo {
    @include for-mobile {
      display: none
    }
  }
  &__logo-mobile {
    img {
      width: 25px;
      height: 30px;
    }
    @include for-desktop {
      display: none
    }
  }
}
</style>
