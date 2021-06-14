import Vue, { PropType } from 'vue';
import { getStoryblokQueryParams } from '../helpers'

export default Vue.extend({
  props: {
    item: {
      type: Object as PropType<Record<string, any>>,
      required: true
    }
  },
  filters: {
    pretty (value: any) {
      return value
    }
  },
  computed: {
    isStoryblokPreview (): boolean {
      const { id } = getStoryblokQueryParams(this.$route)
      return !!id
    },
    cssClasses (): string[] {
      const result: string[] = [];

      if (this.item.display === 'mobile-only') {
        result.push('-mobile-only');
      }

      if (this.item.display === 'mobile-hidden') {
        result.push('-mobile-hidden');
      }

      if (this.item.css_classes) {
        const classes = this.item.css_classes.split(' ');
        result.push(...classes);
      }

      result.push(...this.extraCssClasses);

      return result
    },
    extraCssClasses (): string[] {
      return [];
    },
    styles (): Record<string, string> {
      let result: Record<string, string> = {};

      if ('background' in this.item && this.item.background.color) {
        result['background-color'] = this.item.background.color;
      }
      if (this.item.alignment) {
        result['text-align'] = this.item.alignment;
      }
      if (this.item.margin_top) {
        result['margin-top'] = this.item.margin_top + 'px';
      }
      if (this.item.margin_left) {
        result['margin-left'] = this.item.margin_left + 'px';
      }
      if (this.item.margin_right) {
        result['margin-right'] = this.item.margin_right + 'px';
      }
      if (this.item.margin_bottom) {
        result['margin-bottom'] = this.item.margin_bottom + 'px';
      }
      if (this.item.padding_top) {
        result['padding-top'] = this.item.padding_top + 'px';
      }
      if (this.item.padding_left) {
        result['padding-left'] = this.item.padding_left + 'px';
      }
      if (this.item.padding_right) {
        result['padding-right'] = this.item.padding_right + 'px';
      }
      if (this.item.padding_bottom) {
        result['padding-bottom'] = this.item.padding_bottom + 'px';
      }

      result = Object.assign(result, this.extraStyles);

      return result;
    },
    extraStyles (): Record<string, string> {
      return {};
    }
  },
  metaInfo: {
    meta: [
      { charset: 'utf-8', vmid: 'charset' }
    ]
  }
});
