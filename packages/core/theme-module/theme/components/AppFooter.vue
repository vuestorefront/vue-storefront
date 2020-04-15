<template>
  <SfFooter :column="4" multiple id="footer">
    <SfFooterColumn title="About us">
      <SfList>
        <SfListItem
          v-for="item in aboutUs"
          :key="item"
          >
          <SfMenuItem
            :label="item"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn title="Departments">
      <SfList>
        <SfListItem
          v-for="item in departments"
          :key="item"
        >
          <SfMenuItem
            :label="item"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn title="Help">
      <SfList>
        <SfListItem
          v-for="item in help"
          :key="item"
        >
          <SfMenuItem
            :label="item"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn title="Payment &amp; delivery">
      <SfList>
        <SfListItem
          v-for="item in paymentsDelivery"
          :key="item"
        >
          <SfMenuItem
            :label="item"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn title="Social">
      <div class="footer__socials">
        <SfImage class="footer__social-image" v-for="item in social" :key="item" :src="'/icons/'+item+'.svg'" width="12" height="12" />
      </div>
    </SfFooterColumn>
  </SfFooter>
</template>

<script>
import { SfFooter, SfList, SfImage, SfMenuItem } from '@storefront-ui/vue';

export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem
  },
  data() {
    return {
      aboutUs: ['Who we are', 'Quality in the details', 'Customer Reviews'],
      departments: ['Women fashion', 'Men fashion', 'Kidswear', 'Home'],
      help: ['Customer service', 'Size guide', 'Contact us'],
      paymentsDelivery: ['Purchase terms', 'Guarantee'],
      social: ['facebook', 'pinterest', 'twitter', 'youtube'],
      isMobile: false,
      desktopMin: 1024
    };
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/shared/styles/variables";

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

.footer {
  &__socials {
    padding: var(--spacer-base) var(--spacer-xl);

    @media screen and (min-width: $desktop-min) {
      padding: var(--spacer-sm) 0;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-base) 0 0;
  }
}
</style>
