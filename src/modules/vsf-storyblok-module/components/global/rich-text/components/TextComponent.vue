<template>
  <span
    class="storyblok-rich-text-text-component"
  >
    <template v-for="part in textParts">
      <span v-if="part.isSimpleText" :class="classes" :key="part.text">{{ part.text }}</span>

      <price-component
        v-else
        :regular-price="part.price ? part.price.regular : 0"
        :special-price="part.price ? part.price.special : 0"
        :key="part.text"
      />
    </template>

  </span>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { getProductDefaultPrice } from 'src/modules/shared';
import { SearchQuery } from 'storefront-query-builder'
import { mapGetters } from 'vuex';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import Product from '@vue-storefront/core/modules/catalog/types/Product';

import RichTextItem from '../../../../types/rich-text-item.interface';

import PriceComponent from './PriceComponent.vue';

type priceType = 'regular' | 'special';

enum DirectiveType {
  PRODUCT_PRICE = 'productPrice',
  PRODUCT_SPECIFIC_PRICE = 'productSpecificPrice'
}

interface DirectiveData {
  directiveName: string,
  directiveParams: string[]
}

interface Directive {
  directive: string,
  productSku: string,
  data: DirectiveData,
  type: DirectiveType
}

interface ProductSpecificPriceDirective extends Directive {
  priceType: priceType
}

interface ProductPriceDirective extends Directive {
  isPromo: boolean
}

interface TextPart {
  isSimpleText: boolean,
  text: string,
  price?: {
    regular?: number,
    special?: number
  },
  directive?: Directive
}

const directivesRegexp = /\{\{(.*?)\}\}/gi;
const directiveDataRegexp = /(.*)\((.*)\)/i;

