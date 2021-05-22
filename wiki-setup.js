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
		{ t: "Wiki.js", l: "Wiki-js.md"},
		{ t: "Performances", l: "Performance.md"},
	]
}, {
	t: "Wiki3",
	c: [
		{ t: "RoadMap", l: "RoadMap.md" }
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
	pages: [["Main", "docs/", setupList], ["Developer", "docs/dev/", guideList]]
};