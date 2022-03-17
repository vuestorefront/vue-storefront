import isUrlMatchingRule from '../nuxt/isUrlMatchingRule';

describe('isUrlMatchingRule', () => {
  it('exact rule', () => {
    expect(isUrlMatchingRule('/', '/')).toBe(true);
    expect(isUrlMatchingRule('/xyz', '/xyz')).toBe(true);
    expect(isUrlMatchingRule('/xyz/abc', '/xyz/abc')).toBe(true);
    expect(isUrlMatchingRule('/xyz/abc', '/xyz/xyz')).toBe(false);
  });

  it('rule with wildcard', () => {
    expect(isUrlMatchingRule('/', '/*')).toBe(true);
    expect(isUrlMatchingRule('/xyz', '/*')).toBe(true);
    expect(isUrlMatchingRule('/xyz/abc', '/xyz/*')).toBe(true);
    expect(isUrlMatchingRule('/xyz/abc', '/*/abc')).toBe(true);
    expect(isUrlMatchingRule('/xyz/abc', '/*/*')).toBe(true);
  });
});
