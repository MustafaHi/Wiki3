# Developer Hub for Wiki3

Architecture of Wiki3 can be found in [Wiki.js](/Developer/Developer/Wiki.js) documentation.

## Dependence(libraries)

- [Marked](https://github.com/markedjs/marked) for Parsing Markdown, chosen because it's feature full and lightweight, (if there is a better alternative, open an issue).

- [PrismJS](https://github.com/PrismJS/prism) code syntax highlighter, you can remove it, just make sure to remove `window.Prism.highlightAllUnder(Doc);` in `wiki.js`

- [Zenscroll](https://github.com/zengabor/zenscroll) for smooth scrolling with padding, will be included in `wiki.js` in the future.

