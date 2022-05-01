# Getting started

You can either include all the files from `Release` folder or  
Add the following HTML code

```html
<div id=wiki></div>
<link type="text/css" rel="stylesheet" href="wiki.css">
<script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js" data-manual></script>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script type="text/javascript" src="wiki-setup.js"></script>
<script type="text/javascript" src="wiki.js"></script>
```

1. You need an element with `id=wiki`, can be the body tag.

2. If you need a custom 404 page then include `404.html` to your root directory(repo) and change the content/URL attribute inside the file.

3. Then edit `wiki-setup.js` following the `>` [Setup](/Main/Getting-Started/Setup) guide.


make sure the `<script>`'s and `<link>`'s `src/href` attributes point correctly to your files.