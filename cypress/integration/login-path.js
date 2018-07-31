describe('login path', () => {
  it('should login user', () => {
    cy.visit('/')
    cy.get('[data-testid=accountButton]').click()
    cy.get('[name=email]').type('test@test.com')
    cy.get('[name=password]').type('Password123')
    cy.get('#remember').check({ force: true })
    cy.get('[data-testid="errorMessage"]').should('not.exist')
  })
})
