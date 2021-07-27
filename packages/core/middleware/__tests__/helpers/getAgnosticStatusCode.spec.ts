import getAgnosticStatusCode from '../../src/helpers/getAgnosticStatusCode';

const testData_1 = {
  statusCode: 400
};

const testData_2 = {
  a: {
    b: 4,
    statusCode: 400
  }
};

const testData_3 = {
  a: [
    {
      statusCode: 400
    }
  ]
};

const testData_4 = {
  statusCode: 400,
  status: 500
};

describe('[middleware-helpers] getAgnosticStatusCode', () => {
  it('retrieves the status code from simple object', () => {
    const statusCode = getAgnosticStatusCode(testData_1, 'statusCode');
    expect(statusCode).toBe(400);
  });

  it('retrieves the status code from nested object', () => {
    const statusCode = getAgnosticStatusCode(testData_2, 'statusCode');
    expect(statusCode).toBe(400);
  });

  it('retrieves the status code from nested object inside an array', () => {
    const statusCode = getAgnosticStatusCode(testData_3, 'statusCode');
    expect(statusCode).toBe(400);
  });

  it('returns only the value of the first matched key', () => {
    const statusCode = getAgnosticStatusCode(testData_4, 'statusCode', 'status');
    expect(statusCode).toBe(400);
  });

  it('handles values of type other than \'object\' correctly', () => {
    expect(getAgnosticStatusCode('string', 'statusCode')).toBeUndefined;
    expect(getAgnosticStatusCode(null, 'statusCode')).toBeUndefined;
    expect(getAgnosticStatusCode(undefined, 'statusCode')).toBeUndefined;
    expect(getAgnosticStatusCode(300, 'statusCode')).toBeUndefined;
  });
});
