import getAndCallAsyncDefault from '../../getAndCallAsyncDefault';

describe('getAndCallAsyncDefault', () => {
  it('returns function that calls loader', async () => {
    const def = jest.fn();
    const loader = jest.fn(() => Promise.resolve({
      default: def
    }));
    const service = getAndCallAsyncDefault(loader)

    await service();
    expect(loader).toHaveBeenCalled();
    expect(def).toHaveBeenCalled();
  })

  it('real method call is being awaited', async () => {
    const def = jest.fn(() => Promise.resolve(15));
    const loader = jest.fn(() => Promise.resolve({
      default: def
    }));
    const service = getAndCallAsyncDefault(loader)

    const someValue = await service();
    expect(def).toHaveBeenCalled();
    expect(someValue).toBe(15)
  })
})
