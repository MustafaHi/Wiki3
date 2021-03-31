//| Wiki3 v1.0
//| https://github.com/MustafaHi/Wiki3

var root = Setup.path;
var useHash = false; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);
// var router = new Navigo(root);

var Navigation = document.getElementById("Navigation");
const ToC = document.getElementById("TableOfContent");
const Doc = document.getElementById("Doc");
const iSearch = document.getElementById("iSearch");
var FL = true;
var Nav; // Navigation Elements
let toc = [];
zenscroll.setup(200, 60);

var hashID = "";
var Page = [];

// for (var page of Setup.pages) { 
// 	router.on({
// 		page[0]: 
// 	});
// }

router.on({
    ':url': function (params) {
		console.log(params);
		params.url = params.url.toLowerCase();
		hashID = params.url.indexOf("#") > 0 ? params.url.slice(params.url.indexOf('#')) : "";
		var url = params.url.indexOf("#") > 0 ? params.url.slice(0, params.url.indexOf('#')) : params.url;

		Page = Setup.pages.find(p=> p[0].toLowerCase() === url) ?? Setup.pages[0];
		console.log(Page);
		setup();
		// if (cc(el, url)) { cc(el, url).dispatchEvent(new Event("click"));}
		// else { el[0].dispatchEvent(new Event("click")); }
		Nav[0].dispatchEvent(new Event("click"));
		FL = false;
	},
	':page/:doc': function (params) {
		console.log(params);
		// console.log(params);
		params.page = params.page.toLowerCase();
		params.doc = params.doc.toLowerCase();
		hashID = params.doc.indexOf("#")  > 0 ? params.doc.slice(params.doc.indexOf('#')) : "";
		var url = params.doc.indexOf("#") > 0 ? params.doc.slice(0, params.doc.indexOf('#')) : params.doc;

		Page = Setup.pages.find(p=> p[0].toLowerCase() === params.page) ?? Setup.pages[0];
		// console.log(Page);
		setup();
		if (cc(Nav, url)) { cc(Nav, url).dispatchEvent(new Event("click"));}
		else { Nav[0].dispatchEvent(new Event("click")); }
		FL = false;
	},
    '*': function () {
		Page = Setup.pages[0];
		setup();
		Nav[0].dispatchEvent(new Event("click"));
		// Navigation.getElementsByTagName("li")[0].dispatchEvent(new Event("click"));
    }
}).resolve();

router.notFound(function () {
	console.log("NOT FOUND")
});



var renderer = (function () {
	var r = new marked.Renderer();
	r.heading = function (t, l, r) {
		var id = this.options.headerPrefix + r.trim().toLowerCase().replace(/[^\w]+/g, '-');
		toc.push({ level: l, id: id, text: t });
		return poke("<h{0} id={1}>{2}</h{0}>", l, id, t);
	}
	return r;
})();
marked.setOptions({renderer: renderer});

function poke(str, ...args) {
  return str.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
}

function setup() {
	setupNav(Page[2]);
	var HTML = "";
	Setup.pages.forEach((p) => {HTML += '<a href="'+p[0]+'">'+p[0]+'</a>';});
	document.getElementById("Pages").innerHTML = HTML;
	if (Setup.social) {
		HTML = "";
		Setup.social.forEach((p) => {HTML += p;});
		document.getElementById("Social").innerHTML = HTML;
	}

	document.getElementById("toggleNav").addEventListener("click",   () => {
		Navigation.classList.toggle("show");
	});
	document.getElementById("toggleTheme").addEventListener("click", () => {
		document.body.classList.toggle("dark");
	});
}


function setupNav(list) {
	function ar(list) {
		var arr = "<ul>";
		for (var i of list) {
			if (i.c) arr += '<li>' + i.t + ' ' + ar(i.c) + '</li>';
			else arr += '<li onclick="loadDocument(\'' +i.l+ '\')">' +i.t+ '</li>';
		}
		arr += "</ul>";
		return arr;
	}
	var ht = "";
	for (var item of list) {
		ht += '<p>' + item.t + '</p>';
		if (item.c) ht += ar(item.c);
	}
	Navigation.innerHTML = ht;
	Nav = Navigation.getElementsByTagName("li");
	// Navigation.getElementsByTagName("li")[0].dispatchEvent(new Event("click"));
}

function loadDocument(url) {
	// console.log("Loaded : ", url);
	var t = event.target;
	if (t.classList.contains("active")) return false;
	
	// var historyUrl = "./" + Setup.path + "/" + Page[0] + "/" + t.innerText;
	var historyUrl = Setup.path + "/" + Page[0] + "/" + t.innerText;
	url = "./docs" + Page[1] + "/" + url;
	console.log(historyUrl);
	fetch(url)
	.then(response => response.text())
	.then((data) => {
		scroll(0,0);
		toc = [];
		// Doc.innerHTML = md.render(data);
		Doc.innerHTML = marked(data);

		Table();
		ParagraphID();

		if (hashID) zenscroll.to(document.getElementById(hashID.slice(1)));

		window.Prism.highlightAllUnder(Doc);
		//   log('hashID : ' + hashID);
		//   if (hashID) document.getElementById(hashID.slice(1).scrollIntoView({behavior: "smooth"});
		// 	 console.log(hashID);
		Tracking();
	});
	// router.updatePageLinks();
	document.querySelector("li.active")?.classList.toggle("active", false);
	t.classList.toggle("active", true);
	if (!FL || !hashID) window.history.replaceState(null, "", historyUrl);
	document.title = Setup.title + t.innerText;
	return true;
}

