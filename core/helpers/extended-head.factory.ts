export interface HeadManager {
  append: (value: string) => void,
  inject: () => string
}

export function extendHeadFactory (): HeadManager {
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
