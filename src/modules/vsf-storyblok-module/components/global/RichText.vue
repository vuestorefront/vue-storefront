<template>
  <div class="storyblok-rich-text" v-if="isDirectivesParsed" v-html="parsedHtml" />
</template>

<script>
import Vue from 'vue';
import { getProductPrice } from 'theme/helpers';
import { mapGetters } from 'vuex';
import { isServer } from '@vue-storefront/core/helpers';

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
      parsedDirectives: {},
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
  created () {
    if (isServer) {
      return;
    }

    this.parseHtml();
  },
  serverPrefetch () {
    return this.parseHtml();
  },
  methods: {
    getDirectiveData (directive) {
      const directiveDataString = directive.replace(/\{|\}/g, '').trim();
      const directiveDataRegexp = /(.*)\((.*)\)/gi;
      const match = directiveDataRegexp.exec(directiveDataString);

      const directiveName = match[1].trim();
      const directiveParams = match[2].split(',');

      return {
        directiveName,
        directiveParams: directiveParams.map((param) => param.replace(/"|&quot/g, '').trim())
      }
    },
    async loadProduct (productSku) {
      if (this.productBySkuDictionary[productSku]) {
        return;
      }

      await this.$store.dispatch(
        'product/loadProductAndSetToProductBySku',
        {
          options: {
            sku: productSku
          }
        }
      )
    },
    async parseDirectives (html) {
      if (!html) {
        return;
      }

      const directivesList = html.match(directivesRegexp);

      if (!directivesList) {
        return;
      }

      const productPriceDirectivesLoaders = []

      directivesList.forEach((directive) => {
        const { directiveName, directiveParams } = this.getDirectiveData(directive);

        if (directiveName && directiveName === 'productPrice') {
          productPriceDirectivesLoaders.push(new Promise((resolve) => {
            this.getProductPrice(directiveParams[0], directiveParams[1])
              .then((price) => {
                Vue.set(this.parsedDirectives, directive, price);
                resolve(price);
              });
          }))
        }
      });

      if (productPriceDirectivesLoaders.length) {
        await Promise.all(productPriceDirectivesLoaders);
      }

      this.isDirectivesParsed = true;
    },
    async parseHtml () {
      await this.parseDirectives(this.html);

      let parsedHtml = this.html;

      Object.entries(this.parsedDirectives).forEach(([key, value]) => {
        parsedHtml = parsedHtml.replace(key, value);
      });

      this.parsedHtml = parsedHtml;
    },
    async getProductPrice (productSku, priceType) {
      await this.loadProduct(productSku);
      const product = this.productBySkuDictionary[productSku];
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
