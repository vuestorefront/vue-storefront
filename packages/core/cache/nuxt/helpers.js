import { isAbsolute, resolve } from 'path';

/**
 * Helper function that imports default handler by package name
 */
export function requirePackage (name) {
  const path = isAbsolute(name) || name.startsWith('.')
    ? resolve(process.cwd(), name)
    : require.resolve(name, { paths: [process.cwd()] });

  // eslint-disable-next-line global-require
  return require(path).default;
}

/**
 * Loads driver using path provided in the configuration.
 */
export function requireDriver (driver) {
  return Array.isArray(driver)
    ? requirePackage(driver[0])(driver[1])
    : requirePackage(driver)();
}
