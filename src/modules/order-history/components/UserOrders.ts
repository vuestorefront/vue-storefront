import { bottomHelper } from '@vue-storefront/core/helpers'
import MyOrders from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrders'
import { mapGetters } from 'vuex';

export default {
  name: 'UserOrders',
  mixins: [MyOrders],
  data () {
    return {
      pagination: {
        perPage: 10,
        current: 0,
        enabled: false
      },
      lazyLoadOrdersOnScroll: true
    }
  },
  watch: {
    isBottom (newState) {
      if (newState) {
        ++this.pagination.current
      }
    }
  },

  computed: {
    ordersHistory () {
      let items = this.ordersHistoryItems()
      if (this.lazyLoadOrdersOnScroll) {
        items = this.paginate(items, this.pagination.perPage, this.pagination.current)
      }
      return items
    },
    isBottom () {
      return bottomHelper.isBottom
    }
  },
  methods: {
    paginate (array, page_size, page_number) {
      return array.slice(0, (page_number + 1) * page_size);
    }
  }
}
