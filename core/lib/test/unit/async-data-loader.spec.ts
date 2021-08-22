import { AsyncDataLoader, DEFAULT_ACTION_CATEGORY, AsyncDataLoaderAction } from '../../async-data-loader';

jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    info: jest.fn(() => () => {})
  }
}))

describe('AsyncDataLoader', () => {
  beforeEach(() => {
    AsyncDataLoader.queue = [];
  })

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
      category: DEFAULT_ACTION_CATEGORY,
      scheduledAt: (actionMock as AsyncDataLoaderAction).scheduledAt
    }

    expect(AsyncDataLoader.queue[0].scheduledAt).toBe(expectedMock.scheduledAt)
    expect(AsyncDataLoader.queue[0].category).toBe(expectedMock.category)
    expect(AsyncDataLoader.queue[0].execute).toBe(expectedMock.execute)
  })

  it('does not execute if actionContext has other category than action', async () => {
    const actionContextMock = {
      context: null,
      route: jest.fn(),
      store: jest.fn(),
      category: 'action2'
    }
    const actionMock = {
      execute: jest.fn()
    }

    AsyncDataLoader.push(actionMock);
    await AsyncDataLoader.flush(actionContextMock)

    expect(AsyncDataLoader.queue[0].executedAt).not.toBeDefined();
  })

  it('executes action if categories are default', async () => {
    const actionContextMock = {
      context: null,
      route: jest.fn(),
      store: jest.fn()
    }
    const actionMock = {
      execute: jest.fn()
    }

    AsyncDataLoader.push(actionMock);
    await AsyncDataLoader.flush(actionContextMock)

    const expectedMock = {
      execute: actionMock.execute,
      category: DEFAULT_ACTION_CATEGORY,
      scheduledAt: (actionMock as AsyncDataLoaderAction).scheduledAt,
      executedAt: (actionMock as AsyncDataLoaderAction).executedAt
    }

    expect(AsyncDataLoader.queue[0].executedAt).toBe(expectedMock.executedAt);
    expect(AsyncDataLoader.queue[0].execute).toHaveBeenCalledWith(actionContextMock);
  })

  it('executes action with the same category', async () => {
    const actionContextMock = {
      context: null,
      route: jest.fn(),
      store: jest.fn(),
      category: 'test'
    }
    const firstActionMock = {
      execute: jest.fn(),
      category: 'test'
    }

    const secondActionMock = {
      execute: jest.fn(),
      category: 'test'
    }

    AsyncDataLoader.push(firstActionMock);
    AsyncDataLoader.push(secondActionMock);
    await AsyncDataLoader.flush(actionContextMock)

    const firstExpectedMock = {
      execute: firstActionMock.execute,
      category: 'test',
      scheduledAt: (firstActionMock as AsyncDataLoaderAction).scheduledAt,
      executedAt: (firstActionMock as AsyncDataLoaderAction).executedAt
    }

    const secondExpectedMock = {
      execute: secondActionMock.execute,
      category: 'test',
      scheduledAt: (secondActionMock as AsyncDataLoaderAction).scheduledAt,
      executedAt: (secondActionMock as AsyncDataLoaderAction).executedAt
    }

    expect(AsyncDataLoader.queue[0].executedAt).toBe(firstExpectedMock.executedAt);
    expect(AsyncDataLoader.queue[0].category).toBe(firstExpectedMock.category);
    expect(AsyncDataLoader.queue[0].execute).toHaveBeenCalledWith(actionContextMock);
    expect(AsyncDataLoader.queue[1].executedAt).toBe(secondExpectedMock.executedAt);
    expect(AsyncDataLoader.queue[1].category).toBe(secondExpectedMock.category);
    expect(AsyncDataLoader.queue[1].execute).toHaveBeenCalledWith(actionContextMock);
  })
})
