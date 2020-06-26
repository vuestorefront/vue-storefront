import productActions from '@vue-storefront/core/modules/catalog/store/product/actions';

jest.mock('@vue-storefront/core/helpers', () => ({
  once: (str) => jest.fn()
}))
jest.mock('@vue-storefront/core/store', () => ({
  dispatch: jest.fn()
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
jest.mock('@vue-storefront/core/modules/catalog/events', () => ({
  checkParentRedirection: (str) => jest.fn()
}))

describe('product/getProductVariant action', () => {
  let contextMock
  beforeEach(() => {
    jest.clearAllMocks()
    contextMock = {
      dispatch: jest.fn(() => ({ items: ['test'] })),
      commit: jest.fn(() => ({}))
    }
  })
  it('should throw error if no arguments is provided', async () => {
    const wrapper = (actions: any) => actions.getProductVariant(contextMock)
    await expect(wrapper(productActions)).rejects.toThrow(expect.anything())
  })
  it('should throw error if product doesn\'t have parentSku', async () => {
    const wrapper = (actions: any) => actions.getProductVariant(contextMock, { product: { sku: 'sku' } })
    await expect(wrapper(productActions)).rejects.toThrow(expect.anything())
  })

  it('should dispatch findProducts', async () => {
    const wrapper = (actions: any) => actions.getProductVariant(contextMock, { product: { parentSku: 'sku' } })

    await wrapper(productActions)

    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'findProducts', {
      query: expect.anything(),
      size: 1,
      configuration: undefined,
      options: {
        fallbackToDefaultWhenNoAvailable: false,
        setProductErrors: true,
        separateSelectedVariant: true
      }
    })
  })

  it('should return options and product_option beside variant data', async () => {
    contextMock = {
      dispatch: jest.fn(() => ({ items: [{ sku: 'sku', options: ['test'], product_option: ['test2'] }] }))
    }
    const wrapper = (actions: any) => actions.getProductVariant(contextMock, { product: { parentSku: 'sku' } })

    const result = await wrapper(productActions)

    expect(result.options).toStrictEqual(['test'])
    expect(result.product_option).toStrictEqual(['test2'])
  })
})
