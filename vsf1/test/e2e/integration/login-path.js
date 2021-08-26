/* eslint no-undef: 0 */
describe('login path', () => {
  it('not existing user', () => {
    cy.visit('/')
    cy.get('[data-testid=accountButton]').click()
    cy.get('[name=email]').type('test@false')
    cy.get('[name=password]').type('Password123')
    cy.get('#remember').check({ force: true })
    cy.get('[data-testid="errorMessage"]').should('exist').contains(
      'Please provide valid e-mail address.')
    cy.get('[data-testid=loginSubmit]').click()
    cy.get(`[data-testid=notificationMessage]`).should('exist').contains(
      'Please fix the validation errors')
  })
  it('successfull login', () => {
    cy.visit('/')
    cy.get('[data-testid=accountButton]').click()
    cy.get('[name=email]').type('test@vue.co')
    cy.get('[name=password]').type('Password123')
    cy.get('#remember').check({ force: true })
    cy.get('[data-testid="errorMessage"]').should('not.exist')
    cy.get('[data-testid=loginSubmit]').click()
    cy.get(`[data-testid=notificationMessage]`).should('exist').contains(
      'You are logged in!')
  })
})
