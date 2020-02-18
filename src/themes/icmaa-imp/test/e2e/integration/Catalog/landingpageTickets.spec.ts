describe('Landingpage Tickets ', () => {
  it(`Tourposter on Tickes Landingpage`, () => {
    cy.visitAsRecurringUser('/tickets', { storeCode: 'de' })
    cy.getByTestId('Tickets')
      .should('be.visible')
      .should('have.length.greaterThan', 0)
      .findImageWithPlaceholder()
      .each(e => cy.wrap(e).checkImage())
  })
})
