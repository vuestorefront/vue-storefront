const getAgnosticStatusCode = (obj: unknown, ...searchedKeys: string[]) => {
  const findKey = (currentObj: unknown, searchedKeys: string[], depth = 1) => {
    if (!currentObj || typeof currentObj !== 'object') return;

    for (const key of Object.keys(currentObj)) {
      if (searchedKeys.includes(key)) {
        return currentObj[key];
      }

      if (depth > 3) return;

      const nextDepth = depth + 1;
      const statusCode = findKey(currentObj[key], searchedKeys, nextDepth);

      if (statusCode) {
        return statusCode;
      }
    }
  };

  return findKey(obj, [...searchedKeys]);
};

export default getAgnosticStatusCode;
