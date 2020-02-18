import { finished } from 'stream'

describe('Homepage', () => {
  it('Check HomePage with all Elements (Fullsize-Teaser, Split-Teaser und Teaser, LogoLines, ProductListings', () => {
    cy.visitAsRecurringUser('/')
    // Fullsize-Teaser is a Image with "teaser" in img src
    cy.getByTestId('TeaserFullsize').findImageWithPlaceholder('div > img').checkImage()
    // Split-Teaser is a Image with "teaser" in img src
    cy.getByTestId('TeaserSplit').findImageWithPlaceholder().checkImage()
    // Teaser is a Image with "teaser" in img src
    cy.getByTestId('TeaserSmall').findImageWithPlaceholder().checkImage()
    // 2 LogoLineBlocks
    cy.getByTestId('LogoLineBlock').should('have.length', 2)
    // 2 LogoLines
    cy.getByTestId('LogoLine').should('have.length', 2)
    // 24 LogoItems
    cy.getByTestId('DepartmentLogo').should('have.length', 24)
    // LogoItems is a Image with "department-logos" in img src
    cy.getByTestId('DepartmentLogo').findImageWithPlaceholder().each(e => cy.wrap(e).checkImage())
    // 2 ProductListings
    cy.getByTestId('ProductListingWidget').should('have.length', 2)
    // 2x4 ProductTiles
    cy.getByTestId('ProductListingWidget').findByTestId('ProductTile').should('have.length', 8)
  })
})
