/* eslint no-undef: 0 */

const element = (name) => `[data-cypress="${ name }"]`;

const selectors = {
  cart: {
    icon: element('header-minicart'),
    indicator: element('header-minicart-indicator'),
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
      phoneNumber: element('shipping-details-input_phone')
    },
    payment: {
      copyFromShipping: element('payment-copy-from-billing'),
      paymentMethods: element('payment-radio_paymentMethod')
    },
    continueButton: element('checkout-continue-button'),
    termsCheckbox: '[data-testid="terms"]',
    submitButton: element('order-review-btn_summary-conitnue')
  }
};

context('', () => {
  it('test', () => {
    // Homepage
    cy.visit('/');

    // Open 'Women' category
    cy.contains('WOMEN').click();
    cy.url().should('include', '/c/women');

    // Open first product
    cy.get(selectors.catalog.products).first().click().wait(2000);
    cy.url().should('include', '/p/');

    // Check if cart is empty
    cy.get(selectors.cart.indicator).should('not.exist');

    // Add product to cart
    cy.get(selectors.product.addToCart).click().wait(2000);

    // Check if cart is not empty
    cy.get(selectors.cart.indicator).should('exist');

    // Open minicart
    cy.get(selectors.cart.icon).click();

    // Check if product is listen in minicart
    cy.get(selectors.cart.items).should('have.length', 1);

    // Go to checkout
    cy.contains('Go to checkout').click().wait(500);
    cy.url().should('include', 'checkout/personal-details');

    // Type personal details
    cy.get(selectors.checkout.personalDetails.firstNameInput).type('First');
    cy.get(selectors.checkout.personalDetails.lastNameInput).type('Last');
    cy.get(selectors.checkout.personalDetails.emailInput).type('fake@example.com');

    // Go to shipping details
    cy.get(selectors.checkout.continueButton).click().wait(500);
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
      .get(`${selectors.checkout.shipping.countryName} option:first-child`)
      .then(element => {
        console.log({
          value: element.val(),
          parent: element.parent()
        });

        return element.parent().select(element.val());
      })
      .wait(500);

    // Show shipping methods
    cy.get(selectors.checkout.continueButton).click().wait(500);

    // Go to payment
    cy.get(selectors.checkout.continueButton).click().wait(500);
    cy.url().should('include', 'checkout/payment');

    // Copy shipping details to payment
    cy.get(selectors.checkout.payment.copyFromShipping).click();

    // Show payment methods
    cy.get(selectors.checkout.continueButton).click().wait(500);
    cy.get(selectors.checkout.payment.paymentMethods).first().click();

    // Go to review
    cy.get(selectors.checkout.continueButton).click().wait(500);
    cy.url().should('include', 'checkout/order-review');

    // Complete order
    cy.get(selectors.checkout.termsCheckbox).click().wait(500);
    cy.get(selectors.checkout.submitButton).click().wait(500);
    cy.url().should('include', 'checkout/thank-you');
  });
});
