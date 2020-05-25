/* eslint no-undef: 0 */
describe('add to compare', () => {
  it('Two products should be added to comparison table', () => {
    cy.visit('/c/jackets-23');
    cy.get('[data-testid="productLink"]').eq(1).as('firstProduct')
    cy.get('@firstProduct').click().should('have.attr', 'href').and('include', 'olivia-14-zip-light-jacket')
    cy.get('[data-testid="addToCompare"]').click();
    cy.go('back').wait(1000)
    cy.get('[data-testid="addToCompare"]').eq(2).click()
    cy.scrollTo('top');
    cy.get('[data-testid="compare-list-icon"]').click();
    cy.get('[data-testid="comparedProduct"]').should('have.length', 2)
  });
});
