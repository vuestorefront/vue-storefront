/* eslint no-undef: 0 */
describe('add to cart', () => {
  it('verify that the configurable product is added to cart', () => {
    cy.visit('/p/WS01/gwyn-endurance-tee-1577/WS01')
    indexedDB.deleteDatabase('shop')
    indexedDB.deleteDatabase('carts')
    cy.clearLocalStorage()
    cy.get('.color[aria-label="Select color Green"]').click()
    cy.get('.color[aria-label="Select color Green"]').click()
    cy.get('[aria-label="Select size L"]').click()
    cy.get('[data-testid=addToCart]').click()
    cy.get('[data-testid=notificationMessage]').should(
      'contain',
      'Product has been added to the cart!'
    )
    cy.get('header [aria-label="Open microcart"]').click({ force: true })
    cy.get('div.microcart ul li:nth-child(1) .sku').should('contain', 'WS01-L-Green')
    cy.get('div.microcart button.close').click()
  })

  it('verify that the bundle product is added to cart', () => {
    cy.visit('/p/24-WG080/sprite-yoga-companion-kit-45')
    indexedDB.deleteDatabase('shop')
    indexedDB.deleteDatabase('carts')
    cy.clearLocalStorage()
    cy.get('#bundleOption_2').click({ force: true })
    cy.get('#bundleOptionQty_1').type('{backspace}2')
    cy.get('#bundleOption_6').click({ force: true })
    cy.get('#bundleOptionQty_4').type('{backspace}3')
    cy.get('[data-testid=addToCart]').click()
    cy.get('[data-testid=notificationMessage]').should(
      'contain',
      'Product has been added to the cart!'
    )
    cy.get('header [aria-label="Open microcart"]').click({ force: true })
    cy.get('div.microcart ul li:nth-child(1) .price-regular').should('contain', '163.59')
    cy.get('div.microcart button.close').click()
  })
})
