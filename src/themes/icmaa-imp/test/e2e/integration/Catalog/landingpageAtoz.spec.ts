const urls = ['/merchandise', '/streetwear', '/entertainment']

describe('Landingpage AtoZ ', () => {
  urls.forEach(url => {
    it(`Teaser, Logoline and Productlistings should be visible on ${url}`, () => {
      cy.visitAsRecurringUser(url)
      cy.getByTestId('DepartmentLogo').find('img').each(e => cy.wrap(e).checkImage())
      cy.get('ul.slingrope').find('li a').random().click()
      cy.get('ul.letters').find('li a').random().click()
    })
  })
})
