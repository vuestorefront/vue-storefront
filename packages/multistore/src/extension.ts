import type { Request } from "express";
import { ApiClientExtension } from "@vue-storefront/middleware";
import { MultistoreExtensionMethods } from "./types";
import { resolveDomain } from "./resolve/resolveDomain";
import { validateMultistoreMethods } from "./validate/validateMultistoreMethods";
import { requiredMethodsErrors } from "./validate/requiredMethodsErrors";
import { fetchConfigWithCache } from "./cache/fetchConfigWithCache";

export const createMultistoreExtension = (
  multistoreConfig: MultistoreExtensionMethods
) => {
  const cacheManager = multistoreConfig.cacheManagerFactory();

  return {
    name: "multistore-extension",
    isNamespaced: false,
    extendApp: () => {
      Object.keys(requiredMethodsErrors).forEach((requiredMethod) => {
        validateMultistoreMethods(requiredMethod, multistoreConfig);
      });
    },
    hooks: (req: Request) => {
      return {
        beforeCreate: async ({ configuration: baseConfig }) => {
          const domain = resolveDomain(req);

          const storeConfiguration = await fetchConfigWithCache({
            cacheManager,
            domain,
            multistore: multistoreConfig,
          });

          return multistoreConfig.mergeConfigurations({
            baseConfig,
            storeConfig: storeConfiguration,
          });
        },
      };
    },
  } satisfies ApiClientExtension;
};
