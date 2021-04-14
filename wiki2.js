var router = new Navigo(Setup.path);

var Page, Navigation, ToC, Doc;

zenscroll.setup(200, 60);

router.on({
    '*': function() {
        console.log("ROUTER: *");

        Page = Setup.pages[0];
        setup();
    },
    ':page': function({param}) {
        console.log("ROUTER: :page");
        console.log("PARAM: " + JSON.stringify(param));
        Page = Setup.pages.find(p=> p[0].toLowerCase() === param.page.toLowerCase()) ?? Setup.pages[0];
    },
    ':page/:nav': function({param}) {
        console.log("ROUTER: :page/:nav");
        console.log("PARAM: " + JSON.stringify(param));
        Page = Setup.pages.find(p=> p[0].toLowerCase() === param.page.toLowerCase()) ?? Setup.pages[0];
    },
    ':page/:nav/:doc': function({param}) {
        console.log("ROUTER: :page/:nav/:doc");
        console.log("PARAM: " + JSON.stringify(param));
        Page = Setup.pages.find(p=> p[0].toLowerCase() === param.page.toLowerCase()) ?? Setup.pages[0];
    }
}).resolve();

