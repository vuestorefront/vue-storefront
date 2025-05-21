import { Store } from 'vuex';
import VueGtm from 'vue-gtm';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { Order } from '@vue-storefront/core/modules/order/types/Order';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { cartHooks } from '@vue-storefront/core/modules/cart/hooks';
import { SearchQuery } from 'storefront-query-builder';
import { Logger } from '@vue-storefront/core/lib/logger';

import getCookieByName from 'src/modules/shared/helpers/get-cookie-by-name.function';
import CartEvents from 'src/modules/shared/types/cart-events';
import { PlushieWizardEvents } from 'src/modules/budsies';
import { CustomerDataChangedEventPayload, PriceHelper, ProductEvent, UserEvents } from 'src/modules/shared';

import CartItem from 'core/modules/cart/types/CartItem';
import { GET_PRODUCT_PRICE } from '@vue-storefront/core/modules/catalog';
import { GET_CART_ITEM_PRICE } from '@vue-storefront/core/modules/cart';
import PaymentDetails from 'core/modules/checkout/types/PaymentDetails';
import ShippingDetails from 'core/modules/checkout/types/ShippingDetails';
import { ORDER_ERROR_EVENT } from '@vue-storefront/core/modules/checkout';

import { prepareCartItemData } from './prepare-cart-item-data.function';
import { prepareProductItemData } from './prepare-product-item-data.function';
import { DEFAULT_CURRENCY } from '../types/default-currency';
import GoogleTagManagerEvents from '../types/GoogleTagManagerEvents';
import { trackEcommerceEventFactory } from './track-ecommerce-event.factory';
import { A_B_TEST_GROUP_CHANGED } from 'src/modules/a-b-testing';
import { FETCH_ORDERS_HISTORY_ACTION } from 'src/modules/orders-history';

const shareasaleSSCIDCookieName = 'shareasaleMagentoSSCID';

export default class EventBusListener {
  private trackEcommerceEvent;

  public constructor (
    private store: Store<any>,
    private gtm: typeof VueGtm
  ) {
    this.trackEcommerceEvent = trackEcommerceEventFactory(gtm);
  }

  public initEventBusListeners (): void {
    EventBus.$on(
      PlushieWizardEvents.PLUSHIE_WIZARD_PHOTOS_PROVIDE,
      this.onPlushieWizardPhotosProvideEventHandler.bind(this)
    );
    EventBus.$on(
      PlushieWizardEvents.PLUSHIE_WIZARD_INFO_FILL,
      this.onPlushieWizardInfoFillEventHandler.bind(this)
    );
    EventBus.$on(
      PlushieWizardEvents.PLUSHIE_WIZARD_TYPE_CHANGE,
      this.onPlushieWizardTypeChangeEventHandler.bind(this)
    );

    EventBus.$on('order-after-placed', this.onOrderAfterPlacedEventHandler.bind(this));
    EventBus.$on('checkout-after-paymentDetails', this.onCheckoutAfterPaymentDetailsEventHandler.bind(this));
    EventBus.$on('checkout-after-shippingDetails', this.onCheckoutAfterShippingDetailsEventHandler.bind(this));
    EventBus.$on(
      CartEvents.BEGIN_CHECKOUT,
      this.sendBeginCheckoutEvent.bind(this)
    );
    EventBus.$on('user-after-loggedin', () => {
      this.gtm.trackEvent({
        event: GoogleTagManagerEvents.LOGIN
      })
    });
    EventBus.$on('user-after-register', () => {
      this.gtm.trackEvent({
        event: GoogleTagManagerEvents.SIGN_UP
      })
    });
    EventBus.$on(CartEvents.MAKE_ANOTHER_FROM_CART, this.onMakeAnotherFromCartEventHandler.bind(this))

    EventBus.$on(
      ProductEvent.PRODUCT_CARD_CLICK,
      ({
        product,
        categoryName,
        categoryId
      }: {
        product: Product,
        categoryName: string,
        categoryId: string
      }
      ) => {
        this.trackEcommerceEvent({
          event: GoogleTagManagerEvents.SELECT_ITEM,
          ecommerce: {
            item_list_id: categoryId,
            item_list_name: categoryName,
            items: [
              prepareProductItemData(
                product,
                this.store
              )
            ]
          }
        })
      }
    );

    EventBus.$on(
      CartEvents.CART_VIEWED,
      ({ products, platformTotals }: { products: CartItem[], platformTotals: any }) => {
        this.trackEcommerceEvent({
          event: GoogleTagManagerEvents.VIEW_CART,
          ecommerce: {
            currency: platformTotals?.quote_currency_code || DEFAULT_CURRENCY,
            value: platformTotals?.base_grand_total || 0,
            items: products.map((cartItem) => prepareCartItemData(
              cartItem,
              this.store
            ))
          }
        })
      }
    )

    EventBus.$on(
      ProductEvent.PRODUCT_LIST_SHOW,
      ({
        products,
        categoryName,
        categoryId
      }: {
        products: Product[],
        categoryName: string,
        categoryId: string
      }
      ) => {
        this.trackEcommerceEvent({
          event: GoogleTagManagerEvents.VIEW_ITEM_LIST,
          ecommerce: {
            item_list_name: categoryName,
            item_list_id: categoryId,
            items: products.map(
              (product) => prepareProductItemData(
                product,
                this.store
              )
            )
          }
        })
      }
    );

    EventBus.$on(
      ProductEvent.PRODUCT_PAGE_SHOW,
      this.onProductPageShowEventHandler.bind(this)
    );

    EventBus.$on(
      ORDER_ERROR_EVENT,
      this.onOrderErrorEventHandler.bind(this)
    );

    EventBus.$on(
      UserEvents.CUSTOMER_DATA_CHANGED,
      (customerData: CustomerDataChangedEventPayload) => {
        this.gtm.trackEvent(customerData);
      }
    );

    EventBus.$on(A_B_TEST_GROUP_CHANGED, (testGroupId: string) => {
      this.gtm.trackEvent({
        event: GoogleTagManagerEvents.A_B_TEST_GROUP_CHANGED,
        exp_variant_string: testGroupId
      });
    });

    cartHooks.afterAddToCart(this.onAfterAddToCartHookHandler.bind(this));
    cartHooks.afterRemoveFromCart(this.onAfterRemoveFromCartHookHandler.bind(this));
  }

