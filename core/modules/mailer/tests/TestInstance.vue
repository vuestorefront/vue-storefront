<template>
  <div>
    <button id="send-email" @click="sendEmail(letter)">Send email</button>
  </div>
</template>

<script>
import { EmailForm } from '../components/EmailForm'

export default {
  data () {
    return {
      letter: {
        sourceAddress: 'address1@domain.com',
        targetAddress: 'address2@domain.com',
        subject: 'Test subject',
        emailText: 'Test email body'
      }
    }
  },
  // And register as a mixin
  mixins: [
    EmailForm
  ]
}
</script>
