# Wiki.js


## Global Variables

```js
var Page = [], Navigation, Nav = [], ToC, toc = [], Doc;
```

| variable | usage
| --- | --- |
| Page | store current page array from Setup.pages
| Navigation | #Navigation element
| Nav | Array of URLs, paths, and Navigation elements
| ToC | #TableOfContent element
| toc | HTML array of headers
| Doc | #Doc element
| router | router object and it functions

## function calls

1. `init()` : setup header, pages, other Wiki3 elements, and assign elements to global variables.

2. `router.init()` : set root from Setup.root, router selector, setup links and resolve url.

3. `router.resolve()` : read url navigate to document.

4. `setupNav()` : populate Navigation, Nav variable.

5. `loadDocument()` : load the document, or print 404 if not found, populate Table of content, scroll to header, and highlight code syntax.

