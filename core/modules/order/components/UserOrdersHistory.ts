import MyOrders from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrders'
import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll'
import { mapActions } from 'vuex';

export default {
  name: 'UserOrdersHistory',
  mixins: [MyOrders, onBottomScroll],
  data () {
    return {
      pagination: {
        perPage: 20,
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
        items = items.slice(0, (this.pagination.perPage + 1) * this.pagination.current)
      }
      return items
    }
  },
  methods: {
    onBottomScroll () {
      ++this.pagination.current
      let total_count = this.$store.state.user.orders_history.total_count ? this.$store.state.user.orders_history.total_count : 0
      if (Math.ceil(total_count / this.pagination.perPage) >= this.pagination.current) {
        this.getHistory({ currentPage: this.pagination.current, refresh: true })
      }
    },
    ...mapActions({
      getHistory: 'user/getOrdersHistory'
    })
  }
}
