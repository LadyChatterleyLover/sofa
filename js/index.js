$(function () {
    // 初始化fullpage组件
    //1.设置每一个屏幕的背景颜色
    //2.设置屏幕内容的对齐方式 默认是垂直居中的 改成顶部对齐
    //3.设置导航指示器 点容器
    //4.监听进入某一屏的时候 回调函数
    $(".container").fullpage({
        //配置参数
        sectionsColor:["#fadd67","#84a2d4","#ef674d","#ffeedd","#d04759","#84d9ed","#8ac060"],
        verticalCentered:false,
        navigation:true,
        scrollingSpeed:1000,//页面滚动时间 默认是700毫秒
        //离开某一个屏幕的时候初始化
        onLeave:function (index,nextIndex,direction) {
            var currentIndex = $(".section").eq(index - 1);
            if (index == 2 && nextIndex == 3) {
                // 当前是从第二页跳转到第三页
                currentIndex.addClass("leaved");
            } else if (index == 3 && nextIndex == 4) {
                // 当前是从第三页跳转到第四页
                currentIndex.addClass("leaved");
            } else if (index == 5 && nextIndex == 6) {
                // 当前是从第五三页跳转到第六页
                currentIndex.addClass("leaved");
                $(".screen06 .box").addClass("show");
            } else if (index == 6 && nextIndex == 7) {
                $(".screen07 .star").addClass("show");
                $(".screen07 .text").addClass("show");
                 $(".screen07 .star img").each(function (i, item) {
                //     $(this).delay(i * 5 *1000).fadeIn();
                     $(this).css("transition-delay",i*0.5 + "s");
               });
            }
        },
        //切换到下一个屏幕
        afterLoad:function (link,index) {
            //index:当前屏幕的序号 从1开始
        $(".section").eq(index-1).addClass("now");
        },
        afterRender:function () {
       // 点击切换下一页 最好在插件初始化完毕或者插件内容渲染完毕之后加载
            $(".more").on("click",function () {
                $.fn.fullpage.moveSectionDown();
            });
            // 当第四屏的购物车动画结束之后 再来执行收货地址的动画
            $(".screen04 .cart").on("transitionend",function () {
                $(".screen04 .address").show().find("img:last").fadeIn(1000);
                $(".screen04 .text").addClass("show");
            });
            // 第八屏功能
            // 1.手要跟着鼠标走
            $(".screen08").on("mousemove",function (e) {
                $(this).find(".hand").css({
                    left:e.clientX,
                    top:e.clientY
                });
                // 点击再来一次重置动画回到第一页
                $(this).find(".again").on("click",function () {
                    // 动画都是怎么进行的
                    // 1.加 now类
                    // 2.加leaved类
                    // 3.加show类
                    $(".now,.leaved,.show").removeClass("now").removeClass("leaved").removeClass("show");
                    // 4.加css属性 后果 加了一个 style属性
                    // 5.用jq的方法 show() fadeIn() 后果 加了一个style属性
                    $(".content[style]").removeAttr("style");
                    // 跳回到第一页
                    $.fn.fullpage.moveTo(1);
                })
            })
        },

    });

});