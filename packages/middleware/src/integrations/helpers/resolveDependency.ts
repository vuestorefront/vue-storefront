import type { AlokaiContainer } from "../../types";

/**
 * Resolves dependencies based on the current working directory, not relative to this package.
 */
export function resolveDependency<T>(name: string, alokai: AlokaiContainer): T {
  try {
    // eslint-disable-next-line
    return require(require.resolve(name, { paths: [process.cwd()] }));
  } catch (error) {
    alokai.logger.error(error);

    throw new Error(
      `Could not resolve integration "${name}". See the error above for more details.`
    );
  }
}
