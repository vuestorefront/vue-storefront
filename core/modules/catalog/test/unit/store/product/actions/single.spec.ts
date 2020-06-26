import productActions from '@vue-storefront/core/modules/catalog/store/product/actions';
import config from 'config';
import { ProductService } from '@vue-storefront/core/data-resolver/ProductService'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

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
  $emit: jest.fn(),
  $emitFilter: jest.fn()
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

describe('product/single action', () => {
  let contextMock
  let product
  let options
  beforeEach(() => {
    jest.clearAllMocks()
    contextMock = {
      dispatch: jest.fn(() => ({}))
    }
    options = { sku: 'sku' }
    product = [{ url_path: 'dsada', sku: 'dsad' }]
    config.cart = {
      setConfigurableProductOptions: true
    }
    config.products = {
      filterUnavailableVariants: false
    }
    ;(ProductService.getProductByKey as jest.Mock).mockImplementation(async () => product);
  })
  it('should throw error if there is no option value based on key', async () => {
    const wrapper = (actions: any) => actions.single(contextMock)

    await expect(wrapper(productActions)).rejects.toThrow('Please provide the search key sku for product/single action!')
  })
  it('should trigger ProductService.getProductByKey with default values', async () => {
    const wrapper = (actions: any) => actions.single(contextMock, { options })
    await wrapper(productActions)
    expect(ProductService.getProductByKey).toHaveBeenCalledWith({
      options: { sku: 'sku' },
      key: 'sku',
      skipCache: false
    })
  })
  it('should mutatate prices by triggering tax/calculateTaxes', async () => {
    const wrapper = (actions: any) => actions.single(contextMock, { options })

    await wrapper(productActions)

    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'tax/calculateTaxes', { products: [product] }, { root: true })
  })
  it('should set current product', async () => {
    const wrapper = (actions: any) => actions.single(contextMock, { options, setCurrentProduct: true })

    await wrapper(productActions)

    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'setCurrent', product)
  })
  it('should emit "product-after-single" event', async () => {
    const wrapper = (actions: any) => actions.single(contextMock, { options })

    await wrapper(productActions)

    expect(EventBus.$emitFilter).toHaveBeenCalledWith('product-after-single', expect.anything())
  })
})
