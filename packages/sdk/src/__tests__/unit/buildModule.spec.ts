import { extension1Mock } from "../__mocks__/extension1.mock";
import module1Mock from "../__mocks__/module1.mock";
import { buildModule } from "../../module/buildModule";

describe("[buildModule]", () => {
  it("should build module without extensions", () => {
    const result = buildModule(module1Mock, {});

    expect(result).toEqual(module1Mock({}));
  });

  it("should build module with extensions as an object", () => {
    const result = buildModule(module1Mock, {}, extension1Mock);
    const expected = {
      ...module1Mock({}),
      ...extension1Mock,
    };

    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
  });

  it("should build module with extension as a function with options", () => {
    const extension1MockFn = jest.fn(() => extension1Mock);
    const extensionOptions = { test: true };
    const expected = {
      ...module1Mock({}),
      ...extension1Mock,
    };
    const resolvedModule = module1Mock({});
    const result = buildModule(
      module1Mock,
      {},
      extension1MockFn,
      extensionOptions
    );

    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    expect(extension1MockFn).toHaveBeenCalledTimes(1);
    expect(extension1MockFn).toHaveBeenCalledWith(extensionOptions, {
      methods: resolvedModule.connector,
      context: resolvedModule.context,
    });
  });

  it("module can be executed with options", () => {
    const result = buildModule(module1Mock, { test: true });

    const expected = {
      ...module1Mock({ test: true }),
      extend: {},
    };
    expect(module1Mock).toHaveBeenCalledWith({ test: true });
    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
  });
});
