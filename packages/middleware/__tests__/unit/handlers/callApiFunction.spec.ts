import { Request, Response } from "express";
import { callApiFunction } from "../../../src/handlers";

describe("[middleware-handlers] callApiFunction", () => {
  const apiResponse = {};
  const apiError = new Error();
  const apiFunction = jest.fn(() => Promise.resolve(apiResponse));
  const errorHandler = jest.fn();
  const args = [];

  const req = {} as Request;
  const res = {
    send: jest.fn(),
    locals: { apiFunction, errorHandler, args },
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls api function with arguments", async () => {
    await callApiFunction(req, res);

    expect(apiFunction).toBeCalledTimes(1);
    expect(apiFunction).toBeCalledWith(...args);
  });

  it("sends api function response", async () => {
    await callApiFunction(req, res);

    expect(res.send).toBeCalledTimes(1);
    expect(res.send).toBeCalledWith(apiResponse);
  });

  it("passes api function error to error handler", async () => {
    apiFunction.mockRejectedValueOnce(apiError);

    await callApiFunction(req, res);

    expect(errorHandler).toBeCalledTimes(1);
    expect(errorHandler).toBeCalledWith(apiError, req, res);
  });
});
