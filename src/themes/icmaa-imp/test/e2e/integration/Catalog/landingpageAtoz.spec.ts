import sample from 'lodash-es/sample'

describe('Landingpage A to Z ', () => {
  const urls = ['/merchandise', '/streetwear']
  const url = sample(urls)

  it(`Teaser, Logoline and Productlistings should be visible on ${url}`, () => {
    cy.visitAsRecurringUser(url)

    cy.getByTestId('TeaserSmall')
      .should('have.length.gt', 0)
      .findImageWithPlaceholder()
      .each(e => cy.wrap(e).checkImage())

    cy.getByTestId('DepartmentLogo').find('img').each(e => cy.wrap(e).checkImage())

    cy.get('ul.slingrope').find('li a').random().click()
    cy.get('ul.letters').find('li a').random().click()
  })
})
