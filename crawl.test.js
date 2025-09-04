const { normalizeURL, getURLfromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");
test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actualoutput = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actualoutput).toEqual(expected);
});
test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path/";
  const actualoutput = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actualoutput).toEqual(expected);
});
test("normalizeURL strip captials", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actualoutput = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actualoutput).toEqual(expected);
});
test("normalizeURL strip http ", () => {
  const input = "http://blog.boot.dev/path/";
  const actualoutput = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actualoutput).toEqual(expected);
});
test("getURLfromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
  <body>
  <a href="http://blog.boot.dev/path">
  Boot Blog
  </a>
  </body>
  </html>
  `;
  const inputBASEURL = "http://blog.boot.dev";
  const actual = getURLfromHTML(inputHTMLBody, inputBASEURL);
  const expected = ["http://blog.boot.dev/path"];
  expect(actual).toEqual(expected);
});
test("getURLfromHTML relative", () => {
  const inputHTMLBody = `
  <html>
  <body>
  <a href="/path">
  Boot Blog
  </a>
  </body>
  </html>
  `;
  const inputBASEURL = "http://blog.boot.dev";
  const actual = getURLfromHTML(inputHTMLBody, inputBASEURL);
  const expected = ["http://blog.boot.dev/path"];
  expect(actual).toEqual(expected);
});
test("getURLfromHTML both absolute and relative", () => {
  const inputHTMLBody = `
  <html>
  <body>
  <a href="http://blog.boot.dev/path1">
  Boot Blog
  </a>
  <a href="/path2">
  Boot Blog
  </a>
  </body>
  </html>
  `;
  const inputBASEURL = "http://blog.boot.dev";
  const actual = getURLfromHTML(inputHTMLBody, inputBASEURL);
  const expected = ["http://blog.boot.dev/path1", "http://blog.boot.dev/path2"];
  expect(actual).toEqual(expected);
});
test("getURLfromHTML invalid", () => {
  const inputHTMLBody = `
  <html>
  <body>
  <a href="invalid">
  Invalid URL
  </a>
  </body>
  </html>
  `;
  const inputBASEURL = "http://blog.boot.dev";
  const actual = getURLfromHTML(inputHTMLBody, inputBASEURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
test("getURLfromHTML invalid2", () => {
  const inputHTMLBody = `
  <html>
  <body>
  <a href="javascript:alert('Hello, world!')">
  Invalid URL
  </a>
  </body>
  </html>
  `;
  const inputBASEURL = "http://blog.boot.dev";
  const actual = getURLfromHTML(inputHTMLBody, inputBASEURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
