(function ($) {
    $.fn.lunbo =function (option) {
        var defaults = {
            parent:'', //执行动画父元素
            direction : 'left',//执行动画的方向
            duration : 0.6,//执行动画的持续时间
            easing : 'swing',//swing,linear
            delay : 3,//执行动画的延迟时间
            startIndex : 0,//焦点图的开始位置
            hideClickBar : true,
            clickBarRadius : 5,//unit:px
            hideBottomBar : false,
            width : null,  //父元素的高
            height : null  //父元素的宽
        };
        var settings = $.extend(defaults,option||{}); //合并选项
        var wrap =$(this);
        var oul = wrap.children();
        var li_num = .length;
        var li_width = 0;
        var li_heigth = 0;

    }
})(jQuery)