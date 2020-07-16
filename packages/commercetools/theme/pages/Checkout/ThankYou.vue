<template>
  <div id="thank-you">
    <SfCallToAction
      class="banner"
      title="Thank you for your order!"
      :image="{
        mobile: '/thank-you/BannerM.png',
        desktop: '/thank-you/BannerD.png',
      }"
    >
      <template #description>
        <div class="banner__order-number">
          <span>Order No.</span>
          <strong>{{ order.number }}</strong>
        </div>
      </template>
    </SfCallToAction>
    <section class="section">
      <div class="order">
        <SfHeading
          title="Your Purchase"
          class="order__heading heading sf-heading--left"
          :level="3"
        />
        <p class="order__paragraph paragraph">
          You have successfully placed the order. You can check status of your
          order by using our delivery status feature. You will receive an order
          confirmation e-mail with details of your order and a link to track its
          progress.
        </p>
        <div class="order__contact">
          <SfHeading
            :level="6"
            class="heading sf-heading--left sf-heading--no-underline"
            title="Primary contacts for any questions"
          ></SfHeading>
          <div class="contact">
            <p class="contact__name">{{ address.name }}</p>
            <p class="contact__street">{{ address.street }}</p>
            <p class="contact__city">{{ address.city }}</p>
            <p class="contact__email">{{ address.email }}</p>
          </div>
        </div>
        <SfButton class="order__notifications-button button-size"
          >Allow order notifications</SfButton
        >
      </div>
      <div class="additional-info">
        <div>
          <SfHeading
            title="Your Account"
            class="heading sf-heading--left"
            :level="3"
          />
          <p class="paragraph">
            You can log to your account using e-mail and password defined
            earlier. On your account you can edit your profile data, check
            history of transactions, edit subscription to newsletter.
          </p>
        </div>
        <div>
          <SfHeading
            title="What can we improve"
            class="heading sf-heading--left"
            :level="3"
          />
          <p class="paragraph">
            Your feedback is important to us. Let us know what we could improve.
          </p>
          <SfButton
            class="feedback-button color-secondary sf-button--full-width button-size"
            >Send my feedback</SfButton
          >
        </div>
      </div>
    </section>
    <nuxt-link to="/" class="sf-button back-button color-primary button-size">Go back to shop</nuxt-link>
  </div>
</template>

<script>
import { SfHeading, SfButton, SfCallToAction } from '@storefront-ui/vue';
export default {
  components: {
    SfHeading,
    SfButton,
    SfCallToAction
  },
  setup(props, context) {
    return {
      address: {
        name: 'Divante Headquarter',
        street: 'St. Dmowskiego 17, 53-534',
        city: 'Wroclaw, Poland',
        email: 'demo@vuestorefront.io'
      },
      order: {
        number: `#${context.root.$route.query.order}`
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#thank-you {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    padding: 0 var(--spacer-sm);
    margin: 0 auto;
  }
}
.heading {
  --heading-padding: var(--spacer-base) 0;
}
.paragraph {
  margin: var(--spacer-xs) 0 var(--spacer-sm) 0;
  color: var(--c-dark-variant);
  font: var(--font-light) var(--font-base) / 1.6 var(--font-family-primary);
  @include for-desktop {
    font-weight: var(--font-normal);
    font-size: var(--font-sm);
  }
}
.banner {
  --call-to-action-color: var(--c-text);
  --call-to-action-title-font-size: var(--font-xl);
  --call-to-action-title-font-weight: var(--font-medium);
  --call-to-action-text-container-width: 50%;
  margin: 0 0 var(--spacer-base);
  @include for-desktop {
    margin: 0 0 var(--spacer-2xl) 0;
  }
  &__order-number {
    display: flex;
    flex-direction: column;
    font: var(--font-light) var(--font-sm) / 1.4 var(--font-family-primary);
    @include for-desktop {
      flex-direction: row;
      font-size: var(--font-normal);
    }
  }
}
.section {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  @include for-desktop {
    flex-direction: row;
    padding: 0;
    background: var(--c-light);
  }
}
.order {
  @include for-desktop {
    width: 100%;
    padding: var(--spacer-xl) var(--spacer-xl) var(--spacer-2xl)
      var(--spacer-2xl);
  }
  &__heading,
  &__paragraph,
  &__contact {
    @include for-mobile {
      margin: 0;
      padding-left: var(--spacer-sm);
      padding-right: var(--spacer-sm);
      background: var(--c-light);
    }
  }
  &__contact {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0 var(--spacer-sm);
      border: 2px solid var(--c-white);
      border-width: 2px 0 2px 0;
    }
  }
  &__notifications-button {
    --button-width: calc(100% - (var(--spacer-sm) * 2));
    margin: var(--spacer-base) auto 0 auto;
    @include for-desktop {
      margin: var(--spacer-xl) 0 0 0;
    }
  }
}
.contact {
  color: var(--c-dark-variant);
  font: var(--font-light) var(--font-base) / 1.6 var(--font-family-secondary);
  @include for-desktop {
    font-weight: var(--font-normal);
    font-size: var(--font-sm);
  }
  &__name,
  &__street,
  &__city {
    margin: 0;
  }
  &__mail {
    margin: var(--spacer-sm) 0;
  }
}
.additional-info {
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--spacer-xl) var(--spacer-xl) var(--spacer-2xl)
      var(--spacer-2xl);
  }
}
.feedback-button {
  margin: var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-base) 0 0 0;
  }
}
.back-button {
  --button-width: calc(100% - (var(--spacer-sm) * 2));
  margin: 0 auto var(--spacer-sm) auto;
  &:hover {
    color:white;
  }
  @include for-desktop {
    --button-background: var(--c-secondary);
    margin: var(--spacer-xl) auto;
  }
}
.button-size {
  @include for-desktop {
    --button-width: 25rem;
  }
}
</style>
