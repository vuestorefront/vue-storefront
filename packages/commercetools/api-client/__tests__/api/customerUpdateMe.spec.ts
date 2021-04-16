import customerUpdateMe from '../../src/api/customerUpdateMe';

jest.mock('../../src/api/customerUpdateMe/defaultMutation.ts', () => '');

const mockContext = {
  client: {
    mutate: jest.fn().mockImplementation(() => ({ data: 'MOCK_DATA' }))
  }
};

describe('[commercetools-api-client] customerUpdateMe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates customer data', async () => {
    const currentUser = { id: 1, version: 2 };
    const updatedUserData = { firstName: 'First', lastName: 'Last', email: 'email' };

    const response = await customerUpdateMe(
      mockContext,
      currentUser,
      updatedUserData
    );

    expect(mockContext.client.mutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          version: currentUser.version,
          actions: expect.arrayContaining([
            {
              setFirstName: { firstName: updatedUserData.firstName }
            },
            {
              setLastName: { lastName: updatedUserData.lastName }
            },
            {
              changeEmail: { email: updatedUserData.email }
            }
          ])
        }
      })
    );
    expect(response).toBe('MOCK_DATA');
  });
});
