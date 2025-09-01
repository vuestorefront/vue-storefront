import _Vue from 'vue';

export function AdditionalContent (Vue: typeof _Vue) {
  if (!Vue.hasOwnProperty('$additionalContent')) {
    Object.defineProperty(Vue.prototype, '$additionalContent', {
      get () {
        return this._additionalContentRoot._additionalContent || {};
      }
    });
  }

  Vue.mixin({
    beforeCreate (): void {
      if (this.$options.additionalContent) {
        this._additionalContentRoot = this;
        this._additionalContent = this.$options.additionalContent;

        (Vue as any).util.defineReactive(this, '_additionalContent', this._additionalContent);
      } else {
        this._additionalContentRoot = this.$parent && this.$parent._additionalContentRoot;
      }
    }
  });
}
