const mergeWith = require('lodash.mergewith');

module.exports = (source, destination) => mergeWith(source, destination, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
