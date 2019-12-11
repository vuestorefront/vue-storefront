import { setup } from '@vue-storefront/commercetools-api'

const commercetoolsApi = () => {
  console.log('Commercetools api initialized')

  setup({
    config: {
      uri: 'https://api.commercetools.com/vue-storefront-next/graphql',
      authHost: 'https://auth.sphere.io',
      projectKey: 'vue-storefront-next',
      clientId: 'ULi2QVos7ZoeBD_cY90aFNmc',
      clientSecret: '2eX7tGiZsZt0uexGQlcF2tgwbWEXIgbf',
      scopes: ['manage_products:vue-storefront-next'],
    },
    locale: 'en',
    currency: 'USD'
  })
}

export default commercetoolsApi
