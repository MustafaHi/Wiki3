# Getting started

You can either include all the files from `Release` folder or  
Add the following HTML code

```html
<div id=wiki></div>
<link type="text/css" rel="stylesheet" href="wiki.css">
<script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js" data-manual></script>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/navigo@8.11.1/lib/navigo.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/zenscroll@4.0.2/zenscroll-min.js"></script>
<script type="text/javascript" src="wiki-setup.js"></script>
<script type="text/javascript" src="wiki.js"></script>
```

1. You need an element with `id=wiki`, can the body tag.

2. If you need a custom 404 page then include `404.html` to your root directory(repo) and change the URL property inside it.

3. Then edit `wiki-setup.js` following the `>` [Setup](/Main/Getting-Started/Setup) guide.


make sure the script and link `src/href` properties point correctly to your files.