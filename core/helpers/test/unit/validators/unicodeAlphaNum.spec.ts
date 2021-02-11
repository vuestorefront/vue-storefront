import { unicodeAlphaNum } from '../../../validators';

describe('unicodeAlphaNum', () => {
  it('returns true if string contains any unicode alphabet characters or digits', () => {
    const exampleValue = unicodeAlphaNum('Xyz 123');

    expect(exampleValue).toBe(true)
  })

  it('returns false if string does not contains any unicode alphabet characters or digits', () => {
    const exampleValue = unicodeAlphaNum('§');

    expect(exampleValue).toBe(false)
  })
})
