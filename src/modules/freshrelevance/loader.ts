function waitfor (
  predicate: () => boolean,
  { intervalDelay, maxIntervals }: { intervalDelay: number, maxIntervals: number }
) {
  return new Promise((resolve, reject) => {
    function done () {
      clearInterval(timer);
    }
    const timer = setInterval(() => {
      if (maxIntervals <= 0) {
        done();
        reject();
      } else if (predicate()) {
        done();
        resolve();
      } else {
        maxIntervals--;
      }
    }, intervalDelay);
  });
}

function hooksLoaded () {
  const win = window as any;
  return !!win.$TB && win.$TB.hooks;
}

export function loadScript (frid: string) {
  const script = document.createElement('script');
  script.defer = true;
  script.async = true;
  script.src = `//d81mfvml8p5ml.cloudfront.net/${frid}.js`;
  document.querySelector('head').appendChild(script);

  return waitfor(hooksLoaded, { intervalDelay: 100, maxIntervals: 100 }).catch(() => {
    throw new Error(`Hooks could not be loaded with id: ${frid}`);
  });
}
