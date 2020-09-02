<template>
<!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <SfBottomNavigation class="mobile-only bottom-nav">
    <nuxt-link :to="enrichLink('/')">
      <SfBottomNavigationItem :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : ''" icon="home" size="20px" label="Home">
        <template #label>
          <div class="sf-bottom-navigation-item__label">
            Home
          </div>
        </template>
      </SfBottomNavigationItem>
    </nuxt-link>
    <nuxt-link :to="enrichLink('/c/womens')">
      <SfBottomNavigationItem data-cy="bottom-navigation-url_menu" icon="menu" size="20px" label="Menu">
        <template #label>
          <div class="sf-bottom-navigation-item__label">
            Products
          </div>
        </template>
      </SfBottomNavigationItem>
    </nuxt-link>
    <SfBottomNavigationItem  @click.native="onAccountClicked" data-cy="bottom-navigation-url_account" icon="profile" size="20px" label="Account">
      <template #label>
        <div class="sf-bottom-navigation-item__label">
          Account
        </div>
      </template>
    </SfBottomNavigationItem>
    <SfBottomNavigationItem @click.native="toggleCartSidebar" data-cy="bottom-navigation-url_account" icon="empty_cart" size="20px" label="Cart">
      <template #label>
        <div class="sf-bottom-navigation-item__label">
          Cart
          <sup
            v-if="!!cartTotalItems"
            class="sf-sup"
          >
            ({{ cartTotalItems }})
          </sup>
        </div>
      </template>
    </SfBottomNavigationItem>
    <!-- TODO: add logic for label - if on Home then Basket, if on PDC then AddToCart etc. -->
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon } from '@storefront-ui/vue';
import uiState from '~/assets/ui-state';
import { useCart, cartGetters, useUser } from '@vue-storefront/salesforce-cc-poc';
const { toggleCartSidebar, toggleAccountModal, setIsLoginInAccountModal } = uiState;
import { enrichLink } from '~/helpers/link/enrichLink';
import { computed } from '@vue/composition-api';
export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon
  },
  setup (props, { root }) {
    const { isAuthenticated } = useUser();
    const onAccountClicked = () => {
      isAuthenticated && isAuthenticated.value
        ? root.$router.push(enrichLink('/my-account'))
        : (() => {
          setIsLoginInAccountModal(true);
          toggleAccountModal();
        })();
    };
    const { cart } = useCart();
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    return {
      onAccountClicked,
      toggleCartSidebar,
      enrichLink,
      cartTotalItems
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
.bottom-nav {
  --bottom-navigation-box-shadow: 0px -3px 30px rgba(29, 31, 34, 0.12);
  position: fixed;
  .sf-bottom-navigation-item {
    --icon-color: #1D1F22;
    --bottom-navigation-item-font-weight: normal;
    --bottom-navigation-item-font-size: 11px;
    --bottom-navigation-item-font-line-height: 18px;
  }
}
</style>
