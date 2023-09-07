import { handleError } from "../../error";

describe("[error]", () => {
  it("should return SDKError", () => {
    const result = handleError(new Error("test"));

    expect(result.name).toEqual("SDKError");
    expect(result.message).toEqual("test");
  });

  it("if axios error should return SDKError with axios error", () => {
    const result = handleError({ name: "axios error", message: "test" });

    expect(result.name).toEqual("SDKError");
    expect(result.message).toEqual("test");
    expect(result.cause).toEqual({ message: "test", name: "axios error" });
  });
});
