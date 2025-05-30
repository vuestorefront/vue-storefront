<template>
  <div
    class="streaming-video"
    :class="{
      '-you-tube': isYouTubeVideo,
      '-short': isYouTubeShortsVideo
    }"
    :style="styles"
  >
    <div
      v-if="isYouTubeVideo"
      class="_embed-container"
    >
      <lite-youtube
        autoload
        class="_youtube-facade"
        :videoid="videoId"
        :params="youTubeVideoParams"
        :short="isYouTubeShortsVideo"
        v-if="showYouTubeFacade"
      />
    </div>

    <iframe
      class="_embed-container"
      :src="embedUrl"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
      v-else-if="embedUrl"
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
  data () {
    return {
      isYouTubeFacadeLoaded: false,
      isMounted: false
    }
  },
  async beforeMount () {
    if (!this.isYouTubeVideo) {
      return;
    }

    await import('@justinribeiro/lite-youtube');

    this.isYouTubeFacadeLoaded = true
  },
  async mounted () {
    await this.$nextTick();
    this.isMounted = true;
  },
  computed: {
    isYouTubeVideo (): boolean {
      return [VideoProvider.youtube, VideoProvider.youtubeShorts].includes(this.provider);
    },
    isYouTubeShortsVideo (): boolean {
      return this.provider === VideoProvider.youtubeShorts;
    },
    youTubeVideoParams (): string {
      return 'modestbranding=1' +
          '&rel=0' +
          '&controls=' + (this.displayControls ? 1 : 0) +
          '&autoplay=' + (this.autoPlay ? 1 : 0);
    },
    styles (): Record<string, string> {
      const result: Record<string, string> = {};

      if (!this.aspectRatio) {
        return result;
      }

      let height = 0.0;
      let aspectRatioValue = '1';

      switch (this.aspectRatio) {
        case AspectRatio.A4_3:
          height = 3 / 4;
          aspectRatioValue = '4 / 3';
          break;
        case AspectRatio.A16_10:
          height = 10 / 16;
          aspectRatioValue = '16 / 10';
          break;
        case AspectRatio.A9_16:
          height = 16 / 9;
          aspectRatioValue = '9 / 16';
          break;
        case AspectRatio.A16_9:
        default:
          height = 9 / 16;
          aspectRatioValue = '16 / 9';
          break;
      }

      result['--streaming-video-height'] = height * 100 + '%';
      result['--lite-youtube-aspect-ratio'] = aspectRatioValue;
      result['--lite-youtube-aspect-ratio-short'] = aspectRatioValue;

      return result;
    },
    embedUrl (): string | undefined {
      if (this.provider === VideoProvider.vimeo) {
        return 'https://player.vimeo.com/video/' + this.videoId;
      }

      if (this.provider === VideoProvider.wistia) {
        return 'https://fast.wistia.net/embed/iframe/' + this.videoId;
      }

      if (this.provider === VideoProvider.coub) {
        return 'https://coub.com/embed/' +
          this.videoId +
          '?muted=false' +
          '&autostart=false' +
          '&startWithHD=true';
      }

      if (this.provider === VideoProvider.dailymotion) {
        return 'https://www.dailymotion.com/embed/video/' + this.videoId;
      }

      return undefined;
    },
    showYouTubeFacade (): boolean {
      return this.isMounted && this.isYouTubeFacadeLoaded;
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

  ._youtube-facade {
    max-width: 100%;
    height: 100%;
    padding-bottom: 0;
  }

  // &.-you-tube {
  //   padding-top: calc(100% / (16 / 9));
  // }

  // @media (max-width: 40em) {
  //   &.-you-tube {
  //     &.-short {
  //       padding-top: calc(100% / (9 / 16));
  //     }
  //   }
  // }
}
</style>
