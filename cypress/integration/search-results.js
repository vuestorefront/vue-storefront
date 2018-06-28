describe('Search results', () => {
  it('verification of the search results', () => {
    cy.visit('/')
    cy.setCookie('shop/claims/onboardingAccepted', 'test')
    indexedDB.deleteDatabase('shop')
    cy.clearLocalStorage()
    cy.get('.header > .fixed > .container > .row > .end-xs')
      .find('[aria-label="Open search panel"]')
      .click()
    cy.get('.header .container > .row .visible-xs')
      .first()
      .find('[aria-label="Open search panel"]')
      .should('be.not.be.visible')
    cy.get('#search')
      .should('be.visible')
      .type('Didi Sport Watch')

    cy.wait(200)

    cy.get('.searchpanel .product-listing .product')
      .first()
      .as('firstResult')
    cy.get('@firstResult')
      .should('be.visible')
      .find('img')
      .should(
        'have.attr',
        'src',
        'https://demo.vuestorefront.io/img/310/300/resize/w/g/wg02-bk-0.jpg'
      )
    cy.get('@firstResult')
      .find('.product-link p')
      .first()
      .should('contain', 'Didi Sport Watch')

    cy.get('.searchpanel.active')
      .find('.material-icons')
      .should('contain', 'close')
      .click()
    cy.get('.searchpanel')
      .should('not.have.class', 'active')
      .find('.product-listing')
      .should('be.not.be.visible')

    // check mobile viewport
    cy.viewport(320, 480)
    cy.get('.header > .fixed > .container > .row > .end-xs')
      .find('[aria-label="Open search panel"]')
      .should('be.not.be.visible')
    cy.get('.header .container > .row .visible-xs')
      .first()
      .find('[aria-label="Open search panel"]')
      .click()
    cy.get('#search')
      .should('be.visible')
      .type('Didi Sport Watch')

    cy.wait(200)

    cy.get('.searchpanel .product-listing .product')
      .first()
      .as('firstResult')
    cy.get('@firstResult')
      .should('be.visible')
      .find('img')
      .should(
        'have.attr',
        'src',
        'https://demo.vuestorefront.io/img/310/300/resize/w/g/wg02-bk-0.jpg'
      )
    cy.get('@firstResult')
      .find('.product-link p')
      .first()
      .should('contain', 'Didi Sport Watch')
    cy.get('.searchpanel.active')
      .find('.material-icons')
      .should('contain', 'close')
      .click()
    cy.get('.searchpanel')
      .should('not.have.class', 'active')
      .find('.product-listing')
      .should('be.not.be.visible')
  })
})
