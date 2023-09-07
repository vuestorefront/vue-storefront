import { MiddlewareContext } from "../../../src/types";
import { createExtendQuery } from "../../../src/apiClientFactory/createExtendQuery";

describe("[createExtendQuery]", () => {
  it("should return customized customQuery when available in context", () => {
    const context = {
      customQueries: {
        myQuery: () => {
          return { query: "test", variables: { data: {} } };
        },
      },
    } as unknown as MiddlewareContext;

    const customQuery = { somekey: "myQuery" };
    const defaults = {
      somekey: {
        query: "initial",
        variables: { value: 1 },
      },
    };

    const result = createExtendQuery(context)(customQuery, defaults);

    expect(result).toEqual({
      somekey: { query: "test", variables: { data: {} } },
    });
  });

  it("should return default query when matching customQuery not available in context", () => {
    const context = {
      customQueries: {
        myOtherQuery: () => {
          return { query: "test", variables: { data: {} } };
        },
      },
    } as unknown as MiddlewareContext;

    const customQuery = { somekey: "myQuery" };
    const defaults = {
      somekey: {
        query: "initial",
        variables: { value: 1 },
      },
    };

    const result = createExtendQuery(context)(customQuery, defaults);

    expect(result).toEqual(defaults);
  });

  it("should return default query when customQueries not available in context", () => {
    const context = {} as unknown as MiddlewareContext;

    const customQuery = { somekey: "myQuery" };
    const defaults = {
      somekey: {
        query: "initial",
        variables: { value: 1 },
      },
    };

    const result = createExtendQuery(context)(customQuery, defaults);

    expect(result).toEqual(defaults);
  });

  it("should return default query when customQuery is not provided", () => {
    const context = {} as unknown as MiddlewareContext;

    const defaults = {
      somekey: {
        query: "initial",
        variables: { value: 1 },
      },
    };

    const result = createExtendQuery(context)(null, defaults);

    expect(result).toEqual(defaults);
  });
});
