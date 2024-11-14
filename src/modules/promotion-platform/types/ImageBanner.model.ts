import { ImageBannerI } from './ImageBanner.interface';

export default class ImageBanner implements ImageBannerI {
  public constructor (private fCampaignId: string, private fContent: string) {}

  public get campaignId (): string {
    return this.fCampaignId;
  }

  public get content (): string {
    return this.fContent;
  }

  public toPlainObject (): ImageBannerI {
    return {
      campaignId: this.campaignId,
      content: this.content
    }
  }

  public static fromPlainObject (payload: ImageBannerI): ImageBanner {
    return new ImageBanner(payload.campaignId, payload.content);
  }
}
