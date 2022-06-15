/**
 * Waits received amount of time.
 * @param time - time in milliseconds.
 */
const wait = (time: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, time);
  });
};

export default wait;
