import getAgnosticStatusCode, { ApolloError, AxiosError, UnknownError } from '../../src/helpers/getAgnosticStatusCode';
import bigObject from '../test-data/getAgnosticStatusCode';

const expectedStatusCode = 400;
const defaultCode = 200;
const networkErrorCode = 500;

describe('[middleware-helpers] getAgnosticStatusCode', () => {
  it('retrieves the status code from simple object', () => {
    const testData = {
      statusCode: expectedStatusCode
    } as UnknownError;

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('retrieves the status code from nested object', () => {
    const testData = {
      a: {
        b: 4,
        statusCode: expectedStatusCode
      }
    } as unknown as UnknownError;

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('retrieves the status code from big object', () => {
    const testData = {...bigObject, ...{statusCode: expectedStatusCode}} as unknown as UnknownError;
    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('retrieves the status code from nested object inside an array', () => {
    const testData = {
      a: [
        {
          statusCode: expectedStatusCode
        }
      ]
    } as unknown as UnknownError;

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('returns only the value of the first matched key', () => {
    const testData = {
      statusCode: expectedStatusCode,
      status: 500
    } as unknown as UnknownError;

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('handles values of type other than \'object\' correctly', () => {
    expect(getAgnosticStatusCode('string' as unknown as UnknownError)).toBe(defaultCode);
    expect(getAgnosticStatusCode(null as unknown as UnknownError)).toBe(defaultCode);
    expect(getAgnosticStatusCode(undefined as unknown as UnknownError)).toBe(defaultCode);
    expect(getAgnosticStatusCode(300 as unknown as UnknownError)).toBe(defaultCode);
  });

  it('not check deeper than 3 levels down', () => {
    const testData = {
      level1: {
        level2: {
          level3: {
            level4: {
              statusCode: expectedStatusCode
            }
          }
        }
      }
    } as unknown as UnknownError;

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(defaultCode);
  });

  it('retrieves status code for axios', () => {
    const testData = {
      isAxiosError: true,
      response: {
        status: expectedStatusCode
      }
    } as AxiosError;

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('retrieves status code for apollo when code is a string', () => {
    const testData = {
      code: 'someString'
    } as ApolloError;

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('retrieves status code for apollo when code is a number', () => {
    const testData = {
      code: expectedStatusCode
    } as ApolloError;

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('retrieves status code for apollo when network error occurs', () => {
    const testData = {
      networkError: expectedStatusCode
    } as ApolloError;

    const statusCode = getAgnosticStatusCode(testData);

    expect(statusCode).toBe(networkErrorCode);
  });
});
