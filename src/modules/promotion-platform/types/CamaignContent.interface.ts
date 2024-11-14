import { Dictionary } from 'src/modules/budsies'

export interface CampaignContentI {
  countdownBannerContent: string | undefined,
  productDiscountPriceDictionary: Dictionary<number> | undefined,
  imageBanner?: {
    content: string,
    campaignId: string
  },
  countdownBannerBlacklistUrls: string[]
}
