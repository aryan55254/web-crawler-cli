const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLobj = new URL(baseURL);
  const currentURLobj = new URL(currentURL);
  if (baseURLobj.hostname !== currentURLobj.hostname) {
    return pages;
  }
  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;
  console.log(`actively crawling : ${currentURL}`);

  try {
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(
        `error in fetch with status code: ${response.status} on page ${currentURL}`
      );
      return pages;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non html response , content type : ${contentType} , onpage : ${currentURL}`
      );
      return pages;
    }
    const htmlBody = await response.text();
    const nextURLs = getURLfromHTML(htmlBody, baseURL);
    for (const NEXTURL of nextURLs) {
      pages = await crawlPage(baseURL, NEXTURL, pages);
    }
  } catch (err) {
    console.log(`error in fetch : ${err.message} , on page : ${currentURL}`);
  }
  return pages;
}

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
  crawlPage,
};
