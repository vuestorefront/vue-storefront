import { injectMetadata } from "../../logger";
import { isFunction } from "../../helpers";
import { LoadInitConfigProps, TObject } from "../../types";

export async function getInitConfig({
  apiClient,
  tag,
  integration,
  alokai,
}: LoadInitConfigProps): Promise<TObject> {
  if (isFunction(apiClient?.init)) {
    try {
      alokai.logger.debug(`- Integration: ${tag} init function Start!`);
      const initConfig = await apiClient.init(
        integration.configuration,
        alokai
      );
      alokai.logger.debug(`- Integration: ${tag} init function Done!`);

      return initConfig;
    } catch (error) {
      const logger = injectMetadata(alokai.logger, (metadata) => ({
        ...metadata,
        errorBoundary: {
          integrationName: tag,
          type: "bootstrapHook",
          hookName: "init",
        },
      }));
      logger.error(error);
      throw Error(
        `Error during executing init function in ${tag} integration. Error message: ${error}`
      );
    }
  }

  return {};
}
