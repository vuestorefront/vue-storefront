/* eslint no-undef: 0 */
describe('Category page', () => {
  it('verification of filters in the Women category', () => {
    cy.visit('/');
    cy.get('[data-testid=menuButton]').click();
    cy.get('[data-testid=categoryButton]')
      .contains('Women')
      .click({ force: true });
    cy.get('[data-testid=categoryLink][href="/women/women-20"]').click();
    cy.url().should('include', '/women/women-20');
    cy.get('[aria-label="Select color Red"]')
      .first()
      .click()
      .should('have.class', 'active');
    cy.wait(500);
    cy.get('[data-testid=productImage]', { timeout: 10000 })
      .first()
      .find('img')
      .eq(2)
      .should('have.attr', 'src')
      .and('include', 'red');
    cy.get('[aria-label="Select size S"]')
      .first()
      .click()
      .contains('S');
    cy.get('[aria-label="Select size 30"]')
      .first()
      .click()
      .should('have.class', 'active');
    cy.get('[aria-label="Select size XL"]')
      .first()
      .click()
      .contains('XL');
    cy.get('[data-testid=productImage]').should('have.length', 2);
    cy.get('[aria-label="Price < $50"]')
      .first()
      .click()
      .should('have.class', 'active');
    cy.get('[aria-label="Price > $150"]')
      .first()
      .click()
      .should('have.class', 'active');
    cy.get('[data-testid=noProductsInfo]').contains('No products found!');
    cy.get('[aria-label="Price > $150"]')
      .first()
      .click();
    cy.get('[data-testid=noProductsInfo]').should('not.exist');
  });
});
