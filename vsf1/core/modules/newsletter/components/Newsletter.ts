import SubscriptionStatus from '@vue-storefront/core/modules/newsletter/mixins/SubscriptionStatus'
import Subscribe from '@vue-storefront/core/modules/newsletter/mixins/Subscribe'
import Unsubscribe from '@vue-storefront/core/modules/newsletter/mixins/Unsubscribe'

export const Newsletter = {
  name: 'Newsletter',
  mixins: [SubscriptionStatus, Subscribe, Unsubscribe]
}
