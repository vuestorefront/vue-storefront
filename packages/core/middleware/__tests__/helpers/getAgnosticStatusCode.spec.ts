import getAgnosticStatusCode from '../../src/helpers/getAgnosticStatusCode';
import bigObject from '../test-data/getAgnosticStatusCode';
const expectedStatusCode = 400;

describe('[middleware-helpers] getAgnosticStatusCode', () => {
  it('retrieves the status code from simple object', () => {
    const testData = {
      statusCode: expectedStatusCode
    };

    const statusCode = getAgnosticStatusCode(testData, 'statusCode');

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('retrieves the status code from nested object', () => {
    const testData = {
      a: {
        b: 4,
        statusCode: expectedStatusCode
      }
    };

    const statusCode = getAgnosticStatusCode(testData, 'statusCode');

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('retrieves the status code from big object', () => {
    const testData = {...bigObject, ...{statusCode: expectedStatusCode}};
    const statusCode = getAgnosticStatusCode(testData, 'statusCode');

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('retrieves the status code from nested object inside an array', () => {
    const testData = {
      a: [
        {
          statusCode: expectedStatusCode
        }
      ]
    };

    const statusCode = getAgnosticStatusCode(testData, 'statusCode');

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('returns only the value of the first matched key', () => {
    const testData = {
      statusCode: expectedStatusCode,
      status: 500
    };

    const statusCode = getAgnosticStatusCode(testData, 'statusCode', 'status');

    expect(statusCode).toBe(expectedStatusCode);
  });

  it('handles values of type other than \'object\' correctly', () => {
    expect(getAgnosticStatusCode('string', 'statusCode')).toBeUndefined;
    expect(getAgnosticStatusCode(null, 'statusCode')).toBeUndefined;
    expect(getAgnosticStatusCode(undefined, 'statusCode')).toBeUndefined;
    expect(getAgnosticStatusCode(300, 'statusCode')).toBeUndefined;
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
    };

    const statusCode = getAgnosticStatusCode(testData, 'statusCode');

    expect(statusCode).toBe(undefined);
  });
});
