import { createListenerHook, createMutatorHook, createAsyncMutatorHook } from '@vue-storefront/core/lib/hooks';

describe('Hooks', () => {
  describe('createListenerHook', () => {
    it('executes functions with arguments added by hook', () => {
      const { hook, executor } = createListenerHook();
      const mockedFn = jest.fn(arg => arg)
      const mockedArgs = [1, 2, 3]

      hook(mockedFn)
      executor(mockedArgs)

      expect(mockedFn).toHaveBeenCalledWith(mockedArgs);
    })
  })

  describe('createMutatorHook', () => {
    it('executes functions added by hook', () => {
      const { hook, executor } = createMutatorHook();
      const mockedFn = jest.fn(arg => `${arg} / test`)
      const mockedRawOutput = 'abc'
      const expectedResult = 'abc / test'

      hook(mockedFn)
      executor(mockedRawOutput)

      expect(mockedFn).toHaveBeenCalledWith(mockedRawOutput);
      expect(mockedFn(mockedRawOutput)).toBe(expectedResult);
    })
  })

  describe('createAsyncMutatorHook', () => {
    it('executes functions added by hook', async () => {
      const { hook, executor } = createAsyncMutatorHook();
      const mockedFn = jest.fn(arg => Promise.resolve(`${arg} / test`))
      const mockedFn2 = jest.fn(arg => Promise.resolve(`${arg} / test`))
      const mockedRawOutput = 'abc'

      hook(mockedFn)
      hook(mockedFn2)
      await executor(mockedRawOutput)

      expect(mockedFn).toHaveBeenCalledWith(mockedRawOutput);
      expect(mockedFn2).toHaveBeenCalledWith(mockedRawOutput);
    })
  })
})
