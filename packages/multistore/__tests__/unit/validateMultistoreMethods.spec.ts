/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockMultistoreConfig } from "../../__mocks__/multistore.config.mock";
import { validateMultistoreMethods } from "../../src/validate/validateMultistoreMethods";
import { requiredMethodsErrors } from "../../src/validate/requiredMethodsErrors";

describe("[MultiStoreExtension] validateMultistoreMethods utility function", () => {
  const multistore = mockMultistoreConfig();

  test.each([
    { methodName: "fetchConfiguration" },
    { methodName: "mergeConfigurations" },
    { methodName: "cacheManagerFactory" },
  ])("throws an error if %p is undefined", ({ methodName }) => {
    expect.assertions(1);

    try {
      const configToValidate = { ...multistore };
      configToValidate[methodName] = undefined;

      validateMultistoreMethods(methodName, configToValidate as any);
    } catch (error) {
      expect(error.message).toBe(requiredMethodsErrors[methodName]);
    }
  });
});
