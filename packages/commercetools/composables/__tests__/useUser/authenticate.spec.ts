import { authenticate } from '../../src/useUser/authenticate';

const consoleErrorSpy = jest.spyOn(console, 'error');

describe('[commercetools-composables] useUser/authenticate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns logged user data', async() => {
    const customer = {email: 'test@test.com', password: '123456'};
    const callback = async userData => ({data: {user: { customer: userData}}});
    expect(await authenticate(customer, callback)).toEqual({ customer });
  });
  describe('error is called by a console error', () => {
    it('with first message from graphQL errors array', async () => {
      consoleErrorSpy.mockImplementationOnce(() => {});
      const callback = () => {
        throw {graphQLErrors: [{message: 'There is an error'}]};
      };
      await authenticate({email: '', password: ''}, callback);
      expect(consoleErrorSpy).toBeCalledWith('There is an error');
    });
    it('with message from exception', async () => {
      consoleErrorSpy.mockImplementationOnce(() => {});
      const callback = () => {
        throw 'There is an error';
      };
      await authenticate({email: '', password: ''}, callback);
      expect(consoleErrorSpy).toBeCalledWith('There is an error');
    });
  });
});

