/* eslint no-undef: 0 */
context('Login path', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.sf-header__action').eq(0).click();
    cy.get('[data-cy=login-btn_login-into-account]').click().wait(500);
  });
  it('not existing user', () => {
    cy.get('[data-cy=login-input_email]').type('fake@email').should('have.value', 'fake@email');
    cy.get('[data-cy=login-input_password]').type('Password123');
    cy.get('.sf-input__error-message').should('exist').contains('Invalid email');
    cy.get('[data-cy=login-btn_submit]').click();
    // cy.get(`[data-testid=notificationMessage]`).should('exist').contains(
    // 'Please fix the validation errors')
  });
  it('successfull login', () => {
    cy.get('[data-cy=login-input_email]').type('next@test.io').should('have.value', 'next@test.io');
    cy.get('[data-cy=login-input_password]').type('Pass123');
    cy.get('[data-cy=login-btn_submit]').click();
    cy.get('.sf-header__action').eq(0).click();
    cy.get('[data-cy="my-account_content-pages"]').should('contain', 'My Account');
    // cy.get(`[data-testid=notificationMessage]`).should('exist').contains(
    // 'You are logged in!')
  });
});
