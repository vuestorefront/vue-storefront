import { unicodeAlphaNum } from '../../../validators';

describe('unicodeAlphaNum', () => {
  it('returns true if string contains any unicode alphabet characters or digits', () => {
    const example1 = unicodeAlphaNum('Xyz 123');
    const example2 = unicodeAlphaNum('Fagasā 123');
    const example3 = unicodeAlphaNum('555 La Cañada Flintridge');
    const example4 = unicodeAlphaNum('123 Hāʻōʻū 44');
    const example5 = unicodeAlphaNum('ʻŌʻōka2312la');

    expect(example1).toBe(true);
    expect(example2).toBe(true);
    expect(example3).toBe(true);
    expect(example4).toBe(true);
    expect(example5).toBe(true);
  })

  it('returns false if string does not contains any unicode alphabet characters or digits', () => {
    const example1 = unicodeAlphaNum('§');
    const example2 = unicodeAlphaNum('€');
    const example3 = unicodeAlphaNum('™');
    const example4 = unicodeAlphaNum('∑');
    const example5 = unicodeAlphaNum('≥');

    expect(example1).toBe(false);
    expect(example2).toBe(false);
    expect(example3).toBe(false);
    expect(example4).toBe(false);
    expect(example5).toBe(false);
  })
})
