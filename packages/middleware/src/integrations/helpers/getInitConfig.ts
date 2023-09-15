import consola from "consola";
import { isFunction } from "../../helpers";
import { Config, ApiClientFactoryResult, IntegrationConfig } from "../../types";

interface LoadInitConfigProps {
  apiClientFactoryResult: ApiClientFactoryResult<any>;
  tag: string;
  integrationConfig: IntegrationConfig;
}

export async function getInitConfig({
  apiClientFactoryResult,
  tag,
  integrationConfig,
}: LoadInitConfigProps): Promise<Config> {
  if (isFunction(apiClientFactoryResult?.init)) {
    try {
      consola.success(`- Integration: ${tag} init function Start!`);
      const initConfig = await apiClientFactoryResult.init(
        integrationConfig.configuration
      );
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
