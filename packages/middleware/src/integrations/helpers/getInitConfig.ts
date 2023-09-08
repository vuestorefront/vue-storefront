import consola from "consola";
import { isFunction } from "../../helpers";
import { LoadInitConfigProps, TObject } from "../../types";

export async function getInitConfig({
  apiClient,
  tag,
  integration,
}: LoadInitConfigProps): Promise<TObject> {
  if (isFunction(apiClient?.init)) {
    try {
      consola.success(`- Integration: ${tag} init function Start!`);
      const initConfig = await apiClient.init(integration.configuration);
      consola.success(`- Integration: ${tag} init function Done!`);

      return initConfig;
    } catch (error) {
      throw Error(
        `Error during executing init function in ${tag} integration. Error message: ${error}`
      );
    }
  }

  return {};
}
