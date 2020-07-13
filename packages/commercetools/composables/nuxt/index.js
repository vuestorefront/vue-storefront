import path from 'path';

export default function (moduleOptions) {
  this.options.router.middleware.push('commercetools');
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });
}
