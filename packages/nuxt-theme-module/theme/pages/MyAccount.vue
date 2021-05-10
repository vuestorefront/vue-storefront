<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      v-e2e="'my-account-content-pages'"
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile">
          <MyProfile />
        </SfContentPage>

        <SfContentPage title="Shipping details">
          <ShippingDetails />
        </SfContentPage>

        <SfContentPage title="Billing details">
          <BillingDetails />
        </SfContentPage>

        <SfContentPage title="Loyalty card">
          <LoyaltyCard />
        </SfContentPage>

        <SfContentPage title="My newsletter">
          <MyNewsletter />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory title="Order details">
        <SfContentPage title="Order history">
          <OrderHistory />
        </SfContentPage>

        <SfContentPage title="My reviews">
          <MyReviews />
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import { useUser } from '<%= options.generate.replace.composables %>';
import MyProfile from './MyAccount/MyProfile';
import ShippingDetails from './MyAccount/ShippingDetails';
import BillingDetails from './MyAccount/BillingDetails';
import LoyaltyCard from './MyAccount/LoyaltyCard';
import MyNewsletter from './MyAccount/MyNewsletter';
import OrderHistory from './MyAccount/OrderHistory';
import MyReviews from './MyAccount/MyReviews';

export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    ShippingDetails,
    BillingDetails,
    LoyaltyCard,
    MyNewsletter,
    OrderHistory,
    MyReviews
  },
  middleware: [
    'is-authenticated'
  ],
  setup(props, context) {
    const { $router, $route } = context.root;
    const { logout } = useUser();
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

    return { changeActivePage, activePage };
  },

  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          route: { link: '#' }
        },
        {
          text: 'My Account',
          route: { link: '#' }
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
</style>
