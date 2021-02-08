import MyOrders from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrders'
import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll'
import { mapActions } from 'vuex';

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
        items = items.slice(0, (this.pagination.perPage + 1) * this.pagination.current)
      }
      return items
    }
  },
  methods: {
    onBottomScroll () {
      ++this.pagination.current
      const totalCount = this.$store.state.user.orders_history.totalCount ? this.$store.state.user.orders_history.totalCount : 0
      if (Math.ceil(totalCount / this.pagination.perPage) >= this.pagination.current) {
        this.getHistory({ currentPage: this.pagination.current, refresh: true })
      }
    },
    ...mapActions({
      getHistory: 'user/getOrdersHistory'
    })
  }
}
