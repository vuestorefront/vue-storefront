import { Request, Response } from "express";
import { prepareArguments } from "../../../src/handlers";

describe("[middleware-handlers] prepareArguments", () => {
  const req = { query: {} } as unknown as Request;
  const res = { locals: {} } as unknown as Response;
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    res.locals = {};
  });

  describe("when method is GET", () => {
    beforeEach(() => {
      req.method = "GET";
      req.query = {};
    });

    it('parses query param "body" as JSON', () => {
      const body = [1];
      const stringifiedBody = JSON.stringify(body);
      req.query.body = stringifiedBody;

      prepareArguments(req, res, next);

      expect(res.locals.args).toEqual(body);
    });

    it('defaults to empty object when query param "body" is not provided', () => {
      prepareArguments(req, res, next);

      expect(res.locals.args).toEqual([{}]);
    });

    it("wraps query params in array when not iterable", () => {
      const body = 1;
      const stringifiedBody = JSON.stringify(body);
      req.query.body = stringifiedBody;

      prepareArguments(req, res, next);

      expect(res.locals.args).toEqual([body]);
    });

    it("handles multiple parameters correctly", () => {
      const body = [1, 2, 3];
      const stringifiedBody = JSON.stringify(body);
      req.query.body = stringifiedBody;

      prepareArguments(req, res, next);

      expect(res.locals.args).toEqual(body);
    });
  });

  describe("when method is POST", () => {
    beforeEach(() => {
      req.method = "POST";
    });

    it("wraps query params in array when not iterable", () => {
      req.body = 1;

      prepareArguments(req, res, next);

      expect(res.locals.args).toEqual([req.body]);
    });

    it("handles multiple parameters correctly", () => {
      req.body = [1, 2, 3];

      prepareArguments(req, res, next);

      expect(res.locals.args).toEqual(req.body);
    });
  });

  it("calls next middleware", () => {
    prepareArguments(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith();
  });
});
