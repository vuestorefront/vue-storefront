interface KlaviyoFormsEventData {
  type: string,
  metaData?: {
    $email?: string,
    $phone_number?: string
  }
}

interface KlaviyoFormsEvent extends CustomEvent {
  detail: KlaviyoFormsEventData
}

export const klaviyoFormsHandlerFactory = (
  setEmail: (email: string) => void,
  setPhoneNumber: (phoneNumber: string) => void
) => {
  return (event: Event): void => {
    const customEvent = event as KlaviyoFormsEvent;
    const { type, metaData } = customEvent.detail;

    if (type !== 'stepSubmit' || !metaData) {
      return;
    }

    const { $email, $phone_number } = metaData;

    if ($email) {
      setEmail($email);
    }

    if ($phone_number) {
      setPhoneNumber($phone_number);
    }
  };
};
