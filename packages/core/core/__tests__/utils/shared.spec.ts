
import { shared, getShared } from '../../src/utils/shared';

const ref = value => ({ value });

describe('[CORE - utils] shared', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns same instance', () => {
    const someRef1 = shared(ref('test') as any, 'test-key');
    const someRef2 = shared(ref('test') as any, 'test-key');
    someRef1.value = 'test-update';

    expect(someRef1).toEqual(someRef2);
  });

  it('different instances are not equal', () => {
    const someRef1 = shared(ref('test') as any, 'test-key1');
    const someRef2 = shared(ref('test') as any, 'test-key2');
    someRef1.value = 'test-update';

    expect(someRef1).not.toEqual(someRef2);
  });

  it('get shared ref', () => {
    const someRef1 = shared(ref('test') as any, 'test-key3');
    const someRef2 = getShared('test-key3');
    someRef1.value = 'test-update-3';

    expect(someRef1).toEqual(someRef2);
  });
});
