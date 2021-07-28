import getAgnosticStatusCode from '../../src/helpers/getAgnosticStatusCode';

describe('[middleware-helpers] getAgnosticStatusCode', () => {
  it('retrieves the status code from simple object', () => {
    const testData = {
      statusCode: 400
    };

    const statusCode = getAgnosticStatusCode(testData, 'statusCode');

    expect(statusCode).toBe(400);
  });

  it('retrieves the status code from nested object', () => {
    const testData = {
      a: {
        b: 4,
        statusCode: 400
      }
    };

    const statusCode = getAgnosticStatusCode(testData, 'statusCode');

    expect(statusCode).toBe(400);
  });

  it('retrieves the status code from nested object inside an array', () => {
    const testData = {
      a: [
        {
          statusCode: 400
        }
      ]
    };

    const statusCode = getAgnosticStatusCode(testData, 'statusCode');

    expect(statusCode).toBe(400);
  });

  it('returns only the value of the first matched key', () => {
    const testData = {
      statusCode: 400,
      status: 500
    };

    const statusCode = getAgnosticStatusCode(testData, 'statusCode', 'status');

    expect(statusCode).toBe(400);
  });

  it('handles values of type other than \'object\' correctly', () => {
    expect(getAgnosticStatusCode('string', 'statusCode')).toBeUndefined;
    expect(getAgnosticStatusCode(null, 'statusCode')).toBeUndefined;
    expect(getAgnosticStatusCode(undefined, 'statusCode')).toBeUndefined;
    expect(getAgnosticStatusCode(300, 'statusCode')).toBeUndefined;
  });
});
