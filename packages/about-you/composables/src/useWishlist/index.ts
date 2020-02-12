import { UseWishlist } from '@vue-storefront/interfaces'
import { Ref, ref, watch } from '@vue/composition-api'
import { Wishlist, ProductVariant } from '@vue-storefront/boilerplate-api/src/types'

// ishlist-specific typings. 
// Those inetrfaces are just recommendations. 
// Feel free to update them to match your platform specification.
type AddToWishlist = (product: ProductVariant, quantity: number) => void
type RemoveFromWishlist = (product: ProductVariant) => void
type ClearWishlist = () => void


// This state will be shared between all 'useCart` instances.
const wishlist: Ref<Wishlist> = ref<Wishlist>(null)
const loading: Ref<boolean> = ref<boolean>(true)
const error: Ref<any> = ref<any>(null)

const addToWishlist: AddToWishlist = (product) => {}
const removeFromWishlist: RemoveFromWishlist = (product) => {}
const clearWishlist: ClearWishlist = () => {}

async function loadWishlist () {
  // get wishlist id / user id from useUser or localStorage and load it to `wishlist` variable
  loading.value = false
}

export default function useCart (): UseWishlist<Wishlist, AddToWishlist, RemoveFromWishlist, ClearWishlist> {
  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    error,
    loading
  }
}
