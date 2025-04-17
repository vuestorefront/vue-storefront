<template>
  <div
    class="storyblok-affirm-monthly-payment"
    :class="cssClasses"
    :style="styles"
  >
    <p class="affirm-as-low-as" data-page-type="landing" :data-amount="productPriceInCents" />
  </div>
</template>

<script lang="ts">
import { VueConstructor } from 'vue';
import { isServer } from '@vue-storefront/core/helpers';
import { InjectType, PriceHelper } from 'src/modules/shared';
import { Blok } from 'src/modules/vsf-storyblok-module/components'

import { PRODUCT_PRICE_DICTIONARY } from '@vue-storefront/core/modules/catalog';
import Product from '@vue-storefront/core/modules/catalog/types/Product';
import AffirmMonthlyPaymentData from './interfaces/affirm-monthly-payment-data.interface';

interface InjectedServices {
  window: Window
}

export default (Blok as VueConstructor<InstanceType<typeof Blok> & InjectedServices>).extend({
  name: 'StoryblokAffirmMonthlyPayment',
  inject: {
    window: { from: 'WindowObject' }
  } as unknown as InjectType<InjectedServices>,
  data: function () {
    return {
      product: undefined as Product | undefined,
      shouldRefreshAffirmUi: false
    }
  },
  computed: {
    itemData (): AffirmMonthlyPaymentData {
      return this.item as AffirmMonthlyPaymentData;
    },
    productPriceDictionary (): Record<string, PriceHelper.ProductPrice> {
      return this.$store.getters[PRODUCT_PRICE_DICTIONARY];
    },
    productPriceInCents (): number {
      if (!this.product) {
        return 0
      }

      const price = this.productPriceDictionary[this.product.id];

      return PriceHelper.getFinalPrice(price) * 100;
    }
  },
  created: async function (): Promise<void> {
    await this.loadData()
  },
  mounted (): void {
    const affirm = (this.window as any).affirm;

    if (!affirm?.ui?.ready) {
      return;
    }

    affirm.ui.ready(() => {
      this.onAffirmUiReady();
    });
  },
  methods: {
    async loadData () {
      if (!this.itemData.product) {
        return;
      }

      this.product = await this.$store.dispatch(
        'product/single',
        {
          options: {
            id: this.itemData.product
          },
          key: 'id',
          skipCache: false
        }
      )
    },
    onAffirmUiReady (): void {
      if (!this.shouldRefreshAffirmUi) {
        return;
      }

      this.shouldRefreshAffirmUi = false;

      const affirm = (this.window as any).affirm;
      affirm.ui.refresh();
    }
  },
  watch: {
    item: async function () {
      await this.loadData()
    },
    productPriceInCents: {
      handler () {
        if (isServer) {
          return;
        }

        this.$nextTick(() => {
          const affirm = (this.window as any).affirm;

          if (!affirm.ui.refresh) {
            this.shouldRefreshAffirmUi = true;
            return;
          }

          affirm.ui.refresh();
        })
      },
      immediate: true
    }
  }
})
</script>
