import { getLogger } from "../../logger";
import { isFunction } from "../../helpers";
import { LoadInitConfigProps, TObject } from "../../types";

export async function getInitConfig({
  apiClient,
  tag,
  integration,
  alokai,
}: LoadInitConfigProps): Promise<TObject> {
  const logger = getLogger(alokai);
  if (isFunction(apiClient?.init)) {
    try {
      logger.debug(`- Integration: ${tag} init function Start!`);
      const initConfig = await apiClient.init(
        integration.configuration,
        alokai
      );
      logger.debug(`- Integration: ${tag} init function Done!`);

      return initConfig;
    } catch (error) {
      logger.error(error, {
        errorBoundary: {
          integrationName: tag,
          type: "bootstrapHook",
          hookName: "init",
        },
      });
      throw Error(
        `Error during executing init function in ${tag} integration. Error message: ${error}`
      );
    }
  }

  return {};
}
