import { AspectRatio, VideoProvider } from 'src/modules/shared';

import AssetField from './asset-field.interface';
import VideoSelectorOptions from './video-selector-options.interface';

export interface VideoSelectorField {
  video_id?: string,
  video_url?: string,
  provider?: VideoProvider,
  aspect_ratio: AspectRatio | number,
  asset?: AssetField,
  options?: VideoSelectorOptions
}
