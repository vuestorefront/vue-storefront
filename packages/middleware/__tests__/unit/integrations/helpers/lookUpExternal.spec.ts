import { lookUpExternal } from "../../../../src/integrations/helpers";
import { logger } from "../../../../__mocks__/logger";

const mockResult = [
  { name: "extension1", extendApiMethods: { method: () => undefined } },
];

jest.mock("../../../../src/integrations/helpers/resolveDependency.ts", () => {
  return {
    __esModule: true,
    resolveDependency: () => mockResult,
  };
});

describe("[lookUpExternal]", () => {
  it("should return array with given extension object", () => {
    const mockExtension = {
      name: "extension1",
      extendApiMethods: { method: () => undefined },
    };
    const alokai = {
      logger,
    };
    const result = lookUpExternal(alokai)(mockExtension);

    expect(result).toEqual([mockExtension]);
  });

  it("should resolve import and return given extension in array", () => {
    const alokai = {
      logger,
    };
    const result = lookUpExternal(alokai)("extension-location");

    expect(result).toEqual(mockResult);
  });
});
