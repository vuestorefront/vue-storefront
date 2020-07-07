/* istanbul ignore file */
import consola from 'consola';
import chalk from 'chalk';

export default {
  info: (message) => consola.info(chalk.bold('VSF'), message),
  success: (message) => consola.success(chalk.bold('VSF'), message),
  warning: (message) => consola.warn(chalk.bold('VSF'), message),
  error: (message) => consola.error(chalk.bold('VSF'), message)
};
