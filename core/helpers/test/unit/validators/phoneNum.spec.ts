import { phoneNum } from '../../../validators';

describe('phoneNum', () => {
  it('returns true if string contains between 6 and 14 digits', () => {
    const example1 = phoneNum('1234567');
    const example2 = phoneNum('123');
    const example3 = phoneNum('12345678912345678');

    expect(example1).toBe(true);
    expect(example2).toBe(false);
    expect(example3).toBe(false);
  })

  it('returns false if string not contains between 6 and 14 digits', () => {
    const example1 = phoneNum('123');
    const example2 = phoneNum('12345678912345678');

    expect(example1).toBe(false);
    expect(example2).toBe(false);
  })

  it('contains of plus sign with national code', () => {
    const example = phoneNum('+48123455234');

    expect(example).toBe(true);
  })

  it('contains of plus sign with national code with spaces between groups of digits', () => {
    const example = phoneNum('+48 123 456 782');

    expect(example).toBe(true);
  })
})
