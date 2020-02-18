import Faker from './Faker'

class SettingsClass {
  public get availableStoreViews (): string[] {
    return Cypress.env('store_codes')
  }

  public get categoryPages (): string[] {
    return Cypress.env('category_pages')
  }

  public get randomCategoryPage (): string {
    return Faker().random.arrayElement(Cypress.env('category_pages'))
  }
}

export default new SettingsClass()
