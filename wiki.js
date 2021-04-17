//| Wiki3 v0.1.2
//| https://github.com/MustafaHi/Wiki3

Init();

var router = new Navigo(Setup.root, { linksSelector: "a" });

var Page = [], Navigation, ToC, toc = [], Doc;

zenscroll.setup(200, 60);

router.on({
    ':page/:*': function(param) {
        console.log("ROUTER: :page/*");
        console.log("PARAM : " + JSON.stringify(param));
        let paramPage = param.data.page.toLowerCase();
        if (Page[0]?.toLowerCase() !== paramPage)
        {
            Page = Setup.pages.find(p=> p[0].toLowerCase() === paramPage) ?? Setup.pages[0];
            setupNav(Page[2]);
        }
        loadDocument(param);
    },
    ':page': function(param) {
        console.log("ROUTER: :page");
        console.log("PARAM: " + JSON.stringify(param));
        let paramPage = param.data.page.toLowerCase();
        if (Page[0]?.toLowerCase() !== paramPage)
        {
            Page = Setup.pages.find(p=> p[0].toLowerCase() === paramPage) ?? Setup.pages[0];
            setupNav(Page[2]);
        }
        Navigation.querySelector('a').click();
    },
    '*': function() {
        console.log("ROUTER: *");
        Page = Setup.pages[0];
        setupNav(Page[2]);
        Navigation.querySelector('a').click();
    }
}).resolve();


function Init() {
    const Wiki = document.getElementById("wiki");
    
    var HTML = "";
    if (Setup.header) 
    {
        HTML =  '<header><div class="wrapper flow-horizontal"><div class="left"><div class="btn" id="toggleNav"><svg viewBox="0 0 512 512"><path d="M64 384h384v-42.666H64V384zm0-106.666h384v-42.667H64v42.667zM64 128v42.665h384V128H64z"></path></svg></div><a href="'+ Setup.root +'">'+ Setup.title +'</a><div id="Pages">';
        Setup.pages.forEach((p) => {HTML += '<a href="'+ Setup.root + p[0] +'" data-navigo>'+ p[0] +'</a>';});
        HTML += '</div></div><div class="right"><div id="Social"></div><div id="Search" tabindex="0"><input type="search" id="iSearch" placeholder="Search"><div id="searchContent" tabindex="0"></div></div><div class="btn" id="toggleTheme"><div class="themeSwitch"></div></div></div></div></header>';
    }
    HTML += '<div class="content wrapper flow-horizontal" id="wiki"><nav id="Navigation"></nav><div id="Doc" class="markdown-body line-numbers"></div><nav id="TableOfContent"></nav></div>';
    Wiki.innerHTML = HTML;
    
    Navigation = document.getElementById('Navigation');
    ToC = document.getElementById('TableOfContent');
    Doc = document.getElementById('Doc');
    
	document.getElementById("toggleNav").addEventListener("click",   () => {
        Navigation.classList.toggle("show");
	});
	document.getElementById("toggleTheme").addEventListener("click", () => {
        document.body.classList.toggle("dark");
	});
}

var renderer = (function () {
	var r = new marked.Renderer();
	r.heading = function (t, l, r) {
		var id = this.options.headerPrefix + r.trim().toLowerCase().replace(/[^\w]+/g, '-');
		toc.push({ level: l, id: id, text: t });
		return ('<h'+ l +' id='+ id +'>'+ t +'</h'+ l +'>');
	}
	return r;
})();
marked.setOptions({renderer: renderer});


function setupNav(list) {
	function ar(list, owner) {
		var arr = "<ul>";
		for (var i of list) {
			if (i.c) arr += '<li>' + i.t + ' ' + ar(i.c, owner + '/' + i.t) + '</li>';
			else arr += '<li><a href="'+ Setup.root + Page[0] + '/' + owner + '/' + i.t + '" path="' + Setup.root + Page[1] + i.l + '" data-navigo>' + i.t + '</a></li>';
		}
		arr += "</ul>";
		return arr;
	}
	var HTML = "";
	for (var item of list) {
		HTML += '<p>' + item.t + '</p>';
		if (item.c) HTML += ar(item.c, item.t);
	}
	Navigation.innerHTML = HTML;
    router.updatePageLinks();
}

function loadDocument(param) {
    console.log(param.url);
    var  el = Navigation.querySelector('a[href="/'+ decodeURI(param.url) +'"]');
    if (!el)
    {
        Doc.innerHTML = "<h1>404 NOT FOUND!</h1><p>Please make sure the URL is correct.</p>";
        return false;
    }
    
    fetch(el.getAttribute("path")).then(response => response.text())
    .then((data) => {
        scroll(0,0);
        toc = [];

        Doc.innerHTML = marked(data);

        Table();

        var hash = document.getElementById(param.hashString);
        if (hash)  zenscroll.to(hash);

        window.Prism.highlightAllUnder(Doc);
    });
    document.title = Setup.title + " | " + el.textContent;
    return true;
};

function Table() {
	function build(coll, k, level, ctx) {
		if (k >= coll.length || coll[k].level <= level) { return k; }
		var node = coll[k];
		ctx.push('<li><a href="#'+ node.id +'">'+ node.text +'</a>');
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
	var HTML = ['<p>CONTENT</p>', '<ul>'];
	build(toc, 0, 0, HTML);
	HTML.push("</ul>");
	ToC.innerHTML = HTML.join("");
}
