import { SDKError } from "../../error";
import { EventManager } from "../../events/EventManager";
import { InterceptorsManager } from "../../interceptors/InterceptorsManager";
import { AnyFunction } from "../../types";

function getWrappedMethods(
  configWithoutInterceptors: any,
  eventManager: EventManager = new EventManager()
): any {
  const interceptorsManager = new InterceptorsManager(
    configWithoutInterceptors,
    eventManager
  );
  const wrappedMethodsEntries = Object.entries(
    configWithoutInterceptors.module1.connector
  ).map(([methodName, value]) => {
    return [
      methodName,
      interceptorsManager.applyInterceptors(
        methodName,
        value as AnyFunction,
        "module1"
      ),
    ];
  });
  return Object.fromEntries(wrappedMethodsEntries);
}

describe("[InterceptorManager]", () => {
  it("getInterceptors should return an empty array if no interceptors are defined", () => {
    const interceptorsManager = new InterceptorsManager({}, new EventManager());
    const result = interceptorsManager.getInterceptors(
      "test",
      "test",
      "before"
    );

    expect(result).toEqual([]);
  });

  it("getInterceptors should return an empty array if no interceptors are defined for given type", () => {
    const configWithoutInterceptors = {
      module1: {
        connector: {},
        beforeInterceptors: {
          test: [(args: any) => args],
        },
        extend: {},
      },
    };

    const interceptorsManager = new InterceptorsManager(
      configWithoutInterceptors,
      new EventManager()
    );
    const result = interceptorsManager.getInterceptors(
      "module1",
      "test",
      "after"
    );

    expect(result).toEqual([]);
  });

  it("getOverride should return null if no overrides are defined", () => {
    const interceptorsManager = new InterceptorsManager({}, new EventManager());
    const result = interceptorsManager.getOverride("test", "test");

    expect(result).toBeNull();
  });

  it("getOverride should return function if override is defined", () => {
    const testOverride = () => "test";
    const configWithOverride = {
      module1: {
        connector: {},
        override: {
          test: testOverride,
        },
        extend: {},
      },
    };

    const interceptorsManager = new InterceptorsManager(
      configWithOverride,
      new EventManager()
    );
    const result = interceptorsManager.getOverride("module1", "test");

    expect(result).toBe(testOverride);
  });

  it("method should return unmodified result if no interceptors are defined", async () => {
    const configWithoutInterceptors = {
      module1: {
        connector: {
          test: (name: string) => name,
        },
        extend: {},
      },
    };
    const wrappedMethods = getWrappedMethods(configWithoutInterceptors);
    const result = await wrappedMethods.test("test");

    expect(result).toEqual("test");
  });

  it("method should return modified result if before interceptors are defined", async () => {
    const configWithInterceptors = {
      module1: {
        connector: {
          test: (name: string) => name,
        },
        interceptors: [
          {
            before: {
              test: [(args: any) => [`${args} modified`]],
            },
          },
        ],
        extend: {},
      },
    };

    const wrappedMethods = getWrappedMethods(configWithInterceptors);
    const result = await wrappedMethods.test("test");

    expect(result).toEqual("test modified");
  });

  it("method should return modified result if after interceptors are defined", async () => {
    const configWithInterceptors = {
      module1: {
        connector: {
          test: (name: string) => name,
        },
        interceptors: [
          {
            after: {
              test: [(result: any) => `${result} modified`],
            },
          },
        ],
        extend: {},
      },
    };

    const wrappedMethods = getWrappedMethods(configWithInterceptors);
    const result = await wrappedMethods.test("test");

    expect(result).toEqual("test modified");
  });

  it("interceptors are executed in correct order", async () => {
    const configWithInterceptors = {
      module1: {
        connector: {
          test: (name: string) => [name],
        },
        interceptors: [
          {
            before: {
              test: [
                (args: any) => [`${args[0]} modified_before1`],
                (args: any) => [`${args[0]} modified_before2`],
              ],
            },
            around: {
              test: [
                (next: any, args: any) => {
                  const result = next(args);
                  return [`${result[0]} around1`];
                },
                (next: any, args: any) => {
                  const result = next(args);
                  return [`${result[0]} around2`];
                },
              ],
            },
            after: {
              test: [
                (result: any) => `${result} modified_after1`,
                (result: any) => `${result} modified_after2`,
              ],
            },
          },
        ],
        extend: {},
      },
    };

    const wrappedMethods = getWrappedMethods(configWithInterceptors);
    const result = await wrappedMethods.test("test");

    expect(result).toEqual(
      "test modified_before1 modified_before2 around2 around1 modified_after1 modified_after2"
    );
  });

  it("interceptors are executed with multiple arguments", async () => {
    const configWithInterceptors = {
      module1: {
        connector: {
          test: (name: string, age: number) => [name, age],
        },
        interceptors: [
          {
            before: {
              test: (args: any) => [`${args[0]} modified_before1`, args[1] + 1],
            },
            after: {
              test: (result: any) => [
                `${result[0]} modified_after1`,
                result[1] + 1,
              ],
            },
          },
        ],
        extend: {},
      },
    };

    const wrappedMethods = getWrappedMethods(configWithInterceptors);
    const result = await wrappedMethods.test("test", 10);

    expect(result).toEqual(["test modified_before1 modified_after1", 12]);
  });

  it("interceptors are executed in correct order", async () => {
    const before1 = jest.fn((a) => a);
    const before2 = jest.fn((a) => a);
    const around1 = jest.fn((next, a) => next(a));
    const around2 = jest.fn((next, a) => next(a));
    const after1 = jest.fn((b) => b);
    const after2 = jest.fn((b) => b);

    const configWithInterceptors = {
      module1: {
        connector: {
          test: (name: string) => [name],
        },
        interceptors: [
          {
            before: {
              test: [before1, before2],
            },
            around: {
              test: [around1, around2],
            },
            after: {
              test: [after1, after2],
            },
          },
        ],
        extend: {},
      },
    };

    const wrappedMethods = getWrappedMethods(configWithInterceptors);
    await wrappedMethods.test("test");

    expect(before1.mock.invocationCallOrder[0]).toBe(1);
    expect(before2.mock.invocationCallOrder[0]).toBe(2);
    expect(around1.mock.invocationCallOrder[0]).toBe(3);
    expect(around2.mock.invocationCallOrder[0]).toBe(4);
    expect(after1.mock.invocationCallOrder[0]).toBe(5);
    expect(after2.mock.invocationCallOrder[0]).toBe(6);
  });

  it("not calling next should break the chain", async () => {
    const configWithInterceptors = {
      module1: {
        connector: {
          test: (name: string) => [name],
        },
        interceptors: [
          {
            around: {
              test: [
                () => {
                  return `around1`;
                },
                (next: any, args: any) => {
                  const result = next(args);
                  return [`${result[0]} around2`];
                },
              ],
            },
          },
        ],
        extend: {},
      },
    };

    const wrappedMethods = getWrappedMethods(configWithInterceptors);
    const result = await wrappedMethods.test("test");

    expect(result).toEqual("around1");
  });

  it("handleError should return error if interceptor throws error", async () => {
    const configWithInterceptors = {
      module1: {
        connector: {
          test: () => "test",
        },
        beforeInterceptors: {
          test: [
            () => {
              throw new Error("test error");
            },
          ],
        },
        extend: {},
      },
    };

    const wrappedMethods = getWrappedMethods(configWithInterceptors);

    try {
      await wrappedMethods.test();
    } catch (e) {
      expect(e).toBeInstanceOf(SDKError);
      expect((e as SDKError).message).toEqual("test error");
      expect((e as SDKError).cause).toEqual(new Error("test error"));
    }
  });

  it("eventManager should emit events before and after execution of the function", async () => {
    const configWithSimpleModule = {
      module1: {
        connector: {
          m1: (arg: string) => arg,
        },
        extend: {},
      },
    };

    const eventManager = new EventManager();

    const withInterceptors = getWrappedMethods(
      configWithSimpleModule,
      eventManager
    );
    const emitSpy = jest.spyOn(eventManager, "emit");

    await withInterceptors.m1("test");

    expect(emitSpy).toBeCalledWith(`*_before`, ["test"]);
    expect(emitSpy).toBeCalledWith(`module1_before`, ["test"]);
    expect(emitSpy).toBeCalledWith(`module1_m1_before`, ["test"]);

    expect(emitSpy).toBeCalledWith(`*_after`, "test");
    expect(emitSpy).toBeCalledWith(`module1_after`, "test");
    expect(emitSpy).toBeCalledWith(`module1_m1_after`, "test");
  });
});
