import path from 'path';
import { CT_TOKEN_MIDDLEWARE_SLUG } from '@vue-storefront/commercetools/nuxt/helpers';

const hasDefinedMiddleware = (options) => options.router && options.router.middleware && options.router.middleware.includes(CT_TOKEN_MIDDLEWARE_SLUG);

export default function (moduleOptions) {

  if (!moduleOptions.disableGenerateTokenMiddleware && !hasDefinedMiddleware(this.options)) {
    this.options.router.middleware.push(CT_TOKEN_MIDDLEWARE_SLUG);
  }

  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });

}
