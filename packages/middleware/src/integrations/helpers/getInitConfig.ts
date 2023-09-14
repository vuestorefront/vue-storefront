import consola from "consola";
import { isFunction } from "../../helpers";
import {
  BaseConfig,
  ApiClientFactoryResult,
  BaseIntegrationConfig,
} from "../../types";
// import { LoadInitConfigProps, TObject } from "../../deprecated/types";

interface LoadInitConfigProps {
  apiClientFactoryResult: ApiClientFactoryResult<any>;
  tag: string;
  integrationConfig: BaseIntegrationConfig;
}

export async function getInitConfig({
  apiClientFactoryResult,
  tag,
  integrationConfig,
}: LoadInitConfigProps): Promise<BaseConfig> {
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
