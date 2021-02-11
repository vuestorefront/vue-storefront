import { unicodeAlpha } from '../../../validators';

describe('unicodeAlpha', () => {
  it('returns false if string contains unacceptable characters', () => {
    const someValue = unicodeAlpha('John$@!#! Doe@!#');

    expect(someValue).toBe(false);
  })

  it('returns true if string contains acceptable characters', () => {
    const polishExample = unicodeAlpha('Rafał');
    const frenchExample = unicodeAlpha('Émilien');
    const germanExample = unicodeAlpha('Heiner Schönherr');
    const spainExample = unicodeAlpha('Fabián Gálvez');

    expect(polishExample).toBe(true);
    expect(frenchExample).toBe(true);
    expect(germanExample).toBe(true);
    expect(spainExample).toBe(true);
  })
})
