<template>
  <section class="head-image w-100 bg-cl-th-accent cl-white">
    <div class="container w-100" v-lazy:background-image="currentImage.image">
      <div class="row middle-xs center-xs">
        <div class="col-md-12 px10p">
          <p
            class="subtitle mb0 serif uppercase h3 align-center"
            data-testid="mainSliderSubtitle"
          >
            {{ currentImage.subtitle }}
          </p>
          <h1 class="title mt0 mb30 align-center" data-testid="mainSliderTitle">
            {{ currentImage.title }}
          </h1>
          <div class="align-center inline-flex">
            <button-outline :link="currentImage.link" color="light">
              {{ currentImage.button_text }}
            </button-outline>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { image } from 'theme/resource/main-image.json'
import ButtonOutline from 'theme/components/theme/ButtonOutline'

export default {
  components: {
    ButtonOutline
  },
  data () {
    return {
    }
  },
  computed: {
    currentImage () {
      return image
    }
  }
}
</script>

<style lang="scss" scoped>
.head-image {
  display: none;

  @media (min-width: 767px) {
    display: inherit;
  }
}
h1 {
  font-size: 72px;
}
.head-image {
  height: 640px;
}
.container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.row {
  height: 640px;
}
@media (max-width: 75em) {
  .head-image {
    height: 400px;
  }
  .title {
    font-size: 50px;
  }
  .subtitle {
    font-size: 20px;
  }
  .row {
    height: 400px;
  }
}
@media (max-width: 64em) {
  .head-image {
    height: 359px;
  }
  .container {
    background-position: left;
  }
  .title {
    font-size: 48px;
  }
  .subtitle {
    font-size: 18px;
  }
  .button {
    font-size: 16px;
  }
  .row {
    height: 359px;
  }
}
</style>
