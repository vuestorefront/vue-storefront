
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import { LocalizedRoute } from '@vue-storefront/core/lib/types'
import * as data from './data'
import config from 'config';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

jest.mock('config', () => ({}));
jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(),
  localizedDispatcherRoute: jest.fn(() => {
    return '/men/bottoms-men/shorts-men/shorts-19/troy-yoga-short-994.html?childSku=MSH09'
  }),
  localizedRoute: jest.fn(() => {
    return '/men/bottoms-men/shorts-men/shorts-19/troy-yoga-short-994.html?childSku=MSH09'
  })
}));
jest.mock('@vue-storefront/core/helpers', () => ({
  once: jest.fn()
}))
jest.mock('@vue-storefront/core/helpers/router', () => ({
  createRouter: jest.fn(),
  createRouterProxy: jest.fn()
}))
jest.mock('@vue-storefront/core/lib/router-manager', () => ({
  RouterManager: {
    findByName: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/app', () => ({
  createApp: jest.fn(),
  router: {
    addRoutes: jest.fn()
  }
}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    log: jest.fn(() => () => {
    }),
    debug: jest.fn(() => () => {
    }),
    warn: jest.fn(() => () => {
    }),
    error: jest.fn(() => () => {
    }),
    info: jest.fn(() => () => {
    })
  }
}));

let expectedProductLink: LocalizedRoute | string;

describe('formatProductLink helper with useUrlDispatcher set to true', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (currentStoreView as jest.Mock).mockImplementationOnce(() => ({ storeCode: '' }));
    config.seo = {
      useUrlDispatcher: true
    };
  })

  it('should return localized dispatcher route', () => {
    expectedProductLink = '/men/bottoms-men/shorts-men/shorts-19/troy-yoga-short-994.html?childSku=MSH09'
    const result = formatProductLink(data.product, '');

    expect(result).toEqual(expectedProductLink);
  })
})

describe('formatProductLink helper with userUrlDispatcher set to false', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (currentStoreView as jest.Mock).mockImplementationOnce(() => ({ storeCode: '' }));
    config.seo = {
      useUrlDispatcher: false
    };
  })

  it('should return localized route', () => {
    expectedProductLink = '/men/bottoms-men/shorts-men/shorts-19/troy-yoga-short-994.html?childSku=MSH09'
    const result = formatProductLink(data.product, '');

    expect(result).toEqual(expectedProductLink);
  })
})
