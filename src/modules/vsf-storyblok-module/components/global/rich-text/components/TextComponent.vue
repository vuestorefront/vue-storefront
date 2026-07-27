<template>
  <span
    class="storyblok-rich-text-text-component"
  >
    <component
      v-for="part in processedTextParts"
      :key="part.id"
      :class="part.classes"
      :style="part.styles"
      :is="part.component"
      v-bind="part.props"
    >
      {{ part.text }}
    </component>

  </span>
</template>

<script lang="ts">
import { useStore } from '@vue-storefront/core/application-services';
import { v4 as uuidv4 } from 'uuid';
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { StatisticMetric } from 'src/modules/budsies/types/statistic-metric';
import { DirectiveType, PriceValueDirective, ProductPriceDirective, ProductSpecificPriceDirective, TextPart, useTextDirectives } from 'src/modules/shared/composables/use-text-directives';

import RichTextItem from '../../../../types/rich-text-item.interface';

import PriceComponent from './PriceComponent.vue';
import SimplePriceComponent from './SimplePriceComponent.vue';
import FixedPriceValueComponent from './FixedPriceValueComponent.vue';

interface ProcessedTextPart {
  id: string,
  text: string,
  classes: string[],
  styles: Record<string, number | string>,
  component: string,
  props?: Record<string, any>
}

export default defineComponent({
  name: 'StoryblokRichTextTextComponent',
  components: {
    FixedPriceValueComponent,
    PriceComponent,
    SimplePriceComponent
  },
  props: {
    item: {
      type: Object as PropType<RichTextItem>,
      required: true
    }
  },
  data () {
    return {
    }
  },
  setup (props) {
    const applicationStore = useStore();
    const processedTextParts = ref<ProcessedTextPart[]>([]);

    const productBySkuDictionary = computed<Record<string, Product>>(() => {
      return applicationStore.getters['product/getProductBySkuDictionary'];
    });

    const fontDecorationClasses = computed<string[]>(() => {
      if (!props.item.marks?.length) {
        return [];
      }

      return props.item.marks.filter((mark) => mark.type !== 'styled' && mark.type !== 'textStyle').map((mark) => {
        return `-${mark.type}`;
      })
    });

    const styledClasses = computed< string[]>(() => {
      if (!props.item.marks?.length) {
        return [];
      }

      return props.item.marks
        .filter((mark) => mark.type === 'styled')
        .map((mark) => mark.attrs?.class || '')
    });

    const classes = computed<string[]>(() => {
      return [...fontDecorationClasses.value, ...styledClasses.value];
    });

    const styles = computed<Record<string, string | number>>(() => {
      const result: Record<string, string | number> = {};

      if (!props.item.marks?.length) {
        return result;
      }

      const textStyle = props.item.marks.find((mark) => mark.type === 'textStyle');

      if (textStyle?.attrs?.color) {
        result.color = textStyle.attrs.color;
      }

      const highlightStyle = props.item.marks.find((mark) => mark.type === 'highlight');

      if (highlightStyle?.attrs?.color) {
        result.backgroundColor = highlightStyle?.attrs?.color;
      }

      return result;
    });

    function processOrderedPlushiesCountDirective (): ProcessedTextPart {
      const metricValue = applicationStore.getters['budsies/getStatisticValueByMetric'](
        StatisticMetric.ORDERED_PLUSHIES_COUNT
      );

      return {
        id: uuidv4(),
        text: metricValue,
        classes: classes.value,
        styles: styles.value,
        component: 'span'
      }
    }

    function processProductPriceDirective (textPart: ProductPriceDirective): ProcessedTextPart {
      const processedTextPart: ProcessedTextPart = {
        id: uuidv4(),
        text: '',
        classes: classes.value,
        styles: styles.value,
        component: 'price-component',
        props: {
          product: productBySkuDictionary.value[textPart.productSku],
          isPromo: textPart.isPromo,
          isColorful: textPart.isColorful
        }
      }

      return processedTextPart;
    }

    function processProductSpecificPriceDirective (textPart: ProductSpecificPriceDirective): ProcessedTextPart {
      return {
        id: uuidv4(),
        text: '',
        classes: classes.value,
        styles: styles.value,
        component: 'simple-price-component',
        props: {
          product: productBySkuDictionary.value[textPart.productSku],
          priceType: textPart.priceType
        }
      }
    }

    function processPriceValueDirective (textPart: PriceValueDirective): ProcessedTextPart {
      return {
        id: uuidv4(),
        text: '',
        classes: classes.value,
        styles: styles.value,
        component: 'fixed-price-value-component',
        props: {
          amount: textPart.amount
        }
      }
    }

    function processTextParts (textParts: TextPart[]): void {
      const list: ProcessedTextPart[] = [];

      for (const textPart of textParts) {
        if (typeof textPart === 'string') {
          list.push({
            id: uuidv4(),
            text: textPart,
            component: 'span',
            classes: classes.value,
            styles: styles.value
          })
          continue;
        }

        if (textPart.type === DirectiveType.PRODUCT_SPECIFIC_PRICE) {
          list.push(
            processProductSpecificPriceDirective(
              textPart
            )
          );
        } else if (textPart.type === DirectiveType.PRICE_VALUE) {
          list.push(
            processPriceValueDirective(textPart)
          );
        } else if (textPart.type === DirectiveType.PRODUCT_PRICE) {
          list.push(
            processProductPriceDirective(textPart)
          );
        } else if (textPart.type === DirectiveType.ORDERED_PLUSHIES_COUNT) {
          list.push(
            processOrderedPlushiesCountDirective()
          );
        }
      }

      (processedTextParts as Ref<ProcessedTextPart[]>).value = list;
    }

    const { processDirectivesInText } = useTextDirectives(processTextParts);

    return {
      processedTextParts,
      processDirectivesInText
    }
  },
  serverPrefetch (): Promise<void> {
    return (this as any).processDirectivesInText((this as any).item.text);
  },
  beforeMount (): void {
    this.processDirectivesInText(this.item.text || '');
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

    .-highlight {
      display: inline-block;
      line-height: 1;
    }

    .-superscript {
      vertical-align: super;
      font-size: var(--font-xs);
    }

    .-subscript {
      vertical-align: sub;
      font-size: var(--font-xs);
    }

    .-code {
      display: inline-block;
      font-family: monospace;
      padding: var(--spacer-xs) var(--spacer-sm);
      line-height: 1;
      color: var(--c-blockquote);
      border: 1px solid var(--c-blockquote-border);
      border-radius: 4px;
    }
}
</style>
