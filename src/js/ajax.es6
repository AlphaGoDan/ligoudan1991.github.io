// eslint-disable-next-line no-unused-vars
(function() {
    class Ajax {
        constructor(option) {
            this.setting = $.extend(
                {
                    baseUrl: '',
                    sucHook: () => {},
                    errHook: () => {},
                    beforeHook: () => {}
                },
                option
            );
        }

        init(option) {
            this.setting = $.extend(this.setting, option);
        }

        urlVerify(url) {
            if (url.indexOf('http') === 0) {
                return url;
            }
            return this.setting.baseUrl + url;
        }

        get(url, op) {
            this.setting.beforeHook(url, op);
            let _url = this.urlVerify(url);
            if (op) {
                _url = _url + `?${this.parseParam(op, null)}`;
            }
            let sucHook = this.setting.sucHook;
            let errHook = this.setting.errHook;
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: _url,
                    type: 'get',
                    dataType: 'json',
                    success: function(res) {
                        if (res.data_status === false) {
                            errHook(_url, res.error);
                            reject(res.error);
                            return;
                        }
                        sucHook(_url, res);
                        resolve(res);
                    },
                    error: function(err) {
                        errHook(_url, err);
                        reject(err);
                    }
                });
            });
        }

        post(url, param) {
            this.setting.beforeHook(url, param);
            let _url = this.urlVerify(url);
            let sucHook = this.setting.sucHook;
            let errHook = this.setting.errHook;
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'POST',
                    url: _url,
                    data: JSON.stringify(param),
                    dataType: 'json',
                    contentType: 'application/json;charset=UTF-8',
                    success: function(res) {
                        if (res.data_status === false) {
                            errHook(_url, res.error);
                            reject(res.error);
                            return;
                        }
                        sucHook(_url, res);
                        resolve(res);
                    },
                    error: function(err) {
                        errHook(_url, { code: err.status, rawMessage: err.statusText });
                        reject(err);
                    }
                });
            });
        }

        delete(url, op) {
            this.setting.beforeHook(url, op);
            let _url = this.urlVerify(url);
            if (op) {
                _url = _url + `?${this.parseParam(op, null)}`;
            }
            let sucHook = this.setting.sucHook;
            let errHook = this.setting.errHook;
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'delete',
                    url: _url,
                    dataType: 'json',
                    success: function(res) {
                        if (res.data_status === false) {
                            errHook(_url, res.error);
                            reject(res.error);
                            return;
                        }
                        sucHook(_url, res);
                        resolve(res);
                    },
                    error: function(err) {
                        errHook(_url, err);
                        reject(err);
                    }
                });
            });
        }

        uploading(url, param) {
            this.setting.beforeHook(url, param);
            let _url = this.urlVerify(url);
            let sucHook = this.setting.sucHook;
            let errHook = this.setting.errHook;
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'POST',
                    url: _url,
                    data: param,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function(res) {
                        if (res.data_status === false) {
                            errHook(_url, res.error);
                            reject(res.error);
                            return;
                        }
                        sucHook(_url, res);
                        resolve(res);
                    },
                    error: function(err) {
                        errHook(_url, err);
                        reject(err);
                    }
                });
            });
        }

        parseParam(param, key) {
            let paramStr = '';

            if (
                typeof param === 'string' ||
                typeof param === 'number' ||
                typeof param === 'boolean'
            ) {
                paramStr += '&' + key + '=' + encodeURIComponent(param);
            } else if (param === null) {
                paramStr += '&' + key + '=';
            } else if (param.length) {
                $.each(param, (i, val) => {
                    paramStr += '&' + key + '=' + encodeURIComponent(val);
                });
            } else {
                $.each(param, (i, val) => {
                    let k = key === null ? i : key + ('.' + i);
                    paramStr += '&' + this.parseParam(val, k);
                });
            }
            return paramStr.substr(1);
        }
    }

    window.Ajax = Ajax;
    window.ajax = new Ajax();
})(window, jQuery);
