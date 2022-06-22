<template>
  <component :is="component"
             class="storyblok-text"
             :class="classes"
             :link="routerLink"
             :is-new-window="openLinkInNewWindow"
  >
    {{ text }}
  </component>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { getProductDefaultPrice } from 'src/modules/shared';
import { SearchQuery } from 'storefront-query-builder'
import { mapGetters } from 'vuex';
import RichTextItem from '../../../../types/rich-text-item.interface';

const directivesRegexp = /\{\{(.*?)\}\}/gi;
const directiveDataRegexp = /(.*)\((.*)\)/i;

export default Vue.extend({
  props: {
    item: {
      type: Object as PropType<RichTextItem>,
      required: true
    }
  },
  data () {
    return {
      parsedHtml: ''
    }
  },
  computed: {
    ...mapGetters({
      productBySkuDictionary: 'product/getProductBySkuDictionary'
    }),
    text () {
      return this.parsedHtml;
    },
    classes () {
      return [...this.fontDecorationClasses, ...this.styledClasses];
    },
    fontDecorationClasses () {
      if (!this.item.marks?.length) {
        return [];
      }
      return this.item.marks.filter((mark) => mark.type !== 'link').map((mark) => {
        return `-${mark.type}`;
      })
    },
    styledClasses () {
      if (!this.item.marks?.length) {
        return [];
      }

      return this.item.marks.filter((mark) => mark.type === 'styled').map((mark) => {
        return mark.attrs.class;
      })
    },
    link () {
      return this.item.marks?.find((mark) => mark.type === 'link');
    },
    isLink () {
      return !!this.link;
    },
    component () {
      if (!this.item.marks?.length) {
        return 'span';
      }

      return this.isLink ? 'sb-router-link' : 'span';
    },
    routerLink () {
      if (!this.isLink) {
        return;
      }

      return { url: this.link.attrs?.href };
    },
    openLinkInNewWindow () {
      if (!this.isLink) {
        return;
      }

      return this.link.attrs.target === '_blank';
    }
  },
  beforeMount () {
    this.processDirectivesInHtml(this.item.text);
  },
  serverPrefetch () {
    return (this as any).processDirectivesInHtml((this as any).item.text);
  },
  methods: {
    getDirectiveData (directive) {
      const directiveDataString = directive.replace(/\{|\}|&quot|"/g, '').trim();
      const match = directiveDataRegexp.exec(directiveDataString);
      const directiveName = match[1].trim();
      const directiveParams = match[2].split(',');

      return {
        directiveName,
        directiveParams: directiveParams.map((param) => param.trim())
      }
    },
    getDirectivesFromHtml (html) {
      const productPriceDirectives = [];

      if (!html) {
        return { productPriceDirectives };
      }
      debugger;

      const directivesList = html.match(directivesRegexp);

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
    async loadProducts (productsSkus) {
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
    }) {
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
    getProductSkusUsedInDirectives (directives) {
      const productSkusSet = new Set();
      directives.forEach((directive) => {
        if (directive.productSku) {
          productSkusSet.add(directive.productSku)
        }
      });
      return Array.from(productSkusSet);
    },
    async processDirectivesInHtml (html) {
      const { productPriceDirectives } = this.getDirectivesFromHtml(html);

      if (!productPriceDirectives.length) {
        this.parsedHtml = html;
        this.isDirectivesParsed = true;
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

      this.parsedHtml = this.fillDirectivesValuesIntoHtml(html, directivesValues);

      this.isDirectivesParsed = true;
    },
    fillDirectivesValuesIntoHtml (html, directivesValues) {
      let htmlWithFilledDirectivesValues = html;

      for (const directiveValue of directivesValues) {
        htmlWithFilledDirectivesValues = htmlWithFilledDirectivesValues.replace(
          directiveValue.directive,
          directiveValue.value
        );
      }

      return htmlWithFilledDirectivesValues;
    },
    getProductDefaultPrice (product, priceType) {
      const price = getProductDefaultPrice(product, {});

      return price[priceType];
    }
  }
})
</script>

<style lang="scss" scoped>
.storyblok-text {
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
