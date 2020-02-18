describe('Add to And Remove from Wishlist ', () => {
  it('from ProductDetailPage', () => {
    cy.visitProductDetailPage()
    cy.getByTestId('AddToWishlistButton').click()
    cy.checkNotification('success')
    cy.scrollTo('top')
    cy.openNavigationSidebar('[data-test-id="HeaderButtonWishlist"]')
    cy.get('@sidebar').findByTestId('AddToWishlistButton').clickRandomElement()
    cy.checkNotification('success')
  })

  it('from ProductListing', () => {
    cy.visitCategoryPage()
    cy.wait(1000)
    cy.getByTestId('ProductTile').random().findByTestId('AddToWishlist').click()
    cy.checkNotification('success')
  })
})
