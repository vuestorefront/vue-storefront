const markDeprecated = (...args) => {
  const [a1, a2, a3] = args;

  // deprecatedCall(newOne, oldOne, message)
  if (typeof a1 === 'function' && typeof a2 === 'function') {
    console.warn(a3);
    return a2;
  }

  // deprecatedCall(oldOne, message)
  if (typeof a1 === 'function' && typeof a2 === 'string') {
    console.warn(a2);
    return a1;
  }
  return a1;
};

export {
  markDeprecated
};
