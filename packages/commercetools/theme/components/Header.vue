<template>
  <div class="header">
    <div class="desktop">
      <div class="header__logo">
        <img class="header__logo" src="/logo.png" />
      </div>
      <div class="header__logo-mobile">Logo mobile</div>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Browse</a></li>
        <li><a href="#">Our stores</a></li>
      </ul>
      <div class="header__links">
        <button class="circle-button">
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
        <button class="circle-button">
          <font-awesome-icon :icon="['fas', 'user']" />
        </button>
        <div class="divider" />
        <button class="circle-button header__cart" @click="toggleCartSidebar()">
          <span>$ {{ cart.totalPrice.centAmount }} </span>
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
        </button>
      </div>
    </div>
    <div class="mobile">
    </div>
    <CartSidebar />
  </div>
</template>

<script>
import { useCart } from '@vue-storefront/commercetools';
import uiState from '~/assets/ui-state';
const { toggleCartSidebar } = uiState;
import CartSidebar from '~/components/CartSidebar.vue';

export default {
  setup () {
    const { cart } = useCart();
    return {
      cart,
      toggleCartSidebar
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
  .desktop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
  }
  @include for-mobile {
    background: #EB5256;
    color: white;
    border-radius: 0 0 20px 20px;
  }

  &__cart {
    width: auto;
    border-radius: 100px;
    padding: 0 .60em 0 .12em;

    span {
      font-size: .8em;
      font-weight: bold;
      margin: 0 8px;
      @include for-mobile {
        display: none
      }
    }
  }

  &__links {
    margin: 0 -9px;
    display: flex;
    align-items: center;

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
    display: flex;
    font-size: .9em;
    text-transform: uppercase;
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
    @include for-desktop {
      display: none
    }
  }
}
</style>
