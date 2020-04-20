describe('Customer', () => {
  it('register account, logout and login again', () => {
    cy.registerCustomer()

    cy.getByTestId('HeaderButtonAccount')
      .as('accountButton')

    cy.get('@accountButton').should('have.class', 'logged-in')

    cy.openSidebar('[data-test-id="HeaderButtonAccount"]')
    cy.get('@sidebar').findByTestId('logoutButton').click()

    cy.get('@accountButton')
      .should('have.class', 'logged-out')

    cy.openSidebar('[data-test-id="HeaderButtonAccount"]', '[data-test-id="Modal"]')

    cy.getCustomer().then(customer => {
      cy.get('@sidebar').find('input[name="email"]').type(customer.email)
      cy.get('@sidebar').find('input[name="password"]').type(customer.password)
      cy.get('@sidebar').findByTestId('loginSubmit').click()
    })

    cy.waitForLoader()
      .checkNotification('success')

    cy.get('@accountButton')
      .should('have.class', 'logged-in')
  })
})