  private onOrderErrorEventHandler ({
    order,
    error,
    code
  }: {
    order: Order,
    error: string,
    code: number
  }): void {
    this.trackEcommerceEvent({
      event: GoogleTagManagerEvents.PURCHASE_ERROR,
      ecommerce: {
        custom_fields: {
          purchase_error: error,
          purchase_error_code: code
        },
        items: order.products.map(
          (cartItem) => prepareCartItemData(
            cartItem as CartItem,
            this.store
          )
        )
      }
    });
  }

  private onProductPageShowEventHandler (product: Product): void {
    const price = this.store.getters[GET_PRODUCT_PRICE](product);

    this.trackEcommerceEvent({
      event: GoogleTagManagerEvents.VIEW_ITEM,
      ecommerce: {
        currency: DEFAULT_CURRENCY,
        value: PriceHelper.getFinalPrice(price),
        items: [
          prepareProductItemData(
            product,
            this.store
          )
        ]
      }
    });
  }

  private onAfterAddToCartHookHandler ({
    cartItem
  }: {
    cartItem: CartItem
  }) {
    const price: PriceHelper.ProductPrice = this.store.getters[GET_CART_ITEM_PRICE](cartItem);

    this.trackEcommerceEvent({
      event: GoogleTagManagerEvents.ADD_TO_CART,
      ecommerce: {
        currency: this.store.state.cart.platformTotals?.quote_currency_code || DEFAULT_CURRENCY,
        value: PriceHelper.getFinalPrice(price),
        items: [
          prepareCartItemData(
            cartItem,
            this.store
          )
        ]
      }
    });
  }

  private onAfterRemoveFromCartHookHandler ({
    cartItem
  }: {
    cartItem: CartItem
  }) {
    const price: PriceHelper.ProductPrice = this.store.getters[GET_CART_ITEM_PRICE](cartItem);

    this.trackEcommerceEvent({
      event: GoogleTagManagerEvents.REMOVE_FORM_CART,
      ecommerce: {
        currency: DEFAULT_CURRENCY,
        value: PriceHelper.getFinalPrice(price),
        items: [prepareCartItemData(cartItem, this.store)]
      }
    })
  }

  private async loadProducts (productsSkus: string[]): Promise<void> {
    let searchQuery = new SearchQuery();
    searchQuery = searchQuery.applyFilter({ key: 'sku', value: { 'in': productsSkus } })

    await this.store.dispatch(
      'product/findProducts',
      {
        query: searchQuery,
        size: productsSkus.length
      }
    )
  }

  private sendBeginCheckoutEvent (): void {
    const platformTotals = this.store.state.cart.platformTotals;
    const cartItems: CartItem[] = this.store.getters['cart/getCartItems'];

    const data = {
      currency: platformTotals.quote_currency_code,
      value: platformTotals.base_grand_total,
      coupon: platformTotals.coupon_code,
      items: cartItems.map((cartItem) => prepareCartItemData(
        cartItem,
        this.store
      ))
    }

    this.trackEcommerceEvent({
      event: GoogleTagManagerEvents.BEGIN_CHECKOUT,
      ecommerce: data
    })
  }

  private onCheckoutAfterPaymentDetailsEventHandler (paymentDetails: PaymentDetails) {
    const platformTotals = this.store.state.cart.platformTotals;
    const cartItems: CartItem[] = this.store.getters['cart/getCartItems'];

    const data = {
      currency: platformTotals.quote_currency_code,
      value: platformTotals.base_grand_total,
      coupon: platformTotals.coupon_code,
      payment_type: paymentDetails.paymentMethod,
      items: cartItems.map(
        (cartItem) => prepareCartItemData(
          cartItem,
          this.store
        )
      )
    };

    this.trackEcommerceEvent({
      event: GoogleTagManagerEvents.ADD_PAYMENT_INFO,
      ecommerce: data
    });
  }

