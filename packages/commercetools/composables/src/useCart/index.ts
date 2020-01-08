import { UseCart } from '@vue-storefront/interfaces'
import { ref } from '@vue/composition-api'

export default function useCart(): UseCart<any, any, any, any, any, any, any> {
  const cart = ref({ products: [
    {
      title: "Cream Beach Bag",
      id: "CBB1",
      image: "/homepage/productA.jpg",
      price: { regular: "50.00" },
      configuration: [
        { name: "Size", value: "XS" },
        { name: "Color", value: "White" }
      ],
      qty: "1",
      stock: 44
    },
    {
      title: "Cream Beach Bag",
      id: "CBB2",
      image: "/homepage/productB.jpg",
      price: { regular: "50.00", special: "20.05" },
      configuration: [
        { name: "Size", value: "XS" },
        { name: "Color", value: "White" }
      ],
      qty: "2",
      stock: 10
    },
    {
      title: "Cream Beach Bag",
      id: "CBB3",
      image: "/homepage/productC.jpg",
      price: { regular: "50.00", special: "20.50" },
      configuration: [
        { name: "Size", value: "XS" },
        { name: "Color", value: "White" }
      ],
      qty: "1",
      stock: 20
    }
  ]})
  const addToCart = () => { () => { console.log('useCart:addToCart') } }
  const removeFromCart = () => { () => { console.log('useCart:removeFromCart') } }
  const clearCart = () => { () => { console.log('useCart:clearCart') } }
  const coupon = ref({})
  const applyCoupon = () => { () => { console.log('useCart:applyCoupon') } }
  const removeCoupon = () => { () => { console.log('useCart:removeCoupon') } }
  const loading = false
  const error = ref(null)

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
    loading,
    error
  }
}
