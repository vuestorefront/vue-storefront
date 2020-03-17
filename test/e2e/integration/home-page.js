/* eslint no-undef: 0 */
describe('home page+privacy', () => {
  it('verify the content of the homepage', () => {
    cy.visit('/');
    cy.get('[data-testid=mainSliderTitle]')
      .first()
      .contains('Walk the walk.');
    cy.get('.header')
      .should('be.visible')
      .find('[data-testid="accountButton"]');
    cy.get('[title="See details"]').click();
    cy.get('.static-content').contains('Luma Privacy Policy');
    cy.get('[title="Home Page"]').click();
    cy.get('[data-testid=closeCookieButton]').click();
    cy.get('[data-testid=bottomLinks').should('be.visible');
    cy.get('[data-testid=openNewsletterButton')
      .click()
      .contains('Subscribe');
    cy.get('[data-testid=subscribeSubmit]').contains('Subscribe');
    cy.get('[data-testid=closeModalButton]').click();
    cy.get('.new-collection').should('be.visible');
    cy.scrollTo(0, 0);
  });
});
