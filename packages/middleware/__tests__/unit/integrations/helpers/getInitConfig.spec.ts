import consola from "consola";
import { getInitConfig } from "../../../../src/integrations/helpers";
import { LoadInitConfigProps } from "../../../../src/types";
import { logger } from "../../../../__mocks__/logger";

jest.mock("consola");

describe("[getInitConfig]", () => {
  it("should return an empty object when apiClient.init method is not defined", async () => {
    const params: LoadInitConfigProps = {
      apiClient: {
        createApiClient: jest.fn(),
      },
      tag: "test-tag",
      integration: { configuration: {}, location: "" },
      alokai: {
        logger,
      },
    };
    const result = await getInitConfig(params);

    expect(result).toEqual({});
    expect(consola.success).not.toHaveBeenCalled();
  });

  it("should return an empty object when apiClient.init method is not a function", async () => {
    const params: LoadInitConfigProps = {
      apiClient: {
        createApiClient: jest.fn(),
        init: "jest.fn()" as any,
      },
      tag: "test-tag",
      integration: { configuration: {}, location: "" },
      alokai: {
        logger,
      },
    };
    const result = await getInitConfig(params);

    expect(result).toEqual({});
  });

  it("should return an empty object when apiClient is not defined", async () => {
    const params = {
      alokai: {
        logger,
      },
    } as unknown as LoadInitConfigProps;
    const result = await getInitConfig(params);

    expect(result).toEqual({});
  });

  it("should return config resolved from init method", async () => {
    const mockInitConfiguration = { key: "test" };
    const mockConfiguration = { prop: "value" };
    const mockTag = "test-tag";
    const mockInit = jest.fn(() => mockInitConfiguration);
    const alokai = {
      logger,
    };

    const params: LoadInitConfigProps = {
      apiClient: {
        createApiClient: jest.fn(),
        init: mockInit,
      },
      tag: mockTag,
      integration: { configuration: mockConfiguration, location: "" },
      alokai,
    };
    const result = await getInitConfig(params);

    expect(result).toEqual(mockInitConfiguration);
    expect(mockInit).toHaveBeenCalledWith(mockConfiguration, alokai);
    expect(logger.debug).toHaveBeenNthCalledWith(
      1,
      `- Integration: ${mockTag} init function Start!`
    );
    expect(logger.debug).toHaveBeenNthCalledWith(
      2,
      `- Integration: ${mockTag} init function Done!`
    );
  });

  it("should throw an error when init method execution fails", async () => {
    const mockConfiguration = { prop: "value" };
    const mockTag = "test-tag";
    const mockError = "Some Error";
    const mockInit = jest.fn().mockRejectedValue(mockError);

    const params: LoadInitConfigProps = {
      apiClient: {
        createApiClient: jest.fn(),
        init: mockInit,
      },
      tag: mockTag,
      integration: { configuration: mockConfiguration, location: "" },
      alokai: {
        logger,
      },
    };
    const error = new Error(
      `Error during executing init function in ${mockTag} integration. Error message: ${mockError}`
    );

    await expect(getInitConfig(params)).rejects.toThrow(error);
  });
});
