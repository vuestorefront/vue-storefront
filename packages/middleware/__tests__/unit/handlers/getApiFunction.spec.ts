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

  it("should return the correct API function when extensionName is provided", async () => {
    const functionName = "function1";
    const extensionName = "extension1";
    const expectedApiFn = apiClient.api[extensionName][functionName];

    const apiFn = await getApiFunction(apiClient, functionName, extensionName);

    expect(apiFn).toEqual(expectedApiFn);
  });

  it("should return the correct API function when extensionName is not provided", async () => {
    const functionName = "function3";
    const expectedApiFn = apiClient.api[functionName];

    const apiFn = await getApiFunction(apiClient, functionName);

    expect(apiFn).toEqual(expectedApiFn);
  });

  it("should throw an error when the API function is not found with extensionName", async () => {
    const functionName = "function5";
    const extensionName = "extension1";

    await expect(async () => {
      await getApiFunction(apiClient, functionName, extensionName);
    }).rejects.toThrowError(
      `Failed to resolve apiClient or function: Extension "${extensionName}" is not namespaced or the function "${functionName}" is not available in the namespace.`
    );
  });

  it("should throw an error when the API function is not found without extensionName", async () => {
    const functionName = "function5";
    await expect(async () => {
      await getApiFunction(apiClient, functionName);
    }).rejects.toThrowError(
      `Failed to resolve apiClient or function: The function "${functionName}" is not registered.`
    );
  });
});
