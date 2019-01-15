/**
 * Create slugify -> "create-slugify" permalink  of text
 * @param {String} text
 */
export function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
}

export function once (key, fn) {
  const { process = {} } = global
  const processKey = key + '__ONCE__'
  if (!process.hasOwnProperty(processKey)) {
    console.debug(`Once ${key}`)
    process[processKey] = true
    fn()
  }
}

export const isServer: boolean = typeof window === 'undefined'
