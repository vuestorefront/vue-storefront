import { defaultErrorHandler } from "../../../src/errors/defaultErrorHandler";

describe("defaultErrorHandler", () => {
  const mockReq = {};
  const mockRes = {
    status: jest.fn(),
    send: jest.fn(),
  };

  it("should send unmasked error for error codes >= 400 && < 500", () => {
    const error = new Error("test") as any;
    error.isAxiosError = true;
    error.response = { status: 404 };

    defaultErrorHandler(error, mockReq as any, mockRes as any);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith({ message: error.message });
  });

  it("should send masked error for other error codes", () => {
    const error = new Error("test");

    defaultErrorHandler(error, mockReq as any, mockRes as any);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(
      "ServerError: Something went wrong. Please, check the logs for more details."
    );
  });
});
