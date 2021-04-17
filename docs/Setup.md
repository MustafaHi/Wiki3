# Setup

After you are done with [Installation](/Main/Getting%20Started/Installation), You must config the `wiki-setup.js` file, to your liking.

The following table represent the `const Setup` object properties.

| Property | Description |
| --- | --- |
| title | title of your website |
| root  | the root path of your website, if you are on github `/repoName/` or `/`
| *fileURL | will use file url as defined is `l` property of file, otherwise it will use title |
| header  | use Wiki3 own header with all it features |
| *search | enable search |
| theme   | enable dark theme switch |
| *tracking  | Table of Content tracking of current position |
| *codeTabs | like [this](https://www.w3schools.com/howto/howto_js_tabs.asp) for code |
| TableOfContent  | show a list of the header 1-6 |
| *integratedToC  | Table of content will show in the Navigation instead of it own area |
| *paragraphLink  | allows paragraph liking like with headers |
| *selectionLink  | like to specific text selection that will be highlighted |
| pages | !Required, takes an array of pages `["pageTitle", "folderPath", listObject]`


*current option is not operational yet.

folder path must end with `/`

You can follow this [wiki-setup file for guidance](https://github.com/MustafaHi/Wiki3/blob/website/wiki-setup.js)