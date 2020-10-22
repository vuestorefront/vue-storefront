/* eslint no-undef: 0 */
describe('multistore', () => {
  it('should use it storeView when match domain', () => {
    cy.task('setConfig', {
      defaultStoreCode: 'de',
      storeViews: {
        multistore: true,
        mapStoreUrlsFor: [
          'de',
          'it'
        ],
        de: {
          storeCode: 'de',
          url: '/de',
          elasticsearch: {
            index: 'vue_storefront_catalog' // For test purpose we use only one ES instance
          }
        },
        it: {
          storeCode: 'it',
          url: 'localhost:3000',
          elasticsearch: {
            index: 'vue_storefront_catalog' // For test purpose we use only one ES instance
          }
        }
      }
    })
    cy.visit('')
      .then(() => {
        cy.get('h1').should(($h1) => {
          expect($h1).to.contain('Cammina la passeggiata.')
        })
      })
  })
})
