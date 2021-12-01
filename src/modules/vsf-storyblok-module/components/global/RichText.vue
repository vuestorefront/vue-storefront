<template>
  <div class="storyblok-rich-text" v-if="isDirectivesParsed" v-html="parsedHtml" />
</template>

<script>
import { getProductPrice } from 'theme/helpers';
import { mapGetters } from 'vuex';
import { isServer } from '@vue-storefront/core/helpers';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { SearchQuery } from 'storefront-query-builder'

const directivesRegexp = /\{\{(.*?)\}\}/gi

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
      parsedHtml: ''
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
    return this.parseDirectivesInHtml(this.html);
  },
  created () {
    if (isServer) {
      return;
    }

    this.parseDirectivesInHtml(this.html);
    EventBus.$on('promotion-platform-store-synchronized', this.parseDirectivesInHtml);
  },
  beforeDestroy () {
    EventBus.$off('promotion-platform-store-synchronized', this.parseDirectivesInHtml);
  },
  methods: {
    fillDirectivesValuesIntoHtml ({ html, productPriceDirectives, productsBySkuDictionary }) {
      let htmlWithFilledDirectivesValues = html;

      productPriceDirectives.forEach((directive) => {
        htmlWithFilledDirectivesValues = htmlWithFilledDirectivesValues.replace(
          directive.directive,
          this.getProductPrice(productsBySkuDictionary[directive.productSku], directive.priceType)
        );
      });

      return htmlWithFilledDirectivesValues;
    },
    getDirectiveData (directive) {
      const directiveDataString = directive.replace(/\{|\}|&quot|"/g, '').trim();
      const directiveDataRegexp = /(.*)\((.*)\)/gi;
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

      directivesList.forEach((directive) => {
        const { directiveName, directiveParams } = this.getDirectiveData(directive);

        if (directiveName && directiveName === 'productPrice') {
          productPriceDirectives.push({
            directive: directive,
            productSku: directiveParams[0],
            priceType: directiveParams[1]
          })
        }
      });

      return { productPriceDirectives };
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
    parseDirectivesInHtml (html) {
      const { productPriceDirectives } = this.getDirectivesFromHtml(html);
      const productSkusUsedInDirectives = this.getProductSkusUsedInDirectives(productPriceDirectives);
      const productsToLoadSkus = [];

      productSkusUsedInDirectives.forEach((sku) => {
        if (!this.productBySkuDictionary[sku]) {
          productsToLoadSkus.push(sku);
        }
      })

      if (!productsToLoadSkus.length) {
        this.parsedHtml = this.fillDirectivesValuesIntoHtml({
          html,
          productsBySkuDictionary: this.productBySkuDictionary,
          productPriceDirectives
        });

        this.isDirectivesParsed = true;
        return;
      }

      return this.loadProducts(productsToLoadSkus).then(() => {
        this.parsedHtml = this.fillDirectivesValuesIntoHtml({
          html,
          productsBySkuDictionary: this.productBySkuDictionary,
          productPriceDirectives
        });

        this.isDirectivesParsed = true;
      })
    },
    getProductPrice (product, priceType) {
      const price = getProductPrice(product);

      return price[priceType];
    }
  }
}
</script>

<style lang="scss" scoped>
.storyblok-rich-text {
  overflow: auto;
}
</style>
