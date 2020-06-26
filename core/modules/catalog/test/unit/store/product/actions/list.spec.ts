import productActions from '@vue-storefront/core/modules/catalog/store/product/actions';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import * as mutationTypes from '@vue-storefront/core/modules/catalog/store/product/mutation-types'

jest.mock('@vue-storefront/core/helpers', () => ({
  once: (str) => jest.fn()
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
jest.mock('config', () => ({}));
jest.mock('@vue-storefront/core/modules/catalog/events', () => ({
  checkParentRedirection: (str) => jest.fn()
}))

describe('product/list action', () => {
  it('should dispatch findProducts with default values for list', async () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn(() => ({ items: ['test'] }))
    }
    const wrapper = (actions: any) => actions.list(contextMock)

    await wrapper(productActions)

    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'findProducts', {
      query: undefined,
      start: 0,
      size: 50,
      sort: '',
      excludeFields: null,
      includeFields: null,
      configuration: null,
      options: {
        populateRequestCacheTags: true,
        prefetchGroupProducts: true
      }
    })
  })

  it('should dispatch findProducts with provided values for list', async () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn(() => ({ items: ['test'] }))
    }
    const wrapper = (actions: any) => actions.list(contextMock, {
      query: { test: 'test' },
      start: 1,
      size: 10,
      sort: 'final_price',
      excludeFields: [],
      includeFields: [],
      configuration: { test: 'test' },
      populateRequestCacheTags: false,
      prefetchGroupProducts: false
    })

    await wrapper(productActions)

    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'findProducts', {
      query: { test: 'test' },
      start: 1,
      size: 10,
      sort: 'final_price',
      excludeFields: [],
      includeFields: [],
      configuration: { test: 'test' },
      options: {
        populateRequestCacheTags: false,
        prefetchGroupProducts: false
      }
    })
  })

  it('should emit "product-after-list" event', async () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn(() => ({ items: ['test'] }))
    }
    const wrapper = (actions: any) => actions.list(contextMock)

    await wrapper(productActions)

    expect(EventBus.$emit).toHaveBeenCalledWith('product-after-list', expect.anything())
  })

  it('should not update state by deafult', async () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn(() => ({ items: ['test'] }))
    }
    const wrapper = (actions: any) => actions.list(contextMock)

    await wrapper(productActions)

    expect(contextMock.commit).toHaveBeenCalledTimes(0)
  })

  it('should not append state by deafult if update store', async () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn(() => ({ items: ['test'] }))
    }
    const wrapper = (actions: any) => actions.list(contextMock, { updateState: true })

    await wrapper(productActions)

    expect(contextMock.commit).toHaveBeenCalledWith(mutationTypes.PRODUCT_SET_PAGED_PRODUCTS, { items: ['test'] })
  })

  it('should append state', async () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn(() => ({ items: ['test'] }))
    }
    const wrapper = (actions: any) => actions.list(contextMock, { updateState: true, append: true })

    await wrapper(productActions)

    expect(contextMock.commit).toHaveBeenCalledWith(mutationTypes.PRODUCT_ADD_PAGED_PRODUCTS, { items: ['test'] })
  })
})
