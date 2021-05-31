import { extend } from 'vee-validate';
import PhoneNumber from 'awesome-phonenumber';

extend('phone', {
  message: 'This is not a valid phone number',
  validate (value) {
    return new Promise(resolve => {
      const phone = new PhoneNumber(value);
      resolve({ valid: phone.isValid() });
    });
  }
});
