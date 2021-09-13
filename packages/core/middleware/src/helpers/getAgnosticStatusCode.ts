const STATUS_FIELDS = ['status', 'statusCode'] as const;

export type AxiosError = {
  isAxiosError: boolean;
  response: {
    status: number
  }
}

export type ApolloError = {
  networkError?: number
  code: string | number
}

type Status = typeof STATUS_FIELDS[number]

type StatusCode = number | null

export type UnknownError = { [K in Status]?: number; } & { [x: string]: UnknownError };

function reduceStatus(narrowObject: UnknownError, depth: number) {
  return function(statusCode: StatusCode, c: string): StatusCode {
    if (statusCode) {
      return statusCode;
    }

    if (STATUS_FIELDS.includes(c as Status)) {
      return narrowObject[c as Status];
    }
    const newDepth = depth + 1;

    return obtainStatusCode(narrowObject[c], newDepth);
  };
}

function obtainStatusCode(givenObject: UnknownError, depth = 1): StatusCode {
  const obj = givenObject || {};

  if (depth > 3) {
    return;
  }
  return Object.keys(obj).reduce(reduceStatus(obj, depth), null) as unknown as number;
}

function getAxiosStatusCode(error: AxiosError) {
  if (error?.isAxiosError) {
    return error.response.status;
  }
}

function getApolloStatusCode(error: ApolloError) {
  if (error?.networkError) {
    return 500;
  }

  if (error?.code) {
    return typeof error.code === 'string' ? 400 : error.code;
  }
}

function getAgnosticStatusCode(error: AxiosError | ApolloError | UnknownError): number {
  return getAxiosStatusCode(error as AxiosError) ||
    getApolloStatusCode(error as ApolloError) ||
    obtainStatusCode(error as UnknownError) ||
    200;
}

export default getAgnosticStatusCode;
