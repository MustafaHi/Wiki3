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
		{ t: "Welcome", l: "Wiki3.md"},
		{ t: "Wiki.js", l: "Setup.md"},
	]
}];



const Setup = {
	title: "Wiki3 ",
	root: "/Wiki3/",
	fileURL: true,
	header: true,
	search: false,
	theme : false,
	tracking: true,
	codeTabs: true,
	TableOfContent: true,
	integratedToC : true,
	paragraphLink : true,
	selectionLink : true,
	pages: [["Main", "docs/", setupList], ["Guide", "docs/", guideList]]
};