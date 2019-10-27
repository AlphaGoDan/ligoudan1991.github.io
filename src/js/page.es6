(function(global, $) {
    class Page {
        constructor() {
            console.log('new page');
            this.data = '属性';
            this.$body = $('body');
            this.initEvent();
            this._create();
        }
        _create() {
            console.log('new page _create');
            //this.initData();
            $('.m-img').responseImg();
        }
        initData() {
            ajax.get('/api/v1/block')
                .then((data) => {
                    console.log('data', data);
                })
                .catch((err) => {
                    console.log('err', err);
                });
        }
        initEvent() {
            console.log('new page initEvent');
            $('.btn').click(this.test.bind(this));
            $('body').on('click', '.btn', this.test2.bind(this));
        }
        test() {
            console.log('test', this);
        }
        test2() {
            console.log('test2', this);
            this.initData();
        }
    }

    global.Page = Page;
    
})(window, jQuery, ajax);
