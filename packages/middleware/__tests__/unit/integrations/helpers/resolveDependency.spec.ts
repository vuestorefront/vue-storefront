import { resolveDependency } from "../../../../src/integrations/helpers";
import { logger } from "../../../../__mocks__/logger";

jest.mock("consola");

beforeEach(() => {
  jest.resetModules();
});

jest.mock("/fake-module.js", () => "module loaded", { virtual: true });

describe("[resolveDependency]", () => {
  it("should resolve module when exists", () => {
    const mockDepName = "fake-module.js";
    const alokai = {
      logger,
    };
    const result = resolveDependency(mockDepName, alokai);

    expect(result).toEqual("module loaded");
  });

  it("should throw an error when module does not exist", () => {
    const mockDepName = "invalid-module.js";
    const alokai = {
      logger,
    };
    const error = new Error(
      `Could not resolve integration "${mockDepName}". See the error above for more details.`
    );

    expect(() => resolveDependency(mockDepName, alokai)).toThrow(error);
  });
});
