<template>
  <layout id="cms-page" :headline="content.headline">
    <template v-if="!isSend">
      <p class="t-mb-2" v-html="content.text" />
      <p class="t-mb-4" v-html="content.subtext" />
      <form-component form-identifier="widerruf-formular" v-model="formData" @submit="submit" />
    </template>
    <div v-else>
      <p class="t-font-bold t-text-alt-3">
        {{ $t('Thank you, your email has successfully been sent.') }}
      </p>
      <p>{{ $t('Your revocation is now in progress.') }}</p>
    </div>
  </layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Page from 'icmaa-cms/components/Page'
import Layout from 'theme/components/core/blocks/ICMAA/Cms/Pages/Service/Layout'
import FormComponent from 'icmaa-forms/components/Form'

import { mailer } from 'config'
import i18n from '@vue-storefront/i18n'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { MailerModule } from '@vue-storefront/core/modules/mailer'

export default {
  name: 'ServiceWiderruf',
  mixins: [ Page ],
  components: {
    Layout,
    FormComponent
  },
  data () {
    return {
      dataType: 'yaml',
      formData: {},
      isSend: false
    }
  },
  computed: {
    selectedSubjectHasChildren () {
      const subject = this.content.subjects.find(s => s.name === this.selectedSubject)
      return (subject && subject.hasOwnProperty('children'))
    },
    emailData () {
      const { order_number, order_date, widerruf_date, name, email, address } = this.formData
      const array = [
        { label: 'Bestellnummer:', value: order_number },
        { label: 'Bestellt am:', value: order_date },
        { label: 'Datum des Widerrufs:', value: widerruf_date },
        { label: 'Name, Vorname:', value: name },
        { label: 'Email:', value: email },
        { label: 'Adresse:', value: address }
      ]

      return array
        .filter(l => l.value.length > 0)
    },
    emailText () {
      return this.emailData
        .map(l => `${l.label}\n ${l.value}`)
        .join(`\n\n`)
    },
    emailHtml () {
      return this.emailData
        .map(l => `<strong>${l.label}</strong><br> ${l.value}`)
        .join(`<br><br>`)
    }
  },
  methods: {
    submit (success, failure) {
      this.$bus.$emit('notification-progress-start', i18n.t('Please wait'))

      const mail = {
        sourceAddress: `${this.formData.name} <${this.formData.email}>`,
        targetAddress: mailer.contactAddress,
        subject: 'Widerruf',
        text: this.emailText,
        html: this.emailHtml,
        ...this.formData
      }

      this.$store.dispatch('mailer/sendEmail', mail)
        .then(res => {
          this.$bus.$emit('notification-progress-stop')

          if (res.ok) {
            this.onSuccess()
          } else {
            res = res.json()
            const errorPrefix = i18n.t('An error appeared:')
            this.onError(errorPrefix + ' ' + i18n.t(res.result))
          }
        })
        .catch(() => {
          this.$bus.$emit('notification-progress-stop')
          this.onError(i18n.t('Could not send an email. Please try again later.'))
        })
    },
    onError (message) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: message,
        action1: { label: i18n.t('OK') }
      })
    },
    onSuccess () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Email has successfully been sent.'),
        action1: { label: i18n.t('OK') }
      })

      this.formData = {}
      this.isSend = true
    }
  },
  asyncData ({ store }) {
    return store.dispatch('icmaaCmsBlock/single', { value: 'service-navigation' })
  },
  beforeCreate () {
    registerModule(MailerModule)
  }
}
</script>
