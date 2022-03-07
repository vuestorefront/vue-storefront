import consola from 'consola';
import chalk from 'chalk';
import { Log } from '../types';

const log: Log = Object.freeze({
  info: (message) => consola.info(chalk.bold('VSF'), message),
  success: (message) => consola.success(chalk.bold('VSF'), message),
  warning: (message) => consola.warn(chalk.bold('VSF'), message),
  error: (message) => consola.error(chalk.bold('VSF'), message)
});

export default log;
