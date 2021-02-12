import { AsyncDataLoader, AsyncDataLoaderAction } from '../../async-data-loader';

jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    info: jest.fn(() => () => {})
  }
}))

describe('AsyncDataLoader', () => {
  it('contains new action with custom category parameter', () => {
    const actionMock = {
      execute: jest.fn(),
      category: 'action1'
    }

    AsyncDataLoader.push(actionMock);

    const expectedMock = {
      execute: actionMock.execute,
      category: 'action1',
      scheduledAt: (actionMock as AsyncDataLoaderAction).scheduledAt
    }

    expect(AsyncDataLoader.queue[0].scheduledAt).toBe(expectedMock.scheduledAt)
    expect(AsyncDataLoader.queue[0].category).toBe(expectedMock.category)
    expect(AsyncDataLoader.queue[0].execute).toBe(expectedMock.execute)
  })

  it('contains new action with default category parameter', () => {
    const actionMock = {
      execute: jest.fn()
    }

    AsyncDataLoader.push(actionMock);

    const expectedMock = {
      execute: actionMock.execute,
      category: 'asyncData',
      scheduledAt: (actionMock as AsyncDataLoaderAction).scheduledAt
    }

    expect(AsyncDataLoader.queue[1].scheduledAt).toBe(expectedMock.scheduledAt)
    expect(AsyncDataLoader.queue[1].category).toBe(expectedMock.category)
    expect(AsyncDataLoader.queue[1].execute).toBe(expectedMock.execute)
  })

  it('returns 0 actions to execute', async () => {
    const actionContextMock = {
      context: null,
      route: jest.fn(),
      store: jest.fn(),
      category: 'action2'
    }

    const data = await AsyncDataLoader.flush(actionContextMock)

    expect(data.length).toBe(0);
  })

  it('returns some action to execute', async () => {
    const actionContextMock = {
      context: null,
      route: jest.fn(),
      store: jest.fn()
    }

    const data = await AsyncDataLoader.flush(actionContextMock)

    expect(data.length).toBe(1);
  })
})
