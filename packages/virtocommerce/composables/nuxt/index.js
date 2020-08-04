import path from 'path';

/**
 * This function can be used for add some custom nuxt plugins.
 */
export default function (moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });
}
