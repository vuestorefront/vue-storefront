import Settings from '../../support/utils/Settings'

const { _ } = Cypress

describe('Language selector', () => {
  it('Modal popup as new user', () => {
    cy.getBrowserLanguage()

    cy.get<string[]>('@browserLanguages').then(lang => {
      const storeViews: any = Settings.availableStoreViews.filter(l => !lang.includes(l) && l !== 'uk')
      cy.visit('/', { storeCode: _.sample(storeViews) })
    })

    cy.getByTestId('Modal').should('be.visible')
    cy.getByTestId('ModalClose').click()
    cy.getByTestId('Modal').should('not.be.visible')
  })

  it('Language modal should show', () => {
    cy.visitAsRecurringUser('/')

    cy.openSidebar()
      .get('@sidebar')
      .getByTestId('SidebarMenuFooter')
      .find('svg')
      .click()

    cy.getByTestId('Modal')
      .should('be.visible')
      .find('a')
      .should('have.length.gt', 0)
  })
})
