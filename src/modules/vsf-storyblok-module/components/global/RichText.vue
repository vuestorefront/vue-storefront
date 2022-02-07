<template>
  <div class="storyblok-rich-text" v-if="isDirectivesParsed" v-html="parsedHtml" />
</template>

<script>
import { getDefaultProductPrice } from 'theme/helpers';
import { mapGetters } from 'vuex';
import { isServer } from '@vue-storefront/core/helpers';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { SearchQuery } from 'storefront-query-builder'

const directivesRegexp = /\{\{(.*?)\}\}/gi;
const directiveDataRegexp = /(.*)\((.*)\)/i;

export default {
  name: 'RichText',
  props: {
    text: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isDirectivesParsed: false,
      parsedHtml: '',
      onPromotionPlatformStoreSynchronizedHandler: null
    }
  },
  computed: {
    ...mapGetters({
      productBySkuDictionary: 'product/getProductBySkuDictionary'
    }),
    html () {
      const html = this.$storyblokClient.richTextResolver.render(this.text)
      return (html === '<p></p>' || html === '<div></div>') ? ''
        : html
    }
  },
  serverPrefetch () {
    return this.processDirectivesInHtml(this.html);
  },
  created () {
    if (isServer) {
      return;
    }

    this.processDirectivesInHtml(this.html);

    this.onPromotionPlatformStoreSynchronizedHandler = () => this.processDirectivesInHtml(this.html);
    EventBus.$on('promotion-platform-store-synchronized', this.onPromotionPlatformStoreSynchronizedHandler);
  },
  beforeDestroy () {
    if (this.onPromotionPlatformStoreSynchronizedHandler) {
      EventBus.$off('promotion-platform-store-synchronized', this.onPromotionPlatformStoreSynchronizedHandler);
    }
  },
  methods: {
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
    getDirectivesFromHtml (html) {
      const productPriceDirectives = [];

      if (!html) {
        return { productPriceDirectives };
      }

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
    getDirectivesValues ({
      productPriceDirectives,
      productsBySkuDictionary
    }) {
      const directivesValues = [];

      for (const productPriceDirective of productPriceDirectives) {
        directivesValues.push({
          directive: productPriceDirective.directive,
          value: this.getProductPrice(
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
    getProductPrice (product, priceType) {
      const price = getDefaultProductPrice(product);

      return price[priceType];
    }
  },
  watch: {
    html (val, oldVal) {
      if (val.trim() !== oldVal.trim()) {
        this.processDirectivesInHtml(val);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.storyblok-rich-text {
  overflow: auto;
}
</style>
