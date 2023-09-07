import mergeDeep from "../../helpers/mergeDeep";

describe("[mergeDeep]", () => {
  it("should merge objects", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const result = mergeDeep(obj1, obj2);

    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("should merge objects with nested objects", () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { b: { d: 3 }, c: 4 };
    const result = mergeDeep(obj1, obj2);

    expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, c: 4 });
  });

  it("should merge objects with nested arrays", () => {
    const obj1 = { a: 1, b: [1, 2] };
    const obj2 = { b: [3, 4], c: 4 };
    const result = mergeDeep(obj1, obj2);

    expect(result).toEqual({ a: 1, b: [1, 2, 3, 4], c: 4 });
  });

  it("should merge object even if one of them is undefined", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = undefined;
    const result = mergeDeep(obj1, obj2);

    expect(result).toEqual({ a: 1, b: 2 });
  });
});
