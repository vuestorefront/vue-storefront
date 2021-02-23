import { unicodeAlpha } from '../../../validators';

describe('unicodeAlpha', () => {
  it('returns false if string contains unacceptable characters', () => {
    const example1 = unicodeAlpha('John$@!#! Doe@!#');
    const example2 = unicodeAlpha('Jo$%n Do');
    const example3 = unicodeAlpha('Al#!C');
    const example4 = unicodeAlpha('#$!@');
    const example5 = unicodeAlpha('#$!@ Te#$');

    expect(example1).toBe(false);
    expect(example2).toBe(false);
    expect(example3).toBe(false);
    expect(example4).toBe(false);
    expect(example5).toBe(false);
  })

  it('returns true if string contains acceptable characters', () => {
    const example1 = unicodeAlpha('Rafał');
    const example2 = unicodeAlpha('Émilien');
    const example3 = unicodeAlpha('Heiner Schönherr');
    const example4 = unicodeAlpha('Fabián Gálvez');
    const example5 = unicodeAlpha('Adrián Sørina');
    const example6 = unicodeAlpha('John ćΣefz');

    expect(example1).toBe(true);
    expect(example2).toBe(true);
    expect(example3).toBe(true);
    expect(example4).toBe(true);
    expect(example5).toBe(true);
    expect(example6).toBe(true);
  })
})
