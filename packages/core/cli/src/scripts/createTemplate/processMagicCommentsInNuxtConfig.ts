import processMagicComments from '../createProject/processMagicComments';
import log from '../../utils/log';
const path = require('path');

export const processMagicCommentsInNuxtConfig = async (
  generatedTemplatePath: string
) => {
  try {
    await processMagicComments(
      path.join(generatedTemplatePath, 'nuxt.config.js')
    );
  } catch (error) {
    log.error('No nuxt.config.js has been found in integration template');
    process.exit(1);
  }
};
