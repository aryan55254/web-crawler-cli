# Web Crawler CLI

A command-line web crawler built in JavaScript that analyzes the internal linking structure of websites.

## Features

- Crawls websites and analyzes internal links
- Generates a report showing the number of internal links to each page
- Handles both absolute and relative URLs
- Supports HTTP and HTTPS protocols
- Progress tracking with crawl count
- Interactive crawling with pause every 25 pages

## Installation

1. Clone the repository:
```sh
git clone https://github.com/aryan55254/web-crawler-cli.git
```

2. Navigate to the project directory:
```sh
cd web-crawler-cli
```

3. Install dependencies:
```sh
npm install
```

## Usage

Run the crawler by providing a website URL as an argument:

```sh
npm start https://example.com
```

The crawler will:
- Start crawling from the provided URL
- Only crawl pages within the same domain
- Generate a report showing internal linking structure
- Ask for confirmation every 25 pages crawled

## Example Output

```
=========================================
                 REPORT                  
=========================================
Found 5 links to page : example.com/path2
Found 4 links to page : example.com/path3
Found 3 links to page : example.com
Found 2 links to page : example.com/path4
Found 1 links to page : example.com/path
=========================================
              REPORT END                 
=========================================
```

## Running Tests

The project includes unit tests for core functionality. Run tests with:

```sh
npm test
```

## Dependencies

- [jsdom](https://www.npmjs.com/package/jsdom) - For parsing HTML and extracting links
- [jest](https://www.npmjs.com/package/jest) - For running tests

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.