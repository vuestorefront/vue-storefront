export function extendHeadFactory (): {
  append: (value: string) => void,
  inject: () => string
} {
  let extensions: string[] = [];

  const append = (value: string) => {
    extensions.push(value);
  }

  const inject = () => {
    return extensions.join('\n');
  }

  return {
    append,
    inject
  }
}
