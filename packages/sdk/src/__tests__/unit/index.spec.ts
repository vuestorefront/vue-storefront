import * as index from "../../index";

describe("[index]", () => {
  it("should export eventManager", () => {
    expect(index.eventManager).toBeDefined();
  });

  it("should export initSDK", () => {
    expect(index.initSDK).toBeDefined();
  });

  it("should export handleError", () => {
    expect(index.handleError).toBeDefined();
  });

  it("should export buildModule", () => {
    expect(index.buildModule).toBeDefined();
  });
});
