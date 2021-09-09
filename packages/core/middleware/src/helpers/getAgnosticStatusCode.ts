const getAgnosticStatusCode = (obj: unknown, ...searchedKeys: string[]) => {
  const getAxiosStatus = () => {
    if ((obj as any)?.isAxiosError) {
      return (obj as any)?.response?.status;
    }
  };

  const getApolloStatus = () => {
    if ((obj as any)?.networkError) {
      return 500;
    }
    return typeof (obj as any)?.code === 'string' ? 400 : (obj as any)?.code;
  };

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

  const getCode = () => {
    const axiosStatus = getAxiosStatus();
    const apolloStatus = getApolloStatus();

    if (axiosStatus) {
      return axiosStatus;
    }

    if (apolloStatus) {
      return apolloStatus;
    }

    return findKey(obj, [...searchedKeys]) || 500;
  };

  return getCode();
};

export default getAgnosticStatusCode;
