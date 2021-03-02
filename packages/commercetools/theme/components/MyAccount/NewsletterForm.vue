<template>
    <form
      id="newsletter-form"
      class="form"
      @submit.prevent="submitForm"
    >
      <p class="form__title">{{ $t('Sections that interest you') }}</p>
      <div class="form__checkbox-group">
        <SfCheckbox
          v-model="newsletter.woman"
          @change="updateNewsletterField('woman', newsletter.woman)"
          label="Woman"
          value="woman"
          class="form__element"
        />
        <SfCheckbox
          v-model="newsletter.man"
          @change="updateNewsletterField('man', newsletter.man)"
          label="Man"
          value="man"
          class="form__element"
        />
        <SfCheckbox
          v-model="newsletter.kids"
          @change="updateNewsletterField('kids', newsletter.kids)"
          label="Kids"
          value="kids"
          class="form__element"
        />
      </div>
      <SfButton data-cy="newsletter-btn_join" class="form__button">{{ $t('Save changes') }}</SfButton>
    </form>
</template>

<script>
import { reactive } from '@vue/composition-api';
import { SfCheckbox, SfButton } from '@storefront-ui/vue';
export default {
  name: 'NewsletterForm',
  components: {
    SfCheckbox,
    SfButton
  },
  props: {
    newsletterData: {
      type: Object,
      default: () => ({
        woman: false,
        man: false,
        kids: false
      })
    }
  },
  setup(props, { emit }) {
    const newsletter = reactive({
      woman: props.newsletterData.woman,
      man: props.newsletterData.man,
      kids: props.newsletterData.kids
    });

    const updateNewsletterField = (fieldName, value) => {
      newsletter[fieldName] = value;
    };

    const submitForm = () => {
      emit('submit', {
        newsletter,
        onComplete: () => {},
        onError: () => {}
      });
    };

    return {
      newsletter,
      submitForm,
      updateNewsletterField
    };
  }
};
</script>

<style lang='scss' scoped>
.form {
  &__element {
    margin: 0 0 var(--spacer-base) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__checkbox-group {
    margin: 0 0 var(--spacer-xl) 0;
  }
  &__title {
    margin: 0 0 var(--spacer-base) 0;
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17.5rem;
    }
  }
}
</style>
