const MAESTRA_CUSTOMER_DATA_CAPTURED_CALLBACK_NAME = 'onMaestraCustomerDataCaptured';

interface MaestraCustomerDataCapturedEventData {
  email?: string,
  phoneNumber?: string
}

export const maestraCallbacksFactory = (
  setEmail: (email: string) => void,
  setPhoneNumber: (phoneNumber: string) => void
) => {
  const maestraCallbacks: Record<string, (data?: MaestraCustomerDataCapturedEventData) => void> = {};

  maestraCallbacks[MAESTRA_CUSTOMER_DATA_CAPTURED_CALLBACK_NAME] = (data?: MaestraCustomerDataCapturedEventData) => {
    if (data?.email) {
      setEmail(data.email);
    }

    if (data?.phoneNumber) {
      setPhoneNumber(data.phoneNumber);
    }
  };

  return maestraCallbacks;
};
