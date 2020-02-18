describe('Cookie-Notice', () => {
  it('should be visible for new user', () => {
    cy.hideLanguageModal()
      .visit('/')

    cy.getByTestId('CookieNotification')
      .should('be.visible')
      .find('button').first().click()

    cy.getByTestId('CookieNotification')
      .should('not.be.visible')
  })
})
