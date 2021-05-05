import MyOrders from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrders'
import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll'

export default {
  name: 'UserOrdersHistory',
  mixins: [MyOrders, onBottomScroll],
  data () {
    return {
      pagination: {
        perPage: 10,
        current: 1,
        enabled: false
      },
      lazyLoadOrdersOnScroll: true
    }
  },
  computed: {
    ordersHistory () {
      let items = this.getOrdersHistory
      if (this.lazyLoadOrdersOnScroll) {
        items = items.slice(0, this.pagination.perPage * this.pagination.current)
      }
      return items
    }
  },
  methods: {
    onBottomScroll () {
        this.pagination.current++;
        this.$store.dispatch('user/appendOrdersHistory', { pageSize: this.pagination.perPage, currentPage: this.pagination.current });
      }
    }
  }
}
