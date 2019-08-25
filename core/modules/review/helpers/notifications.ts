import i18n from '@vue-storefront/i18n'

const reviewSubmitted = {
  type: 'success',
  message: i18n.t('You submitted your review for moderation.'),
  action1: { label: i18n.t('OK') }
}

const reviewSubmitError = {
  type: 'error',
  message: i18n.t('Something went wrong. Try again in a few seconds.'),
  action1: { label: i18n.t('OK') }
}

const notifications = {
  reviewSubmitted,
  reviewSubmitError
}

export default notifications
