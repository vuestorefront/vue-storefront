import { createRawExtensions } from "../../../../src/integrations/helpers";
import { ApiClientFactory, Integration } from "../../../../src/types";

describe("[createRawExtensions]", () => {
  it("should call extensions function and return fallback array value", () => {
    const mockExtensionsFn = jest.fn((val) => val);

    const apiClient = {
      createApiClient: { _predefinedExtensions: undefined },
    } as unknown as ApiClientFactory;

    const integration: Integration = {
      configuration: {},
      location: "",
      extensions: mockExtensionsFn,
    };

    const result = createRawExtensions(apiClient, integration);

    expect(result).toEqual([]);
    expect(mockExtensionsFn).toHaveBeenCalledWith([]);
  });

  it("should call extensions function and return extensions value", () => {
    const extensions = [{ name: "predefined-extension" }];
    const mockExtensionsFn = jest.fn((val) => val);

    const apiClient = {
      createApiClient: { _predefinedExtensions: extensions },
    } as unknown as ApiClientFactory;

    const integration: Integration = {
      configuration: {},
      location: "",
      extensions: mockExtensionsFn,
    };

    const result = createRawExtensions(apiClient, integration);

    expect(result).toEqual(extensions);
    expect(mockExtensionsFn).toHaveBeenCalledWith(extensions);
  });

  it("should call extensions function and return merged extensions", () => {
    const predefinedExtensions = [{ name: "predefined-extension" }];
    const mockCustomExtensions = [
      { name: "extension1" },
      { name: "extension2" },
    ];

    const mockExtensionsFn = jest.fn((val) => [
      ...val,
      ...mockCustomExtensions,
    ]);

    const expected = [...predefinedExtensions, ...mockCustomExtensions];

    const apiClient = {
      createApiClient: { _predefinedExtensions: predefinedExtensions },
    } as unknown as ApiClientFactory;

    const integration: Integration = {
      configuration: {},
      location: "",
      extensions: mockExtensionsFn,
    };

    const result = createRawExtensions(apiClient, integration);

    expect(result).toEqual(expected);
    expect(mockExtensionsFn).toHaveBeenCalledWith(predefinedExtensions);
  });

  it("should return predefined extensions when extensions method not defined", () => {
    const predefinedExtensions = [{ name: "predefined-extension" }];

    const apiClient = {
      createApiClient: { _predefinedExtensions: predefinedExtensions },
    } as unknown as ApiClientFactory;

    const integration: Integration = {
      configuration: {},
      location: "",
    };

    const result = createRawExtensions(apiClient, integration);

    expect(result).toEqual(predefinedExtensions);
  });
});
