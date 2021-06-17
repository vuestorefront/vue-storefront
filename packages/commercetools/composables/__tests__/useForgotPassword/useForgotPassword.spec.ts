import { useForgotPassword } from '../../src/useForgotPassword';

jest.mock('@vue-storefront/core', () => ({
  useForgotPasswordFactory: (params) => () => params
}));

const mockedStringValue = '1234';

const context = {
  $ct: {
    api: {
      customerCreatePasswordResetToken: jest.fn(() =>
        Promise.resolve({
          data: {
            customerCreatePasswordResetToken: {
              value: mockedStringValue
            }
          }
        })),
      customerResetPassword: jest.fn(() =>
        Promise.resolve(Boolean({
          data: {
            customerResetPassword: {
              id: mockedStringValue
            }
          }
        })))
    }
  }
};

describe('[commercetools-composables] useForgotPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates reset password token', async () => {
    const { resetPassword } = useForgotPassword() as any;

    const response = await resetPassword(context, { email: 'xxx1' });

    expect(response).toEqual(mockedStringValue);
    expect(context.$ct.api.customerCreatePasswordResetToken).toBeCalledWith('xxx1', undefined);
  });
  it('sets new password after reset', async () => {
    const { setNewPassword } = useForgotPassword() as any;

    const response = await setNewPassword(context, { tokenValue: mockedStringValue, newPassword: mockedStringValue });

    const mockedFalseValueAfterChangingPassword = false;

    expect(response).toEqual(mockedFalseValueAfterChangingPassword);
    expect(context.$ct.api.customerResetPassword).toBeCalledWith(mockedStringValue, mockedStringValue, undefined);
  });
});
