import { Store } from 'vuex';
import VueGtm from 'vue-gtm';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { Order } from '@vue-storefront/core/modules/order/types/Order';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { SearchQuery } from 'storefront-query-builder';

import getCookieByName from 'src/modules/shared/helpers/get-cookie-by-name.function';
import CartEvents from 'src/modules/shared/types/cart-events';
import ForeversWizardEvents from 'src/modules/shared/types/forevers-wizard-events';

import GoogleTagManagerEvents from '../types/GoogleTagManagerEvents';

const shareasaleSSCIDCookieName = 'shareasaleMagentoSSCID';

export default class EventBusListener {
  public constructor (private store: Store<any>, private gtm: typeof VueGtm) {}

  public initEventBusListeners (): void {
    EventBus.$on(ForeversWizardEvents.PHOTOS_PROVIDE, this.onForeversWizardPhotosProvideEventHandler.bind(this));
    EventBus.$on(ForeversWizardEvents.INFO_FILL, this.onForeversWizardInfoFillEventHandler.bind(this));
    EventBus.$on(ForeversWizardEvents.TYPE_CHANGE, this.onForeversWizardTypeChangeEventHandler.bind(this));
    EventBus.$on('order-after-placed', this.onOrderAfterPlacedEventHandler.bind(this));
    EventBus.$on('checkout-after-paymentDetails', this.onCheckoutAfterPaymentDetailsEventHandler.bind(this));
    EventBus.$on('checkout-after-personalDetails', this.onCheckoutAfterPersonalDetailsEventHandler.bind(this));
    EventBus.$on('checkout-after-shippingDetails', this.onCheckoutAfterShippingDetailsEventHandler.bind(this));
    EventBus.$on(CartEvents.GO_TO_CHECKOUT_FROM_CART, this.onGoToCheckoutFromCartEventHandler.bind(this))
    EventBus.$on(CartEvents.MAKE_ANOTHER_FROM_CART, this.onMakeAnotherFromCartEventHandler.bind(this))
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

  private onCheckoutAfterPaymentDetailsEventHandler () {
    const event = GoogleTagManagerEvents.CHECKOUT_SECTION_CHANGE;
    const eventParamName = `${event}.sectionName`;

    this.gtm.trackEvent({
      event,
      [eventParamName]: 'opcBilling'
    });
    this.gtm.trackEvent({
      event,
      [eventParamName]: 'opcPayment'
    });
  }

  private onCheckoutAfterPersonalDetailsEventHandler () {
    this.gtm.trackEvent({
      event: GoogleTagManagerEvents.CHECKOUT_SECTION_CHANGE,
      [`${GoogleTagManagerEvents.CHECKOUT_SECTION_CHANGE}.sectionName`]: 'opcLogin'
    });
  }

  private onCheckoutAfterShippingDetailsEventHandler () {
    const event = GoogleTagManagerEvents.CHECKOUT_SECTION_CHANGE;
    const eventParamName = `${event}.sectionName`;

    this.gtm.trackEvent({
      event,
      [eventParamName]: 'opcShipping'
    });
    this.gtm.trackEvent({
      event,
      [eventParamName]: 'opcShippingMethod'
    });
  }

  private onForeversWizardPhotosProvideEventHandler (uploadMethodName: string) {
    const event = GoogleTagManagerEvents.FOREVERS_WIZARD_PHOTOS_PROVIDE;
    this.gtm.trackEvent({
      event,
      [`${event}.methodName`]: uploadMethodName
    });
  }

  private onForeversWizardInfoFillEventHandler () {
    this.gtm.trackEvent({
      event: GoogleTagManagerEvents.FOREVERS_WIZARD_INFO_FILL
    });
  }

  private onForeversWizardTypeChangeEventHandler (type: string) {
    const event = GoogleTagManagerEvents.FOREVERS_WIZARD_TYPE_CHANGE;
    this.gtm.trackEvent({
      event,
      [`${event}.typeName`]: type
    })
  }

  private onGoToCheckoutFromCartEventHandler () {
    this.gtm.trackEvent({
      event: GoogleTagManagerEvents.GO_TO_CHECKOUT_FROM_CART
    })
  }

  private onMakeAnotherFromCartEventHandler (productName: string) {
    const event = GoogleTagManagerEvents.MAKE_ANOTHER_FROM_CART
    this.gtm.trackEvent({
      event,
      [`${event}.product`]: productName
    })
  }

  private async onOrderAfterPlacedEventHandler ({ order, confirmation }: {order: Order, confirmation?: any}) {
    if (!confirmation) {
      return;
    }

    const ordersHistory = this.store.getters['user/getOrdersHistory'];
    const sessionOrderHashes = this.store.getters['order/getSessionOrderHashes'];
    const currentUser = this.store.state.user.current;
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

    const productsWithCategories = order.products.map((product) => ({
      ...product,
      category: productBySkuDictionary[product.sku].category
    }))

    const transactionProductsData = productsWithCategories.map((product) => this.prepareTransactionProduct(product as Product));
    const purchaseProductsData = productsWithCategories.map((product) => this.preparePurchaseProduct(product as Product));

    this.gtm.trackEvent({
      pageCategory: 'order-success'
    });

    this.gtm.trackEvent({
      transactionId: confirmation.magentoOrderId,
      transactionAffiliation: storeName,
      transactionTotal: orderPaymentDetails.base_grand_total,
      transactionTax: orderPaymentDetails.base_tax_amount,
      transactionShipping: orderPaymentDetails.base_shipping_amount,
      transactionProducts: transactionProductsData,
      ecommerce: {
        purchase: {
          actionField: {
            affiliation: storeName,
            coupon: couponCode,
            id: confirmation.magentoOrderId,
            revenue: orderPaymentDetails.base_grand_total,
            shipping: orderPaymentDetails.base_shipping_amount,
            tax: orderPaymentDetails.base_tax_amount
          },
          products: purchaseProductsData
        }
      }
    });

    this.gtm.trackEvent({
      shareasaleSSCID: getCookieByName(shareasaleSSCIDCookieName),
      transactionAffiliateTotal: orderPaymentDetails.base_subtotal - orderPaymentDetails.base_discount_amount,
      transactionCurrency: orderPaymentDetails.order_currency_code,
      transactionIsNewCustomer: isNewCustomer,
      transactionItemsPrices: order.products.map((product) => product.price).join(),
      transactionItemsQuantities: order.products.map((product) => product.qty).join(),
      transactionSKUs: order.products.map((product) => product.sku).join(),
      transactionValue: orderPaymentDetails.base_grand_total - orderPaymentDetails.base_shipping_amount - orderPaymentDetails.base_tax_amount
    });

    this.gtm.trackEvent({
      customerEmail: orderPersonalDetails.emailAddress,
      customerFullName: `${orderPersonalDetails.firstName} ${orderPersonalDetails.lastName}`,
      customerId: currentUser ? currentUser.id : ''
    });
  }

  private prepareProductCategories (product: Product) {
    if (!product.category || product.category.length === 0) {
      return '';
    }

    return product.category.map((category) => category.name).join('|');
  }

  private preparePurchaseProduct (product: Product) {
    return {
      category: this.prepareProductCategories(product),
      coupon: '',
      name: product.name,
      price: product.price,
      quantity: product.qty,
      id: product.sku
    };
  }

  private prepareTransactionProduct (product: Product) {
    return {
      category: this.prepareProductCategories(product),
      name: product.name,
      price: product.price,
      quantity: product.qty,
      sku: product.sku
    };
  }
}
