const removeDevCommentBlocks = (source: string): string => {
  return source.replace(
    /\s+(\/\/ @core-development-only-start)(.*?)(\/\/ @core-development-only-end)/gs,
    ""
  );
};

export default removeDevCommentBlocks;