function Table() {
	function build(coll, k, level, ctx) {
		if (k >= coll.length || coll[k].level <= level) { return k; }
		var node = coll[k];
		ctx.push(poke("<li><a href='#{1}'>{0}</a>", node.text, node.id));
		// ctx.push(poke("<li href='#{1}'>{0}", node.text, node.id));
		k++;
		var childCtx = [];
		k = build(coll, k, node.level, childCtx);
		if (childCtx.length > 0) {
			ctx.push("<ul>");
			childCtx.forEach(function (idm) {
				ctx.push(idm);
			});
			ctx.push("</ul>");
		}
		ctx.push("</li>");
		k = build(coll, k, level, ctx);
		return k;
	}
	var html = ['<p>CONTENT</p>', '<ul>'];
	build(toc, 0, 0, html);
	html.push("</ul>");
	ToC.innerHTML = html.join("");
	// ToC.innerHTML += '<svg class="toc-marker" width="200" height="200" xmlns="http://www.w3.org/2000/svg"><path stroke="#444" stroke-width="3" fill="transparent" stroke-dasharray="0, 0, 0, 1000" stroke-linecap="round" stroke-linejoin="round" transform="translate(-0.5, -0.5)" /></svg>';
	// var html = '<p>CONTENT</p>';
	// for (var i = 0; i<toc.length; i++) {
	// 	if (toc[i+1] && toc[i+1].level < toc[i].level)
	// 		html += poke('<li>{0} <ul></li>', toc[i].text);
	// 	else if (!toc[i+1] || toc[i+1].level > toc[i].level)
	// 		html += poke('</ul><li>{0}</li>', toc[i].text);
	// 	else {
	// 		html += poke('<li>{0}</li>', toc[i].text);
	// 	}
	// }
	// var t = toc;
	// for (var i = 0; i<t.length; i++) {
	// 	if (t[i+1]) {
	// 		if (t[+1].level > t[i].level) {
	// 			html = t[i].t;
	// 		}
	// 	}
	// }
	// ToC.innerHTML = html;
}

function cc(collection, searchText) { // check collection
    for (var i = 0; i < collection.length; i++) {
        if( collection[i].innerText.toLowerCase() === searchText ) {
            return collection[i];
        }
    }
    return false;
}

function ParagraphID() {
	var e = 0;
	for (var el of Doc.children) {
		if (!el.id) el.id = 'p'+ e++;
	}
}

var g;
// Tracking
function Tracking() {
	// window.addEventListener('DOMContentLoaded', () => {

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				const id = entry.target.getAttribute('id');
				if (entry.intersectionRatio > 0) {
					g = ToC.querySelector('a[href="#' + id + '"]');
					Tack(g, true);
					// document.querySelector('nav li a[href="#' + id + '"]').parentElement.classList.add('active');
					// e.dispatchEvent(new Event("mouseover"));
					// g.parentElement.classList.toggle('active', true);
					// g.parentElement.parentElement.parentElement.classList.toggle('active', true);
				} else {
					// Tack(ToC.querySelector('a[href="#' + id + '"]'), false);
					// ToC.querySelectorAll(".active").forEach((i) => {i.classList.remove("active")});
					// console.log(id);
					ToC.querySelector('a[href="#' + id + '"]').parentElement.classList.toggle('active', false);
					// ToC.querySelector('a[href="#' + id + '"]').parentElement.parentElement.parentElement.classList.toggle('active', false);
					// ToC.querySelector(".active")?.classList.remove('active');
				}
			});
		});
	
		// Track all sections that have an `id` applied
		Doc.querySelectorAll('h1,h2,h3,h4').forEach((section) => {
			// console.log(section);
			observer.observe(section);
		});
		
	// });
	return true;
}

// function Tracking() {
// 	ToC.innerHTML = "";
// }
function Tack(e, state) {
	while (e && e.parentNode) {
		e = e.parentNode;
		if (e.tagName == "NAV") return;
		if (e.tagName == "LI") e.classList.toggle("active", state);
	  }
}

iSearch.addEventListener("input", () => {
	// console.log(Page[2].find(e => e.t.indexOf(this.value) >= 0));
	console.log(iSearch.value);
	if (iSearch.value.length > 0) find(iSearch.value, Page[2]);
});

function find(value, arr) {
	var list = [];
	function f(value, arr) {
		for (var i of arr) {
			if (i.l && i.t.toLowerCase().indexOf(value.toLowerCase()) >= 0) { list.push(i); }
			if (i.c) f(value, i.c);
		}
	}
	f(value, arr);
	console.log(list);
	var html = "";
	for (var i of list)
		html += '<a href="/' + Page[0] + "/" + i.t + '">' + i.t + '</a>';
	document.getElementById('searchContent').innerHTML = html;
}