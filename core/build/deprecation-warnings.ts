import { deprecations } from 'sass'

interface BuildWarning {
  message?: string;
  name?: string;
}

const deprecationWarningPattern = /\b(?:deprecation|deprecated)\b/i

export const sassDeprecationsToSilence = Object.values(deprecations)
  .filter(({ status }) => status === 'active')

export const isDeprecationWarning = (warning: BuildWarning): boolean => {
  return warning.name === 'DeprecationWarning' ||
    deprecationWarningPattern.test(warning.message || '')
}
