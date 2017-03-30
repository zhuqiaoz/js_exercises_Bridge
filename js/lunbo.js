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
            hideBottomBar : true,
            insert : true,  //是否插入按钮数据
            insert_deaf:'ol',//
            defa_class:'active', //按钮的默认类名
            width : null,  //父元素的高
            height : null  //父元素的宽
        };
        var settings = $.extend(defaults,option||{}); //合并选项

        var wrap =$(this);
        var oul = wrap.children().first();
        var oli =oul.children();
        var oli_lenght = oli.length;
        var li_width = 0;
        var li_height = 0;
        var order_by = 'ASC';
        var index =0;


        if (settings.insert_deaf){
            var ool = wrap.find(settings.insert_deaf);
        }
        
        
        var init=function () {
            //是否存在元素，否则返回false
            if(!wrap.length)return false;
            //li的高和宽
            li_height = settings.height ? settings.height : oli.first().height();
            li_width = settings.width ? settings.width : oli.first().width();
            //父元素的高宽
            wrap.css({width:li_width+'px',height:li_height+'px'});
            //li
            oli.css({width:li_width+'px',height:li_height+'px'});

            if (settings.direction =='left'){
                oul.css({width:oli_lenght*li_width+'px'})
            }else {
                oul.css({height:oli_lenght*li_width+'px'})
            };

            oul.find('li:eq('+settings.startIndex+')').addClass(settings.defa_class);

            if (settings.insert){
                for (var i=0;i<oli_lenght;i++){
                    ool.append($('<li></li>'));
                }
            }else {
                return false;
            };


            ool.children().mouseover(function () {
                $(this).addClass(settings.defa_class).siblings().removeClass(settings.defa_class);
                oul.find('li:eq('+$(this).index()+')').addClass(settings.defa_class).siblings().removeClass(settings.defa_class);
                start();
                stop();
            });



            start();
        };
        
        function start(index) {
            var active = oul.find('li.active');
            var index = index ? index : active.index();
            if (settings.direction == 'left'){
                offset = index * li_width * -1;
                param = {'left':offset + 'px' };
            }

            ool.find('li:eq('+index+')').addClass(settings.defa_class).siblings().removeClass(settings.defa_class);

            oul.stop().animate(param, settings.duration*1000, settings.easing, function() {
                active.removeClass('active');
                if(order_by=='ASC'){
                    if (active.next().size()){
                        active.next().addClass('active');
                    }else{
                        order_by = 'DESC';
                        active.prev().addClass('active');
                    }
                }else if(order_by=='DESC'){
                    if (active.prev().size()){
                        active.prev().addClass('active');
                    }else{
                        order_by = 'ASC';
                        active.next().addClass('active');
                    }
                }
            });
            wrap.data('timeid', window.setTimeout(start, settings.delay*1000));
        }


        var stop = function() {
            window.clearTimeout(wrap.data('timeid'));
        };

        wrap.hover(function(){
            stop();
        }, function(){
            wrap.data('timeid', window.setTimeout(start, settings.delay*1000));//ADD.JENA.201303141309
        });
    



        init();
    }
})(jQuery)