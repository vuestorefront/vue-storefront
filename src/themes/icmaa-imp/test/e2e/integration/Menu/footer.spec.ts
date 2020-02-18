describe('Footer', () => {
  it('Footer should be visible', () => {
    cy.visitAsRecurringUser('/')
    cy.get('footer').should('be.visible')

    cy.get('footer .social-media').should('be.visible')
    cy.get('footer .social-media a')
      .should('have.length', 6)

    cy.get('footer .service-carrier')
      .should('be.visible')

    cy.get('footer .footer-navigation')
      .should('be.visible')
      .find('a')
      .should('have.length.gt', 0)
  })
})
