import Vue, { PropType } from 'vue';
import { getStoryblokQueryParams } from '../helpers'
import convertDisplayValueToClass from '../helpers/convert-display-value-to-class';
import ItemData from '../types/item-data.interface';
import { SpacingSettingsFieldName } from '../types/spacing-setting-field-name.value';

export default Vue.extend({
  props: {
    item: {
      type: Object as PropType<ItemData>,
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

      const displayClass = convertDisplayValueToClass(this.item.display, this.isStoryblokPreview);
      if (displayClass) {
        result.push(displayClass);
      }

      if (this.isStoryblokPreview) {
        result.push('-editor-preview-mode');
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

      if (this.item.background?.color) {
        result['background-color'] = this.item.background.color;
      }
      if (this.item.alignment) {
        result['text-align'] = this.item.alignment;
      }

      if ('spacing_settings' in this.item) {
        const fields = [
          SpacingSettingsFieldName.MARGIN_TOP,
          SpacingSettingsFieldName.MARGIN_LEFT,
          SpacingSettingsFieldName.MARGIN_RIGHT,
          SpacingSettingsFieldName.MARGIN_BOTTOM,
          SpacingSettingsFieldName.PADDING_TOP,
          SpacingSettingsFieldName.PADDING_LEFT,
          SpacingSettingsFieldName.PADDING_RIGHT,
          SpacingSettingsFieldName.PADDING_BOTTOM
        ]

        for (const field of fields) {
          let value = this.item.spacing_settings[field];

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
