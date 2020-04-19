describe('Menu sidebar footer', () => {
  it('Footer navigation in menu sidebar', () => {
    cy.visitAsRecurringUser('/')
    cy.openSidebar()

    cy.get('@sidebar')
      .find('[data-test-id="SidebarMenuFooter"]')
      .should('be.visible')
      .find('a:not([rel*="noopener"])')
      .random()
      .as('link')
      .should('have.attr', 'href')
      .then(href => {
        cy.get('@link').click()
      })
  })
})