export default Vue.extend({
  name: 'StoryblokRichTextTextComponent',
  components: {
    PriceComponent
  },
  props: {
    item: {
      type: Object as PropType<RichTextItem>,
      required: true
    }
  },
  data () {
    return {
      textParts: [] as TextPart[],
      onPromotionPlatformStoreSynchronizedHandler: undefined as ((text: string) => void) | undefined
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

      return this.item.marks
        .filter((mark) => mark.type === 'styled')
        .map((mark) => mark.attrs?.class || '')
    }
  },
  serverPrefetch (): Promise<void> {
    return (this as any).processDirectivesInText((this as any).item.text);
  },
  beforeMount (): void {
    this.processDirectivesInText(this.item.text || '');

    this.onPromotionPlatformStoreSynchronizedHandler = () => this.processDirectivesInText(this.item.text || '');
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

      if (!match) {
        throw new Error('Unable to parse directive data: ' + directive);
      }

      const directiveName = match[1].trim();
      const directiveParams = match[2].split(',');

      return {
        directiveName,
        directiveParams: directiveParams.map((param) => param.trim())
      }
    },
    getDirectivesFromText (text: string): { productPriceDirectives: ProductPriceDirective[], productSpecificPriceDirectives: ProductSpecificPriceDirective[] } {
      const productSpecificPriceDirectives: ProductSpecificPriceDirective[] = [];
      const productPriceDirectives: ProductPriceDirective[] = [];

      if (!text) {
        return { productPriceDirectives, productSpecificPriceDirectives };
      }

      const directivesList = text.match(directivesRegexp);

      if (!directivesList) {
        return { productPriceDirectives, productSpecificPriceDirectives };
      }

      for (const directive of directivesList) {
        const { directiveName, directiveParams } = this.getDirectiveData(directive);

        if (directiveName === 'productSpecificPrice') {
          if (directiveParams[1] !== 'regular' && directiveParams[1] !== 'special') {
            throw new Error('Unknown price type for the productSpecificPrice directive: ' + directiveParams[1]);
          }

          productSpecificPriceDirectives.push({
            directive: directive,
            productSku: directiveParams[0],
            priceType: directiveParams[1],
            type: DirectiveType.PRODUCT_SPECIFIC_PRICE,
            data: {
              directiveName,
              directiveParams
            }
          })
        } else if (directiveName === 'productPrice') {
          productPriceDirectives.push({
            directive: directive,
            productSku: directiveParams[0],
            isPromo: directiveParams[1] === 'promo',
            type: DirectiveType.PRODUCT_PRICE,
            data: {
              directiveName,
              directiveParams
            }
          })
        }
      }

      return { productPriceDirectives, productSpecificPriceDirectives };
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
      let { productPriceDirectives, productSpecificPriceDirectives } = this.getDirectivesFromText(text);
      let directives = [...productPriceDirectives, ...productSpecificPriceDirectives];

      if (!directives.length) {
        this.textParts = [{ isSimpleText: true, text }];
        return;
      }

      const productSkusUsedInDirectives = this.getProductSkusUsedInDirectives(directives);
      const productsToLoadSkus: string[] = [];

      productSkusUsedInDirectives.forEach((sku) => {
        if (!this.productBySkuDictionary[sku]) {
          productsToLoadSkus.push(sku);
        }
      })

      if (productsToLoadSkus.length) {
        await this.loadProducts(productsToLoadSkus);
      }

      const textParts = this.getPartsFromText(text, directives);

      this.textParts = this.fillDirectivesIntoParts(textParts);
    },
    fillDirectivesIntoParts (textParts: TextPart[]): TextPart[] {
      for (const textPart of textParts) {
        if (textPart.isSimpleText) {
          continue;
        }

        if (textPart.directive?.type === DirectiveType.PRODUCT_SPECIFIC_PRICE) {
          textPart.text = textPart.text.replace(
            textPart.directive.directive,
            this.getProductDefaultPrice(
              this.productBySkuDictionary[textPart.directive.productSku],
              (textPart.directive as ProductSpecificPriceDirective).priceType
            ) as string
          );
          textPart.isSimpleText = true;
        } else if (textPart.directive?.type === DirectiveType.PRODUCT_PRICE) {
          const isPromo = (textPart.directive as ProductPriceDirective).isPromo;
          const regularPrice = this.getProductDefaultPrice(
            this.productBySkuDictionary[textPart.directive.productSku],
            'regular',
            false
          ) as number;

          const specialPrice = this.getProductDefaultPrice(
            this.productBySkuDictionary[textPart.directive.productSku],
            'special',
            false
          ) as number;

          if (isPromo) {
            textPart.price = {
              regular: regularPrice,
              special: specialPrice
            }
            continue;
          }

          const isSpecial = specialPrice && specialPrice > 0;

          textPart.price = {
            regular: isSpecial ? specialPrice : regularPrice
          }
        }
      }

      return textParts;
    },
    getPartsFromText (text: string, directives: Directive[]): TextPart[] {
      const textParts: TextPart[] = [];
      let shift = 0;

      for (const directive of directives) {
        const index = text.indexOf(directive.directive);

        shift = index + directive.directive.length;

        if (index === 0) {
          const slice = text.slice(index, shift);
          textParts.push({ isSimpleText: false, text: slice, directive });
          text = text.replace(slice, '');
          continue;
        }

        const directiveSlice = text.slice(index, shift);
        const prefixSlice = text.slice(0, index);

        textParts.push({ isSimpleText: true, text: prefixSlice });
        textParts.push({ isSimpleText: false, text: directiveSlice, directive });

        text = text.replace(directiveSlice, '');
        text = text.replace(prefixSlice, '');
      }

      if (text.length) {
        textParts.push({ isSimpleText: true, text });
      }

      return textParts;
    },
    getProductDefaultPrice (product: Product, priceType: priceType, format = true): string | number {
      const price = getProductDefaultPrice(product, {}, format);

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
.storyblok-rich-text-text-component {
    .-strike {
        text-decoration: line-through;
    }

    .-italic {
        font-style: italic;
    }

    .-bold {
        font-weight: bold;
    }

    .-underline {
        text-decoration: underline;
    }
}
</style>
