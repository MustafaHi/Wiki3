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
		{ t: "Wiki.js", l: "roadmap.md"},
	]
}];



const Setup = {
	title: "Wiki3 ",
	root: "/",
	fileURL: false,
	header: true,
	search: true,
	theme : true,
	tracking: true,
	codeTabs: true,
	TableOfContent: true,
	integratedToC : false,
	paragraphLink : true,
	selectionLink : true,
	pages: [["Main", "docs/", setupList], ["Guide", "docs/", guideList]]
};