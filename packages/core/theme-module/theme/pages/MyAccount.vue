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
        <SfContentPage title="My profile">
          <MyProfile
            :account="account"
            @update:personal="updatePersonal($event)"
          />
        </SfContentPage>
        <SfContentPage title="Shipping details">
          <ShippingDetails
            :account="account"
            @update:shipping="account = { ...account, ...$event }"
          />
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
import { SfBreadcrumbs, SfContentPages, SfButton } from '@storefront-ui/vue';
import { computed, watch, ref } from '@vue/composition-api';
import { userGetters, useUser } from '<%= options.composables %>';
import MyProfile from './MyAccount/MyProfile';
import ShippingDetails from './MyAccount/ShippingDetails';
import LoyaltyCard from './MyAccount/LoyaltyCard';
import MyNewsletter from './MyAccount/MyNewsletter';
import OrderHistory from './MyAccount/OrderHistory';
import MyReviews from './MyAccount/MyReviews';

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
    const { logout, loading, user, updateUser } = useUser();
    const { getFirstName, getLastName, getEmail } = userGetters;
    let account = ref({});
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

      $router.push(`/my-account/${title.toLowerCase().replace(' ', '-')}`);
    };

    watch(loading, () => {
      if (!loading.value) {
        account.value = { ...account.value,
            firstName: getFirstName(user.value),
            lastName: getLastName(user.value),
            email: getEmail ? getEmail(user.value): ''
        };
      }
    });

    const updatePersonal = async (details) => {
      await updateUser(details);
      context.account = { ...account,
          firstName: getFirstName(user.value),
          lastName: getLastName(user.value),
          email: getEmail ? getEmail(user.value): ''
      };
    }

    return { changeActivePage, activePage, updatePersonal, account };
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
