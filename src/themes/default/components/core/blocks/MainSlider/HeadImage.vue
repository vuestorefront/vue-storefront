<template>
  <section class="head-image w-100 bg-cl-th-accent cl-white">
    <div class="container w-100 h-100 cl-black" v-lazy:background-image="currentImage.image" v-if="currentImage">
      <div class="head-image-content">
        <h1 class="title" data-testid="mainSliderTitle">
          {{ currentImage.title }}
        </h1>
        <p
          class="subtitle mb0 serif h3"
          data-testid="mainSliderSubtitle"
        >
          {{ currentImage.subtitle }}
        </p>
        <!-- <div class="align-center inline-flex">
          <button-outline :link="currentImage.link" color="light">
            {{ currentImage.button_text }}
          </button-outline>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
// import ButtonOutline from 'theme/components/theme/ButtonOutline'
import { mapGetters } from 'vuex'

export default {
  components: {
    // ButtonOutline
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      currentImage: 'promoted/getHeadImage'
    })
  }
}
</script>

<style lang="scss" scoped>
.head-image {
  display: none;
  @media (min-width: 767px) {
    display: inherit;
  }

  .head-image-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 15%;

    .title {
      font-size: 3.4rem;
      margin-bottom: 0;
    }

    .subtitle {
      font-size: 0.8rem;
      max-width: 340px;
      font-family: 'Roboto', sans-serif;
      line-height: 1.2rem;
    }
  }
}

.head-image {
  height: 640px;
}
.container {
  background-size: cover;
  background-position: bottom center;
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
