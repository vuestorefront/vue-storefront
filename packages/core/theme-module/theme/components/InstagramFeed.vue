<template>
  <SfSection title-heading="Share Your Look" subtitle-heading="#YOURLOOK" class="section">
    <div class="grid grid-images">
      <div class="grid__row">
        <div class="grid__col">
          <SfImage src="/homepage/imageA.jpg" :width="486" :height="486">katherina_trn</SfImage>
        </div>
        <div class="grid__col">
          <SfImage src="/homepage/imageB.jpg" :width="486" :height="486">katherina_trn</SfImage>
        </div>
      </div>
      <div class="grid__row">
        <div class="grid__col">
          <SfImage src="/homepage/imageC.jpg" :width="486" :height="486">katherina_trn</SfImage>
        </div>
        <div class="grid__col">
          <SfImage src="/homepage/imageD.jpg" :width="486" :height="486">katherina_trn</SfImage>
        </div>
      </div>
    </div>
  </SfSection>
</template>
<script>
import {
  SfSection,
  SfImage
} from '@storefront-ui/vue';
export default {
  name: 'InstagramFeed',
  components: {
    SfSection,
    SfImage
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/variables";
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.grid {
  max-width: 960px;
  margin: auto;
  &__row {
    display: flex;
    & + & {
      margin-top: $spacer-big / 2;
      @include for-desktop {
        margin-top: $spacer-big;
      }
    }
  }
  &__col {
    margin: 0;
    flex: 1;
    & + & {
      margin-left: $spacer-big / 2;
      @include for-desktop {
        margin-left: $spacer-big;
      }
    }
  }
}
</style>
