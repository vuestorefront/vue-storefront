import {getLanguage} from '../../i18n/getLanguage';

const lang = getLanguage();

export const validateGitString = (value: string) => {
  const gitLinkRegex = /https?:(\/\/)?(.*?)(\.git)(\/?|#[\w.-]+?)$/;
  if (value.trim().length === 0 || !gitLinkRegex.test(value)) {
    return lang.error.git_link;
  }

  return true;
};
