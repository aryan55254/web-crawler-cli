const { JSDOM } = require("jsdom");

function getURLfromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody, { url: baseURL });
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    const rawHref = linkElement.getAttribute("href");
    if (!rawHref || (!rawHref.startsWith("/") && rawHref.indexOf(":") < 0)) {
      continue;
    }
    try {
      const urlobj = new URL(linkElement.href);
      if (urlobj.protocol !== "http:" && urlobj.protocol !== "https:") {
        continue;
      }
      urls.push(urlobj.href);
    } catch (err) {
      console.log(`error occured in url : ${err.message}`);
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostpath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostpath.length > 0 && hostpath.slice(-1) === "/") {
    return hostpath.slice(0, -1);
  }
  return hostpath;
}
module.exports = {
  normalizeURL,
  getURLfromHTML,
};
