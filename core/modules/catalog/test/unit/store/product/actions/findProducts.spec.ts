import { DataResolver } from '@vue-storefront/core/data-resolver/types/DataResolver';
import productActions from '@vue-storefront/core/modules/catalog/store/product/actions';
import config from 'config';
import { ProductService } from '@vue-storefront/core/data-resolver/ProductService'
import { registerProductsMapping, setRequestCacheTags } from '@vue-storefront/core/modules/catalog/helpers'

jest.mock('@vue-storefront/core/helpers', () => ({
  once: (str) => jest.fn()
}))
jest.mock('@vue-storefront/core/modules/catalog/helpers', () => ({
  registerProductsMapping: jest.fn(),
  setRequestCacheTags: jest.fn()
}))

jest.mock('@vue-storefront/core/store', () => ({
  dispatch: jest.fn(),
  state: {}
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
jest.mock('@vue-storefront/core/compatibility/plugins/event-bus', () => ({
  $emit: jest.fn()
}));
jest.mock('@vue-storefront/core/data-resolver/ProductService', () => ({
  ProductService: {
    getProducts: jest.fn(),
    getProductRenderList: jest.fn(),
    getProductByKey: jest.fn()
  }
}));
jest.mock('config', () => ({}));
jest.mock('@vue-storefront/core/modules/catalog/events', () => ({
  checkParentRedirection: (str) => jest.fn()
}))

describe('product/findProducts action', () => {
  let contextMock
  let items
  beforeEach(() => {
    jest.clearAllMocks()
    contextMock = {
      dispatch: jest.fn(() => ({}))
    }
    items = [{ url_path: 'dsada', sku: 'dsad' }]
    config.cart = {
      setConfigurableProductOptions: true
    }
    config.products = {
      filterUnavailableVariants: false
    }
    ;(ProductService.getProducts as jest.Mock).mockImplementation(async () => ({ items }));
  })
  it('should trigger ProductService.getProducts with default values', async () => {
    const wrapper = (actions: any) => actions.findProducts(contextMock)

    await wrapper(productActions)

    expect(ProductService.getProducts).toHaveBeenNthCalledWith(1, {
      query: undefined,
      start: 0,
      size: 50,
      sort: '',
      excludeFields: null,
      includeFields: null,
      configuration: null,
      options: {
        prefetchGroupProducts: true,
        setProductErrors: false,
        fallbackToDefaultWhenNoAvailable: true,
        assignProductConfiguration: false,
        separateSelectedVariant: false,
        setConfigurableProductOptions: true,
        filterUnavailableVariants: false
      }
    })
  })

  it('should trigger ProductService.getProducts with provided values', async () => {
    const wrapper = (actions: any) => actions.findProducts(contextMock, {
      query: { test: 'test' },
      start: 123,
      size: 1221,
      sort: 'test',
      excludeFields: ['test'],
      includeFields: ['test'],
      configuration: { test: 'test' },
      populateRequestCacheTags: true,
      options: {
        populateRequestCacheTags: true,
        prefetchGroupProducts: false,
        setProductErrors: true,
        fallbackToDefaultWhenNoAvailable: false,
        assignProductConfiguration: true,
        separateSelectedVariant: true,
        setConfigurableProductOptions: false,
        filterUnavailableVariants: false
      }
    })

    await wrapper(productActions)

    expect(ProductService.getProducts).toHaveBeenNthCalledWith(1, {
      query: { test: 'test' },
      start: 123,
      size: 1221,
      sort: 'test',
      excludeFields: ['test'],
      includeFields: ['test'],
      configuration: { test: 'test' },
      options: {
        prefetchGroupProducts: false,
        setProductErrors: true,
        fallbackToDefaultWhenNoAvailable: false,
        assignProductConfiguration: true,
        separateSelectedVariant: true,
        setConfigurableProductOptions: false,
        filterUnavailableVariants: false
      }
    })
  })
  it('should register mapping for products returned from ProductService.getProducts', async () => {
    const wrapper = (actions: any) => actions.findProducts(contextMock)

    await wrapper(productActions)

    expect(registerProductsMapping).toHaveBeenNthCalledWith(1, contextMock, items)
  })
  it('should not set cache tags if populateRequestCacheTags or options.populateRequestCacheTags is false', async () => {
    const wrapper = (actions: any) => actions.findProducts(contextMock)

    await wrapper(productActions)

    expect(setRequestCacheTags).toHaveBeenCalledTimes(0)
  })
  it('should set cache tags if populateRequestCacheTags is true', async () => {
    const wrapper = (actions: any) => actions.findProducts(contextMock, { populateRequestCacheTags: true })

    await wrapper(productActions)

    expect(setRequestCacheTags).toHaveBeenNthCalledWith(1, { products: items })
  })
  it('should set cache tags if options.populateRequestCacheTags is true', async () => {
    const wrapper = (actions: any) => actions.findProducts(contextMock, { options: { populateRequestCacheTags: true } })

    await wrapper(productActions)

    expect(setRequestCacheTags).toHaveBeenNthCalledWith(1, { products: items })
  })
  it('should mutatate prices by triggering tax/calculateTaxes', async () => {
    const wrapper = (actions: any) => actions.findProducts(contextMock)

    await wrapper(productActions)

    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'tax/calculateTaxes', { products: items }, { root: true })
  })
  it('should return items and rest response data as one object', async () => {
    ;(ProductService.getProducts as jest.Mock).mockImplementation(async () => ({
      items,
      perPage: 1,
      start: 2,
      total: 3,
      aggregations: [],
      attributeMetadata: []
    }));

    const wrapper = (actions: any) => actions.findProducts(contextMock)

    const result: DataResolver.ProductsListResponse = await wrapper(productActions)

    expect(result).toStrictEqual({
      items,
      perPage: 1,
      start: 2,
      total: 3,
      aggregations: [],
      attributeMetadata: []
    })
  })
})
