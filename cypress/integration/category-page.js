/* eslint no-undef: 0 */
describe('Category page', () => {
  it('verification of filters in the Women category', () => {
    cy.visit('/')
    cy.get('.modal-close').click()
    indexedDB.deleteDatabase('shop')
    cy.clearLocalStorage()
    cy.get('[aria-label="Open menu"]').click()
    cy.get('.sidebar-menu')
      .should('be.visible')
      .should('have.class', 'active')
    cy.get('.col-xs-12 > .m0 > :nth-child(2) > :nth-child(1)').click()
    cy.get('[style="z-index: 1;"] > :nth-child(1) > .px25')
      .click()
      .should('contain', 'View all')
    cy.url().should('include', '/c/women-20')
    cy.get('.sidebar > h4').should('contain', 'Filter')
    cy.get('.sidebar > :nth-child(2) > :nth-child(2) > button:nth-child(3)')
      .click()
      .should('have.class', 'active')
    cy.get(
      ':nth-child(1) > .product > .no-underline > .product-image > img'
    ).should(
      'have.attr',
      'src',
      'https://demo.vuestorefront.io/img/310/300/resize/w/s/wsh12-red_main.jpg'
    )
    cy.get(
      ':nth-child(4) > .product > .no-underline > .product-image > img'
    ).should(
      'have.attr',
      'src',
      'https://demo.vuestorefront.io/img/310/300/resize/w/s/wsh01-red_main.jpg'
    )
    cy.get('.sidebar > :nth-child(3) > div').should('be.visible')
    cy.get('[aria-label="Select size S"]')
      .click()
      .should('contain', 'S')
    cy.get('[aria-label="Select size 30"]')
      .click()
      .should('have.class', 'active')
    cy.get('[aria-label="Select size XL"]')
      .click()
      .should('contain', 'XL')
    cy.get('.sidebar > :nth-child(4)').should('be.visible')
    cy.get('.products-list > div > div').should('have.length', 17)
    cy.get('[label="< $50"]>.relative')
      .click()
      .should('have.class', 'active')
    cy.get('[label="> $150"]>.relative')
      .click()
      .should('have.class', 'active')
    cy.get('.hidden-xs > h4').should('contain', 'No products found!')
    cy.get('[label="> $150"]>.relative').click()
    cy.get('.hidden-xs > h4').should('be.not.be.visible')
  })
})
