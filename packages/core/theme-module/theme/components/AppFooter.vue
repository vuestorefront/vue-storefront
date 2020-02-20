<template>
  <SfFooter :column="4" multiple id="footer">
    <SfFooterColumn title="About us">
      <SfList>
        <SfListItem
          v-for="item in aboutUs"
          :key="item"
          >
          <SfMenuItem
            class="sf-footer__menu-item"
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
            class="sf-footer__menu-item"
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
            class="sf-footer__menu-item"
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
            class="sf-footer__menu-item"
            :label="item"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn title="Social" style="margin-left: auto">
      <div :style="style">
        <img v-for="item in social" :key="item" :src="'/icons/'+item+'.svg'" style="height: 0.75rem; margin-right: 1.25rem" />
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
  },
  computed: {
    style() {
      return this.isMobile ? { padding: '20px 40px' } : { padding: '6px 0' };
    }
  },
  methods: {
    isMobileHandler(e) {
      this.isMobile = e.matches;
    }
  },
  mounted() {
    this.isMobile =
      Math.max(document.documentElement.clientWidth, window.innerWidth) <
      this.desktopMin;
    window
      .matchMedia('(max-width: 1024px)')
      .addListener(this.isMobileHandler);
  },
  beforeDestroy() {
    window
      .matchMedia('(max-width: 1024px)')
      .removeListener(this.isMobileHandler);
  }
};
</script>

<style>
#footer {
  /* temporary */
  padding: 0 2.5rem;
}
</style>
