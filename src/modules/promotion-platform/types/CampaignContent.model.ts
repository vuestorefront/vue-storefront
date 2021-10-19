import { Dictionary } from 'src/modules/budsies';

export default class CampaignContent {
  public constructor (
    private fCountdownBannerContent?: string,
    private fDiscountsContent?: Dictionary<string>,
    private fImageBannerContent?: string,
    private fCountdownBannerBlacklistUrls: string[] = []
  ) {}

  public get countdownBannerContent (): string | undefined {
    return this.fCountdownBannerContent;
  }

  public get countdownBannerBlacklistUrls (): string [] {
    return this.fCountdownBannerBlacklistUrls;
  }

  public get discountsContent (): Dictionary<string> | undefined {
    return this.fDiscountsContent;
  }

  public get imagesBannerContent (): string | undefined {
    return this.fImageBannerContent;
  }
}
