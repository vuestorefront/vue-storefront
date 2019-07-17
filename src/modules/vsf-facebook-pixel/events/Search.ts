import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import debounce from '../util/debounce'

import { EventSearch } from '../types/events'

export default (fbq) => {
    let myDebounce:(Function | null) = null

    const track = (body: EventSearch) => {
        fbq('track', 'Search', body)
    }

    EventBus.$on('product-after-list', payload => {
        if(payload.query._searchText.length > 0) {
            if(!myDebounce) {
                myDebounce = debounce(function(body: EventSearch){
                    track(body)
                }, 1000)
            }

            myDebounce({
                search_string: payload.query._searchText
            })
        }
    })
}