<template>
  <SfTabs :open-tab="1" class="tab-orphan">
    <SfTab data-cy="my-newsletter-tab" title="My newsletter">
      <p class="message">
        {{ $t('Set up newsletter') }}
      </p>

      <NewsletterForm
        @submit="updateNewsletter"
        :newsletterData="newsletter"
      />

      <p class="notice">
        {{ $t('Read and understand') }} <SfLink class="notice__link" href="#">{{ $t('Privacy') }}</SfLink> and
        <SfLink class="notice__link" href="#">{{ $t('Cookies Policy') }}</SfLink> {{ $t('Commercial information') }}
      </p>
    </SfTab>
  </SfTabs>
</template>

<script>
import { SfTabs, SfCheckbox, SfButton, SfLink } from '@storefront-ui/vue';
import NewsletterForm from '~/components/MyAccount/NewsletterForm';
import { useNewsletter } from '<%= options.generate.replace.composables %>';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'MyNewsletter',
  components: {
    SfTabs,
    SfCheckbox,
    SfButton,
    SfLink,
    NewsletterForm
  },
  setup() {
    const { updateNewsletterData, load: loadNewsletterData, newsletter } = useNewsletter();

    const updateNewsletter = async ({ newsletter, onComplete, onError }) => {
      try {
        const data = await updateNewsletterData(newsletter);
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    onSSR(async () => {
      await loadNewsletterData();
    });

    return {
      updateNewsletter,
      newsletter
    };
  }
};
</script>

<style lang='scss' scoped>
.tab-orphan {
  @include for-mobile {
    --tabs-title-display: none;
    --tabs-content-padding: 0;
    --tabs-conent-border-width: 0;
  }
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-dark-variant);
}
.notice {
  margin: var(--spacer-base) 0 0 0;
  font-size: var(--font-size--xs);
  &__link {
  color: var(--c-primary);
  text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}

</style>
