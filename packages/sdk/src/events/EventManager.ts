import type { EventCallback, Subscribers } from "../types";

/**
 * EventManagerInterface is an interface used to emit and subscribe to events.
 */
export interface EventManagerInterface {
  /**
   * Function that emits an event.
   * It calls all the callbacks that are registered for the given topic.
   *
   * @param topic - topic of the event
   * @param data - data that is passed to the callbacks
   */
  emit<EVENT_DATA>(topic: string, data: EVENT_DATA): void;

  /**
   * Function that registers a callback for a given topic.
   * It can be used to register a single callback or an array of callbacks.
   *
   * @param topic - topic of the event
   * @param callback - callback that is called when the event is emitted
   */
  register(topic: string, callback: EventCallback): void;

  /**
   * Function that registers a callback for a given topic.
   * It can be used to register a single callback or an array of callbacks.
   *
   * @param topic - topic of the event
   * @param callback - array of callbacks that are called when the event is emitted
   */
  register(topic: string, callback: Array<EventCallback>): void;

  /**
   * Function that unregisters a callback for a given topic.
   *
   * @param topic - topic of the event
   * @param callback - callback that is called when the event is emitted
   */
  unregister(topic: string, callback: EventCallback): void;

  /**
   * Function that registers multiple callbacks for multiple topics (Subscribers).
   * @param subscribers
   */
  registerSubscribers(subscribers: Subscribers): void;
}

/**
 * EventManager is a class that is used to emit and subscribe to events.
 *
 * @example
 * You can use it to emit an event:
 * ```typescript
 * const eventManager = new EventManager();
 * eventManager.emit('my_event_name', { foo: 'bar' });
 * ```
 *
 * You can use it to register a callback for an event:
 * ```typescript
 * const eventManager = new EventManager();
 * eventManager.register('my_event_name', (data) => {
 *   console.log(data);
 *   // { foo: 'bar' }
 *   // ...
 * });
 */
export class EventManager implements EventManagerInterface {
  /**
   * Object that contains all the registered callbacks for each topic.
   *
   * @readonly
   * @private
   */
  readonly events: Record<string, Array<EventCallback>>;

  constructor() {
    this.events = {};
  }

  emit<EVENT_DATA>(topic: string, data: EVENT_DATA) {
    const topicEvents = this.events[topic] ?? [];
    topicEvents.forEach((callback) => {
      callback<EVENT_DATA>(data);
    });
  }

  register(topic: string, callback: EventCallback | Array<EventCallback>) {
    const topicEvents = this.events[topic] ?? [];

    const canAddCallback = (cb: EventCallback) =>
      typeof cb === "function" && !topicEvents.includes(cb);

    if (Array.isArray(callback)) {
      topicEvents.push(...callback.filter(canAddCallback));
    } else if (canAddCallback(callback)) {
      topicEvents.push(callback);
    }

    this.events[topic] = topicEvents;
  }

  unregister(topic: string, callback: EventCallback) {
    if (!Array.isArray(this.events[topic])) return;
    this.events[topic] = this.events[topic].filter((fn) => fn !== callback);
  }

  registerSubscribers(subscribers: Subscribers) {
    for (const [topic, callbacks] of Object.entries(subscribers)) {
      if (Array.isArray(callbacks)) {
        callbacks.forEach((callback) => this.register(topic, callback));
      } else {
        this.register(topic, callbacks);
      }
    }
  }
}

export const eventManager = new EventManager();
