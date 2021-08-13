const getAgnosticStatusCode = (obj: unknown, ...searchedKeys: string[]) => {
  if (!obj || typeof obj !== 'object') return;
  for (const key of Object.keys(obj)) {
    if (searchedKeys.includes(key)) {
      return obj[key];
    }
    const statusCode = getAgnosticStatusCode(obj[key], ...searchedKeys);
    if (statusCode) {
      return statusCode;
    }
  }
};

export default getAgnosticStatusCode;
