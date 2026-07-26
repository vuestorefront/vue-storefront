import { useStore } from '@vue-storefront/core/application-services';
import { computed, ref } from 'vue';
import { SearchQuery } from 'storefront-query-builder'

import Product from '@vue-storefront/core/modules/catalog/types/Product';

import { StatisticMetric } from 'src/modules/budsies/types/statistic-metric';

export enum DirectiveType {
  PRODUCT_PRICE = 'productPrice',
  PRODUCT_SPECIFIC_PRICE = 'productSpecificPrice',
  PRICE_VALUE = 'priceValue',
  ORDERED_PLUSHIES_COUNT = 'orderedPlushiesCount'
}

export interface ProductSpecificPriceDirective extends BaseDirective {
  type: DirectiveType.PRODUCT_SPECIFIC_PRICE,
  priceType: priceType,
  productSku: string
}

export interface ProductPriceDirective extends BaseDirective {
  type: DirectiveType.PRODUCT_PRICE,
  isPromo: boolean,
  productSku: string,
  isColorful: boolean
}

export interface OrderedPlushiesCountDirective extends BaseDirective {
  type: DirectiveType.ORDERED_PLUSHIES_COUNT
}

export interface PriceValueDirective extends BaseDirective {
  type: DirectiveType.PRICE_VALUE,
  amount: number
}

export type Directive = ProductDependentDirective | OrderedPlushiesCountDirective | PriceValueDirective;
export type TextPart = string | Directive;

type priceType = 'regular' | 'special';
type ProductDependentDirective = ProductSpecificPriceDirective | ProductPriceDirective;

interface DirectiveSpecification {
  directiveName: string,
  directiveParams: string[],
  originalText: string
}

interface BaseDirective {
  type: DirectiveType,
  originalText: string
}

const directivesRegexp = /\{\{(.*?)\}\}/gi;
const directiveSpecificationRegexp = /(.*)\((.*)\)/i;

export function useTextDirectives (
  processTextPartsFunction: (textPart: TextPart[]) => void
) {
  const applicationStore = useStore();
  const isDirectivesProcessing = ref<boolean>(false);

  const productBySkuDictionary = computed<Record<string, Product>>(() => {
    return applicationStore.getters['product/getProductBySkuDictionary'];
  });

  function isProductDependentDirective (directive: Directive): directive is ProductDependentDirective {
    return directive.hasOwnProperty('productSku');
  }

  function parseDirectiveText (directive: string): DirectiveSpecification {
    const directiveString = directive.replace(/\{|\}|&quot|"/g, '').trim();
    const match = directiveSpecificationRegexp.exec(directiveString);

    if (!match) {
      throw new Error('Unable to parse directive: ' + directive);
    }

    const directiveName = match[1].trim();
    const directiveParams = match[2].split(',');

    return {
      originalText: directive,
      directiveName,
      directiveParams: directiveParams.map((param) => param.trim())
    }
  }

  function parsePriceValueDirective (specification: DirectiveSpecification): PriceValueDirective {
    return {
      originalText: specification.originalText,
      type: DirectiveType.PRICE_VALUE,
      amount: Number(specification.directiveParams[0])
    }
  }

  function getDirectiveFromSpecification (specification: DirectiveSpecification): Directive {
    const { directiveName, directiveParams } = specification;

    if (directiveName === 'productSpecificPrice') {
      if (directiveParams[1] !== 'regular' && directiveParams[1] !== 'special') {
        throw new Error('Unknown price type for the productSpecificPrice directive: ' + directiveParams[1]);
      }

      const directive: ProductSpecificPriceDirective = {
        originalText: specification.originalText,
        productSku: directiveParams[0],
        priceType: directiveParams[1],
        type: DirectiveType.PRODUCT_SPECIFIC_PRICE
      }

      return directive;
    }

    if (directiveName === 'productPrice') {
      const style = directiveParams[2];

      const directive: ProductPriceDirective = {
        originalText: specification.originalText,
        productSku: directiveParams[0],
        isPromo: directiveParams[1] === 'promo',
        type: DirectiveType.PRODUCT_PRICE,
        isColorful: !style || style !== 'plain'
      }

      return directive
    }

    if (directiveName === DirectiveType.PRICE_VALUE) {
      return parsePriceValueDirective(specification);
    }

    if (directiveName === DirectiveType.ORDERED_PLUSHIES_COUNT) {
      return {
        originalText: specification.originalText,
        type: DirectiveType.ORDERED_PLUSHIES_COUNT
      }
    }

    throw new Error('Unknown directive type: ' + directiveName);
  }

  function getPartsFromText (text: string): TextPart[] {
    let match = directivesRegexp.exec(text);
    if (!match) {
      return [text];
    }

    const textParts: TextPart[] = [];
    let textFragmentStartIndex = 0;

    while (match !== null) {
      const index = match.index;

      if (textFragmentStartIndex !== index) {
        textParts.push(text.slice(textFragmentStartIndex, index));
      }

      const directiveData = parseDirectiveText(match[0]);

      textParts.push(getDirectiveFromSpecification(directiveData));
      textFragmentStartIndex = match.index + match[0].length;
      match = directivesRegexp.exec(text);
    }

    if (textFragmentStartIndex < text.length - 1) {
      textParts.push(text.slice(textFragmentStartIndex));
    }

    return textParts;
  }

  function getProductSkusUsedInDirectives (directives: Directive[]): string[] {
    const productSkusSet = new Set<string>();
    directives.forEach((directive) => {
      if (!isProductDependentDirective(directive)) {
        return;
      }

      if (directive.productSku) {
        productSkusSet.add(directive.productSku)
      }
    });
    return Array.from(productSkusSet);
  }

  async function loadProducts (productsSkus: string[]): Promise<void> {
    let searchQuery = new SearchQuery();
    searchQuery = searchQuery.applyFilter({ key: 'sku', value: { 'in': productsSkus } })

    await applicationStore.dispatch(
      'product/findProducts',
      {
        query: searchQuery,
        size: productsSkus.length
      }
    )
  }

  function loadDirectivesRelatedData (directives: Directive[]): void | Promise<any[]> {
    const promises = [];

    const _productBySkuDictionary = productBySkuDictionary.value;
    const productSkusUsedInDirectives = getProductSkusUsedInDirectives(directives);
    const productsToLoadSkus: string[] = [];

    productSkusUsedInDirectives.forEach((sku) => {
      if (!_productBySkuDictionary[sku]) {
        productsToLoadSkus.push(sku);
      }
    });

    if (productsToLoadSkus.length) {
      promises.push(loadProducts(productsToLoadSkus))
    }

    if (directives.find((value) => value.type === DirectiveType.ORDERED_PLUSHIES_COUNT)) {
      promises.push(applicationStore.dispatch(
        'budsies/fetchStatisticValuesByMetric',
        { metric: StatisticMetric.ORDERED_PLUSHIES_COUNT })
      );
    }

    if (!promises.length) {
      return;
    }

    return Promise.all(promises);
  }

  async function processDirectivesInText (text: string): Promise<void> {
    isDirectivesProcessing.value = true;
    const parts = getPartsFromText(text);
    const directives = (parts.filter((part) => typeof part !== 'string')) as Directive[];

    const promise = loadDirectivesRelatedData(directives);

    if (promise) {
      await promise;
    }

    processTextPartsFunction(parts);
    isDirectivesProcessing.value = false;
  }

  return {
    isDirectivesProcessing,
    processDirectivesInText
  }
}
