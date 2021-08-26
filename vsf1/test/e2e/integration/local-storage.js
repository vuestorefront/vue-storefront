/* eslint no-undef: 0 */
describe('local-storage', () => {
  it('Items added to the cart should be kept.', () => {
    cy.visit('p/WS11/diva-gym-tee-1545/WS11')
    cy.wait(1000)
    cy.get('[aria-label="Select color Yellow"]').click().should('have.class', 'active')
    cy.get('[aria-label="Select size S"]').click()
    cy.get('[data-testid=variantsLabel]').first().contains('Yellow')
    cy.get('[data-testid=variantsLabel]').last().contains('S')
    cy.get('[data-testid=addToCart]').click()
    cy.get('[data-testid=notificationMessage]').contains(
      'Product has been added to the cart!')
    cy.get('[data-testid=openMicrocart]').click({ force: true })
    cy.get('[data-testid=microcart]').should('be.visible')
    cy.reload().wait(500)
    cy.get('[data-testid=openMicrocart]').click({ force: true })
    cy.get('[data-testid=productSku]').contains('WS11-S-Yellow')
    cy.get('input[type=number]').should('have.value', '1');
    cy.get('.col-xs > .actions > :nth-child(1)').click()
    cy.get('#input_164').clear({ force: true }).type(2).blur()
    cy.get('.pb15 > [data-testid=subscribeSubmit]').click()
    cy.wait(500)
    cy.reload()
    cy.get('[data-testid=openMicrocart]').click({ force: true })
    cy.get('input[type=number]').should('have.value', '2');
    cy.get('[data-testid=closeMicrocart]').click()
    cy.get('[data-testid=minicartCount]').contains('2')
  })
})
