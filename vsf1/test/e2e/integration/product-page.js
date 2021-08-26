/* eslint no-undef: 0 */
describe('product page', () => {
  it('should verify that all information are visible', () => {
    cy.visit('/p/WS01/gwyn-endurance-tee-1577/WS01')
    cy.get('[data-testid=productName]').contains('Gwyn Endurance Tee').wait(1000)
    cy.get('.product-image__thumb').eq(1).should(
      'have.attr',
      'src',
      'https://next.storefrontcloud.io/img/600/744/resize/w/s/ws01-black_main.jpg'
    )
    cy.get('[aria-label="Select color Green"]')
      .click()
      .should('have.class', 'active')
    cy.get('[data-testid=variantsLabel]').first().contains('Green')
    cy.get('[aria-label="Select color Yellow"]')
      .click()
      .should('have.class', 'active')
    cy.get('[data-testid=variantsLabel]').first().contains('Yellow')
    cy.get('[aria-label="Select size M"]')
      .click()
      .should('have.class', 'active')
    cy.get('[data-testid=variantsLabel]').last().contains('M')
    cy.get('[aria-label="Select size L"]')
      .click()
      .should('have.class', 'active')
    cy.get('[data-testid=variantsLabel]').last().contains('L')
  })

  it('should add and remove product from wishlist', () => {
    cy.get('[data-testid=addToWishlist]').first().click()
    cy.get('[data-testid=notificationMessage]').contains(
      'Product Gwyn Endurance Tee has been added to wishlist!'
    )
    cy.get('[data-testid=notificationAction1]').click()
    cy.get('[data-testid=addToWishlist]').first().click()
    cy.get('[data-testid=notificationMessage]').contains(
      'Product Gwyn Endurance Tee has been removed from wishlist!'
    )
    cy.get('[data-testid=notificationAction1]').click()
  })

  it('should add and remove product from compare', () => {
    cy.get('[data-testid=addToCompare]').first().click()
    cy.get('[data-testid=notificationMessage]').contains(
      'Product Gwyn Endurance Tee has been added to the compare!'
    )
    cy.get('[data-testid=notificationAction1]').click()
    cy.get('[data-testid=addToCompare]').first().click()
    cy.get('[data-testid=notificationMessage]').contains(
      'Product Gwyn Endurance Tee has been removed from compare!'
    )
    cy.get('[data-testid=notificationAction1]').click()
  })

  it('should add product to cart', () => {
    cy.get('[data-testid=addToCart]').click()
    cy.wait(500)
    cy.get('[data-testid=notificationMessage]').contains(
      'Product has been added to the cart!'
    )
    cy.get('[data-testid=notificationAction1]').click()
    cy.get('[data-testid=openMicrocart]').click({ force: true })
    cy.get('[data-testid=microcart').contains('Gwyn Endurance Tee')
  })
})
