<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      data-cy="my-account_content-pages"
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage data-cy="my-account-page_my-profile" title="My profile">
          <MyProfile
            :account="account"
            @update:personal="account = { ...account, ...$event }"
          />
        </SfContentPage>
        <SfContentPage data-cy="my-account-page_shipping-details" title="Shipping details">
          <ShippingDetails
            :account="account"
            @update:shipping="account = { ...account, ...$event }"
          />
        </SfContentPage>
        <SfContentPage data-cy="my-account-page_loyalty-card" title="Loyalty card">
          <LoyaltyCard />
        </SfContentPage>
        <SfContentPage data-cy="my-account-page_my-newsletter" title="My newsletter">
          <MyNewsletter />
        </SfContentPage>
      </SfContentCategory>
      <SfContentCategory title="Order details">
        <SfContentPage data-cy="my-account-page_order-history" title="Order history">
          <OrderHistory />
        </SfContentPage>
        <SfContentPage data-cy="my-account-page_my-reviews" title="My reviews">
          <MyReviews />
        </SfContentPage>
      </SfContentCategory>
      <SfContentPage data-cy="my-account-page_log-out" title="Log out" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages, SfButton } from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import { useUser } from '@vue-storefront/commercetools';
import MyProfile from './MyAccount/MyProfile';
import ShippingDetails from './MyAccount/ShippingDetails';
import LoyaltyCard from './MyAccount/LoyaltyCard';
import MyNewsletter from './MyAccount/MyNewsletter';
import OrderHistory from './MyAccount/OrderHistory';
import MyReviews from './MyAccount/MyReviews';
import { useUserShipping } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';

// TODO: protect this route: https://github.com/DivanteLtd/next/issues/379
export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    SfButton,
    MyProfile,
    ShippingDetails,
    LoyaltyCard,
    MyNewsletter,
    OrderHistory,
    MyReviews
  },
  setup(props, context) {
    const { $router, $route } = context.root;
    const { logout } = useUser();
    const { addresses: shippingAddresses, load } = useUserShipping();

    const account = computed(() => ({
      firstName: 'Sviatlana',
      lastName: 'Havaka',
      email: 'example@email.com',
      password: 'a*23Et',
      shipping: shippingAddresses.value,
      orders: [
        ['#35765', '4th Nov, 2019', 'Visa card', '$12.00', 'In process'],
        ['#35766', '4th Nov, 2019', 'Paypal', '$12.00', 'Finalised'],
        ['#35768', '4th Nov, 2019', 'Mastercard', '$12.00', 'Finalised'],
        ['#35769', '4th Nov, 2019', 'Paypal', '$12.00', 'Finalised']
      ]
    }));

    const activePage = computed(() => {
      const { pageName } = $route.params;

      if (pageName) {
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace('-', ' ');
      }

      return 'My profile';
    });

    const changeActivePage = async (title) => {
      if (title === 'Log out') {
        await logout();
        $router.push('/');
        return;
      }

      $router.push(`/my-account/${(title || '').toLowerCase().replace(' ', '-')}`);
    };

    onSSR(async () => {
      await load();
    });

    return { account, changeActivePage, activePage };
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          route: {
            link: '#'
          }
        },
        {
          text: 'My Account',
          route: {
            link: '#'
          }
        }
      ]
    };
  }
};
</script>
<style lang='scss' scoped>
@import "~@storefront-ui/vue/styles";

#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.breadcrumbs {
  padding: var(--spacer-xl) var(--spacer-2xl) var(--spacer-2xl)
    var(--spacer-2xl);
}
</style>
