const { mergeWith, isArray } = require('lodash');

module.exports = (source, destination) => mergeWith(source, destination, (objValue, srcValue) => {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
