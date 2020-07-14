import path from 'path';

export default function (moduleOptions) {
  if (!moduleOptions.disableMiddleware && this.options.router && this.options.router.middleware && !this.options.router.middleware.includes('commercetools')) {
    this.options.router.middleware.push('commercetools');
  }
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });
}
