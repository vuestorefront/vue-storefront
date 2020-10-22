/* eslint no-undef: 0 */
describe('setConfig', () => {
  it('should resolve homepage after config is changed', () => {
    cy.task('setConfig', {
      storeViews: {
        multistore: false, // disable multistore
        mapStoreUrlsFor: [
          'de',
          'it'
        ],
        de: {
          storeCode: 'de',
          appendStoreCode: true,
          elasticsearch: {
            index: 'vue_storefront_catalog'
          }
        }
      }
    })
    cy.visit('de', { failOnStatusCode: false })
      .then(() => {
        cy.get('h1').should(($h1) => {
          expect($h1).to.not.contain('Neue Wege beschreiten.')
        })
        cy.task('setConfig', {
          storeViews: {
            multistore: true, // enable multistore
            mapStoreUrlsFor: [
              'de',
              'it'
            ],
            de: {
              storeCode: 'de',
              appendStoreCode: true,
              elasticsearch: {
                index: 'vue_storefront_catalog'
              }
            }
          }
        })
        cy.visit('de')
          .then(() => {
            cy.get('h1').should(($h1) => {
              expect($h1).to.contain('Neue Wege beschreiten.')
            })
            // cy.task('setConfig', {})
          })
      })
  })
})
