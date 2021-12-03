import { Store } from 'vuex';
import VueGtm from 'vue-gtm';
import Product from 'core/modules/catalog/types/Product';
import { PRODUCT_SET_CURRENT } from '@vue-storefront/core/modules/catalog/store/product/mutation-types';
import { CART_ADD_ITEM } from '@vue-storefront/core/modules/cart/store/mutation-types';

export default class StoreMutationsListener {
  public constructor (private store: Store<any>, private gtm: typeof VueGtm) {}

  public initStoreMutationsListener (): void {
    this.store.subscribe(({ type, payload }) => {
      // Adding a Product to a Shopping Cart
      if (type === CART_ADD_ITEM) {
        this.onCartAddMutationListener(payload)
      }

      if (type === PRODUCT_SET_CURRENT) {
        this.onSetCurrentProductMutationListener(payload);
      }
    })
  }

  private onCartAddMutationListener (payload: {product: Product}): void {
    this.gtm.trackEvent({
      event: 'addToCart',
      'addToCart.productID': payload.product.id,
      'addToCart.productSKU': payload.product.sku
    });
  }

  private onSetCurrentProductMutationListener (product: Product) {
    const productCategoriesNames = product.category.map((category) => category.name).join('|');

    this.gtm.trackEvent({
      pageCategory: 'product-detail'
    });

    this.gtm.trackEvent({
      ecommerce: {
        detail: {
          actionField: {
            list: 'Catalog'
          },
          products: {
            name: product.name,
            id: product.parentSku,
            price: product.final_price,
            category: productCategoriesNames
          }
        }
      }
    });
  }
}
