export default class ErrorConverterService {
  public describeError (e: any) {
    let result: string[] = [];

    if (e.messages) {
      const errors: string[] = [];

      Object.keys(e.messages).forEach(field => {
        let message = e.messages[field];

        if (isNaN(Number(field))) {
          message = field + ': ' + message;
        }

        errors.push(message);
      });

      result = errors;
    } else if (e.errors) {
      const errors: string[] = [];

      Object.keys(e.errors).forEach(field => {
        let message = e.errors[field];

        if (isNaN(Number(field))) {
          message = field + ': ' + message;
        }

        errors.push(message);
      });

      result = errors;
    } else if (typeof e.message !== 'undefined') {
      result = [e.message];
    } else if (typeof e.error !== 'undefined') {
      result = [e.error];
    } else {
      result = [
        'Sorry! Something went wrong. Try again later, please...'
      ];
    }

    return result;
  }
}
