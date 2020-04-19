describe('Filter', () => {
  it('Select department filter', () => {
    cy.visitCategoryPage()

    cy.getByTestId('productsTotal').then((element) => {
      const productsTotalNumber = parseInt(element.text())

      cy.openFilterSidebar()
      cy.get('@sidebar').find('[data-attribute-key="department"] button')
        .clickRandomElement()

      cy.url().should('include', `?department=`)

      cy.closeSidebar()

      cy.getByTestId('productsTotal').should((element) => {
        const productsTotalFiltered = parseInt(element.text())
        expect(productsTotalFiltered).lte(productsTotalNumber)
      })
    })
  })
})
