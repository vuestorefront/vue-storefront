/* eslint no-undef: 0 */
describe('basic client path', () => {
  it('should go through basic user flow', () => {
    cy.visit('/');
    cy.get('[data-testid=productLink]')
      .eq(7)
      .click({ force: true });
    cy.get('[data-testid=addToCart]').click({ force: true });
    cy.get('[data-testid=notificationMessage]').contains(
      'This product is out of stock.'
    );
    cy.get('[data-testid=notificationAction1]').click();
    cy.get('[aria-label="Select color Red"]').click();
    cy.get('[aria-label="Select size S"]').click();
    cy.wait(1000);
    cy.get('[data-testid=addToCart]').click({ force: true });
    cy.get('[data-testid=notificationAction2]').click();
    cy.get('[name=first-name]').type('Firstname');
    cy.get('[name=last-name]').type('Lastname');
    cy.get('[name=email-address]').type('e2e@vuestorefront.io');
    cy.get('[data-testid=personalDetailsSubmit]').click({ force: true });
    cy.get('[name=street-address]').type('Streetname');
    cy.get('[name=apartment-number]').type('28');
    cy.get('[name=city]').type('Wroclaw');
    cy.get('[name=state]').type('Lowersilesian');
    cy.get('[name=zip-code]').type('50-000');
    cy.get('[name="countries"]').select('PL');
    cy.get('[name=phone-number]').type('111 222 333');
    cy.get('[data-testid=shippingSubmit]').click({ force: true });
    cy.get('#sendToShippingAddressCheckbox').check({ force: true });
    cy.get('[data-testid=paymentSubmit]').click();
    cy.get('#acceptTermsCheckbox').check({ force: true });
    cy.get('[data-testid="errorMessage"]').should('not.exist');
  });
});
