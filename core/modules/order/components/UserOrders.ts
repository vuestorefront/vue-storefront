import {isServer, bottomVisible} from '@vue-storefront/core/helpers'

/**
 * Component responsible for displaying user orders. Requires User module.
 */
export const UserOrders = {
    name: 'UserOrders',
    data() {
        return {
            pagination: {
                perPage: 25,
                current: 0,
                enabled: false
            },
            bottom: false,
            lazyLoadOrdersOnscroll: true
        }
    },
    watch: {
        bottom(bottom) {
            if (bottom) {
                ++this.pagination.current
            }
        }
    },
    beforeMount() {
        if (!isServer && this.lazyLoadOrdersOnscroll) {
            window.addEventListener('scroll', () => {
                this.bottom = bottomVisible()
            }, {passive: true})
        }
    },
    computed: {
        ordersHistory() {
            let items = []
            items = this.$store.state.user.orders_history.items
            if (!isServer && this.lazyLoadOrdersOnscroll) {
                items = this.paginate(items, this.pagination.perPage, this.pagination.current)
            }
            return items
        },
        isHistoryEmpty() {
            return this.$store.state.user.orders_history.items.length < 1
        }
    },
    methods: {
        paginate(array, page_size, page_number) {
            return array.slice(0, (page_number + 1) * page_size);
        },
        remakeOrder(products) {
            products.forEach(item => {
                this.$store.dispatch('product/single', {
                    options: {sku: item.sku},
                    setCurrentProduct: false,
                    selectDefaultVariant: false
                }).then((product) => {
                    product.qty = item.qty_ordered
                    this.$store.dispatch('cart/addItem', {productToAdd: product}).then(() => {
                    })
                })
            })
        },
        skipGrouped(items) {
            return items.filter((item) => {
                return !item.parent_item_id
            })
        },
    }
}
