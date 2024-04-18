import path from 'path'

// eslint-disable-next-line
export default function storyblok(moduleOptions) {
  const { storyblok, head } = this.options
  const options = {
    ...storyblok,
    ...moduleOptions,
  }
  if (options.jsBridge && head) {
    const scripts = head.script
    scripts.push({
      src: `${options.jsBridge}`,
    })
  }
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options,
  })
}
