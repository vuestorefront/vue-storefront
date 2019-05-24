import { isServer, bottomVisible } from '@vue-storefront/core/helpers'
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
      let items = this.ordersHistoryItems()
      if (!isServer && this.lazyLoadOrdersOnscroll) {
        items = this.paginate(items, this.pagination.perPage, this.pagination.current)
      }
      return items
    }
  },
  methods: {
    paginate (array, page_size, page_number) {
      return array.slice(0, (page_number + 1) * page_size);
    }
  }
}
