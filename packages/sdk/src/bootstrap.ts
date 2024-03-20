import { eventManager } from "./events/EventManager";
import { InterceptorsManager } from "./interceptors/InterceptorsManager";
import { SDKApi, SDKConfig } from "./types";

function normalizePropertyDescriptors<
  Connector extends Record<string, unknown>
>(connector: Connector): Connector {
  const propertyDescriptors = Object.getOwnPropertyDescriptors(connector);
  const hasNonConfigurableProperties = Object.values(propertyDescriptors).some(
    (descriptor) => !descriptor.configurable
  );

  // If the connector has non-configurable properties, we need to recreate it without property descriptors
  // we don't just recrate all connectors, as they may bo proxies and so it wouldn't work.
  return hasNonConfigurableProperties ? { ...connector } : connector;
}

/**
 * Initializes SDK
 *
 * @param sdkConfig - SDK configuration
 *
 * @example
 * This is an example of how to initialize SDK
 * Providing generic type is required to get proper type inference.
 *
 * ```typescript
 * const sdkConfig = {
 *   module1: buildModule<Module1, typeof extension>(module1, {}, extension),
 *   module2: buildModule<Module2>(module2),
 * };
 *
 * const sdk = initSDK<typeof sdkConfig>(sdkConfig);
 * ```
 */
export const initSDK = <T extends SDKConfig>(sdkConfig: T): SDKApi<T> => {
  const interceptorsManager = new InterceptorsManager(sdkConfig, eventManager);

  const sdk: any = {};

  Object.keys(sdkConfig).forEach((extensionCode: string) => {
    const extend = sdkConfig[extensionCode]?.extend ?? {};

    const utils = sdkConfig[extensionCode]?.utils ?? {};
    const subscribers = sdkConfig[extensionCode]?.subscribers ?? {};
    eventManager.registerSubscribers(subscribers);

    /*
      Connectors are often npm packages that have been bundled, bundlers may modify contract of modules by freezing exports or modifying
      their property descriptors. The problem is that non-writeable and non-configurable properties cannot be altered by Proxy.
      See step 10 of the below algorithm
      https://262.ecma-international.org/8.0/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver
    
      Due to this, we recreate connector but without property descriptors.
    */

    const connectorWithoutDescriptors = normalizePropertyDescriptors(
      sdkConfig[extensionCode].connector
    );

    sdk[extensionCode] = new Proxy(connectorWithoutDescriptors, {
      get(target, propKey: string, receiver) {
        if (propKey === "utils") return utils;

        const methodFromExtend = Reflect.get(extend, propKey, receiver);
        const methodFromTarget = Reflect.get(target, propKey, receiver);

        const method = methodFromExtend ?? methodFromTarget;

        if (!method) return method;

        const wrappedMethod = interceptorsManager.applyInterceptors(
          propKey,
          method,
          extensionCode
        );

        return wrappedMethod;
      },
    });
  });

  return sdk;
};
