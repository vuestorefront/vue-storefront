import { resolveDependency } from "../../../../src/integrations/helpers";

jest.mock("consola");

beforeEach(() => {
  jest.resetModules();
});

jest.mock("/fake-module.js", () => "module loaded", { virtual: true });

describe("[resolveDependency]", () => {
  it("should resolve module when exists", () => {
    const mockDepName = "fake-module.js";
    const result = resolveDependency(mockDepName);

    expect(result).toEqual("module loaded");
  });

  it("should throw an error when module does not exist", () => {
    const mockDepName = "invalid-module.js";
    const error = new Error(
      `Could not resolve integration "${mockDepName}". See the error above for more details.`
    );

    expect(() => resolveDependency(mockDepName)).toThrow(error);
  });
});
