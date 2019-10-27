let jqPlugInInit = (ajax) => {
    /**
     * 处理图片的显示比例问题
     */
    $.fn.responseImg = function() {
        if (this.length === 0) {
            return this;
        }
        return this.each(function() {
            let $this = $(this);
            let $mImg = $this.find('img');
            let img = $mImg[0];
            let boxRatio = $this.width() / $this.height();
            let maxTime = 3;
            let _fn = () => {
                maxTime--;
                if (img.complete || maxTime === 0) {
                    let imgRatio = img.width / img.height;
                    if (imgRatio > boxRatio) {
                        $this.addClass('h');
                    }
                    return;
                }
                setTimeout(function() {
                    _fn();
                }, 600);
            };
            _fn();
            return this;
        });
    };
    /**
     * 加载更多组件
     * @param option 中的参数如下:
     * url : 数据请求的url
     * templateId : 模版id
     * urlOp : url参数
     */
    $.fn.pageAddMore = function(option = {}) {
        if (this.length === 0) {
            return this;
        }
        return this.each(function() {
            let $this = $(this);
            let url = option.url || $this.data('url');
            let templateId = $this.data('template') || option.template;
            let urlOp = $.extend({ page_num: 0 }, option.urlOption, $this.data('url-op'));

            let $addMore = $('<a class="m-more j-more hasMore">点击加载更多</a>');
            $this.after($addMore);
            $addMore.click(function() {
                let $clickThis = $(this);
                if (!$clickThis.hasClass('hasMore')) {
                    return;
                }
                urlOp.page_num++;
                $clickThis.text('').addClass('load');
                ajax.get(url, urlOp)
                    .then((data) => {
                        if (data.data.length === 0) {
                            $clickThis.text('没有更多了').removeClass('hasMore load');
                            return;
                        }
                        $clickThis.text('点击加载更多').removeClass('load');
                        $this.append(pugHtml(templateId, data));
                        $this.find('.f-imgBt').responseImg();
                    })
                    .catch((err) => {
                        console.error('加载更多错误 ', err);
                    });
            });
            return this;
        });
    };
    /**
     * 联动选择组件
     * @param option
     * @param urlOption
     */
    $.fn.gangedSelect = function(option = {}) {
        if (this.length !== 1) {
            return this;
        }
        let $this = $(this);
        let $open = $this.find('.j-open'); //折叠开关
        let $screen = $('.j-screen'); //选项
        let $ops = $screen.find('.j-option'); //子选项
        let $content = $this.find('.j-content'); //内容插入位置
        let $addMore = $this.find('.j-more'); //加载更多

        let templateId = option.template || $this.data('template');
        let url = option.url || $this.data('url');
        let urlOp = option.urlOp || $this.data('url-op');
        let screenOn = {};
        let $screenOns = $this.find('.j-screenOn .j-option');
        for (let i = 0; i < $screenOns.length; i++) {
            let $screenOnThis = $screenOns.eq(i);
            screenOn[$screenOnThis.data('type')] = $screenOnThis;
        }
        $open.click(function() {
            $open.toggleClass('on');
            $screen.stop().slideToggle(500);
            if ($open.hasClass('on')) {
                $open.text('关闭筛选');
            } else {
                $open.text('打开筛选');
            }
        });
        $ops.click(function() {
            let $clickThis = $(this);
            if ($clickThis.hasClass('on')) {return;}
            $clickThis
                .addClass('on')
                .siblings()
                .removeClass('on');
            let type = $clickThis.data('type');
            let state = $clickThis.data('state');
            screenOn[type].text($clickThis.text());
            if (typeof state === 'object') {
                urlOp = Object.assign(urlOp, state);
            } else {
                urlOp[type] = state;
            }
            urlOp.page_num = 0;
            ajax.get(url, urlOp)
                .then((data) => {
                    $addMore.addClass('hasMore').text('点击加载更多');
                    $content.html(pugHtml(templateId, data));
                })
                .catch((err) => {
                    console.error('gangedSelect ', err);
                });
        });
        $addMore.click(function() {
            if (!$addMore.hasClass('hasMore')) {
                return;
            }
            urlOp.page_num = urlOp.page_num + 1;
            $addMore.text('').addClass('load');
            ajax.get(url, urlOp)
                .then((data) => {
                    if (data.data.length === 0) {
                        $addMore.text('没有更多了').removeClass('hasMore load');
                        return;
                    }
                    $addMore.text('点击加载更多').removeClass('load');
                    $content.append(pugHtml(templateId, data));
                    $content.find('.f-imgBt').responseImg();
                })
                .catch((err) => {
                    console.error('gangedSelect addMore ', err);
                });
        });
        return this;
    };
    /**
     * tab切换
     * @return {$}
     */
    $.fn.tabChange = function() {
        if (this.length === 0) {
            return this;
        }
        return this.click(function() {
            let $this = $(this);
            let $tab = $('[data-tab=' + $this.data('tab') + ']');
            $this
                .addClass('on')
                .siblings()
                .removeClass('on');
            $tab.addClass('on')
                .siblings()
                .removeClass('on');
            return this;
        });
    };
    /**
     * 图片 鼠标mouseOver 时放大
     * @return {*}
     */
    $.fn.mouseOverZoomIn = function() {
        if (this.length === 0) {
            return this;
        }
        return this.mouseover(function() {
            let $this = $(this);
            $this
                .addClass('on')
                .siblings()
                .removeClass('on');
            $this.find('.f-imgBt').responseImg();
            return this;
        });
    };
    /**
     * 侧边导航定位对齐
     * @return {*}
     */
    $.fn.navPosition = function() {
        if (this.length === 0) {
            return this;
        }
        return this.click(function() {
            let $this = $(this);
            let navItem = $('.j-navItem');
            let index = $this.index();
            let offsetTop = navItem.eq(index).offset().top - 80;
            $('body,html').animate({ scrollTop: offsetTop }, 200, 'linear');
            return this;
        });
    };
    /**
     * 固定表头
     */
    $.fn.fixedHead = function() {
        if (this.length === 0) {
            return this;
        }
        if (this.length > 1) {
            throw new Error('固定表头只能有一个');
        }
        let $this = $(this);
        let $gBody = $('.g-bd');
        let offsetTop = $this.offset().top;
        $gBody[0].onscroll = function() {
            let scrollTop = $gBody.scrollTop();
            if (scrollTop >= offsetTop) {
                $this.addClass('fixed');
            } else {
                $this.removeClass('fixed');
            }
        };
    };
    /**
     * 绑定页面中的分享模块,带复制链接
     */
    $.fn.shareLink = function(option) {
        if (this.length === 0) {
            return this;
        }
        let url = window.location.href;
        let defaultOp = {
            eventType: 'click',
            container: '#qr-code',
            url: url, //复制黏贴的url
            qrcodeUrl: url, //二维码url
            width: 80,
            height: 80,
            callback: function() {}
        };
        let $mod = $('.j-mod-share');
        let $copyUrl = $('.j-copy-url');
        let op = Object.assign(defaultOp, option);
        let eventType = op.eventType;
        $(op.container).qrcode({
            width: op.width,
            height: op.height,
            text: op.qrcodeUrl,
            typeNumber: 0,
            correctLevel: 1
        });
        $(document).click(function() {
            $mod.removeClass('on');
        });
        $copyUrl.click(function() {
            let aux = document.createElement('input');
            aux.setAttribute('value', op.url);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand('copy'); // 执行复制命令
            document.body.removeChild(aux); // 将 input 元素移除
            if (typeof op.callback === 'function') {
                op.callback();
            }
        });
        if (eventType === 'hover') {
            return this.hover(
                function() {
                    $mod.toggleClass('on');
                },
                function() {
                    $mod.removeClass('on');
                }
            );
        } 
            return this.click(function(e) {
                $mod.toggleClass('on');
                e.stopPropagation();
            });
        
    };
};
