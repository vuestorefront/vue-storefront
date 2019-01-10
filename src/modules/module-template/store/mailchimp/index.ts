// With store.extend property you can extend currently existing VS modules. 
// Vuex Module below will be merged with the one with the same key property.
// You can add new properties to currently existing stores or override existing ones just by using the same name
// In this example we will override mailchimp vuex store
import { Module } from 'vuex'

// you can use mailchimp state instead of any 
export const extendMailchimp: Module<any, any> = {
  state: {
    addedproperty: 'Hello!'
  },
  actions: {
    unsubscribe () {
      // mailchimp module 'unsubscribe' action will be overwritten by this one
      console.info('Hello from mailchimp module extension! Now this action is broken ;o')
    },
    logHello () {
      // this action will be added to mailchimp vuex module
      console.info('Hello!')
    }
  }
}