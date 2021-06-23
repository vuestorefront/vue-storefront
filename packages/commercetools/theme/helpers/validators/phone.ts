import { extend } from 'vee-validate';
import PhoneNumber from 'awesome-phonenumber';

extend('phone', {
  message: 'This is not a valid phone number',
  validate (value) {
    const phone = new PhoneNumber(value);
    return phone.isValid();
  }
});
