<template>
  <layout id="cms-page" :headline="content.headline">
    <template v-if="!isSend">
      <p class="t-mb-2 t-font-bold t-text-sm" v-html="content.context" />
      <div :class="{ 't-mb-6': formVisible }">
        <div v-for="(s, i) in subjects" :key="i">
          <div class="t-flex t-items-center t-justify-between t-cursor-pointer t-border-t t-border-base-lightest t-p-2 t-pl-0" :class="{ 't-opacity-50': !isSelectedSubject(s.name) && selectedSubject}" @click="toggleSubject(s)">
            <material-icon icon="indeterminate_check_box" v-if="isSelectedSubject(s.name)" />
            <material-icon icon="check_box_outline_blank" v-else class=" t-text-base-lighter" />
            <div class="t-flex-1 t-ml-1">
              {{ s.name }}
            </div>
          </div>
          <div v-if="s.children && s.children.length > 0 && selectedSubject === s.name">
            <p class="t-border-base-lightest t-border-t t-py-2 t-font-bold t-text-sm" v-html="content.context_more" />
            <div v-for="(c, j) in s.children" :key="j" class="t-flex t-items-center t-justify-between t-cursor-pointer t-border-t t-border-base-lightest t-p-2 t-pl-0" :class="{ 't-opacity-50': !isSelectedChildSubject(c.name) && selectedChildSubject}" @click="toggleSubject(c, true)">
              <material-icon icon="indeterminate_check_box" v-if="isSelectedChildSubject(c.name)" />
              <material-icon icon="check_box_outline_blank" v-else class="t-text-base-lighter" />
              <div class="t-flex-1 t-ml-1">
                {{ c.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <form-component form-identifier="service-contact" v-model="formData" @submit="sendEmail()" v-if="formVisible" />
    </template>
    <div v-else>
      <p class="t-font-bold t-text-alt-3">
        {{ $t('Thank you, your email has successfully been sent.') }}
      </p>
      <p>{{ $t('We are going to reach out to you as soon as possible.') }}</p>
    </div>
  </layout>
</template>

<script>
import Page from 'icmaa-cms/components/Page'
import Layout from 'theme/components/core/blocks/ICMAA/Cms/Pages/Service/Layout'
import FormComponent from 'icmaa-forms/components/Form'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

import { mailer } from 'config'
import i18n from '@vue-storefront/i18n'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { MailerModule } from '@vue-storefront/core/modules/mailer'

export default {
  name: 'ServiceContact',
  mixins: [Page],
  components: {
    Layout,
    FormComponent,
    MaterialIcon
  },
  data () {
    return {
      dataType: 'yaml',
      formData: { },
      selectedSubject: false,
      selectedChildSubject: false,
      isSend: false
    }
  },
  computed: {
    formVisible () {
      return ((this.selectedSubject && this.selectedChildSubject) || (this.selectedSubject && !this.selectedSubjectHasChildren))
    },
    subjects () {
      return this.content.subjects.filter(s => !this.selectedSubject || !this.selectedSubjectHasChildren || this.selectedSubject === s.name)
    },
    subject () {
      const sub = this.selectedChildSubject ? ` - ${this.selectedChildSubject}` : ''
      return `${this.selectedSubject || ''}${sub}`
    },
    selectedSubjectHasChildren () {
      const subject = this.content.subjects.find(s => s.name === this.selectedSubject)
      return (subject && subject.hasOwnProperty('children'))
    },
    emailData () {
      const { name, email, phone, order_number, message } = this.formData
      const array = [
        { label: 'Name:', value: name },
        { label: 'Email:', value: email },
        { label: 'Telefon:', value: phone },
        { label: 'Bestellnummer:', value: order_number },
        { label: 'Nachricht:', value: message }
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
    toggleSubject (subject, isChild = false) {
      if (!isChild) {
        this.selectedSubject = !this.selectedSubject || this.selectedSubject !== subject.name ? subject.name : false
        this.selectedChildSubject = false
      } else {
        this.selectedChildSubject = !this.selectedChildSubject || this.selectedChildSubject !== subject.name ? subject.name : false
      }
    },
    clearSelection (clearChild = true) {
      this.selectedSubject = false
      this.selectedChildSubject = false
    },
    isSelectedSubject (subject) {
      return subject === this.selectedSubject
    },
    isSelectedChildSubject (subject) {
      return subject === this.selectedChildSubject
    },
    sendEmail (success, failure) {
      this.$bus.$emit('notification-progress-start', i18n.t('Please wait'))

      const mail = {
        sourceAddress: `${this.formData.name} <${this.formData.email}>`,
        targetAddress: mailer.contactAddress,
        subject: this.subject,
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
