import customerSignOut from './../../../src/api/customerSignOut'
import { cleanToken } from './../../../src/helpers/createCommerceToolsLink/tokenCache'


describe('[commercetools-api-client] customerSignOut', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('clears user session', async () => {
    await customerSignOut()

    expect(cleanToken).toBeCalled()
  });
});
