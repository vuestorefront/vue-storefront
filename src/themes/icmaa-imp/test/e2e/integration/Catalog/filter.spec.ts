describe('Filter', () => {
  it('Select department filter', () => {
    cy.visitCategoryPage()
    cy.openFilterSidebar()

    cy.getByTestId('productsTotal').then((element) => {
      const productsTotalNumber = parseInt(element.text())

      cy.get('@sidebar').find('[data-attribute-key="department"] button')
        .clickRandomElement()

      cy.getByTestId('productsTotal').should((element) => {
        const productsTotalFiltered = parseInt(element.text())
        expect(productsTotalNumber).gt(productsTotalFiltered)
      })
    })

    cy.url().should('include', `?department=`)
  })
})
