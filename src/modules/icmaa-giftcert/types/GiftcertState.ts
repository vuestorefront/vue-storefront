export default interface Giftcert {
  number: string,
  balance: number,
  expires: string,
  currency: string
}

export interface GiftcertResult {
  cert_id: number,
  cert_number: string,
  balance: number,
  currency_code: string,
  pin: number,
  status: string,
  expire_at: string|null,
  recipient_name: string|null,
  recipient_email: string|null,
  recipient_address: string|null,
  recipient_message: string|null,
  store_id: number,
  sender_name: string
}
