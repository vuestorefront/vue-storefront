import consola from 'consola';

export const fatalError = (message: Error | string | unknown) => {
  consola.error(message);
  process.exit(0);
};
