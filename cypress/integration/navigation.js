/* eslint no-undef: 0 */
context('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.sf-header__navigation').children().should('have.length', 3)
    cy.get('[aria-label="Search"]').should('be.visible');
  });
  it('go back or forward in the browser\'s history', () => {
    cy.get('[data-cy=app-header-url_women]').click();
    cy.location('pathname').should('include', 'women');

    cy.go('back').wait(500);
    cy.location('pathname').should('not.include', 'women');

    cy.go('forward').wait(500);
    cy.location('pathname').should('include', 'women');
  });
  it('reload the page', () => {
    cy.reload();
    cy.reload(true);
    // (reload the page without using the cache)
    cy.url().should('eq', 'https://lovecrafts-demo.storefrontcloud.io/');
    cy.get('.sf-top-bar__container').children().should('have.length', 3).contains('Help & FAQs');
  });
  it('change language', () => {
    const footer = cy.get('#footer');
    footer.find('.sf-footer__container').children().should('have.length', 5).contains('About us');
    cy.get('[data-cy="locale-select_change-langauge"]').first().click();
    cy.get('.sf-list [aria-label="German"]').first().click();
    cy.location('pathname').should('include', 'de');
    cy.get('#footer').children().contains('Über uns').wait(1000);
    //cy.go('back'); //problem with navigation when changing language /issues/4428
    // cy.url().should('eq', 'https://lovecrafts-demo.storefrontcloud.io/');
    // footer.contains('About us');
  });
});
