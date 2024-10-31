import _Vue from 'vue';

export function AdditionalContent (Vue: typeof _Vue) {
  if (!Vue.hasOwnProperty('$additionalContent')) {
    Object.defineProperty(Vue.prototype, "$additionalContent", {
      get () {
        return this._additionalContent;
      }
    });
  }

  Vue.mixin({
    beforeCreate (): void {
      this._additionalContent = {};

      if (this.$options.additionalContent) {
        this._additionalContent = this.$options.additionalContent;
      } else if (this.$root.$options.additionalContent) {
        this._additionalContent = this.$root.$options.additionalContent;
      }
    }
  });
}