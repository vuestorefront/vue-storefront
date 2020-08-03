import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import createCommerceToolsLink from './../../src/helpers/create-virtocommerce-link';

jest.unmock('./../../src/helpers/create-virtocommerce-link');
jest.mock('apollo-link-http');
jest.mock('apollo-link-context');
jest.mock('apollo-link');

describe('[virtocommerce-api-client] createVirtoCommerceLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds an apollo link', async () => {
    (ApolloLink as any).mockImplementation((fn) => {
      const operation = { operationName: 'someOperation',
        variables: { draft: null } };

      fn(operation, (op) => [op]);
    });

    createCommerceToolsLink();

    expect(createHttpLink).toBeCalled();
  });
});
