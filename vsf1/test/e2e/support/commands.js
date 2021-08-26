/* eslint no-undef: 0 */

Cypress.Commands.add('internalNavigation', (selector) => {
  // create random numbre which will be checked after page change
  cy.window().then(win => {
    // add random number to window object
    win.e2eInternalNavigationKey = 'test-key'
  })
  // change page by clicking link
  cy.get(selector).click()
  cy.window()
    .then(win => {
      if (!win.e2eInternalNavigationKey) {
        cy.log(`After clicking on link ${selector} page was reloaded. Please use 'router-link' or 'nuxt-link' instead of native link`)
      }
      // check if page was reloaded, if it wasn't reloaded then it should pass, because window should be still the same
      cy.wrap({ e2eInternalNavigationKey: win.e2eInternalNavigationKey }).should('have.property', 'e2eInternalNavigationKey', 'test-key')
      cy.log(`Internal page navigation was successfull`)
    })
})
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
