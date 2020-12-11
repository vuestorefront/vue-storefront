import { CustomQuery } from '../types';

const markMethodDeprecated = (message: string, newOne: Function, oldOne?: Function) => {
  if (typeof oldOne === 'function') {
    console.warn(message);
    return oldOne;
  }

  return newOne;
};

const markCustomQueryDeprecated = (customQuery: CustomQuery, message = 'customQuery in third argument is deprecated. Please move it to the second argument inside the object'): CustomQuery => {
  return (query, variables) => {
    console.warn(message);
    return customQuery(query, variables);
  };
};

export {
  markMethodDeprecated,
  markCustomQueryDeprecated
};
