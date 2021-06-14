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

      if ('spacing_settings' in this.item) {
        const spacingSettings: Record<string, string | number | undefined> = this.item.spacing_settings;

        const fields = [
          'margin_top',
          'margin_left',
          'margin_right',
          'margin_bottom',
          'padding_top',
          'padding_left',
          'padding_right',
          'padding_bottom'
        ]

        for (const field of fields) {
          let value = spacingSettings[field];

          if (value === '' || value === undefined) {
            continue;
          }

          if (isNaN(value as any) === false) {
            value += 'px';
          }

          const cssPropertyName = field.replace('_', '-');
          result[cssPropertyName] = value.toString();
        }
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
