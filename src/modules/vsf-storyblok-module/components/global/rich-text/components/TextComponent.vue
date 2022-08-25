<template>
  <span
    class="storyblok-rich-text-text-component"
  >
    <component
      v-for="part in textParts"
      :key="part.id"
      :class="part.classes"
      :is="part.component"
      v-bind="part.props"
    >
      {{ part.text }}
    </component>

  </span>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
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

interface ProductSpecificPriceDirective {
  type: DirectiveType.PRODUCT_SPECIFIC_PRICE,
  priceType: priceType,
  productSku: string
}

interface ProductPriceDirective {
  type: DirectiveType.PRODUCT_PRICE,
  isPromo: boolean,
  productSku: string
}

interface ProcessedTextPart {
  id: string,
  text: string,
  classes: string[],
  component: string,
  props?: Record<string, any>
}

type Directive = ProductSpecificPriceDirective | ProductPriceDirective
type TextPart = string | Directive;

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
      textParts: [] as ProcessedTextPart[],
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
    getDirectiveByData (directiveData: DirectiveData): Directive {
      const { directiveName, directiveParams } = directiveData;

      if (directiveName === 'productSpecificPrice') {
        if (directiveParams[1] !== 'regular' && directiveParams[1] !== 'special') {
          throw new Error('Unknown price type for the productSpecificPrice directive: ' + directiveParams[1]);
        }

        const directive: ProductSpecificPriceDirective = {
          productSku: directiveParams[0],
          priceType: directiveParams[1],
          type: DirectiveType.PRODUCT_SPECIFIC_PRICE
        }

        return directive;
      } else if (directiveName === 'productPrice') {
        const directive: ProductPriceDirective = {
          productSku: directiveParams[0],
          isPromo: directiveParams[1] === 'promo',
          type: DirectiveType.PRODUCT_PRICE
        }

        return directive
      } else {
        throw new Error('Unknown directive type: ' + directiveName);
      }
    },
    parseDirectiveText (directive: string): DirectiveData {
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
      const { parts, hasDirectives } = this.getPartsFromText(text);

      if (!hasDirectives) {
        this.textParts = [{ id: uuidv4(), text, classes: this.classes, component: 'span' }];
        return;
      }

      const directives = (parts.filter((part) => typeof part !== 'string')) as Directive[];

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

      this.textParts = this.processTextParts(parts);
    },
    processTextParts (textParts: TextPart[]): ProcessedTextPart[] {
      const processedTextParts: ProcessedTextPart[] = [];
      for (const textPart of textParts) {
        if (typeof textPart === 'string') {
          processedTextParts.push({
            id: uuidv4(),
            text: textPart,
            component: 'span',
            classes: this.classes
          })
          continue;
        }

        if (textPart.type === DirectiveType.PRODUCT_SPECIFIC_PRICE) {
          processedTextParts.push(
            this.processTextPartWithProductSpecificPriceDirective(
              textPart
            )
          );
        } else if (textPart.type === DirectiveType.PRODUCT_PRICE) {
          processedTextParts.push(
            this.processTextPartWithProductPriceDirective(textPart)
          );
        }
      }

      return processedTextParts;
    },
    processTextPartWithProductPriceDirective (textPart: ProductPriceDirective): ProcessedTextPart {
      const { regular, special } = getProductDefaultPrice(
        this.productBySkuDictionary[textPart.productSku],
        {},
        false
      );

      const processedTextPart: ProcessedTextPart = {
        id: uuidv4(),
        text: '',
        classes: [],
        component: 'price-component',
        props: {
          regularPrice: regular,
          specialPrice: special,
          isPromo: textPart.isPromo
        }
      }

      return processedTextPart;
    },
    processTextPartWithProductSpecificPriceDirective (textPart: ProductSpecificPriceDirective): ProcessedTextPart {
      return {
        id: uuidv4(),
        text: this.getProductDefaultPrice(
          this.productBySkuDictionary[textPart.productSku],
          textPart.priceType
        ) as string,
        classes: this.classes,
        component: 'span'
      }
    },
    getPartsFromText (text: string): { parts: TextPart[], hasDirectives: boolean } {
      let match = directivesRegexp.exec(text);
      if (!match) {
        return { parts: [text], hasDirectives: false }
      }

      const textParts: TextPart[] = [];
      let directiveEndIndex = 0;

      while (match !== null) {
        const index = match.index;

        if (directiveEndIndex !== index) {
          textParts.push(text.slice(directiveEndIndex, index));
        }

        const directiveData = this.parseDirectiveText(match[0]);

        textParts.push(this.getDirectiveByData(directiveData));
        directiveEndIndex = match.index + match[0].length;
        match = directivesRegexp.exec(text);
      }

      if (directiveEndIndex < text.length - 1) {
        textParts.push(text.slice(directiveEndIndex));
      }

      return { parts: textParts, hasDirectives: true };
    },
    getProductDefaultPrice (product: Product, priceType: priceType): string {
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
