import { setShippingMethodAction } from '../../src/helpers/cart/actions';

describe('[commercetools-api-client] setShippingMethod', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates cart shipping method', async () => {
    const shippingMethodId = 'some-id';

    const action1 = setShippingMethodAction(shippingMethodId);
    const action2 = setShippingMethodAction();

    expect(action1).toEqual({
      setShippingMethod: { shippingMethod: { id: shippingMethodId } }
    });

    expect(action2).toEqual({
      setShippingMethod: { shippingMethod: null }
    });
  });
});
