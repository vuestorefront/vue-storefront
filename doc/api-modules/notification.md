# Notification module

Notification module, as the name suggests, is responsible for spawning/removing notifications.

## Content

### Notification
- [Vuex action] **spawnNotification**(notification)
  * **notification** - a single parameter of the action, an object that contains the details of the notification, namely:
    1. type - mandatory field, a string, one of `success`, `warning` or `error`.
    2. message - mandatory field, a string that will be shown as a notification.
    3. timeToLive - optional field, a number, defines for how many miliseconds should a notification show up.
    4. action1 - mandatory field, an object that contains of a `label` of the action to be shown in a notification window and a callback function (`action`) that needs to be called if user clicks on the area of this action. Here `action` key is optional. If it is not passed, the default action will be executed, which in the default theme is to hide the notification window.
    5. action2 - optional field, an object, has same structure as `action1`, defines another action that can be taken from a notification window.

This action receives a notification and adds it to the store of this module. Next, each notification from the store is processed by a theme Notification component and shown on the screen.

- [Vuex action] **removeNotification**(index)
  * **index** - a single parameter of the action, a number that defines an index of a notification to be removed from the array of all active notifications. A notification is not active if the amount of time to show defined in the module (currently 5000 ms) or, if was passed, `timeToLive` have elapsed.

This action removes a notification from a notifications list in the store.

## Example

````javascript
// Inside Vue component
export default {
  //...other properties

  // if we use it inside of a method
  methods: {
    someMethod () {
      this.$store.dispatch('notification/spawnNotification, {
        type: 'error',
        message: this.$t(<some_text_goes_here>),
        action1: {
          label: this.$t('OK'),
          action: () => {
            console.log('We have just executed an action')
          }
        }
      })
    }
  }
}
````
