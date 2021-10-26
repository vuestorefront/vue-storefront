import { Dictionary } from '../budsies/types/Dictionary.type';
import { ImageHandlerOutputFormat } from './image-handler-output-format';

export default class ImageHandlerService {
  public constructor (private fApiHost: string) {
    if (this.fApiHost.endsWith('/')) {
      this.fApiHost += '/';
    }
  }

  public getOriginalImageUrl (imageUrl: string): string {
    return `${this.fApiHost}${imageUrl}`
  }

  public getThumbnailUrl (
    imageUrl: string,
    width?: number,
    height?: number,
    shouldCrop?: boolean,
    outputFormat?: ImageHandlerOutputFormat
  ): string {
    if (!width && !height) {
      return `${this.fApiHost}${imageUrl}`;
    }

    const fit = shouldCrop ? 'cover' : 'inside';

    const params: Dictionary<any> = {
      resize: {
        width: width,
        height: height,
        fit,
        position: 'entropy',
        withoutEnlargement: true
      }
    };

    if (outputFormat) {
      params['toFormat'] = outputFormat;
    }

    const edits = btoa(JSON.stringify(params));

    if (imageUrl.startsWith('/')) {
      imageUrl = imageUrl.substr(1);
    }

    const urlObject = new URL(`${this.fApiHost}${imageUrl}`);

    urlObject.searchParams.append('edits', edits);

    return urlObject.href;
  }
}
