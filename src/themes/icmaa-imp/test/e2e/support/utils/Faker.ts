import faker from 'faker'

/**
 * Example usage:
 *
 * import { Faker, getRandomIcmaaEmail } from '../../support/utils/Faker'
 *
 * const faker = Faker()
 * const name = faker.name
 * const password = faker.internet.password()
 *
 * const email = getRandomIcmaaEmail()
 */

/**
 * Import faker.js using the current storeview or a specific one
 * @param country
 */
const Faker = (country?: string): Faker.FakerStatic => {
  faker.locale = country || 'de'
  return faker
}

/**
 * Return a random ICMAA-like email address
 */
const getIcmaaEmail = () => {
  return [
    'a9.tests+',
    new Date().getTime(),
    '@impericon.com'
  ].join('')
}

/**
 * Return a random birthday in locale format
 * @param locale
 */
const getBirthday = (locale: string = 'de-DE'): string => {
  const dobDate = faker.date.between(faker.date.past(18), faker.date.past(40))
  return dobDate.toLocaleDateString(
    locale,
    { month: '2-digit', day: '2-digit', year: 'numeric' }
  )
}

export default Faker

export {
  getIcmaaEmail,
  getBirthday
}
