(function(global, $) {
    let Page = (function() {
        function Page() {
            console.log('page');
            this.$btn = $('.btn').click(this.test2.bind(this));

            this.test();
        }
        Page.prototype.test = function() {
            console.log('test', this);
        };
        Page.prototype.test2 = () => {
            console.log('test1', this);
        };
        return Page;
    })();

    new Page();
    global.Page = Page;
})(window, jQuery);
