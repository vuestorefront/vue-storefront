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
import { Blok } from 'src/modules/vsf-storyblok-module/components'
import { getProductDefaultPrice } from 'src/modules/shared';
import Product from 'core/modules/catalog/types/Product';
import AffirmMonthlyPaymentData from './interfaces/affirm-monthly-payment-data.interface';

export default Blok.extend({
  name: 'StoryblokAffirmMonthlyPayment',
  data: function () {
    return {
      product: undefined as Product | undefined
    }
  },
  computed: {
    itemData (): AffirmMonthlyPaymentData {
      return this.item as AffirmMonthlyPaymentData;
    },
    productPriceInCents (): number {
      if (!this.product) {
        return 0
      }

      const price = getProductDefaultPrice(this.product, {}, false);

      return (price.special ? price.special : price.regular) * 100;
    }
  },
  created: async function (): Promise<void> {
    await this.loadData()
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
    }
  },
  watch: {
    item: async function () {
      await this.loadData()
    },
    productPriceInCents: {
      handler () {
        this.$nextTick(() => {
          const affirm = (window as any).affirm;

          affirm.ui.refresh();
        })
      },
      immediate: true
    }
  }
})
</script>
