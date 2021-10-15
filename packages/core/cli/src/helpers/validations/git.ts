export const validateGitString = (value: string) => {
  const gitLinkRegex = /https?:(\/\/)?(.*?)(\.git)(\/?|#[\w.-]+?)$/;
  return !(value.trim().length === 0 || !gitLinkRegex.test(value));
};
