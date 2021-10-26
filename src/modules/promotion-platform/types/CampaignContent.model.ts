import { Dictionary } from 'src/modules/budsies';
import ImageBanner from './ImageBanner.model';

export default class CampaignContent {
  public constructor (
    private fCountdownBannerContent?: string,
    private fProductDiscountPriceDictionary?: Dictionary<number>,
    private fImageBanner?: ImageBanner,
    private fCountdownBannerBlacklistUrls: string[] = []
  ) {}

  public get countdownBannerContent (): string | undefined {
    return this.fCountdownBannerContent;
  }

  public get countdownBannerBlacklistUrls (): string [] {
    return this.fCountdownBannerBlacklistUrls;
  }

  public get productDiscountPriceDictionary (): Dictionary<number> | undefined {
    return this.fProductDiscountPriceDictionary;
  }

  public get imageBanner (): ImageBanner | undefined {
    return this.fImageBanner;
  }
}
