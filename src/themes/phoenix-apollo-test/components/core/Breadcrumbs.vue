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
      <template v-if="productList">
        <div class="gql-products">
          <div class="products" v-for="product in productList" :key="product.id">
            <div>{{ product.id }} - {{ product.name }}</div>
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
    productList: {
      // GraphQL Query
      query: gql`query productList ($searchText: String!) {
        productList(query: $searchText) {
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
      this.$apollo.queries.productList.refetch()
    }
  }
}

</script>
