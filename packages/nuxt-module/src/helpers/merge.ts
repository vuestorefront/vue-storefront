import { mergeWith, isArray } from 'lodash';

export default (source, destination) => mergeWith(source, destination, (objValue, srcValue) => {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
