import { getApiFunction } from "../../../src/handlers/prepareApiFunction/getApiFunction";

describe("getApiFunction", () => {
  const apiClient = {
    api: {
      extension1: {
        function1: () => "Extension 1 Function 1",
        function2: () => "Extension 1 Function 2",
      },
      function3: () => "Function 3",
      function4: () => "Function 4",
    },
  };

  it("should return the correct API function when extensionName is provided", () => {
    const functionName = "function1";
    const extensionName = "extension1";
    const expectedApiFn = apiClient.api[extensionName][functionName];

    const apiFn = getApiFunction(apiClient, functionName, extensionName);

    expect(apiFn).toEqual(expectedApiFn);
  });

  it("should return the correct API function when extensionName is not provided", () => {
    const functionName = "function3";
    const expectedApiFn = apiClient.api[functionName];

    const apiFn = getApiFunction(apiClient, functionName);

    expect(apiFn).toEqual(expectedApiFn);
  });

  it("should throw an error when the API function is not found with extensionName", () => {
    const functionName = "function5";
    const extensionName = "extension1";

    expect(() => {
      getApiFunction(apiClient, functionName, extensionName);
    }).toThrowError(
      `Extension "${extensionName}" is not namespaced or the function "${functionName}" is not available in the namespace.`
    );
  });

  it("should throw an error when the API function is not found without extensionName", () => {
    const functionName = "function5";

    expect(() => {
      getApiFunction(apiClient, functionName);
    }).toThrowError(`The function "${functionName}" is not registered.`);
  });
});
