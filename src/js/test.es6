//

function currt(fun) {
    return function(arg1) {
        return function(arg2) {
            return fun(arg1, arg2);
        };
    };
}

function div(n, d) {
    return n / d;
}

let main = () => {
    console.log('main');
    let div10 = currt(div)(10)(2);
    let result = div10;
    console.log('result', result);
};

(function(global, $) {
    class Page {
        constructor() {
            main();
        }
    }
    global.Page = Page;

    $(() => {
        let ajax = window.ajax;
        ajax.init({ baseUrl: 'http://localhost:3002' });
        let Page = window.Page;
        new Page();
    });
})(window, jQuery, ajax);
