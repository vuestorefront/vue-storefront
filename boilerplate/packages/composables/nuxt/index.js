import path from 'path';

export default function (moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });
}
