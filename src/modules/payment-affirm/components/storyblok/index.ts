import { add } from 'src/modules/vsf-storyblok-module/components'

export default function registerComponents () {
  add('affirm_educational_message', () => import('./AffirmEducationalMessage.vue'))
  add('affirm_monthly_payment', () => import('./AffirmMonthlyPayment.vue'))
}
