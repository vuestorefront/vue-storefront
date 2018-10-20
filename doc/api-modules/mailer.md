# Mailer module

The Mailer module is responsible for sending emails. Currently this module consists of EmailForm component that has sendEmail method for sending emails. This method can also be used for sending confirmation emails. **PLEASE NOTE** You have to set an SMTP transport in vs-api configuration file (local.json) before you start using this module. Transport properties can be found in `extensions.mailService.transport`.

## Content

### sendEmail
- [method] **sendEmail**(letter, success, failure)
* **letter** - an object, that defines the details of the email, namely:
  1. sourceAddress - mandatory field, string, defines the source email address from which email will be sent (if smtp transport supports it, otherwise transport's address will be used).
  2. targetAddress - mandatory field, string, defines the address to which email will be sent. This address has to be from the white list, defined in vs-api configuration file.
  3. subject - mandatory field, string, email's subject.
  4. emailText - mandatory field, string, email's body text.
  5. confirmation - optional field, boolean, defines whether this is a confirmation email. The only difference of a confirmation email from a normal email is that the source address needs to be from the white list, defined in vs-api configuration file.
* **success** - a callback function that is called if email has successfully been sent. This callback has a single `message` parameter that contains a default text about successfull sending.
* **failure** - a callback function that is called if email could not be sent. This callback also has a single `message` parameter that contains a text with details about unsuccessfull sending.

## Example

````javascript
// Inside Vue component
import {
  EmailForm
} from '@vue-storefront/core/modules/mailer/components/EmailForm'

export default {
  //...other properties
  mixins: [
    EmailForm
  ],
  // if we use it inside of a method
  methods: {
    someMethod () {
      this.sendEmail({
        sourceAddress: '<some-address>',
        targetAddress: '<another-address>',
        subject: '<some-text>',
        emailText: '<more-text-here>'
      })
    }
  }
}
````
