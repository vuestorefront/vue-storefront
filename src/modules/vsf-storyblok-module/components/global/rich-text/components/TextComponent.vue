<template>
  <span
    class="storyblok-rich-text-text-component"
  >
    <component
      v-for="part in textParts"
      :key="part.text"
      :class="part.classes"
      :is="part.component"
      v-bind="part.props"
    >
      {{ part.text }}
    </component>

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
  productSku: string,
  type: DirectiveType
}

interface ProductSpecificPriceDirective extends Directive {
  priceType: priceType
}

interface ProductPriceDirective extends Directive {
  isPromo: boolean
}

interface ProcessedTextPart {
  text: string,
  classes: string[],
  component: string,
  props?: Record<string, any>
}

interface TextPart {
  text: string,
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
        this.textParts = [{ text, classes: this.classes, component: 'span' }];
        return;
      }

      const directives = (parts.filter((part) => !!part.directive)
        .map((part) => part.directive) as Directive[]);

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
        if (!textPart.directive) {
          processedTextParts.push({
            text: textPart.text,
            component: 'span',
            classes: this.classes
          })
          continue;
        }

        if (textPart.directive?.type === DirectiveType.PRODUCT_SPECIFIC_PRICE) {
          processedTextParts.push(
            this.processTextPartWithProductSpecificPriceDirective(textPart)
          );
        } else if (textPart.directive?.type === DirectiveType.PRODUCT_PRICE) {
          processedTextParts.push(this.processTextPartWithProductPriceDirective(textPart));
        }
      }

      return processedTextParts;
    },
    processTextPartWithProductPriceDirective (textPart: TextPart): ProcessedTextPart {
      if (!textPart.directive) {
        throw new Error('Wrong text part');
      }

      const isPromo = (textPart.directive as ProductPriceDirective).isPromo;
      const { regular, special } = getProductDefaultPrice(
        this.productBySkuDictionary[textPart.directive.productSku],
        {},
        false
      );

      const processedTextPart: ProcessedTextPart = {
        text: '',
        classes: [],
        component: 'price-component'
      }

      if (isPromo) {
        processedTextPart.props = {
          regularPrice: regular,
          specialPrice: special
        }
      } else {
        const isSpecial = special && special > 0;

        processedTextPart.props = {
          regularPrice: isSpecial ? special : regular
        }
      }

      return processedTextPart;
    },
    processTextPartWithProductSpecificPriceDirective (textPart: TextPart): ProcessedTextPart {
      if (!textPart.directive) {
        throw new Error('Wrong text part');
      }

      return {
        text: this.getProductDefaultPrice(
          this.productBySkuDictionary[textPart.directive.productSku],
          (textPart.directive as ProductSpecificPriceDirective).priceType
        ) as string,
        classes: this.classes,
        component: 'span'
      }
    },
    getPartsFromText (text: string): {parts: TextPart[], hasDirectives: boolean} {
      const directives = text.match(directivesRegexp);
      if (!directives) {
        return { parts: [{ text }], hasDirectives: false }
      }

      const textParts: TextPart[] = [];
      let shift = 0;

      for (const directive of directives) {
        const index = text.indexOf(directive);

        shift = index + directive.length;

        if (index === 0) {
          const slice = text.slice(index, shift);
          const directiveData = this.getDirectiveData(directive);
          textParts.push({ text: slice, directive: this.getDirectiveByData(directiveData) });
          text = text.replace(slice, '');
          continue;
        }

        const directiveSlice = text.slice(index, shift);
        const prefixSlice = text.slice(0, index);

        textParts.push({ text: prefixSlice });
        const directiveData = this.getDirectiveData(directive);
        textParts.push({ text: directiveSlice, directive: this.getDirectiveByData(directiveData) });

        text = text.replace(directiveSlice, '');
        text = text.replace(prefixSlice, '');
      }

      if (text.length) {
        textParts.push({ text });
      }

      return { parts: textParts, hasDirectives: true };
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
