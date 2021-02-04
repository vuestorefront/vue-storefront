/* eslint no-undef: 0 */

const selectors = {
  cart: {
    icon: '[data-testid="cartIcon"]',
    indicator: '[data-testid="cartIcon"] .sf-badge',
    items: '[data-cy=collected-product-cart-sidebar]'
  },
  catalog: {
    products: '[data-cy="category-product-card"]'
  },
  product: {
    addToCart: '[data-cy=product-cart_add]'
  },
  checkout: {
    personalDetails: {
      firstNameInput: '[data-cy="personal-details-input_firstName"]',
      lastNameInput: '[data-cy="personal-details-input_lastName"]',
      emailInput: '[data-cy="personal-details-input_email"]'
    },
    continueButton: '[data-cy=checkout-continue-button]',
    termsCheckbox: '[data-testid="terms"]',
    submitButton: '[data-cy=order-review-btn_summary-conitnue]'
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
    cy.get(selectors.catalog.products).first().click().wait(500);
    cy.url().should('include', '/p/');

    // Check if cart is empty
    cy.get(selectors.cart.indicator).should('not.exist');

    // Add product to cart
    cy.get(selectors.product.addToCart).click().wait(500);

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

    // Select shipping method
    cy.get(selectors.checkout.continueButton).click().wait(500);

    // Go to payment
    cy.get(selectors.checkout.continueButton).click().wait(500);
    cy.url().should('include', 'checkout/payment');

    // Select payment method
    cy.get(selectors.checkout.continueButton).click().wait(500);
    cy.get('[data-cy="payment-radio_paymentMethod"]').first().click();

    // Go to review
    cy.get(selectors.checkout.continueButton).click().wait(500);
    cy.url().should('include', 'checkout/order-review');

    // Complete order
    cy.get(selectors.checkout.termsCheckbox).click().wait(500);
    cy.get(selectors.checkout.submitButton).click().wait(500);
    cy.url().should('include', 'checkout/thank-you');
  });
});
