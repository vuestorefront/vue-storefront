import { authenticate } from '../../src/useUser/authenticate';

const consoleErrorSpy = jest.spyOn(console, 'error');
const customer = { email: 'test@test.com', password: '123456' };

class GraphQLMockError extends Error {
  graphQLErrors: any;

  constructor(message) {
    super();
    this.graphQLErrors = [{ message }];
  }
}

describe('[commercetools-composables] useUser/authenticate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns logged user data', async() => {
    const callback = async userData => ({ data: { user: { customer: userData }}});

    expect(await authenticate(customer, callback)).toEqual({ customer });
  });

  describe('error is called by a console error', () => {
    it('with first message from graphQL errors array', async () => {
      consoleErrorSpy.mockImplementationOnce(() => {});
      const callback = jest.fn().mockRejectedValueOnce(new GraphQLMockError('GraphQL message'));
      await expect(authenticate(customer, callback)).rejects.toThrow('GraphQL message');
    });

    it('with message from exception', async () => {
      consoleErrorSpy.mockImplementationOnce(() => {});
      const callback = jest.fn().mockRejectedValue(new Error('There is an error'));
      await expect(authenticate(customer, callback)).rejects.toThrow('There is an error');
    });
  });
});

