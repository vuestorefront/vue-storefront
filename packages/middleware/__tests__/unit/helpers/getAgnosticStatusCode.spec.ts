import { getAgnosticStatusCode } from "../../../src/helpers";
import bigObject from "../test-data/getAgnosticStatusCode";

const expectedStatusCode = 400;
const defaultCode = 500;
const networkErrorCode = 500;

describe("[middleware-helpers] getAgnosticStatusCode", () => {
  it("retrieves the status code from simple object", () => {
    const testData = {
      statusCode: expectedStatusCode,
    };

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it("retrieves the status code from nested object", () => {
    const testData = {
      a: {
        b: 4,
        statusCode: expectedStatusCode,
      },
    };

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it("retrieves the status code from big object", () => {
    const testData = { ...bigObject, ...{ statusCode: expectedStatusCode } };
    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it("retrieves the status code from nested object inside an array", () => {
    const testData = {
      a: [
        {
          statusCode: expectedStatusCode,
        },
      ],
    };

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it("returns only the value of the first matched key", () => {
    const testData = {
      statusCode: expectedStatusCode,
      status: 500,
    };

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it("handles values of type other than 'object' correctly", () => {
    expect(getAgnosticStatusCode("string")).toBe(defaultCode);
    expect(getAgnosticStatusCode(null)).toBe(defaultCode);
    expect(getAgnosticStatusCode(undefined)).toBe(defaultCode);
    expect(getAgnosticStatusCode(300)).toBe(defaultCode);
  });

  it("not check deeper than 3 levels down", () => {
    const testData = {
      level1: {
        level2: {
          level3: {
            level4: {
              statusCode: expectedStatusCode,
            },
          },
        },
      },
    };

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(defaultCode);
  });

  it("retrieves status code for axios", () => {
    const testData = {
      isAxiosError: true,
      response: {
        status: expectedStatusCode,
      },
    };

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it("retrieves status code for axios even when status code is missing", () => {
    const testData = {
      isAxiosError: true,
    };

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(defaultCode);
  });

  it("retrieves status code for axios even when status code is missing and it's timeout", () => {
    const testData = {
      isAxiosError: true,
      code: "ECONNABORTED",
    };

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(408);
  });

  it("retrieves status code for axios even when status code is missing and recipient closed TCP connection", () => {
    const testData = {
      isAxiosError: true,
      code: "ECONNRESET",
    };

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(500);
  });

  it("retrieves status code for apollo when code is a string", () => {
    const testData = {
      code: "someString",
    };

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it("retrieves status code for apollo when code is a number", () => {
    const testData = {
      code: expectedStatusCode,
    };

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it("retrieves status code for apollo when network error occurs", () => {
    const testData = {
      networkError: expectedStatusCode,
    };

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(networkErrorCode);
  });
});
