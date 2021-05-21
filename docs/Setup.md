# Setup

After you are done with [Installation](/Main/Getting-Started/Installation), You must config the `wiki-setup.js` file, to your liking.

The following table represent the `const Setup` object properties.

| Property | Description |
| --- | --- |
| title | title of your website |
| root  | the root path of your website, if you are on github `/repoName/` or `/`
| fileURL | will use file url as defined in `l` property, otherwise it will use `t`itle |
| header  | use Wiki3 own header with all it features |
| *search | enable search |
| theme   | enable dark theme switch |
| TableOfContent  | show a list of the headers 1-6 |
| integratedToC   | Table of content will show in the Navigation instead of it own area |
| *paragraphLink  | allows paragraph linking like with headers |
| *selectionLink  | link to specific text selection that will be highlighted |
| pages | an array of pages `["pageTitle", "folderPath/", listObject]`


*current option is not operational yet.

folder path must end with `/`

!more options to be added.

You can follow this [wiki-setup file for guidance](https://github.com/MustafaHi/Wiki3/blob/website/wiki-setup.js)

----

## Title

`string`

Title of your website, page title will be `title | document title`


## Root

`/string/`

Root directory of your website, or the name of your repo `/repoName/`, if none pass `/`

## fileURL

`true/false`

Use file path as url instead of file name, `/root/pageTitle/folderPath/file`; otherwise `/root/pageTitle/title`

## Header

`true/false`

Use Wiki3 own header, as you see above

## Search

`true/false`

Enable/Disable built-in search function.

## Theme

`true/false`

Enable/Disable dark theme switch

## TableOfContent

`true/false`

List of content headers `h1-6` for quick jumping through content, as you see on right.

## IntegratedToC

`true/false`

Table of Content will show on the left side inside the navigation.

## paragraphLink

`true/false` | `EXPERIMENTAL`

Enable paragraph linking like headers.

## selectionLink

`true/false` | `EXPERIMENTAL`

Enable specific text selection linking, this will break established links, if content been changed.

## Pages

`[Array]`

Seperated pages of content; like `Main` and `Developer` used here;  
Take an array of pages each page is `["pageTitle", "folderPath/", listObject]`

- `pageTitle`   : `string` i.e Main
- `folderPath/` : `string` i.e `docs/main/`
- `listObject`  : JavaScript/JSON object.

### listObject

content

- `t` : Title
- `c` : Children; Array of Objects
- `l` : Link

```JavaScript
const mainList = [{
	t: "Getting Started", //| Section
	c: [ //| Children of the section
		{
			t: "Wiki3",   //| Title of document
			l: "Wiki3.md" //| Path of document
		},
		{
			t: "Setup",
			l: "Setup.md"
		}
	]
}, {
	t: "Misc", //| Another Section
	c: [{ t: "Markdown Test", l: "markdown.md" }, { t: "HTML test", l: "HTML.html" }]
}];
```

If the object has no `l` links but has `c` children then it's treated as section.

If you are using `fileURL` then inside your document your links must be `/pageTitle/folderPath/l`

Otherwise `/pageTitle/section(if any)/t`; spaces will be replaced with `-` dash.