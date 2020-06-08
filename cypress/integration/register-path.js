/* eslint no-undef: 0 */
describe('register path', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.sf-header__action').eq(0).click({force:true});
  });
  it('user should not be registered', () => {
    cy.get('[data-cy=login-input_firstName]').clear().type('Firstname');
    cy.get('[data-cy=login-input_lastName]').clear().type('Lastname');
    cy.get('[data-cy=login-input_password]').type('Password123');
    cy.get('[name="create-account"]').check({ force: true }).should('be.checked');
    cy.get('[data-cy=login-btn_submit]').click();
    cy.get('.sf-input__error-message').contains('This field is required');
  });
  it('registration form should be correctly completed', () => {
    const userEmail = 'test@test.com';
    cy.get('[data-cy=login-input_email]').clear().type(userEmail).should('have.value', userEmail);
    cy.get('[data-cy=login-input_firstName]').clear().type('Firstname');
    cy.get('[data-cy=login-input_lastName]').clear().type('Lastname');
    cy.get('[data-cy=login-input_password]').type('Password123');
    cy.get('[name="create-account"]').check({ force: true }).should('be.checked');
    cy.get('[data-testid="errorMessage"]').should('not.exist');
    cy.get('[data-cy=login-btn_submit]').find('submit').should('not.have.class', 'disabled');
  });
});
