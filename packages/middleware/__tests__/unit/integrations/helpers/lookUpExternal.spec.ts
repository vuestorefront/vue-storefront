import { lookUpExternal } from "../../../../src/integrations/helpers";

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
    const result = lookUpExternal(mockExtension);

    expect(result).toEqual([mockExtension]);
  });

  it("should resolve import and return given extension in array", () => {
    const result = lookUpExternal("extension-location");

    expect(result).toEqual(mockResult);
  });
});
