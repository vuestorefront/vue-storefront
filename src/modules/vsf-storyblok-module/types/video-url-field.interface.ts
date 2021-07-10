import { VideoProvider } from 'src/modules/shared';

export default interface VideoUrlField {
  video_id: string,
  video_url: string,
  provider: VideoProvider
}
