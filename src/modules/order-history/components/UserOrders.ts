import MyOrders from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrders'
import { mapGetters } from 'vuex';
import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll'

export default {
  name: 'UserOrders',
  mixins: [MyOrders, onBottomScroll],
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
  computed: {
    ordersHistory () {
      let items = this.ordersHistoryItems()
      if (this.lazyLoadOrdersOnScroll) {
        items = this.paginate(items, this.pagination.perPage, this.pagination.current)
      }
      return items
    }
  },
  methods: {
    paginate (array, page_size, page_number) {
      return array.slice(0, (page_number + 1) * page_size);
    },
    onBottomScroll () {
      ++this.pagination.current
    }
  }
}
