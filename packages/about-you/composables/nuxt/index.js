import path from 'path';
import localeConfig from '@vue-storefront/about-you-theme/lang/config';

export default function (moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });

  this.options.i18n = localeConfig;
}
