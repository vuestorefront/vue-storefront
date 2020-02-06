describe('Homepage', () => {
  it('Teaser should be visible in two blocks on homepage', () => {
    cy.visit('/')
    cy.get('#home #teaser').should('have.length', 2)
  })

  it('Visit next page without cookie notice', () => {
    cy.visitAsRecurringUser('/merchandise')
  })
})
