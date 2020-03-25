declare namespace Cypress {

  interface ExtVisitOptions extends VisitOptions {
    storeCode: string
  }

  interface VisitProductDetailsOptions extends ExtVisitOptions {
    categoryUrl: string
  }

  interface Customer {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    dob: string
  }

  interface Chainable<Subject> {

    /**
     * Get faker instance from alias.
     * Adds alias `customer` for further use.
     *
     * @example
     * cy.getFaker()
     */
    getFaker(): Chainable<Faker.FakerStatic>,

    /**
     * Create a customer object for current storeview and register it as alias.
     *
     *
     * @example
     * cy.createCustomerWithFaker()
     */
    createCustomerWithFaker(): Chainable<Customer>,

    /**
     * Get random element from previous element.
     *
     * @example
     * cy.random()
     */
    random(): Chainable<any>,

    /**
     * Click a random element of specific selector.
     *
     * @example
     * cy.clickRandomElement()
     */
    clickRandomElement(): Chainable<Element>,

    /**
     * Select a random option from a select.
     *
     * @example
     * cy.selectRandomOption()
     */
    selectRandomOption(skipFirst?: boolean): Chainable<Element>,

    /**
     * Click or don't click on an element.
     *
     * @example
     * cy.randomlyClickElement()
     */
    randomlyClickElement(): Chainable<Element>,

    /**
     * Get item by data-test-id attribute.
     *
     * @example
     * cy.getByTestId('Modal')
     */
    getByTestId(selector: string): Chainable<JQuery<any>>,

    /**
     * Find child items by data-test-id attribute.
     *
     * @example
     * cy.findByTestId('Modal')
     */
    findByTestId(selector: string): Chainable<JQuery<any>>,

    /**
     * Check image for visibility and dimensions.
     *
     * @example
     * cy.get('img').checkImage()
     */
    checkImage(): Chainable<any>,

    /**
     * Visit the given url.
     * Adds alias `storeCode` for further use.
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
     * Visit a page as recurring visitor.
     * Adds alias `storeCode` for further use.
     *
     * @example
     * cy.visitAsRecurringUser()
     * cy.visitAsRecurringUser('/merchandise', { storeCode: 'de' })
     */
    visitAsRecurringUser(url: string, options?: Partial<ExtVisitOptions>): Chainable<Window>,
    visitAsRecurringUser(options: Partial<ExtVisitOptions> & { url: string }): Chainable<Window>,

    /**
     * Visit a random category page as recurring visitor.
     * Adds alias `storeCode` for further use.
     * Adds alias `categoryEntryPointUrl` for further use.
     *
     * @example
     * cy.visitCategoryPage()
     * cy.visitCategoryPage({ storeCode: 'de' })
     */
    visitCategoryPage(options?: Partial<ExtVisitOptions>): Chainable<Window>,

    /**
     * Visit a random product page from random or specific category as recurring visitor.
     *
     * @example
     * cy.visitProductDetailPage()
     * cy.visitProductDetailPage({ categoryUrl: 'girls.html', storeCode: 'de' })
     */
    visitProductDetailPage(options?: Partial<VisitProductDetailsOptions>): Chainable<Window>,

    /**
     * Get entry point category path from `categoryEntryPointUrl` alias.
     *
     * @example
     * cy.getCategoryEntryPointUrl()
     */
    getCategoryEntryPointUrl(): Chainable<string>,

    /**
     * Get current string value of `storeCode` alias.
     *
     * @example
     * cy.getStoreCode()
     */
    getStoreCode(): Chainable<string>,

    /**
     * Open main navigation sidebar.
     * Adds alias `sidebar` for further use.
     *
     * @example
     * cy.openNavigationSidebar()
     * cy.openNavigationSidebar('[data-test-id="HeaderButtonWishlist"]')
     * cy.openNavigationSidebar('[data-test-id="HeaderButtonAccount"]', '[data-test-id="Modal"]')
     */
    openNavigationSidebar(triggerSelector?: string, overlaySelector?: string): Chainable<Window>,

    /**
     * Close main navigation sidebar.
     *
     * @example
     * cy.closeNavigationSidebar()
     * cy.closeNavigationSidebar('@sidebarB')
     */
    closeNavigationSidebar(alias?: string): Chainable<Window>,

    /**
     * Open filter sidebar.
     * Adds alias `sidebar` for further use.
     *
     * @example
     * cy.openFilterSidebar()
     */
    openFilterSidebar(): Chainable<Window>,

    /**
     * Register a new customer using the registration routine.
     * Adds alias `customer` for further use of customer object.
     *
     * @example
     * cy.registerCustomer()
     */
    registerCustomer(): Chainable<Window>,

    /**
     * Get current customer object from `customer` alias.
     *
     * @example
     * cy.getCustomer()
     */
    getCustomer(): Chainable<Customer>,

    /**
     * Set local storage to mark cookie-notice as accepted.
     * Adds alias `customer` for further use of customer object.
     *
     * @example
     * cy.acceptCookieNotice()
     */
    acceptCookieNotice(): Chainable<Window>,

    /**
     * Set local storage to mark language modal as clicked away.
     *
     * @example
     * cy.hideLanguageModal()
     */
    hideLanguageModal(): Chainable<Window>,

    /**
     * Check if loader is appearing and disappearing.
     *
     * @example
     * cy.waitForLoader()
     */
    waitForLoader(): Chainable<Window>,

    /**
     * Check for notification and its status and returns.
     *
     * @example
     * cy.checkNotification()
     */
    checkNotification(status: 'success' | 'error' | 'warning' | 'info'): Chainable<string>,

    /**
     * Gets browser language from window object.
     * Adds alias `browserLanguage` and `browserStoreCode` for further use.
     *
     * @example
     * cy.getBrowserLanguage()
     */
    getBrowserLanguage(): Chainable<Window>,

    /**
     * Find child image but wait for placeholder to disappear.
     *
     * @example
     * cy.findImageWithPlaceholder()
     */
    findImageWithPlaceholder(selector?: string): Chainable<any>,

    /**
     * Check availability of current product.
     * Adds alias `availability` for further use.
     * Adds alias `productType` for further use.
     *
     * @example
     * cy.checkAvailabilityOfCurrentProduct()
     */
    checkAvailabilityOfCurrentProduct(): Chainable<Window>,

    /**
     * Try to add random product to cart. Retries if product is unavailable or out-of-stock.
     * Works with simple and configurable products.
     *
     * @example
     * cy.addRandomProductToCart()
     * cy.addRandomProductToCart({ tries: 10 })
     */
    addRandomProductToCart(options?: { tries: number }, count?: number): Chainable<Window>,

    /**
     * Try to add the product you are currently viewing to cart.
     * Works with simple and configurable products.
     *
     * @example
     * cy.addCurrentProductToCart()
     * cy.addCurrentProductToCart(false)
     */
    addCurrentProductToCart(checkAvailability?: boolean): Chainable<Window>
  }
}
