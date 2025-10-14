export function getFirstAndLastFromFullName (fullName: string): {
  firstName: string,
  lastName: string
} {
  const parts = fullName.trim().split(' ');

  const firstName = parts.shift() || '';
  const lastName = parts.join(' ');

  return {
    firstName,
    lastName
  }
}
