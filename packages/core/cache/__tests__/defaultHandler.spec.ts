import defaultHandler from '../defaultHandler';

describe('defaultHandler', () => {
  it('returns empty array if key is not configured', () => {
    const result = defaultHandler({
      request: {
        url: '/?tags=a,b,c'
      },
      options: {}
    });

    expect(result).toEqual([]);
  });

  it('returns empty array if key was not provided in the request', () => {
    const result = defaultHandler({
      request: {
        url: '/?tags=a,b,c'
      },
      options: {
        key: 'key'
      }
    });

    expect(result).toEqual([]);
  });

  it('returns empty array if tags were not provided in the request', () => {
    const result = defaultHandler({
      request: {
        url: '/?key=secret'
      },
      options: {
        key: 'secret'
      }
    });

    expect(result).toEqual([]);
  });

  it('handles single tag', () => {
    const result = defaultHandler({
      request: {
        url: '/?key=secret&tags=a'
      },
      options: {
        key: 'secret'
      }
    });

    expect(result).toEqual(['a']);
  });

  it('handles multiple tags', () => {
    const result = defaultHandler({
      request: {
        url: '/?key=secret&tags=a,b,c'
      },
      options: {
        key: 'secret'
      }
    });

    expect(result).toEqual(['a', 'b', 'c']);
  });
});
