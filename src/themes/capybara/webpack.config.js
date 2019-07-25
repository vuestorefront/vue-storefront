// You can extend default webpack build here. Read more on docs: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20webpack.md
module.exports = function (config, { isClient, isDev }) {
  const alias = config.default.resolve.alias
  // TODO Autogenerate it based on file names
  alias['./src/components/molecules/SfProductCard/SfProductCard.vue'] = 'src/themes/capybara/components/_overrides/SfProductCard.vue'
  return config
}
