<template>
  <div class="raffle-pending">
    <SfHeading :level="2" :title="$t('Congrats!')" />

    <div class="_subtitle">
      {{ $t('You have the following ticket(s):') }}
    </div>

    <ul class="_tickets-list">
      <li
        class="_ticket"
        v-for="ticket in tickets"
        :key="ticket.code"
      >
        <div class="_code">
          {{ ticket.code }}
        </div>
      </li>

      <li class="_more-tickets">
        <div class="_text">
          {{ $t('Refer Friends to') }}
          <br>
          {{ $t('Get More Tickets') }}
        </div>
      </li>
    </ul>

    <p class="_email-notification">
      {{ $t('We will email you when your ticket is called and a spot has opened for your Specialty Commissions creation. Once your ticket is chosen, you will be able to submit your order. Raffle drawings will occur on a weekly basis until every ticket holder has been called.') }}
    </p>

    <SfHeading
      class="_title"
      :level="3"
      :title="$t('Share your link with your friends to earn more raffle tickets')"
    />

    <div class="_referral-link-container">
      <a
        class="_referral-link"
        :href="referralLink"
        target="_blank"
        :aria-label="referralLink + ' ' + $t('opens in new tab')"
      >
        {{ referralLink }}
      </a>

      <div class="_referral-link-copy" @click="onCopyLinkClick" />
    </div>

    <div class="_referral-mobile-hint">
      {{ $t('Tap & hold link to copy') }}
    </div>

    <ul class="_list">
      <li>
        {{ $t('More registrants from your unique link = more tickets + better odds for you!') }}
      </li>

      <li>
        {{ $t('When anyone clicks this link and reserves their spot, you will receive an additional ticket.') }}
      </li>
    </ul>

    <m-social-sharing
      class="_social-sharing"
      :sharing-url="sharingData.url"
      :sharing-description="sharingData.description"
      :twitter-description="sharingData.twitterDescription"
      :e-mail-subject="sharingData.eMailSubject"
    />

    <SfHeading
      class="_title _good-luck"
      :level="3"
      :title="$t('Good luck!')"
    />

    <SfButton
      class="_winning-tickets sf-button--text"
      @click.prevent="$emit('show-previous-winning-tickets-button-click')"
    >
      {{ $t('See past winning numbers') }}
    </SfButton>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { SfButton, SfHeading } from '@storefront-ui/vue';

import ParticipantData from '../models/participant-data.model';
import Ticket from '../models/ticket.model';
import { TicketStatusValue } from '../types/ticket-status.value';

import MSocialSharing from 'theme/components/molecules/m-social-sharing.vue';

export default Vue.extend({
  name: 'RafflePending',
  components: {
    SfButton,
    SfHeading,
    MSocialSharing
  },
  props: {
    participantData: {
      type: Object as PropType<ParticipantData>,
      required: true
    }
  },
  computed: {
    tickets (): Ticket[] {
      return this.participantData.tickets.filter(
        (ticket) => ticket.status &&
         ticket.status === TicketStatusValue.PENDING
      );
    },
    referralLink (): string {
      return this.participantData.referralLink;
    },
    sharingData (): {
      url: string,
      description: string,
      twitterDescription: string,
      eMailSubject: string
    } {
      return {
        url: this.participantData.referralLink,
        description: this.$t('Hey! Check out these Specialty Commissions from Budsies. You send them a photo of your drawing, ref sheet or artwork, and they make it into a custom stuffed animal. Here is a VIP link:').toString(),
        twitterDescription: this.$t('Woah! Now you can turn your original characters and drawings into plush @Budsies').toString(),
        eMailSubject: this.$t('Woah! You can turn your original characters and drawings into plush').toString()
      }
    }
  },
  methods: {
    onCopyLinkClick (): void {
      navigator.clipboard.writeText(this.participantData.referralLink);
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/helpers/breakpoints';

.raffle-pending {

  ._subtitle {
    color: var(--c-warning);
    font-weight: var(--font-bold);
    text-align: center;
    margin-top: var(--spacer-base);
  }

  ._tickets-list {
    margin-top: var(--spacer-base);
    text-align: center;
    list-style: none;
  }

  ._ticket {
    background-image: url(../assets/ticket_background_left.png);
    background-position-x: left;
    background-repeat: no-repeat;
    display: inline-block;
    height: 100px;
    margin-bottom: 1em;
    max-width: 310px;
    min-width: 180px;
    overflow: hidden;
  }

  ._more-tickets {
    background-image: url(../assets/transparent_ticket.png);
    display: inline-block;
    height: 100px;
    margin-bottom: 1em;
    overflow: hidden;
    text-align: center;
    width: 210px;
    font-weight: var(--font-bold);

    ._text {
      margin-top: var(--spacer-base);
    }
  }

  ._email-notification {
    margin-top: var(--spacer-lg);
    margin-bottom: 0;
  }

  ._code {
    background-image: url(../assets/ticket_background_right.png);
    background-position-x: right;
    background-repeat: no-repeat;
    color: #6e3f43;
    display: block;
    font-size: 20px;
    font-weight: bold;
    line-height: 100px;
    margin-left: 55px;
    padding-right: 55px;
  }

  ._title {
    --heading-title-font-size: var(--font-xl);
    margin-top: var(--spacer-lg);
  }

  ._referral-link-container {
    text-align: center;
    margin-top: var(--spacer-sm);

    ._referral-link {
      color: var(--c-primary);
      line-height: 1;
    }

    ._referral-link-copy {
      background: url(../assets/btn-copy.png) no-repeat center center;
      cursor: pointer;
      display: none;
      height: 3.5em;
      vertical-align: middle;
      width: 2.5em;
    }
  }

  ._referral-mobile-hint {
    margin-top: var(--spacer-sm);
    font-size: var(--font-sm);
    text-align: center;
  }

  ._list {
    margin-top: var(--spacer-sm);
  }

  ._social-sharing {
    margin-top: var(--spacer-xl);
    text-align: center;
  }

  ._good-luck {
    margin-top: var(--spacer-xl);
  }

  ._winning-tickets {
    margin: var(--spacer-sm) auto 0;
    display: block;
    text-decoration: none;
    color: var(--c-link);
    font-size: var(--font-sm);
  }

  @include for-desktop {
    ._referral-link-container {
      ._referral-link-copy {
        display: inline-block;
      }
    }

    ._referral-mobile-hint {
      display: none;
    }
  }
}
</style>
