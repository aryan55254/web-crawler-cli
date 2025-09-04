const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");
test("sortPages 2 pages", () => {
  const input = {
    "https://wagslane.dev/path": 1,
    "https://wagslane.dev": 3,
  };
  const actualoutput = sortPages(input);
  const expected = [
    ["https://wagslane.dev", 3],
    ["https://wagslane.dev/path", 1],
  ];
  expect(actualoutput).toEqual(expected);
});
test("sortPages 5 pages", () => {
  const input = {
    "https://wagslane.dev/path": 1,
    "https://wagslane.dev": 3,
    "https://wagslane.dev/path2": 5,
    "https://wagslane.dev/path3": 4,
    "https://wagslane.dev/path4": 2,
  };
  const actualoutput = sortPages(input);
  const expected = [
    ["https://wagslane.dev/path2", 5],
    ["https://wagslane.dev/path3", 4],
    ["https://wagslane.dev", 3],
    ["https://wagslane.dev/path4", 2],
    ["https://wagslane.dev/path", 1],
  ];
  expect(actualoutput).toEqual(expected);
});
