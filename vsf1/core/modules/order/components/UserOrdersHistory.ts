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
      const totalCount = this.$store.state.user.orders_history.total_count ? this.$store.state.user.orders_history.total_count : 0;
      const isLastPage = this.pagination.current > Math.ceil(totalCount / this.pagination.perPage);
      if (!isLastPage) {
        this.pagination.current++;
        this.$store.dispatch('user/appendOrdersHistory', {
          pageSize: this.pagination.perPage,
          currentPage: this.pagination.current
        });
      }
    }
  }
}
