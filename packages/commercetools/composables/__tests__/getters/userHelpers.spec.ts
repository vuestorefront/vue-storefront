import {
  getUserFirstName,
  getUserLastName,
  getUserFullName
} from './../../src/getters/userGetters';

const user = {
  firstName: 'John',
  lastName: 'Doe'
} as any;

describe('[commercetools-getters] user getters', () => {
  it('returns default values', () => {
    expect(getUserFirstName(null)).toBe('');
    expect(getUserLastName(null)).toBe('');
    expect(getUserFullName(null)).toBe('');
  });

  it('returns first name', () => {
    expect(getUserFirstName(user)).toBe('John');
  });

  it('returns last name', () => {
    expect(getUserLastName(user)).toBe('Doe');
  });

  it('returns full name', () => {
    expect(getUserFullName(user)).toBe('John Doe');
  });
});
