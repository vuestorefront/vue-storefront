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
    personalDetails: {
      firstNameInput: element('personal-details-input_firstName'),
      lastNameInput: element('personal-details-input_lastName'),
      emailInput: element('personal-details-input_email')
    },
    shipping: {
      streetName: element('shipping-details-input_streetName'),
      apartmentNumber: element('shipping-details-input_apartment'),
      cityName: element('shipping-details-input_city'),
      zipCode: element('shipping-details-input_postalCode'),
      state: element('shipping-details-input_state'),
      countryName: element('shipping-details-select_country'),
      phoneNumber: element('shipping-details-input_phone'),
      methods: element('shipping-methods')
    },
    payment: {
      copyFromShipping: element('payment-copy-from-billing'),
      paymentMethods: element('payment-radio_paymentMethod')
    },
    continueButton: element('checkout-continue-button'),
    termsCheckbox: '[data-testid="terms"]',
    submitButton: element('order-review-btn_summary-continue')
  }
};

context('', () => {
  it('test', () => {
    const getMe = [];

    cy.fixture('getMe.json').then(fixture => getMe.push(fixture));
    cy.fixture('getMe_after_addToCart.json').then(fixture => getMe.push(fixture));
    cy.fixture('getMe_after_personalDetails.json').then(fixture => getMe.push(fixture));
    cy.fixture('getMe_after_shippingStep.json').then(fixture => getMe.push(fixture));
    cy.fixture('getMe_after_paymentStep.json').then(fixture => getMe.push(fixture, fixture));
    cy.fixture('getMe_after_order.json').then(fixture => getMe.push(fixture, fixture));

    const updateCart = [];

    cy.fixture('updateCart_after_personalDetails.json').then(fixture => updateCart.push(fixture));
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
    cy.contains('WOMEN').click().wait(100);
    cy.url().should('include', '/c/women');

    // Open first product
    cy.get(selectors.catalog.products).first().click().wait(100);
    cy.url().should('include', '/p/');

    // Check if cart is empty
    cy.get(selectors.cart.indicator).should('not.exist');

    // Add product to cart
    cy.get(selectors.product.addToCart).click().wait(100);

    // Check if cart is not empty
    cy.get(selectors.cart.indicator).should('exist');

    // Open minicart
    cy.get(selectors.cart.icon).click();

    // Check if product is listen in minicart
    cy.get(selectors.cart.items).should('have.length', 1);

    // Go to checkout
    cy.contains('Go to checkout').click().wait(100);
    cy.url().should('include', 'checkout/personal-details');

    // Type personal details
    cy.get(selectors.checkout.personalDetails.firstNameInput).type('First');
    cy.get(selectors.checkout.personalDetails.lastNameInput).type('Last');
    cy.get(selectors.checkout.personalDetails.emailInput).type('fake@example.com');

    // Go to shipping details
    cy.get(selectors.checkout.continueButton).click().wait(100);
    cy.url().should('include', 'checkout/shipping');

    // Type shipping details
    cy.get(selectors.checkout.shipping.streetName).type('Street');
    cy.get(selectors.checkout.shipping.apartmentNumber).type('123');
    cy.get(selectors.checkout.shipping.cityName).type('City');
    cy.get(selectors.checkout.shipping.zipCode).type('12345');
    cy.get(selectors.checkout.shipping.phoneNumber).type('123456789');
    cy.ifElementExists(selectors.checkout.shipping.state, element => element.type('State'));

    // Select first country from the dropdown
    cy
      .get(`${selectors.checkout.shipping.countryName} option`)
      .eq(0)
      .then(element => cy.get(`${selectors.checkout.shipping.countryName} select`).select(element.val()));

    // Show shipping methods
    cy.get(selectors.checkout.continueButton).click().wait(100);
    cy.get(`${selectors.checkout.shipping.methods} label`).first().click();

    // Go to payment
    cy.get(selectors.checkout.continueButton).click().wait(100);
    cy.url().should('include', 'checkout/payment');

    // Copy shipping details to payment
    cy.get(selectors.checkout.payment.copyFromShipping).click();

    // Show payment methods
    cy.get(selectors.checkout.continueButton).click().wait(100);
    cy.get(selectors.checkout.payment.paymentMethods).first().click();

    // Go to review
    cy.get(selectors.checkout.continueButton).click().wait(100);
    cy.url().should('include', 'checkout/order-review');

    // Complete order
    cy.get(selectors.checkout.termsCheckbox).click().wait(100);
    cy.get(selectors.checkout.submitButton).click().wait(100);
    cy.url().should('include', 'checkout/thank-you');
  });
});
