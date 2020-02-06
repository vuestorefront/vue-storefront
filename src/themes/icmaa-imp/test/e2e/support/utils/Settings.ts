class SettingsClass {
  public get currentStoreView (): string {
    return Cypress.env('current_store_codes')
  }

  public set currentStoreView (storeView: string) {
    Cypress.env('current_store_codes', storeView)
  }

  public get availableStoreViews (): string[] {
    return Cypress.env('store_codes')
  }
}

export default new SettingsClass()
