import productActions from '@vue-storefront/core/modules/catalog/store/product/actions';
import config from 'config';
import * as mutationTypes from '@vue-storefront/core/modules/catalog/store/product/mutation-types'

jest.mock('@vue-storefront/core/helpers', () => ({
  once: (str) => jest.fn()
}))
jest.mock('@vue-storefront/core/store', () => ({
  dispatch: jest.fn(),
  commit: jest.fn()
}));
jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    log: jest.fn(() => () => {}),
    debug: jest.fn(() => () => {}),
    warn: jest.fn(() => () => {}),
    error: jest.fn(() => () => {}),
    info: jest.fn(() => () => {})
  }
}));
jest.mock('config', () => ({}));

describe('product/setCurrent action', () => {
  let contextMock
  let product
  beforeEach(() => {
    jest.clearAllMocks()
    contextMock = {
      dispatch: jest.fn(() => ({})),
      commit: jest.fn(() => ({}))
    }
    config.products = {
      gallery: {
        mergeConfigurableChildren: false
      }
    }
    product = {
      sku: 'sku',
      configuration: { color: 42 }
    }
  })
  it('should return if no product provided', async () => {
    const wrapper = (actions: any) => actions.setCurrent(contextMock)
    await wrapper(productActions)
    expect(contextMock.dispatch).toBeCalledTimes(0)
    expect(contextMock.commit).toBeCalledTimes(0)
  })
  it('should commit product data and configuration', async () => {
    const wrapper = (actions: any) => actions.setCurrent(contextMock, product)
    await wrapper(productActions)
    expect(contextMock.commit).toHaveBeenNthCalledWith(1, mutationTypes.PRODUCT_SET_CURRENT_CONFIGURATION, { color: 42 })
    expect(contextMock.commit).toHaveBeenNthCalledWith(2, mutationTypes.PRODUCT_SET_CURRENT, { sku: 'sku' })
  })
  it('should call setProductGallery if mergeConfigurableChildren is set false', async () => {
    const wrapper = (actions: any) => actions.setCurrent(contextMock, product)
    await wrapper(productActions)
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'setProductGallery', { product: { sku: 'sku' } })
  })
  it('should not call setProductGallery if mergeConfigurableChildren is set true', async () => {
    config.products = {
      gallery: {
        mergeConfigurableChildren: true
      }
    }
    const wrapper = (actions: any) => actions.setCurrent(contextMock, product)
    await wrapper(productActions)
    expect(contextMock.dispatch).toHaveBeenCalledTimes(0)
  })
})
