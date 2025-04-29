import { MimeTypeValue } from 'src/modules/shared';

export default interface ImageSourceItem {
  breakpoint: number,
  aspectRatio: number,
  srcset: string[],
  type?: MimeTypeValue
}
