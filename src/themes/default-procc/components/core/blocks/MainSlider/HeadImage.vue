<template>
  <section class="head-image w-100 bg-cl-th-accent cl-white">
    <!--        // Changes by Dan-->
    <div class="container w-100 h-100" v-if="currentImage"
         v-lazy:background-image="isDefaultStore ? defaultStore.image : currentImage.image">
      <div :class="{'default-store-class': isDefaultStore}" class="head-image-content">
        <h1 :style="{color: isDefaultStore ? defaultStore.title_color : currentImage.title_color}" class="title"
            data-testid="mainSliderTitle">
          {{ isDefaultStore ? defaultStore.title : currentImage.title }}
        </h1>
        <p
          :style="{color: isDefaultStore ? defaultStore.subtitle_color : currentImage.subtitle_color}"
          data-testid="mainSliderSubtitle"
          class="subtitle mb0 serif h3 procc-title-style"
        >
          {{ isDefaultStore ? defaultStore.subtitle : currentImage.subtitle }}
        </p>
        <div :class="{'default-store-btn-class': isDefaultStore}" class="align-center inline-flex"
             v-if="isDefaultStore">
          <button-outline :link="isDefaultStore ? defaultStore.link : currentImage.link" color="light">
            {{ isDefaultStore ? defaultStore.button_text : currentImage.button_text }}
          </button-outline>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import ButtonOutline from 'theme/components/theme/ButtonOutline'
  import {mapGetters} from 'vuex'

  export default {
  components: {
    ButtonOutline
  },
    props: {
      isDefaultStore: {
        type: Boolean,
        default: false
      },
    },
  data () {
    return {
      defaultStore: {
        image: 'https://cloudinary.hbscdn.org/image/upload/s--9_mD60iD--/q_auto,c_fill,h_1296,w_2800,/v20071006/D9F534C9985893BE25AA7782CEDA7CEE.jpg',
        title: 'ProCC',
        title_color: '#f4def2',
        subtitle: 'Can you make better product photos? Register as a CC?',
        subtitle_color: '#f4def2',
        link: 'https://procc.co/signup/cc',
        button_text: 'Sign Up',
      }
    }
  },
  computed: {
    ...mapGetters({
      currentImage: 'procc/getHeadImage'
    })
  }
}
</script>

<style lang="scss" scoped>
  .procc-title-style {
    padding-left: 10px !important;
    line-height: 30px !important;
    text-shadow: 1px 1px 0px rgba(244, 222, 242, 0.48), 1px 1px 1px rgba(255, 255, 255, 0.73) !important;
  }

  .default-store-class {
    margin-left: 10rem !important;
  }

  .default-store-btn-class {
    width: 123px;
    height: 60px;
    margin: 1rem 0 0 6rem;

    & > a {
      width: 100%;
      height: 100%;
    }

    & > button {
      width: 100%;
      height: 100%;
    }
  }
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
      font-size: 2.4rem;
      margin-bottom: 0;
    }

    .subtitle {
      font-size: 1.2rem;
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
