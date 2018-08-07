describe('Search results', () => {
  it('verification of the search results', () => {
    cy.visit('/')
    cy.get('[data-testid=openSearchPanel]').first().should('not.be.visible')
    cy.get('[data-testid=openSearchPanel]').last().click()
    cy.get('#search').should('be.visible').type('Didi Sport Watch')
    cy.wait(200)
    cy.get('[data-testid=searchPanel] [data-testid=productLink]').first().as('firstResult')
    cy.get('@firstResult')
      .should('be.visible')
      .find('[data-testid=productImage]')
      .should(
        'have.attr',
        'src',
        'https://demo.vuestorefront.io/img/310/300/resize/w/g/wg02-bk-0.jpg'
      )
    cy.get('@firstResult').contains('Didi Sport Watch')
    cy.get('#search').clear()
    cy.get('[data-testid=closeSearchPanel]').click()
    cy.get('[data-testid=searchPanel]').should('not.be.visible')

    // check mobile viewport
    cy.viewport(320, 480)
    cy.get('[data-testid=openSearchPanel]').last().should('not.be.visible')
    cy.get('[data-testid=openSearchPanel]').first().click()
    cy.get('#search').should('be.visible').type('Didi Sport Watch')
    cy.wait(200)
    cy.get('[data-testid=searchPanel] [data-testid=productLink]').first().as('firstResult')
    cy.get('@firstResult')
      .should('be.visible')
      .find('[data-testid=productImage]')
      .should(
        'have.attr',
        'src',
        'https://demo.vuestorefront.io/img/310/300/resize/w/g/wg02-bk-0.jpg'
      )
    cy.get('@firstResult').contains('Didi Sport Watch')
    cy.get('[data-testid=closeSearchPanel]').click()
    cy.get('[data-testid=searchPanel]').should('not.be.visible')
  })
})
