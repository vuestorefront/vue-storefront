describe('Menu sidebar', () => {
  it('Sidebar should be visible and contain links', () => {
    cy.visitAsRecurringUser('/')
    cy.openNavigationSidebar()

    cy.get('@sidebar')
      .find('a')
      .should('have.length.gt', 0)

    cy.get('@sidebar')
      .find('a')
      .random()
      .as('link')
      .should('have.attr', 'href')
      .then(href => {
        cy.get('@link').click()
        cy.location('pathname').should('be.eq', href)
      })
  })
})
