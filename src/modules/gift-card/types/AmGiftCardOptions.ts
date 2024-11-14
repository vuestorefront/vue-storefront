import { AmGiftCardType } from './AmGiftCard.type';

export interface AmGiftCardOptions {
  am_giftcard_image: number,
  am_giftcard_amount: number,
  am_giftcard_amount_custom: number,
  am_giftcard_sender_name?: string,
  am_giftcard_recipient_name?: string,
  am_giftcard_recipient_email?: string,
  am_giftcard_message?: string,
  am_giftcard_type: AmGiftCardType
}
