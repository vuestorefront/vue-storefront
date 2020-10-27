import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import createCommerceToolsLink from './../../src/helpers/createCommerceToolsLink';
import createAccessToken from './../../src/helpers/createAccessToken';
import { onError } from 'apollo-link-error';

jest.unmock('./../../src/helpers/createCommerceToolsLink');
// eslint-disable-next-line
(createAccessToken as any).mockImplementation(() => ({ access_token: 'access token'}));
jest.mock('apollo-link-http');
jest.mock('apollo-link-context');
jest.mock('apollo-link');
jest.mock('apollo-link-error');

describe('[commercetools-api-client] createCommerceToolsLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds an apollo link', async (done) => {
    (ApolloLink as any).mockImplementation((fn) => {
      const operation = { operationName: 'someOperation',
        variables: { draft: null } };

      fn(operation, (op) => [op]);

    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    setContext = jest.fn().mockImplementation((handler) => {
      handler({ operationName: 'test' }, { headers: { test: 1 } }).then((res) => {
        expect(res).toEqual({ headers: { test: 1,
          authorization: 'Bearer access token' } });
        done();
      });
    });

    await createCommerceToolsLink();

    expect(createHttpLink).toBeCalled();
    expect(setContext).toBeCalled();
    expect(createAccessToken).toBeCalledTimes(1);
  });

  it('raises graphql error', () => {
    const graphQLErrors = [{ message: 'some error', locations: [], path: '' }];
    const networkError = false;

    console.error = jest.fn();
    // @ts-ignore
    onError.mockImplementation((fn) => fn({ graphQLErrors, networkError }));

    createCommerceToolsLink();

    expect(console.error).toBeCalledWith('[GraphQL error]: Message: some error, Location: , Path: ');
  });

  it('skips graphql error when related to the user credentials', () => {
    const graphQLErrors = [{ message: 'Resource Owner Password Credentials Grant', locations: [], path: '' }];
    const networkError = false;

    console.error = jest.fn();
    // @ts-ignore
    onError.mockImplementation((fn) => fn({ graphQLErrors, networkError }));

    createCommerceToolsLink();

    expect(console.error).not.toBeCalled();
  });

  it('raises error when it is related to the network', () => {
    const graphQLErrors = [];
    const networkError = 'some network error';

    console.error = jest.fn();
    // @ts-ignore
    onError.mockImplementation((fn) => fn({ graphQLErrors, networkError }));

    createCommerceToolsLink();

    expect(console.error).toBeCalledWith('[Network error]: some network error');
  });

  it('handles no errors', () => {
    const graphQLErrors = false;
    const networkError = '';

    console.error = jest.fn();
    // @ts-ignore
    onError.mockImplementation((fn) => fn({ graphQLErrors, networkError }));

    createCommerceToolsLink();

    expect(console.error).not.toBeCalled();
  });
});
