import { mapGetters } from 'vuex'
import Microcart from '@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart'

export const CartSummary = {
  name: 'CartSummary',
  mixins: [Microcart],
  data(){
    return{
      loadShippingMethod:false
    }
  },
  computed: {
    ...mapGetters({
      totals: 'cart/getTotals',
      isVirtualCart: 'cart/isVirtualCart',
      shippingMethods: 'checkout/getShippingMethods'
    })
  },
  watch: {
    shippingMethods: {
      handler () {
    //    this.checkDefaultShippingMethod()
      }
    }
  },
  methods: {
    getShippingMethod () {
      for (let i = 0; i < this.shippingMethods.length; i++) {
        if (this.shippingMethods[i]._id === this.shipping.shippingMethod) {
          return {
            name: this.shippingMethods[i].name,
            cost: this.shippingMethods[i].cost
          }
        }
      }
      return {
        name: '',
        cost: ''
      }
    },
    showShippingModel(){
      console.log("showShippingModel", this.loadShippingMethod)
      //this.$nextTick(() => {
        this.loadShippingMethod = !this.loadShippingMethod
      this.$nextTick(() => {
        this.$bus.$emit(this.loadShippingMethod===true?'modal-show':'modal-hide', 'modal-shipping-method')
      })
        // this.$forceUpdate()
      // })
    },
    checkDefaultShippingMethod () {
      /*if (!this.shipping.shippingMethod || this.notInMethods(this.shipping.shippingMethod)) {
        let shipping = this.shippingMethods.find(item => item.default)
        if (!shipping && this.shippingMethods && this.shippingMethods.length > 0) {
          shipping = this.shippingMethods[0]
        }
        this.shipping.shippingMethod = shipping.method_code
        this.shipping.shippingCarrier = shipping.carrier_code
      }*/
      console.log(" call checkDefaultShippingMethod")
    },
  }
}
