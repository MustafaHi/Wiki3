// https://mustafahi.github.io/Wiki3/Main/Getting-Started/Setup

const List = [{
	t: "Title of Section",
	c: [ // child links
		{
			t: "Title of Doc",
			l: "doc-link.md"
		}
	]
}];

const Setup = {
	title: "Wiki3 ",
	root: "/",
	fileURL: false,
	header: true,
	search: true,
	theme : true,
	TableOfContent: true,
	integratedToC : false,
	paragraphLink : true,
	selectionLink : true,
	pages: ['pageTitle', 'doc-folder/', List]
};