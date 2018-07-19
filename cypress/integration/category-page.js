describe('Category page', () => {
  it('verification of filters in the Women category', () => {
    cy.visit('/')
    cy.setCookie('shop/claims/onboardingAccepted', 'test')
    indexedDB.deleteDatabase('shop')
    cy.clearLocalStorage()
    cy.get('[data-testid=menuButton]').click()
    cy.get('[data-testid=categoryButton]').contains('Women').click()
    cy.get('[data-testid=categoryLink][href="/c/women-20"]').click()
    cy.url().should('include', '/c/women-20')
    cy.get('[aria-label="Select color Red"]').click().should('have.class', 'active')
    cy.wait(500)
    cy.get('[data-testid=productImage]').first().should(
      'have.attr',
      'src',
      'https://demo.vuestorefront.io/img/310/300/resize/w/s/ws08-red_main.jpg'
    )
    cy.get('[aria-label="Select size S"]').click().contains('S')
    cy.get('[aria-label="Select size 30"]').click().should('have.class', 'active')
    cy.get('[aria-label="Select size XL"]').click().contains('XL')
    cy.get('[data-testid=productImage]').should('have.length', 17)
    cy.get('[label="< $50"] > .price-selector').click().should('have.class', 'active')
    cy.get('[label="> $150"] > .price-selector').click().should('have.class', 'active')
    cy.get('[data-testid=noProductsInfo]').contains('No products found!')
    cy.get('[label="> $150"] > .price-selector').click()
    cy.get('[data-testid=noProductsInfo]').should('not.exist')
  })
})
