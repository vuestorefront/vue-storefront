
import mask from '../../src/utils/logger/mask';

describe('[CORE - utils] mask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('mask string', () => {
    expect(mask('test string')).toEqual('t***g');
  });

  it('mask array', () => {
    expect(mask([])).toEqual('***');
  });

  it('mask object', () => {
    const obj = {
      key1: 'test',
      key2: 'lorem ipsum',
      key3: {
        key1: 'test'
      },
      key4: '1234'
    };

    expect(mask(obj)).toEqual({
      key1: 't***t',
      key2: 'l***m',
      key3: '***',
      key4: '1***4'
    });
  });
});
