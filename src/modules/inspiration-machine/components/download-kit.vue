<template>
  <div class="inspiration-machine-download-kit">
    <div class="_section">
      <SfHeading :level="2" :title="firstSectionTitle" />

      <p class="_text">
        {{ topText }}
      </p>

      <div>
        <p class="_text">
          {{ $t('Your Inspiration Kit Includes:') }}
        </p>

        <ul class="_list">
          <li>{{ $t('Drawing template of the creation type you chose') }}</li>

          <li>{{ $t('Drawing templates of any extras you selected') }}</li>
        </ul>
      </div>

      <a
        :href="kitDownloadUrl"
        target="_blank"
        :aria-label="$t('Download Your Kit') + ' ' + $t('opens in new tab')"
        class="_button"
      >
        <SfButton>
          {{ $t('Download Your Kit') }}
        </SfButton>
      </a>
    </div>

    <div class="_section">
      <SfHeading :level="2" :title="$t('Dongler\'s Dinner Quest (value of $24.95)')" />

      <p class="_text">
        {{ $t('Over 25 beautifully illustrated color pages take Dongler through a magical land as he makes his trek home for dinner. From the delight of a yummy chocolate bar to the freight of a dark forest, your child\'s illustrations will help Dongler get home in time for dinner!') }}
      </p>

      <a
        :href="storybookDownloadUrl"
        target="_blank"
        :aria-label="$t('Download The Storybook') + ' ' + $t('opens in new tab')"
        class="_button"
      >
        <SfButton>
          {{ $t('Download The Storybook') }}
        </SfButton>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { SfButton, SfHeading } from '@storefront-ui/vue';

import config from 'config';

export default Vue.extend({
  name: 'InspirationMachineDownloadKit',
  props: {
    characterId: {
      type: Number,
      required: true
    },
    extraIds: {
      type: Array as PropType<number[]>,
      default: () => []
    },
    isSendToEmail: {
      type: Boolean,
      required: true
    },
    storybookDownloadUrl: {
      type: String,
      required: true
    }
  },
  components: {
    SfButton,
    SfHeading
  },
  computed: {
    topText (): string {
      return this.isSendToEmail
        ? this.$t('Check your email for everything you need to make your epic Budsies creation, plus your free drawing and storybook featuring the one-and-only, Dongler!').toString()
        : this.$t('Here\'s everything you need to make an epic Budsies creation, plus your free drawing and storybook featuring the one-and-only, Dongler!').toString()
    },
    kitDownloadUrl (): string {
      return `${config.budsies.magentoDomain}/inspiration/index/downloadGuide/character_id/${this.characterId}/extras_id/${JSON.stringify(this.extraIds)}/`;
    },
    firstSectionTitle (): string {
      return this.isSendToEmail
        ? this.$t('Your Inspiration Kit Is On It\'s Way!').toString()
        : this.$t('Your Creation Awaits!').toString();
    }
  }
})
</script>

<style lang="scss" scoped>
.inspiration-machine-download-kit {
  text-align: center;

  ._list {
    list-style: disc;
    display: inline-block;
    text-align: start;
    margin-top: var(--spacer-sm);
  }

  ._text {
    margin: var(--spacer-sm) 0 0;
  }

  ._section {
    margin-top: var(--spacer-xl);

    &:first-child {
      margin-top: 0;
    }
  }

  ._button {
    margin: var(--spacer-base) auto 0;
    display: inline-block;
  }
}
</style>
