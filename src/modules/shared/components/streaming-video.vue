<template>
  <div class="streaming-video" :style="styles">
    <iframe
      class="_embed-container"
      :src="embedUrl"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      v-if="embedUrl"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { AspectRatio } from '../types/aspect-ratio.value';
import { VideoProvider } from '../types/video-provider.value';

export default Vue.extend({
  name: 'StreamingVideo',
  props: {
    videoId: {
      type: String,
      required: true
    },
    provider: {
      type: String as PropType<VideoProvider>,
      required: true
    },
    aspectRatio: {
      type: String,
      default: AspectRatio.A16_9
    },
    displayControls: {
      type: Boolean,
      default: false
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styles (): Record<string, string> {
      const result: Record<string, string> = {};

      if (!this.aspectRatio) {
        return result;
      }

      let height = 0.0;

      switch (this.aspectRatio) {
        case AspectRatio.A4_3:
          height = 3 / 4;
          break;
        case AspectRatio.A16_10:
          height = 10 / 16;
          break;
        case AspectRatio.A16_9:
        default:
          height = 9 / 16;
          break;
      }

      result['--streaming-video-height'] = height * 100 + '%';

      return result;
    },
    embedUrl (): string | undefined {
      if (this.provider === VideoProvider.youtube) {
        return '//www.youtube.com/embed/' +
          this.videoId +
          '?modestbranding=1' +
          '&rel=0' +
          '&controls=' + (this.displayControls ? 1 : 0) +
          '&autoplay=' + (this.autoPlay ? 1 : 0);
      }

      if (this.provider === VideoProvider.vimeo) {
        return '//player.vimeo.com/video/' + this.videoId;
      }

      if (this.provider === VideoProvider.wistia) {
        return '//fast.wistia.net/embed/iframe/' + this.videoId;
      }

      if (this.provider === VideoProvider.coub) {
        return '//coub.com/embed/' +
          this.videoId +
          '?muted=false' +
          '&autostart=false' +
          '&startWithHD=true';
      }

      if (this.provider === VideoProvider.dailymotion) {
        return '//www.dailymotion.com/embed/video/' + this.videoId;
      }

      return undefined;
    }
  }
});
</script>

<style lang="scss" scoped>
.streaming-video {
  position: relative;
  padding-top: var(--streaming-video-height, 56.25%);

  ._embed-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    box-sizing: border-box;
  }
}
</style>
