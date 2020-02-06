declare namespace Cypress {

  interface ExtVisitOptions extends VisitOptions {
    storeCode: string
  }

  interface Chainable<Subject> {

    /**
   * Get random element from previous element
   * @example
   * cy.random()
   */
    random(): Chainable<any>,

    /**
     * Click a random element of specific selector
     * @example
     * cy.clickRandomElement()
     */
    clickRandomElement(skipFirst: boolean): Chainable<any>,

    /**
     * Visit the given url
     *
     * @param {string} url The URL to visit. If relative uses `baseUrl`
     * @param {VisitOptions} [options] Pass in an options object to change the default behavior of `cy.visit()`
     * @see https://on.cypress.io/visit
     * @example
     *    cy.visit('http://localhost:3000')
     *    cy.visit('/somewhere') // opens ${baseUrl}/somewhere
     *    cy.visit({
     *      url: 'http://google.com',
     *      method: 'POST'
     *    })
     *
     */
    visit(url: string, options?: Partial<ExtVisitOptions>): Chainable<Window>,
    visit(options: Partial<ExtVisitOptions> & { url: string }): Chainable<Window>,

    /**
     * Visit a page as recurring visitor
     *
     * @example
     * cy.visitAsRecurringUser()
     * cy.visitAsRecurringUser('/merchandise', { storeCode: 'de' })
     */
    visitAsRecurringUser(url: string, options?: Partial<ExtVisitOptions>): Chainable<Window>,
    visitAsRecurringUser(options: Partial<ExtVisitOptions> & { url: string }): Chainable<Window>
  }
}
