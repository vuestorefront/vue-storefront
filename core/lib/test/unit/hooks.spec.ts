import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks';

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
})
