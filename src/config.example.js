export default {
  elasticsearch: {
    httpAuth: '',
    host: 'localhost:8080/api/catalog',
    index: 'vue_storefront_catalog'
  },
  // we have vue-storefront-api (https://github.com/DivanteLtd/vue-storefront-api) endpoints below:
  orders: {
    endpoint: 'localhost:8080/api/order/create'
  },
  images: {
    baseUrl: 'http://vue-storefront.divante.pl/img/'
  }
}
