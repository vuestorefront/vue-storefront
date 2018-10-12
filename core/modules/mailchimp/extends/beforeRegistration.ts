import Vue from 'vue'

export default () => {
  if (!Vue.prototype.$isServer) console.info('Mailchimp extension registration is starting')
}