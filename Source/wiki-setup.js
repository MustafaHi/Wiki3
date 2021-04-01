const setupList = [{
	t: "Getting Started",
	c: [
		{
			t: "Installation",
			l: "demo1.md"
		},
		{
			t: "Upcoming Changes",
			l: "demo2.md"
		},
		{
			t: "Platform",
			c: [
				{ t: "Windows", l: "demo3.md" },
				{ t: "Linux",   l: "demo4.md" }
			]
		},
		{
			t: "Latex",
			l: "demo1.md"
		}
	]
}, {
	t: "Tables",
	c: [{ t: "API", l: "demo2.md" }, { t: "All Documentations", l: "demo4.md" }]
}];
const guideList = [{
	t: "Framework",
	c: [
		{ t: "Guide Lines", l: "demo2.md"},
		{ t: "Setup", l: "demo3.md"},
		{ t: "Colors", l: "demo4.html" },
	]
}, {
	t: "Components",
	c: [
		{ t: "Grid", l: "demo1.md" },
		{ t: "Headers", l: "demo4.md" },
		{ t: "Buttons", l: "demo2.md" },
		{ t: "Input", l: "demo3.md" },
		{ t: "Checkboxes", l: "demo4.md" },
	]
}];



const Setup = {
	title: "Wiki3 ",
	path: "/Wiki3/Source/",
	// path: "Wiki3/Source",
	header: true,
	search: true,
	theme : true,
	tracking: true,
	codeTabs: true,
	innerTable: true,
	TableOfContent: true,
	paragraphLink : true,
	selectionLink : true,
	pages: [["Main", "", setupList], ["Guide", "", guideList]]
};