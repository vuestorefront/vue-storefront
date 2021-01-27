import path from 'path'

// eslint-disable-next-line
export default function storyblok (moduleOptions) {
  const { storyblok, head } = this.options
  const options = {
    ...storyblok,
    ...moduleOptions,
  }
  if (options && options.jsBridge) {
    const scripts = head.script
    scripts.push({
      src: `${options.jsBridge}${options.accessToken}`,
    })
  }
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options,
  })
}
