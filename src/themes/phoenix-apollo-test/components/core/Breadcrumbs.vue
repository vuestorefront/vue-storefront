<template>
  <div class="breadcrumbs h5 cl-gray">
    <span v-for="link in routes" :key="link.route_link">
      <router-link :to="localizedRoute(link.route_link)">
        {{ link.name | htmlDecode }}
      </router-link> /
    </span>
    <span class="cl-mine-shaft">
      {{ activeRoute | htmlDecode }}
    </span>
    <div id="actions">
      <div>Testing GraphQl:</div>
      <input type="text" v-model="searchText">
      <button @click="showSearch">Search</button>
      <template v-if="ProductList">
        <div class="gql-products">
          <div class="products" v-for="Product in ProductList" :key="Product.id">
            <div>{{ Product.id }} - {{ Product.name }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from 'core/components/Breadcrumbs'
import gql from 'graphql-tag'

export default {
  mixins: [Breadcrumbs],
  data () {
    return {
      searchText: ''
    }
  },
  apollo: {
    $loadingKey: 'loading',
    // productList data
    ProductList: {
      // GraphQL Query
      query: gql`query ProductList ($searchText: String!) {
        products(search: $searchText) {
          id
          name
          type_id
          sku
        }
      }`,
      variables () {
        return {
          searchText: this.searchText
        }
      }
      // loadingKey: 'tagsPageLoading',
    }
  },
  methods: {
    showSearch () {
      console.log(this.$apollo)
      console.log(this.$apollo.client)
      this.$apollo.queries.ProductList.refetch()
    }
  }
}

</script>
