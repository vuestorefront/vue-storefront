import { EventManager } from "../../events/EventManager";

let eventManager: EventManager;

beforeEach(() => {
  eventManager = new EventManager();
});

describe("[EventManager]", () => {
  it("should register and emit events", () => {
    const callback = jest.fn();

    eventManager.register("test", callback);
    eventManager.emit("test", "test");
    expect(callback).toHaveBeenCalledWith("test");
  });

  it("should register event only once", () => {
    const callback = jest.fn();

    eventManager.register("test", callback);
    eventManager.register("test", callback);
    eventManager.register("test", callback);

    expect(eventManager.events.test.length).toBe(1);
  });

  it("should unregister events", () => {
    const callback = jest.fn();

    eventManager.register("test", callback);
    eventManager.unregister("test", callback);
    eventManager.emit("test", "test");
    expect(callback).not.toHaveBeenCalled();
  });

  it("should not unregister events if there is no topic", () => {
    const callback = jest.fn();

    eventManager.unregister("test", jest.fn());
    eventManager.emit("test", "test");
    expect(callback).not.toHaveBeenCalled();
  });

  it("should register and emit events with multiple callbacks", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    eventManager.register("test", [callback1, callback2]);
    eventManager.emit("test", "test");
    expect(callback1).toHaveBeenCalledWith("test");
    expect(callback2).toHaveBeenCalledWith("test");
  });

  it("should register subscribers", () => {
    const callback = jest.fn();

    eventManager.registerSubscribers({
      test: callback,
    });

    eventManager.emit("test", "test");
    expect(callback).toHaveBeenCalledWith("test");
  });

  it("should register subscribers with multiple callbacks", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    eventManager.registerSubscribers({
      test: [callback1, callback2],
    });

    eventManager.emit("test", "test");
    expect(callback1).toHaveBeenCalledWith("test");
    expect(callback2).toHaveBeenCalledWith("test");
  });
});
