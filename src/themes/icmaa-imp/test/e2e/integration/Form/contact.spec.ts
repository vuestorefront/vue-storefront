import { getIcmaaEmail } from '../../support/utils/Faker'

describe('Contact', () => {
  it('Check Form', () => {
    cy.visitAsRecurringUser('/service-contact')
    cy.getByTestId('ServiceContactSelector').random().click()
      .then($selector => {
        if ($selector.find('div[data-test-id="ServiceContactChildrenSelector"]').length > 0) {
          cy.getByTestId('ServiceContactChildrenSelector').random().click()
        }
      })

    cy.getFaker().then(faker => {
      cy.get('input#name').type(faker.name.findName())
      cy.get('input#phone').type(faker.phone.phoneNumber())
      cy.get('input#email').type(getIcmaaEmail())
      cy.get('input#order_number').type(faker.random.number({ min: 100000, max: 999999 }).toString())
      cy.get('textarea#message').type('Testmessage ' + faker.random.words(35))
    })

    cy.get('#cms-page').find('button').click()
    cy.checkNotification('success')
  })
})
