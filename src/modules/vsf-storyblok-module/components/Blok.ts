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
    cssClasses (): string {
      if (!this.item.css_classes) {
        return '';
      }
      return this.item.css_classes;
    },
    styles (): string {
      let styles = '';
      if (this.item.alignment) {
        styles += 'text-align: ' + this.item.alignment.toString() + ';';
      }
      if (this.item.margin_top) {
        styles += 'margin-top: ' + this.item.margin_top.toString() + '%;';
      }
      if (this.item.margin_left) {
        styles += 'margin-left: ' + this.item.margin_left.toString() + '%;';
      }
      if (this.item.margin_right) {
        styles += 'margin-right: ' + this.item.margin_right.toString() + '%;';
      }
      if (this.item.margin_bottom) {
        styles += 'margin-bottom: ' + this.item.margin_bottom.toString() + '%;';
      }
      if (this.item.padding_top) {
        styles += 'padding-top: ' + this.item.padding_top.toString() + '%;';
      }
      if (this.item.padding_left) {
        styles += 'padding-left: ' + this.item.padding_left.toString() + '%;';
      }
      if (this.item.padding_right) {
        styles += 'padding-right: ' + this.item.padding_right.toString() + '%;';
      }
      if (this.item.padding_bottom) {
        styles += 'padding-bottom: ' + this.item.padding_bottom.toString() + '%;';
      }
      return styles;
    }
  },
  metaInfo: {
    meta: [
      { charset: 'utf-8', vmid: 'charset' }
    ]
  }
});
