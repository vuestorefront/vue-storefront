import isEmpty from 'lodash-es/isEmpty'
import isUndefined from 'lodash-es/isUndefined'
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'

const getCartItemsByBrand = (cartItems: CartItem[]) => {

  let cart_items_by_brand={}
  for(let item of cartItems){
    let brand_id= item['procc_brand_id']
    if(isEmpty(cart_items_by_brand) || isUndefined(cart_items_by_brand[brand_id]) || !cart_items_by_brand[brand_id] ){
      cart_items_by_brand[brand_id]=[]
    }
    cart_items_by_brand[brand_id].push(item)
  }
  return cart_items_by_brand
}

export default getCartItemsByBrand
