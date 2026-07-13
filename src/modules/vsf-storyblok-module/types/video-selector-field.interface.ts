import { AspectRatio, VideoProvider } from 'src/modules/shared';

import AssetField from './asset-field.interface';

export interface VideoSelectorField {
  video_id?: string,
  video_url?: string,
  provider?: VideoProvider,
  aspect_ratio: AspectRatio | number,
  asset?: AssetField,
  autoplay?: boolean,
  muted?: boolean,
  loop?: boolean,
  display_controls?: boolean
}
