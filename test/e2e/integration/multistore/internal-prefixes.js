/* eslint no-undef: 0 */
describe('multistore', () => {
  it('should use it storeView when match domain', () => {
    cy.task('setConfig', {
      defaultStoreCode: 'de',
      storeViews: {
        multistore: true,
        mapStoreUrlsFor: [
          'german',
          'italian'
        ],
        german: {
          storeCode: 'de',
          url: '/german-store',
          elasticsearch: {
            index: 'vue_storefront_catalog' // For test purpose we use only one ES instance
          }
        },
        italian: {
          storeCode: 'it',
          url: '/italian-store',
          elasticsearch: {
            index: 'vue_storefront_catalog' // For test purpose we use only one ES instance
          }
        }
      }
    })
    cy.visit('/german-store')
      .then(() => {
        cy.get('h1').should(($h1) => {
          expect($h1).to.contain('Neue Wege beschreiten.')
        })
        cy.visit('/italian-store')
          .then(() => {
            cy.get('h1').should(($h1) => {
              expect($h1).to.contain('Cammina la passeggiata.')
            })
          })
      })
  })
})
