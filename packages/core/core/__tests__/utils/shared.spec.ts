
import { sharedRef } from '../../src/utils/shared';

describe('[CORE - utils] shared', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns same instance', () => {
    const someRef1 = sharedRef('test', 'test-key');
    const someRef2 = sharedRef('test', 'test-key');
    someRef1.value = 'test-update';

    expect(someRef1).toEqual(someRef2);
  });

  it('different instances are not equal', () => {
    const someRef1 = sharedRef('test', 'test-key1');
    const someRef2 = sharedRef('test', 'test-key2');
    someRef1.value = 'test-update';

    expect(someRef1).not.toEqual(someRef2);
  });

  it('get shared ref', () => {
    const someRef1 = sharedRef('test', 'test-key3');
    const someRef2 = sharedRef('test-key3');
    someRef1.value = 'test-update-3';

    expect(someRef1).toEqual(someRef2);
  });
});
