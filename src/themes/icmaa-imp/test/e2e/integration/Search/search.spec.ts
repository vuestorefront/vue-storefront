describe('Search and SearchAliases', () => {
  it('Search Pants and his Alias Hosen', () => {
    cy.visitAsRecurringUser('/', { storeCode: 'de' })

    cy.openNavigationSidebar('[data-test-id="SearchInput"]')
    cy.get('@sidebar').find('input').as('searchInput')
      .type('Pants')

    cy.get('@sidebar')
      .findByTestId('ProductTile')
      .as('target')

    cy.get('@target')
      .then(listing => {
        const countTarget = Cypress.$(listing).length

        cy.get('@searchInput').clear().type('Hosen')
        cy.get('@sidebar').findByTestId('ProductTile').as('alias')

        cy.get('@alias')
          .then(listing => {
            const countAlias = Cypress.$(listing).length
            expect(countAlias).to.eql(countTarget)
          })
      })
  })
})
