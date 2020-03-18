/* eslint no-undef: 0 */
describe('add to cart', () => {
  it('verify that the configurable product is added to cart twice', () => {
    cy.visit('/p/WS01/gwyn-endurance-tee-1577/WS01');
    cy.get('[aria-label=Select size L]').dblclick();
    cy.get('[aria-label=Select color Green]').click({ force: true });
    cy.get('[data-testid=addToCart]', { timeout: 10000 }).click();
    cy.get('[data-testid=openMicrocart]').click({ force: true });
    cy.get('[data-testid=productSku]').contains('WS01-L-Green');
    cy.get('[data-testid=closeMicrocart]').click();
    cy.get('[data-testid=addToCart]', { timeout: 10000 }).click();
    cy.get('[data-testid=notificationMessage]', { timeout: 10000 }).contains(
      'Product quantity has been updated!'
    );
    cy.get('[data-testid=openMicrocart]').click({ force: true });
    cy.get('#input_299').should('have.value', '2');
  });

  it('verify that the bundle product is added to cart', () => {
    cy.visit('/p/24-WG080/sprite-yoga-companion-kit-45');
    cy.get('[data-testid=addToCart]').click();
    cy.get('[data-testid=notificationMessage]', { timeout: 10000 }).contains(
      'This product is out of stock.'
    );
    cy.get('[data-testid=notificationAction1]').click();
    cy.get('[id=bundleOption_71_1_2]').click({ force: true });
    cy.get('#bundleOptionQty_1')
      .clear()
      .type('2');
    cy.get('[id=bundleOption_73_3_7]').click({ force: true });
    cy.get('#bundleOptionQty_4')
      .clear()
      .type('3');
    cy.get('[data-testid=addToCart]').click();
    cy.get('[data-testid=notificationMessage]').contains(
      'Product has been added to the cart!'
    );
    cy.get('[data-testid=notificationAction1]').click();
    cy.get('[data-testid=openMicrocart]').click({ force: true });
    cy.get('[class=prices]').contains('168.51');
    cy.get('[data-testid=closeMicrocart]').click();
  });
});
