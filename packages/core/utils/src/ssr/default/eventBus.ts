type Handler = (value?: any) => void;

interface Event {
  eventName: string;
  value: any;
}

interface Listener {
  eventName: string;
  handler: Handler;
}

const listeners: Listener[] = [];
let emitted: Event[] = [];

const emit = (eventName: string, value: any): void => {
  const relatedListeners = listeners.filter(listener => listener.eventName === eventName);

  relatedListeners.forEach((listener) => {
    listener.handler(value);
  });

  if (relatedListeners.length === 0) {
    emitted.push({ eventName, value });
  }
};

const on = (eventName: string, handler: Handler): void => {
  listeners.push({ eventName, handler });

  const notConsumed = emitted.filter(event => event.eventName === eventName);

  notConsumed.forEach((event) => {
    handler(event.value);
  });

  emitted = emitted.filter(event => event.eventName !== eventName);
};

export { emit, on };
