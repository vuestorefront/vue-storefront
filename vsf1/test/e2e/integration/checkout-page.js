/* eslint no-undef: 0 */
describe('checkout page', () => {
  it('Default shipping/billing address should be changed', () => {
    cy.visit('/');
    cy.get('[data-testid=accountButton]').click();
    cy.get('[name=email]').type('logintest@user.co');
    cy.get('[name=password]').type('123qwe!@#');
    cy.get('#remember').check({ force: true });
    cy.get('[data-testid=loginSubmit]').click();
    cy.wait(500);
    cy.get('[data-testid=notificationMessage]').contains('You are logged in!');
    cy.get('[data-testid=productLink]')
      .eq(3)
      .click();
    cy.get('[aria-label="Select size L"]').click();
    cy.get('[data-testid=addToCart]').click();
    cy.get('[data-testid=notificationAction2]').click();
    cy.get('[data-testid=personalDetailsSubmit]').click();
    cy.get('#shipToMyAddressCheckbox').check({ force: true });
    cy.get('[name=street-address]')
      .clear()
      .type('Dmowskiego street');
    cy.get('[name=apartment-number]')
      .clear()
      .type('17');
    cy.get('[name=city]')
      .clear()
      .type('Wroclaw');
    cy.get('[name=zip-code]')
      .clear()
      .type('50-555');
    cy.get('[data-testid=shippingSubmit]').click();
    cy.get('[data-testid=shippingAddressSummary]').contains('Wroclaw');
    cy.get('#sendToShippingAddressCheckbox').check({ force: true });
    cy.get('[value=checkmo]').check();
    cy.get('[data-testid=paymentSubmit]').click();
    cy.get('#acceptTermsCheckbox').check({ force: true });
    cy.get('[data-testid="errorMessage"]').should('not.exist');
    cy.get('[data-testid=orderReviewSubmit]').click();
    cy.url().should('include', '/checkout#orderReview');
    cy.get('.category-title').contains('Order confirmation');
  });
});
