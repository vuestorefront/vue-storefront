import { createExtensions } from "../../../../src/integrations/helpers";

jest.mock("../../../../src/integrations/helpers/lookUpExternal.ts", () => {
  return {
    __esModule: true,
    lookUpExternal: jest.fn((val: any) => {
      if (typeof val === "string") return [{ name: "extension1" }];
      return [val];
    }),
  };
});

describe("[createExtensions]", () => {
  it("should resolve paths and flatten extensions", () => {
    const mockRawExtensions = [
      "module-path",
      { name: "extension2", extendApiMethods: {} },
    ];
    const result = createExtensions(mockRawExtensions);

    expect(result).toEqual([
      { name: "extension1" },
      { name: "extension2", extendApiMethods: {} },
    ]);
  });
});
