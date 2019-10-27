(function(global, $) {
    class Component {
        constructor($element) {
            this.$this = $element;
            this.imgElement = $element.find('img');
            this.boxRatio = $element.width() / $element.height();
            this.maxTime = 3;
            this.examine();
        }
        examine() {
            setTimeout(() => {
                console.log(this.imgElement[0].complete);
                this.maxTime--;
                if (this.imgElement[0].complete || this.maxTime === 0) {
                    let _ratio = this.imgElement.width() / this.imgElement.height();
                    if (_ratio > this.boxRatio) {
                        this.$this.addClass('h');
                    }
                } else {
                    this.examine();
                }
            }, 600); 
        }
    }

    $.fn.responseImg = function() {
        console.log('responseImg ');
        if (this.length === 0) {
            return this;
        }
        return this.each(function() {
            new Component($(this));
            return this;
        });
    };
})(window, jQuery);
