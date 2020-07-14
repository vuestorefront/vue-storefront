import path from 'path';

const hasDefinedMiddleware = (options) => options.router && options.router.middleware && options.router.middleware.includes('commercetools');

export default function (moduleOptions) {

  if (!moduleOptions.disableMiddleware && !hasDefinedMiddleware(this.options)) {
    this.options.router.middleware.push('commercetools');
  }

  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });

}
