<template>
  <span
    class="rich-text-text-component"
    :class="classes"
  >
    {{ parsedText }}
  </span>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { getProductDefaultPrice } from 'src/modules/shared';
import { SearchQuery } from 'storefront-query-builder'
import { mapGetters } from 'vuex';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import RichTextItem from '../../../../types/rich-text-item.interface';

type priceType = 'regular' | 'special';

interface DirectiveData {
  directiveName: string,
  directiveParams: string[]
}

interface Directive {
  directive: string,
  productSku: string,
  priceType: priceType
}

interface DirectiveValue {
  directive: string,
  value: string
}

const directivesRegexp = /\{\{(.*?)\}\}/gi;
const directiveDataRegexp = /(.*)\((.*)\)/i;

export default Vue.extend({
  name: 'RichTextTextComponent',
  props: {
    item: {
      type: Object as PropType<RichTextItem>,
      required: true
    }
  },
  data () {
    return {
      parsedText: '',
      onPromotionPlatformStoreSynchronizedHandler: undefined as (text: string) => void
    }
  },
  computed: {
    ...mapGetters({
      productBySkuDictionary: 'product/getProductBySkuDictionary'
    }),
    classes (): string[] {
      return [...this.fontDecorationClasses, ...this.styledClasses];
    },
    fontDecorationClasses (): string[] {
      if (!this.item.marks?.length) {
        return [];
      }

      return this.item.marks.filter((mark) => mark.type !== 'styled').map((mark) => {
        return `-${mark.type}`;
      })
    },
    styledClasses (): string[] {
      if (!this.item.marks?.length) {
        return [];
      }

      return this.item.marks.filter((mark) => mark.type === 'styled').map((mark) => {
        return mark.attrs.class;
      })
    }
  },
  serverPrefetch (): Promise<void> {
    return (this as any).processDirectivesInText((this as any).item.text);
  },
  beforeMount (): void {
    this.processDirectivesInText(this.item.text);

    this.onPromotionPlatformStoreSynchronizedHandler = () => this.processDirectivesInText(this.item.text);
    EventBus.$on('promotion-platform-store-synchronized', this.onPromotionPlatformStoreSynchronizedHandler);
  },
  beforeDestroy (): void {
    if (this.onPromotionPlatformStoreSynchronizedHandler) {
      EventBus.$off('promotion-platform-store-synchronized', this.onPromotionPlatformStoreSynchronizedHandler);
    }
  },
  methods: {
    getDirectiveData (directive: string): DirectiveData {
      const directiveDataString = directive.replace(/\{|\}|&quot|"/g, '').trim();
      const match = directiveDataRegexp.exec(directiveDataString);
      const directiveName = match[1].trim();
      const directiveParams = match[2].split(',');

      return {
        directiveName,
        directiveParams: directiveParams.map((param) => param.trim())
      }
    },
    getDirectivesFromText (text: string): { productPriceDirectives: Directive[] } {
      const productPriceDirectives = [];

      if (!text) {
        return { productPriceDirectives };
      }

      const directivesList = text.match(directivesRegexp);

      if (!directivesList) {
        return { productPriceDirectives };
      }

      for (const directive of directivesList) {
        const { directiveName, directiveParams } = this.getDirectiveData(directive);

        if (directiveName === 'productPrice') {
          productPriceDirectives.push({
            directive: directive,
            productSku: directiveParams[0],
            priceType: directiveParams[1]
          })
        }
      }

      return { productPriceDirectives };
    },
    async loadProducts (productsSkus: string[]): Promise<void> {
      let searchQuery = new SearchQuery();
      searchQuery = searchQuery.applyFilter({ key: 'sku', value: { 'in': productsSkus } })

      await this.$store.dispatch(
        'product/findProducts',
        {
          query: searchQuery,
          size: productsSkus.length
        }
      )
    },
    getDirectivesValues ({
      productPriceDirectives,
      productsBySkuDictionary
    }: {
      productPriceDirectives: Directive[],
      productsBySkuDictionary: any[]
    }): DirectiveValue[] {
      const directivesValues = [];

      for (const productPriceDirective of productPriceDirectives) {
        directivesValues.push({
          directive: productPriceDirective.directive,
          value: this.getProductDefaultPrice(
            productsBySkuDictionary[productPriceDirective.productSku],
            productPriceDirective.priceType
          )
        })
      }

      return directivesValues;
    },
    getProductSkusUsedInDirectives (directives: Directive[]): string[] {
      const productSkusSet = new Set<string>();
      directives.forEach((directive) => {
        if (directive.productSku) {
          productSkusSet.add(directive.productSku)
        }
      });
      return Array.from(productSkusSet);
    },
    async processDirectivesInText (text: string): Promise<void> {
      const { productPriceDirectives } = this.getDirectivesFromText(text);

      if (!productPriceDirectives.length) {
        this.parsedText = text;
        return;
      }

      const productSkusUsedInDirectives = this.getProductSkusUsedInDirectives(productPriceDirectives);
      const productsToLoadSkus = [];

      productSkusUsedInDirectives.forEach((sku) => {
        if (!this.productBySkuDictionary[sku]) {
          productsToLoadSkus.push(sku);
        }
      })

      if (productsToLoadSkus.length) {
        await this.loadProducts(productsToLoadSkus);
      }

      const directivesValues = this.getDirectivesValues({
        productPriceDirectives,
        productsBySkuDictionary: this.productBySkuDictionary
      })

      this.parsedText = this.fillDirectivesValuesIntoText(text, directivesValues);
    },
    fillDirectivesValuesIntoText (text: string, directivesValues: DirectiveValue[]): string {
      let textWithFilledDirectivesValues = text;

      for (const directiveValue of directivesValues) {
        textWithFilledDirectivesValues = textWithFilledDirectivesValues.replace(
          directiveValue.directive,
          directiveValue.value
        );
      }

      return textWithFilledDirectivesValues;
    },
    getProductDefaultPrice (product: any, priceType: priceType): string {
      const price = getProductDefaultPrice(product, {});

      return price[priceType];
    }
  },
  watch: {
    'item.text' (val, oldVal) {
      if (val.trim() !== oldVal.trim()) {
        this.processDirectivesInText(val);
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.rich-text-text-component {
    &.-strike {
        text-decoration: line-through;
    }

    &.-italic {
        font-style: italic;
    }

    &.-bold {
        font-weight: bold;
    }

    &.-underline {
        text-decoration: underline;
    }
}
</style>
