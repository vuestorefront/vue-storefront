/* eslint-disable */
interface PaymentPropeties {
    context_id: string,
    save_payment_instrument?: boolean,
    secure3d?: boolean,
    success_url?: string,
    failure_url?: string,
    token?: string
}

interface PaymentMethodPayload extends PaymentPropeties {
    type: string,
    id?: string,
    authorization_token?: string
}

interface PaymentInstrument {
    id: string;
    type: string;
    expiry_month: number;
    expiry_year: number;
    scheme: string;
    last4: string;
    fingerprint: string;
    bin: string;
    card_type: string;
    card_category: string;
    issuer: string;
    issuer_country: string;
    product_id: string;
    product_type: string;
    avs_check: string;
    cvv_check: string;
    payouts: string;
    fast_funds: string;
    payment_instrument_id: string;
}

enum CkoPaymentType {
    NOT_SELECTED = 0,
    CREDIT_CARD = 1,
    SAVED_CARD,
    KLARNA,
    PAYPAL
}

const buildBasePaymentMethodPayload = ({ context_id, save_payment_instrument, secure3d, success_url, failure_url }: PaymentPropeties) => ({
    context_id,
    ...(save_payment_instrument ? { save_payment_instrument } : {}),
    ...(secure3d ? { '3ds': secure3d } : {}),
    ...(success_url ? { success_url } : {}),
    ...(failure_url ? { failure_url } : {})
})

const buildPaymentPayloadStrategies = {
    [CkoPaymentType.CREDIT_CARD]: (properties: PaymentPropeties): PaymentMethodPayload => ({
        ...buildBasePaymentMethodPayload(properties),
        type: 'token',
        token: properties.token
    }),
    [CkoPaymentType.SAVED_CARD]: (properties: PaymentPropeties): PaymentMethodPayload => ({
        ...buildBasePaymentMethodPayload(properties),
        type: 'id',
        token: properties.token
    }),
    [CkoPaymentType.KLARNA]: (properties: PaymentPropeties): PaymentMethodPayload => ({
        ...buildBasePaymentMethodPayload(properties),
        type: 'klarna',
        token: properties.token
    }),
    [CkoPaymentType.PAYPAL]: (properties: PaymentPropeties): PaymentMethodPayload => ({
        ...buildBasePaymentMethodPayload(properties),
        type: 'paypal'
    })
};

const getCurrentPaymentMethodPayload = (paymentMethod: CkoPaymentType, payload: PaymentPropeties) => buildPaymentPayloadStrategies[paymentMethod](payload);

export { CkoPaymentType, getCurrentPaymentMethodPayload, PaymentPropeties, PaymentMethodPayload, PaymentInstrument };
