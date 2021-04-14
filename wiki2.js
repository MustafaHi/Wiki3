Init();

var router = new Navigo(Setup.root);

var Page = [], Navigation, ToC, toc = [], Doc;

zenscroll.setup(200, 60);

router.on({
    ':page/:nav/:doc': function({data}) {
        console.log("ROUTER: :page/:nav/:doc");
        console.log("PARAM: " + JSON.stringify(data));
        if (Page[0] !== data.page.toLowerCase())
        {
            Page = Setup.pages.find(p=> p[0].toLowerCase() === data.page.toLowerCase()) ?? Setup.pages[0];
            setupNav(Page[2]);
        }
        loadDocument(data);
    },
    ':page/:nav': function({data}) {
        console.log("ROUTER: :page/:nav");
        console.log("PARAM: " + JSON.stringify(data));
        if (Page[0] !== data.page.toLowerCase())
        {
            Page = Setup.pages.find(p=> p[0].toLowerCase() === data.page.toLowerCase()) ?? Setup.pages[0];
            setupNav(Page[2]);
        }
        // Navigation.querySelector('a').click();
    },
    ':page': function({data}) {
        console.log("ROUTER: :page");
        console.log("PARAM: " + JSON.stringify(data));
        if (Page[0] !== data.page.toLowerCase())
        {
            Page = Setup.pages.find(p=> p[0].toLowerCase() === data.page.toLowerCase()) ?? Setup.pages[0];
            setupNav(Page[2]);
        }
        // Navigation.querySelector('a').click();
    },
    '*': function() {
        console.log("ROUTER: *");

        Page = Setup.pages[0];
        setupNav(Page[2]);
        // Navigation.querySelector('a').click();
    }
}).resolve();


function Init() {
    const Wiki = document.getElementById("wiki");
    
    var HTML = "";
    if (Setup.header) {
        HTML =  '<header><div class="wrapper flow-horizontal"><div class="left"><div class="btn" id="toggleNav"><svg viewBox="0 0 512 512"><path d="M64 384h384v-42.666H64V384zm0-106.666h384v-42.667H64v42.667zM64 128v42.665h384V128H64z"></path></svg></div><a href="/'+ Setup.root +'">'+ Setup.title +'</a><div id="Pages"></div></div><div class="right"><div id="Social"></div><div id="Search" tabindex="1"><input type="search" id="iSearch" placeholder="Search"><div id="searchContent" tabindex="88"></div></div><div class="btn" id="toggleTheme"><div class="themeSwitch"></div></div></div></div></header>';
        HTML += '<div class="content wrapper flow-horizontal" id="wiki"><nav id="Navigation"></nav><div id="Doc" class="markdown-body line-numbers"></div><nav id="TableOfContent"></nav></div>';
        Wiki.innerHTML = HTML;
        HTML = "";
    }
    Setup.pages.forEach((p) => {HTML += '<a href="'+ p[0] +'" data-navigo>'+p[0]+'</a>';});
	document.getElementById("Pages").innerHTML = HTML;
    
	document.getElementById("toggleNav").addEventListener("click",   () => {
        Navigation.classList.toggle("show");
	});
	document.getElementById("toggleTheme").addEventListener("click", () => {
        document.body.classList.toggle("dark");
	});
    
    Navigation = document.getElementById('Navigation');
    ToC = document.getElementById('TableOfContent');
    Doc = document.getElementById('Doc');
}

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

function setupNav(list) {
	function ar(list, owner) {
		var arr = "<ul>";
		for (var i of list) {
			if (i.c) arr += '<li>' + i.t + ' ' + ar(i.c, i.t) + '</li>';
			else arr += '<li><a href="' + Page[0] + "/" + owner + "/" + i.t + '" data-navigo>' + i.t + '</a></li>';
			// else arr += '<li><a href="' + i.t + '" data-navigo>' + i.t + '</a></li>';
			// else arr += '<li><a href="' + Page[0] + "/" + i.t + '" path="' + i.l + '" data-navigo>' + i.t + '</a></li>';
		}
		arr += "</ul>";
		return arr;
	}
	var ht = "";
	for (var item of list) {
		ht += '<p>' + item.t + '</p>';
		if (item.c) ht += ar(item.c, item.t);
	}
	Navigation.innerHTML = ht;
	Nav = Navigation.getElementsByTagName("a");
	// Navigation.getElementsByTagName("li")[0].dispatchEvent(new Event("click"));
}


function loadDocument(param) {
    var nav = Page[2].find(n => n.t.toLowerCase === param.nav.toLowerCase());
    var doc = nav.c.find(d => d.t === param.doc.toLowerCase());

    if (!nav || !doc) return false;
    var url = Setup.root + '/' + Page[1] + '/' + doc.l;
    
    fetch(url).then(response => response.text())
    .then((data) => {
        scroll(0,0);
        toc = [];

        Doc.innerHTML = marked(data);

        Table();
    });
    document.title = Setup.title + " | " + doc.t;
    return true;
};

function Table() {
	function build(coll, k, level, ctx) {
		if (k >= coll.length || coll[k].level <= level) { return k; }
		var node = coll[k];
		ctx.push(poke('<li><a href="#{1}">{0}</a>', node.text, node.id));
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
}