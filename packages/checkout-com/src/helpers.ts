/* eslint-disable */
interface PaymentPropetiesWithoutToken {
    context_id: string,
    save_payment_instrument?: boolean,
    secure3d?: boolean,
    success_url?: string,
    failure_url?: string
}

interface PaymentPropetiesWithToken extends PaymentPropetiesWithoutToken {
    token: string,
}

interface PaymentPropetiesWithOptionalToken extends PaymentPropetiesWithoutToken {
    token?: string,
}

interface PaymentMethodPayload extends PaymentPropetiesWithoutToken {
    type: string,
    token?: string,
    id?: string,
    authorization_token?: string
}

enum CKO_PAYMENT_TYPE {
    CREDIT_CARD = 1,
    SAVED_CARD,
    KLARNA,
    PAYPAL
}

const buildBasePaymentMethodPayload = ({ context_id, save_payment_instrument, secure3d, success_url, failure_url }: PaymentPropetiesWithoutToken) => ({
    context_id,
    ...(save_payment_instrument ? { save_payment_instrument } : {}),
    ...(secure3d ? { '3ds': secure3d } : {}),
    ...(success_url ? { success_url } : {}),
    ...(failure_url ? { failure_url } : {})
})

const buildPaymentPayloadStrategies = {
    [CKO_PAYMENT_TYPE.CREDIT_CARD]: (properties: PaymentPropetiesWithToken): PaymentMethodPayload => ({
        ...buildBasePaymentMethodPayload(properties),
        type: 'token',
        token: properties.token
    }),
    [CKO_PAYMENT_TYPE.SAVED_CARD]: (properties: PaymentPropetiesWithToken): PaymentMethodPayload => ({
        ...buildBasePaymentMethodPayload(properties),
        type: 'id',
        id: properties.token
    }),
    [CKO_PAYMENT_TYPE.KLARNA]: (properties: PaymentPropetiesWithToken): PaymentMethodPayload => ({
        ...buildBasePaymentMethodPayload(properties),
        type: 'klarna',
        authorization_token: properties.token
    }),
    [CKO_PAYMENT_TYPE.PAYPAL]: (properties: PaymentPropetiesWithoutToken): PaymentMethodPayload => ({
        ...buildBasePaymentMethodPayload(properties),
        type: 'paypal'
    })
};

export { CKO_PAYMENT_TYPE, buildPaymentPayloadStrategies, PaymentPropetiesWithOptionalToken, PaymentMethodPayload };