  private onCheckoutAfterShippingDetailsEventHandler (shippingDetails: ShippingDetails) {
    const platformTotals = this.store.state.cart.platformTotals;
    const cartItems: CartItem[] = this.store.getters['cart/getCartItems'];

    const data = {
      currency: platformTotals.quote_currency_code,
      value: platformTotals.base_grand_total,
      coupon: platformTotals.coupon_code,
      shipping_tier: shippingDetails.shippingMethod,
      items: cartItems.map(
        (cartItem) => prepareCartItemData(
          cartItem,
          this.store
        )
      )
    };

    this.trackEcommerceEvent({
      event: GoogleTagManagerEvents.ADD_SHIPPING_INFO,
      ecommerce: data
    });
  }

  private onPlushieWizardInfoFillEventHandler (plushieType: string) {
    const event = `${plushieType}${GoogleTagManagerEvents.PLUSHIE_WIZARD_INFO_FILL}`;

    this.gtm.trackEvent({
      event
    })
  }

  private onPlushieWizardPhotosProvideEventHandler (
    { uploadMethod, plushieType }:
    { uploadMethod: string, plushieType: string }
  ) {
    const event = `${plushieType}${GoogleTagManagerEvents.PLUSHIE_WIZARD_PHOTOS_PROVIDE}`;

    this.gtm.trackEvent({
      event,
      [`${event}.methodName`]: uploadMethod
    });
  }

  private onPlushieWizardTypeChangeEventHandler ({ plushieType, productType }: { plushieType: string, productType: string }) {
    const event = `${plushieType}${GoogleTagManagerEvents.PLUSHIE_WIZARD_TYPE_CHANGE}`;

    this.gtm.trackEvent({
      event,
      [`${event}.typeName`]: productType
    })
  }

  private onMakeAnotherFromCartEventHandler (productName: string) {
    const event = GoogleTagManagerEvents.MAKE_ANOTHER_FROM_CART
    this.gtm.trackEvent({
      event,
      [`${event}.product`]: productName
    })
  }

  private async onOrderAfterPlacedEventHandler ({ order, confirmation }: { order: Order, confirmation?: any }) {
    if (!confirmation) {
      return;
    }

    const currentUser = this.store.state.user.current;

    let ordersHistory = [];

    if (currentUser) {
      try {
        ordersHistory = await this.store.dispatch(FETCH_ORDERS_HISTORY_ACTION);
      } catch (error) {
        Logger.error(`Error loading orders: ${error}`, 'GoogleTagManager')();
      }
    }

    const sessionOrderHashes = this.store.getters['order/getSessionOrderHashes'];
    const orderPaymentDetails = order.paymentDetails;
    const orderPersonalDetails = order.personalDetails;
    const couponCode = orderPaymentDetails.coupon_code ? orderPaymentDetails.coupon_code : '';
    const isNewCustomer = ordersHistory.length <= 1 || sessionOrderHashes <= 1;
    const storeView = currentStoreView();
    const storeName = storeView.name ? storeView.name : '';

    const productsToLoadSkus: string[] = [];
    const productBySkuDictionary = this.store.getters['product/getProductBySkuDictionary'];

    for (const product of order.products) {
      if (!productBySkuDictionary[product.sku]) {
        productsToLoadSkus.push(product.sku);
      }
    }

    if (productsToLoadSkus.length) {
      await this.loadProducts(productsToLoadSkus);
    }

    const data = {
      affiliation: storeName,
      currency: orderPaymentDetails.order_currency_code,
      transaction_id: confirmation.magentoOrderId,
      value: orderPaymentDetails.base_grand_total,
      coupon: couponCode,
      shipping: orderPaymentDetails.base_shipping_amount,
      tax: orderPaymentDetails.base_tax_amount,
      items: order.products.map(
        (cartItem) => prepareCartItemData(
          cartItem as CartItem,
          this.store
        )
      ),
      custom_fields: {
        shareasale_sscid: getCookieByName(shareasaleSSCIDCookieName),
        is_new_customer: isNewCustomer,
        subtotal_value: orderPaymentDetails.base_grand_total - orderPaymentDetails.base_shipping_amount - orderPaymentDetails.base_tax_amount,
        affiliate_total: orderPaymentDetails.base_subtotal - orderPaymentDetails.base_discount_amount
      }
    }

    this.trackEcommerceEvent({
      event: GoogleTagManagerEvents.PURCHASE,
      ecommerce: data,
      customerEmail: orderPersonalDetails.emailAddress,
      customerFullName: `${orderPersonalDetails.firstName} ${orderPersonalDetails.lastName}`,
      customerId: currentUser ? currentUser.id : ''
    });
  }
}
