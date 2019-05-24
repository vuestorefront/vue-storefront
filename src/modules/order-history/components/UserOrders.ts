import { isServer, bottomVisible } from '@vue-storefront/core/helpers'
import MyOrder from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrder'

export default {
  name: 'UserOrders',
  mixins: [MyOrder],
  data () {
    return {
      pagination: {
        perPage: 10,
        current: 0,
        enabled: false
      },
      bottom: false,
      lazyLoadOrdersOnscroll: true
    }
  },
  watch: {
    bottom (bottom) {
      if (bottom) {
        ++this.pagination.current
      }
    }
  },
  beforeMount () {
    if (!isServer && this.lazyLoadOrdersOnscroll) {
      window.addEventListener('scroll', () => {
        this.bottom = bottomVisible()
      }, {passive: true})
    }
  },
  computed: {
    ordersHistory () {
      let items = []
      items = this.$store.state.user.orders_history.items
      if (!isServer && this.lazyLoadOrdersOnscroll) {
        items = this.paginate(items, this.pagination.perPage, this.pagination.current)
      }
      return items
    },
    isHistoryEmpty () {
      return this.$store.state.user.orders_history.items.length < 1
    }
  },
  methods: {
    paginate (array, page_size, page_number) {
      return array.slice(0, (page_number + 1) * page_size);
    }
  }
}
