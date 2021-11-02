export default class ImageBanner {
  public constructor (private fCampaignId: string, private fContent: string) {}

  public get campaignId (): string {
    return this.fCampaignId;
  }

  public get content (): string {
    return this.fContent;
  }
}
