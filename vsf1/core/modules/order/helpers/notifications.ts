import i18n from '@vue-storefront/i18n'
import config from 'config'

const internalValidationError = () => ({
  type: 'error',
  message: i18n.t('Internal validation error. Please check if all required fields are filled in. Please contact us on {email}', { email: config.mailer.contactAddress }),
  action1: { label: i18n.t('OK') }
})

const orderCannotTransfered = () => ({
  type: 'error',
  message: i18n.t('The order can not be transfered because of server error. Order has been queued'),
  action1: { label: i18n.t('OK') }
})

const notifications = { internalValidationError, orderCannotTransfered }

export default notifications
