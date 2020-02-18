interface PriceDTO {
  price: string,
  originalPrice: boolean|string
}

const stripPrice = (price: string): string => {
  const regex = /^([a-zA-Z\s]*)/g
  return price.replace(regex, '').trim()
}

const collectPriceFromDOM = ($parent: JQuery<HTMLElement>): PriceDTO => {
  const $specialPrice = $parent.find('.price-special')
  const $originalPrice = $parent.find('.price-original')
  const $regularPrice = $parent.find('.price')

  let priceDTO: PriceDTO = { price: '', originalPrice: false }

  if ($specialPrice.length) {
    priceDTO.price = stripPrice($specialPrice.text())
    priceDTO.originalPrice = stripPrice($originalPrice.text())
  } else {
    priceDTO.price = stripPrice($regularPrice.text())
  }

  return priceDTO
}

const findProductInStock = (run: number = 1, tries: number = 3) => {
  if (run > tries) {
    expect(true).to.be.equal(false, 'No buyable products found')
  } else {
    cy.log(`Try to find product which is in stock ${run}/${tries}`)
  }

  cy.visitCategoryPage()
  cy.getByTestId('ProductTile')
    .random()
    .then($product => {
      cy.wrap<PriceDTO>(collectPriceFromDOM($product)).as('listPrice')
      cy.wrap($product)
    })
    .click()

  cy.checkAvailabilityOfCurrentProduct()
  cy.get<boolean>('@availability')
    .then(available => {
      if (!available) {
        findProductInStock(run + 1)
      }
    })
}

describe('Price', () => {
  it('Follow product and check price', () => {
    findProductInStock()

    cy.getByTestId('price').then($price => {
      cy.wrap<PriceDTO>(collectPriceFromDOM($price)).as('detailsPrice')
    })

    cy.get<PriceDTO>('@listPrice').then(listPrice => {
      cy.get<PriceDTO>('@detailsPrice').its('price').should('eq', listPrice.price)
      cy.get<PriceDTO>('@detailsPrice').its('originalPrice').should('eq', listPrice.originalPrice)

      cy.get<PriceDTO>('@detailsPrice').then(detailsPrice => {
        expect(detailsPrice).to.deep.equal(listPrice)
      })
    })

    cy.addCurrentProductToCart(false)
    // @todo: Check price in cart
  })
})
