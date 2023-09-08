/** Resolves any value to an 'Error' instance. */
const resolveToError = (value: unknown): Error => {
  if (value instanceof Error) return value;

  const error = new Error(
    typeof value === "string" ? value : `Unknown error "${value}"`
  );

  // @ts-expect-error 'cause' is a valid property of 'Error' in es2022 and
  // doesn't break outdated versions.
  error.cause = value;

  return error;
};

export default resolveToError;
