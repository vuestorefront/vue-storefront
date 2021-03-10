/* eslint no-undef: 0 */

const element = (name) => `[data-e2e="${ name }"]`;

const selectors = {
  cart: {
    icon: element('header-minicart'),
    // Can't use v-cypress directive because of https://github.com/vuejs/vue-loader/issues/1433
    indicator: `${ element('header-minicart') } .cart-badge`,
    items: element('collected-product-cart-sidebar')
  },
  catalog: {
    products: element('category-product-card')
  },
  product: {
    addToCart: element('product-cart_add')
  },
  checkout: {
    shipping: {
      firstName: element('shipping-details-input_firstName'),
      lastName: element('shipping-details-input_lastName'),
      streetName: element('shipping-details-input_streetName'),
      apartmentNumber: element('shipping-details-input_apartment'),
      cityName: element('shipping-details-input_city'),
      zipCode: element('shipping-details-input_postalCode'),
      state: element('shipping-details-input_state'),
      countryName: element('shipping-details-select_country'),
      phoneNumber: element('shipping-details-input_phone'),
      methods: element('shipping-methods')
    },
    billing: {
      copyFromShipping: element('payment-copy-from-billing'),
      apartmentNumber: element('billing-details-input_apartment'),
      state: element('billing-details-input_state'),
      paymentMethods: element('payment-radio_paymentMethod')
    },
    continueButton: element('checkout-continue-button'),
    termsCheckbox: element('payment-checkbox-terms'),
    submitButton: element('payment-submit-order')
  }
};

context('', () => {
  it('test', () => {
    const getMe = [];

    cy.fixture('getMe.json').then(fixture => getMe.push(fixture));
    cy.fixture('getMe_after_addToCart.json').then(fixture => getMe.push(fixture));
    cy.fixture('getMe_after_shippingStep.json').then(fixture => getMe.push(fixture));
    cy.fixture('getMe_after_paymentStep.json').then(fixture => getMe.push(fixture, fixture));
    cy.fixture('getMe_after_order.json').then(fixture => getMe.push(fixture, fixture));

    const updateCart = [];

    cy.fixture('updateCart_after_shipping.json').then(fixture => updateCart.push(fixture));
    cy.fixture('updateCart_after_shippingMethods.json').then(fixture => updateCart.push(fixture));
    cy.fixture('updateCart_after_shippingStep.json').then(fixture => updateCart.push(fixture));
    cy.fixture('updateCart_after_payment.json').then(fixture => updateCart.push(fixture));
    cy.fixture('updateCart_after_paymentMethods.json').then(fixture => updateCart.push(fixture));

    // Mock api
    cy.intercept('POST', 'api/ct/getMe', (req) => req.reply(getMe.shift()));
    cy.intercept('POST', 'api/ct/updateCart', (req) => req.reply(updateCart.shift()));
    cy.intercept('POST', 'api/ct/getCategory', { fixture: 'getCategory.json' });
    cy.intercept('POST', 'api/ct/getProduct', { fixture: 'getProduct.json' });
    cy.intercept('POST', 'api/ct/createCart', { fixture: 'createCart.json' });
    cy.intercept('POST', 'api/ct/addToCart', { fixture: 'addToCart.json' });
    cy.intercept('POST', 'api/ct/getShippingMethods', { fixture: 'getShippingMethods.json' });
    cy.intercept('POST', 'api/ct/isGuest', { fixture: 'isGuest.json' });
    cy.intercept('POST', 'api/ct/createMyOrderFromCart', { fixture: 'createMyOrderFromCart.json' });

    // Homepage
    cy.visit('/');

    // Open 'Women' category
    cy.contains('WOMEN').click().wait(1000);
    cy.url().should('include', '/c/women');

    // Open first product
    cy.get(selectors.catalog.products).first().click().wait(1000);
    cy.url().should('include', '/p/');

    // Check if cart is empty
    cy.get(selectors.cart.indicator).should('not.exist');

    // Add product to cart
    cy.get(selectors.product.addToCart).click().wait(1000);

    // Check if cart is not empty
    cy.get(selectors.cart.indicator).should('exist');

    // Open minicart
    cy.get(selectors.cart.icon).click();

    // Check if product is listen in minicart
    cy.get(selectors.cart.items).should('have.length', 1);

    // Go to checkout shipping
    cy.contains('Go to checkout').click().wait(1000);
    cy.url().should('include', 'checkout/shipping');

    // Type shipping details
    cy.get(selectors.checkout.shipping.firstName).type('First');
    cy.get(selectors.checkout.shipping.lastName).type('Last');
    cy.get(selectors.checkout.shipping.streetName).type('Street');
    cy.get(selectors.checkout.shipping.apartmentNumber).type('123');
    cy.get(selectors.checkout.shipping.cityName).type('City');
    cy.get(selectors.checkout.shipping.zipCode).type('12345');
    cy.get(selectors.checkout.shipping.phoneNumber).type('123456789');
    cy
      .get(`${selectors.checkout.shipping.countryName} option`)
      .eq(0)
      .then(element => cy.get(`${selectors.checkout.shipping.countryName} select`).select(element.val()));
    cy
      .get(`${selectors.checkout.shipping.state} option`)
      .eq(0)
      .then(element => cy.get(`${selectors.checkout.shipping.state} select`).select(element.val()));

    // Show shipping methods
    cy.get(selectors.checkout.continueButton).click().wait(1000);
    cy.get(`${selectors.checkout.shipping.methods} label`).first().click();

    // Go to checkout billing
    cy.get(selectors.checkout.continueButton).click().wait(1000);
    cy.url().should('include', 'checkout/billing');

    // Copy shipping details to payment
    cy.get(selectors.checkout.billing.copyFromShipping).click();
    cy.get(selectors.checkout.billing.apartmentNumber).type('123');
    cy
      .get(`${selectors.checkout.billing.state} option`)
      .eq(0)
      .then(element => cy.get(`${selectors.checkout.billing.state} select`).select(element.val()));

    // Go to checkout payment
    cy.get(selectors.checkout.continueButton).click().wait(1000);
    cy.url().should('include', 'checkout/payment');

    // Select payment method and terms
    cy.get(selectors.checkout.billing.paymentMethods).first().click();
    cy.get(selectors.checkout.termsCheckbox).click().wait(1000);

    // Submit order
    cy.get(selectors.checkout.submitButton).click().wait(1000);
    cy.url().should('include', 'checkout/thank-you');
  });
});
