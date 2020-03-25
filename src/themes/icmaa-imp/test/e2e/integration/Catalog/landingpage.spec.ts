describe('Productlisting', () => {
  it('Teaser, Productlistings should be visible on CategoryPages', () => {
    cy.visitCategoryPage()

    cy.getByTestId('TeaserSmall')
      .should('have.length.gt', 0)
      .findImageWithPlaceholder()
      .each(e => cy.wrap(e).checkImage())

    cy.getByTestId('ProductListing')
      .findImageWithPlaceholder()
      .each(e => cy.wrap(e).scrollIntoView().checkImage())
  })
})
