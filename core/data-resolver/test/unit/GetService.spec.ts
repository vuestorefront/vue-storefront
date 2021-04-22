import GetService from '../../GetService';

describe('GetService', () => {
  it('creates function that calls loader', async () => {
    const testFunc = jest.fn();
    const loader = jest.fn(() => Promise.resolve({
      testFunc
    }));
    const service = GetService<{ testFunc: Function }>({
      loader,
      methods: [
        'testFunc'
      ]
    })

    await service.testFunc();
    expect(loader).toHaveBeenCalled();
    expect(testFunc).toHaveBeenCalled();
  })

  it('adds support for method from list', async () => {
    const testFunc = jest.fn();
    const otherTestFunc = jest.fn();
    const loader = jest.fn(() => Promise.resolve({
      testFunc,
      otherTestFunc
    }));
    const service = GetService<{ testFunc: Function, otherTestFunc: Function }>({
      loader,
      methods: [
        'testFunc',
        'otherTestFunc'
      ]
    })

    expect(typeof service.testFunc).toBe('function');
    expect(typeof service.otherTestFunc).toBe('function');
  })

  it('real method call is being awaited', async () => {
    const testFunc = jest.fn(() => Promise.resolve(15));
    const loader = jest.fn(() => Promise.resolve({
      testFunc
    }));
    const service = GetService<{ testFunc: Function }>({
      loader,
      methods: [
        'testFunc'
      ]
    })

    const someValue = await service.testFunc();
    expect(testFunc).toHaveBeenCalled();
    expect(someValue).toBe(15)
  })
})
