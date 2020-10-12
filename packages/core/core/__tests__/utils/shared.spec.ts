
import { sharedRef } from '../../src/utils/shared';
import { vsfRef } from '../../src/utils';

describe('[CORE - utils] shared', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns same instance', () => {
    const someRef1 = sharedRef('test', 'test-key');
    const someRef2 = sharedRef('test', 'test-key');
    someRef1.value = 'test-update';

    expect(someRef1).toEqual(someRef2);
    expect(vsfRef).toBeCalledWith('test', 'test-key');
  });

  it('different instances are not equal', () => {
    const someRef1 = sharedRef('test', 'test-key1');
    const someRef2 = sharedRef('test', 'test-key2');
    someRef1.value = 'test-update';

    expect(someRef1).not.toEqual(someRef2);
    expect(vsfRef).toBeCalledWith('test', 'test-key1');
    expect(vsfRef).toBeCalledWith('test', 'test-key2');

  });

  it('get shared ref', () => {
    const someRef1 = sharedRef('test', 'test-key3');
    const someRef2 = sharedRef('test-key3');
    someRef1.value = 'test-update-3';

    expect(someRef1).toEqual(someRef2);
    expect(vsfRef).toBeCalledWith('test', 'test-key3');
    expect(vsfRef).toBeCalledWith('test', 'test-key3');
  });

  it('assign a value when ref does not exist', () => {
    const someRef1 = sharedRef('no-exist-key');
    someRef1.value = 'no-exist-update';

    expect(someRef1.value).toEqual('no-exist-update');
    expect(vsfRef).toBeCalledWith(null, 'no-exist-key');

    const someRef2 = sharedRef('no-exist-key');
    expect(someRef1).toEqual(someRef2);
  });
});
