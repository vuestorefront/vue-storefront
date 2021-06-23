import { VideoProvider } from './video-provider.value';

export default interface VideoUrlField {
  video_id: string,
  video_url: string,
  provider: VideoProvider
}
