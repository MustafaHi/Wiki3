const setupList = [{
	t: "Getting Started",
	c: [
		{
			t: "Wiki3",
			l: "Wiki3.md"
		},
		{
			t: "Installation",
			l: "Installation.md"
		},
		{
			t: "Setup",
			l: "Setup.md"
		}
	]
}, {
	t: "Misc",
	c: [{ t: "Markdown Test", l: "markdown.md" }, { t: "HTML test", l: "HTML.html" }]
}];
const guideList = [{
	t: "Developer",
	c: [
		{ t: "Welcome", l: "welcome.md"},
		{ t: "Wiki.js", l: "wiki-file.md"},
		{ t: "Wiki.css", l: "wiki-css.md"},
		{ t: "Performance", l: "Performance.md"},
	]
}, {
	t: "Wiki3",
	c: [
		{ t: "RoadMap", l: "RoadMap.md" },
		{ t: "change-log", l: "log.md" },
		{ t: "Contribute", l : "contribute.md" }
	]
}];



const Setup = {
	title: "Wiki3",
	root: "/Wiki3/",
	fileURL: false,
	header: true,
	search: false,
	theme : true,
	TableOfContent: true,
	integratedToC : false,
	paragraphLink : true,
	selectionLink : true,
	social: ['<a href="https://github.com/MustafaHi/Wiki3/" target="blank"><svg width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg> GitHub</a>'],
	pages: [["Main", "docs/", setupList], ["Developer", "docs/dev/", guideList]]
};