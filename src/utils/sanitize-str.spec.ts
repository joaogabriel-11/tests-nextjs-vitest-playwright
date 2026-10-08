import { sanitizeStr } from "./sanitize-str";

describe("sanitizeStr (unit)", () => {
  test("should return empty string when value is false", () => {
    // @ts-expect-error testing the function without params
    expect(sanitizeStr()).toBe("");
  });

  test("should return empty string when value is not string", () => {
    // @ts-expect-error testing the function with wrong params typeof
    expect(sanitizeStr(123)).toBe("");
  });

  test("should return the trim of string", () => {
    expect(sanitizeStr("   a  ")).toBe("a");
  });

  test("should return the string normalized using NFC", () => {
    const original = "e\u0301";
    const expected = "é";
    expect(sanitizeStr(original)).toBe(sanitizeStr(expected));
  });
});
