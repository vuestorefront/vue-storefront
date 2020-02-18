import { getIcmaaEmail } from '../../support/utils/Faker'

describe('Newsletter', () => {
  it('Subscribe', () => {
    cy.visitAsRecurringUser('/')
    cy.getByTestId('Newsletter').find('div > input').click()
    cy.getByTestId('Modal').find('input').type(getIcmaaEmail())
    cy.getByTestId('Modal').find('button[type="submit"]').click()
    cy.checkNotification('success')
  })
})
