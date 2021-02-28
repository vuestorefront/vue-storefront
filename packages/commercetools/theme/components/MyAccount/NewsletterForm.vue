<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="newsletter-form"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
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
  </ValidationObserver>
</template>

<script>
import { reactive } from '@vue/composition-api';
import { ValidationObserver } from 'vee-validate';
import { SfCheckbox, SfButton } from '@storefront-ui/vue';
export default {
  name: 'NewsletterForm',
  components: {
    SfCheckbox,
    SfButton,
    ValidationObserver
  },
  setup(_, { emit }) {
    const newsletter = reactive({
      woman: false,
      man: false,
      kids: false
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
