import axios, { AxiosRequestConfig } from 'axios';

import ObjectBuilderInterface from './object-builder.interface';
import { ImageType } from './imageType';
import Item from './item.model';

export default class FileProcessingRepository {
  private uploadUrl: string;
  private plushieBuilder: ObjectBuilderInterface;

  public constructor (
    uploadUrl: string,
    plushieBuilder: ObjectBuilderInterface
  ) {
    this.uploadUrl = uploadUrl;
    this.plushieBuilder = plushieBuilder;
  }

  public async uploadFile (
    file: File | Blob,
    imageType: ImageType,
    product?: string,
    onUploadProgress?: (progressEvent: ProgressEvent) => void
  ): Promise<Item> {
    const formData = new FormData();
    const fileName = file instanceof File ? file.name : 'filename';

    formData.append('file', file, fileName);

    formData.append('imageType', imageType.toString());

    if (product) {
      formData.append('product', product);
    }

    const options: AxiosRequestConfig = {
      onUploadProgress,
      headers: {
        Accept: 'application/ld+json',
        'Content-type': 'application/ld+json'
      }
    };

    const result = await axios.post(this.uploadUrl, formData, options);

    return this.plushieBuilder.buildFromJSON(result.data['item']);
  }
}
