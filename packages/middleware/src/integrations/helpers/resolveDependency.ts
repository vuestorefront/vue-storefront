import consola from "consola";

/**
 * Resolves dependencies based on the current working directory, not relative to this package.
 */
export function resolveDependency<T>(name: string): T {
  try {
    // eslint-disable-next-line
    return require(require.resolve(name, { paths: [process.cwd()] }));
  } catch (error) {
    consola.error(error);

    throw new Error(
      `Could not resolve integration "${name}". See the error above for more details.`
    );
  }
}
