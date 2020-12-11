
import {
  markMethodDeprecated,
  markCustomQueryDeprecated
} from '../../src/helpers';
import { Logger } from '../../src/utils';

jest.mock('../../src/utils', () => ({
  Logger: {
    warn: jest.fn()
  }
}));

describe('[CORE - helpers]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('markMethodDeprecated returns oldFn with warn if provided', () => {
    const newOne = () => {};
    const oldOne = () => {};
    const msg = 'msg-test-1';
    const response = markMethodDeprecated(msg, newOne, oldOne);

    expect(response).toBe(oldOne);
    expect(Logger.warn).toHaveBeenCalledWith(msg);
  });

  it('markMethodDeprecated returns newFn if oldFn not provided', () => {
    const newOne = () => {};
    const msg = 'msg-test-1';
    const response = markMethodDeprecated(msg, newOne);

    expect(response).toBe(newOne);
    expect(Logger.warn).not.toHaveBeenCalled();
  });

  it('markCustomQueryDeprecated returns first argument if it is not a function', () => {
    const badTypeCustomQuery = 123;
    const response = markCustomQueryDeprecated(badTypeCustomQuery as any);

    expect(response).toBe(badTypeCustomQuery);
  });

  it('markCustomQueryDeprecated wraps function with Logger.warn and returns it', () => {
    const query = 1;
    const variables = 2;
    const willReturn = 'returned';
    const customQuery = jest.fn(() => willReturn);

    const response = markCustomQueryDeprecated(customQuery as any);
    response(query, variables);

    expect(Logger.warn).toHaveBeenCalledWith('customQuery in third argument is deprecated. Please move it to the second argument inside the object');
    expect(customQuery).toHaveBeenCalledWith(query, variables);
  });

  it('markCustomQueryDeprecated wraps function with Logger.warn with custom message and returns it', () => {
    const query = 1;
    const variables = 2;
    const willReturn = 'returned';
    const customMsg = 'custom-msg-1';
    const customQuery = jest.fn(() => willReturn);

    const response = markCustomQueryDeprecated(customQuery as any, customMsg);
    response(query, variables);

    expect(Logger.warn).toHaveBeenCalledWith(customMsg);
    expect(customQuery).toHaveBeenCalledWith(query, variables);
  });
});
