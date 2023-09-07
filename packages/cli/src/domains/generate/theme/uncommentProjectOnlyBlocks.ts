const uncommentProjectOnlyBlocks = (source: string): string => {
  return source.replace(
    /\s+(\/\* project-only-start)(.*?)\s+(project-only-end \*\/)/gs,
    (_, __, block) => block
  );
};

export default uncommentProjectOnlyBlocks;
