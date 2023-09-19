$(function () {
    // 服务态度
    $('#function-attitude_star').raty({
        number: 5,
        score: 5,
        targetType: 'number',
        path: '/skin/mall/images',
        cancelOff: 'cancel-off-big.png',
        cancelOn: 'cancel-on-big.png',
        size: 24,
        starHalf: 'star-half-big.png',
        starOff: 'star-off-big.png',
        starOn: 'star-on-big.png',
        target: '#function-attitude_star-hint',
        cancel: false,
        targetKeep: true,
        precision: false,
        click: function (score, evt) {
            $('#function-attitude_star').find('input[name=score]').remove();
            $('#function-attitude_star-hint').val(score);
        }
    });

    // 完成态度
    $('#function-speed_star').raty({
        number: 5,
        score: 5,
        targetType: 'number',
        path: '/skin/mall/images',
        cancelOff: 'cancel-off-big.png',
        cancelOn: 'cancel-on-big.png',
        size: 24,
        starHalf: 'star-half-big.png',
        starOff: 'star-off-big.png',
        starOn: 'star-on-big.png',
        target: '#function-speed_star-hint',
        cancel: false,
        targetKeep: true,
        precision: false,
        click: function (score, evt) {
            $('#function-speed_star').find('input[name=score]').remove();
            $('#function-speed_star-hint').val(score);
        }
    });

    // 商品质量
    $('#function-quality_star').raty({
        number: 5,
        score: 5,
        targetType: 'number',
        path: '/skin/mall/images',
        cancelOff: 'cancel-off-big.png',
        cancelOn: 'cancel-on-big.png',
        size: 24,
        starHalf: 'star-half-big.png',
        starOff: 'star-off-big.png',
        starOn: 'star-on-big.png',
        target: '#function-quality_star-hint',
        cancel: false,
        targetKeep: true,
        precision: false,
        click: function (score, evt) {
            $('#function-quality_star').find('input[name=score]').remove();
            $('#function-quality_star-hint').val(score);
        }
    });

    ajax_check();
    $.fn.extend({
        layer_top: function() {
            var a = $(this).offset().top + 40,
                b = $(this);
            $(window).scroll(function() {
                $(window).scrollTop() > a ? b.addClass("fixed") : b.removeClass("fixed")
            })
        }
    });
    $.fn.extend({
        menu_layer: function() {
            var a = $("#c_aa").offset().top,
                b = $("#c_bb").offset().top,
                c = $("#c_cc").offset().top;
            $(".c_r_menu em:not([a])").click(function() {
                var a = $(this).attr("class").replace(/cur/, "");
                $("html,body").scrollTop($("#" + a).offset().top - 43);
                $(this).addClass("cur").siblings("em").removeClass("cur")
            })
        }
    });
    $('#layer_top').layer_top();
    // 商品评价
    AjaxComment(1);
})

function ajax_check(){
    var url = "/index.php?m=home&c=Ajax&a=ajax_view_download_check";
    var aid = $('input[name=aid_1597223814]').val();
    $.ajax({
        url: url,
        data: {aid:aid, _ajax:1},
        type:'post',
        success:function(res){
            //代理
            if (1 == res.data.is_agent) {
                var users_price = $('#users_price').val();
                users_price = users_price.replace(/,/g, '');
                users_price = Math.ceil(users_price*0.8); // 普通代理/贴牌代理/高级代理的折扣
                $('#daili_li_price_text').show();
                $('#daili_li_price').show();
                $('#daili_price').text(toThousands(users_price));
                $('#mall_li_price').addClass('txp');
                $('#mall_li_price').css('text-decoration','line-through');
            }
            //购买
            if (1 == res.data.is_buy){
                $('#ul_selectMeal_1597309095').hide();
                $('#is_buy').val(1);
                $('#a_buysubmit').text('下载模板');
                $('#postForm').attr('action',"/index.php?m=home&c=Download&a=download&aid="+aid);
            }
        }
    });
}

/*商品评价*/
function AjaxComment(page) {
    var url = "/index.php?m=home&c=Ajax&a=users_order_comment";
    var aid = $('input[name=aid_1597223814]').val();
    $.ajax({
        url: url,
        data: {p: page, aid:aid},
        type:'post',
        success:function(res){
            $('#code_pg_scTop').empty().html(res);
        }
    });
}
/*end*/

window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{},"p_w_picpath":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"24"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];

/**
 * 数字转为货币格式
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function toThousands(num) {
    var num = (num || 0).toString(), temp = num.length % 3;
    switch (temp) {
        case 1:
            num = '00' + num;
            break;
        case 2:
            num = '0' + num;
            break;
    }
    num = num.match(/\d{3}/g).join(',').replace(/^0+/, '');
    if (num.indexOf(".") < 0) {
        num += '.00';
    }
    return num;
}

function selectMeal(obj) {
    // 焦点
    $('#ul_selectMeal_1597309095').find('button').removeClass('cur');
    $(obj).addClass('cur');
    var type_id = $(obj).attr('data-value');

    $('#postForm').find('input[name=type_id]').val($(obj).attr('data-value'));

    var authorizePrice = $(obj).attr('data-price');// 授权域名价格
    var price = $('#users_price').val();// 原价
    price = price.replace(/,/g, '');
    // 总原价
    var price2 = parseInt(price) + parseInt(authorizePrice);
    $('#price').html(toThousands(price2));

    var daili_price = Math.ceil(parseInt(price)*0.8) + parseInt(authorizePrice); // 普通代理/贴牌代理/高级代理的折扣
    $('#daili_price').html(toThousands(daili_price));

    //2023/06/13 活动的时候走下面的ajax代码,注释上面四行; 平时走上面4行,注释下面ajax
    // $.ajax({
    //     url: "/index.php?m=home&c=Ajax&a=get_price_discount",
    //     data: {type_id:type_id},
    //     type: 'post',
    //     dataType: 'json',
    //     success: function (res) {
    //         if (1 == res.code && 1 != res.data) {
    //             // 总原价
    //             var price2 = parseInt(price*res.data) + parseInt(authorizePrice);
    //         }else {
    //             // 总原价
    //             var price2 = parseInt(price) + parseInt(authorizePrice);
    //         }
    //         var daili_price = Math.ceil(parseInt(price) * 0.8) + parseInt(authorizePrice); // 普通代理/贴牌代理/高级代理的折扣
    //
    //         $('#price').html(toThousands(price2));
    //         $('#daili_price').html(toThousands(daili_price));
    //
    //     },
    //     error: function () {
    //         layer.closeAll();
    //         layer.alert('未知错误，无法继续~', {icon: 2, title: false});
    //     }
    // });

    var url = $(obj).attr('data-url');
    $('#a_buysubmit').attr('data-url',url)
}

function buySubmit(obj) {
    if (0 >= ey_getCookie('users_id')) {
        layerLogin();
        return false;
    }

    if (1 == $('#is_buy').val()) {
        $('#postForm').submit();
    } else {
        var url = $(obj).attr('data-url');
        layer.open({
            type: 2,
            title: false,
            area: ['450px', '350px'], //宽高
            shade: [0.7, '#fff'], //0.1透明度的白色背景
            closeBtn: 1,
            success: function (layero, index) {
                layero[0].childNodes[1].childNodes[0].removeAttribute('href');
                layero[0].childNodes[1].classList.add('cursorStyle');
                layero[0].childNodes[1].childNodes[0].classList.remove('layui-layer-close2');
                layero[0].childNodes[1].childNodes[0].classList.add('layui-layer-close1');
            },
            content: url
        });
    }

    // if (1 == $('#is_buy').val()) {
    //     $('#postForm').submit();
    // } else {
    //     var content = '';
    //     content += '<div style="margin-top:20px;">';
    //     content += '<a href="javascript:void(0);" onclick="layer.closeAll();parent.formSubmit(\'alipay\');" style="float: left;">';
    //     content += ' <img src="/skin/images/alipay.png" width="150" height="50" alt="支付宝支付" />';
    //     content += '</a>';
    //     content += '<a href="javascript:void(0);" onclick="layer.closeAll();parent.formSubmit(\'wechat\');" style="float: right;">';
    //     content += ' <img src="/skin/images/weipay.png" width="150" height="50" alt="微信支付" />';
    //     content += '</a>';
    //     content += '</div>';
    //
    //     layer.open({
    //         type: 1,
    //         title: '选择支付方式',
    //         shadeClose: false,
    //         maxmin: false, //开启最大化最小化按钮
    //         skin: 'WeChatScanCode_20191120',
    //         area: ['320px', '150px'],
    //         content: content
    //     });
    // }
}

function formSubmit(payMethod) {
    var formid = 'postForm';
    $('#' + formid).append("<input type='hidden' name='pay_method' value='" + payMethod + "'>");

    $.ajax({
        url: $('#' + formid).attr('action'),
        data: $('#' + formid).serialize(),
        type: 'post',
        dataType: 'json',
        success: function (res) {
            console.log(res)
            if (0 == res.code) {
                if (res.url) {
                    layerLogin();
                } else {
                    layer.alert(res.msg, {icon: 2, title: false});
                }
            } else if (1 == res.code) {
                if ('alipay' == payMethod) {
                    // 支付宝支付
                    layer_loading('正在支付');
                    layer.confirm('支付成功可下载该模板！', {
                        btn: ['支付成功', '支付失败'], //按钮
                        cancel: function (index, layero) {
                            window.location.reload();
                            return false;
                        }
                    }, function () {
                        window.location.reload();
                    }, function (index) {
                        layer.closeAll(index);
                    });
                    PayPolling = window.setInterval(function () {
                        OrderPayPolling(res.data);
                    }, 2000);
                    window.open(res.data.alipay_url, '_blank ');
                } else if ('wechat' == payMethod) {
                    // 微信支付
                    AlertPayImg(res.data);
                } else {
                    layer.msg('请选择支付方式', {time: 2000});
                }
            }
        },
        error: function () {
            layer.closeAll();
            layer.alert('未知错误，无法继续~', {icon: 2, title: false});
        }
    });
}


// 举报/纠错
function reportaddsave(obj,title) {
    var url = $(obj).attr('data-href');
    //iframe窗
    layer.open({
        type: 2,
        id: 'iframe_reportaddsave',
        title: title,
        shadeClose: false,
        shade: 0.3,
        // fixed: true, //不固定
        // offset: '180px',
        maxmin: false, //开启最大化最小化按钮
        area: ['560px', '460px'],
        resize : false, //是否允许拉伸
        skin: 'layui-layer-mall', //样式类名
        content: url,
        success: function (layero, index) {
            layero[0].childNodes[1].childNodes[0].removeAttribute('href');
            layero[0].childNodes[1].classList.add('cursorStyle');
            layero[0].childNodes[1].childNodes[0].classList.remove('layui-layer-close2');
            layero[0].childNodes[1].childNodes[0].classList.add('layui-layer-close1');
            //对加载后的iframe进行宽高度自适应
            layer.iframeAuto(index);
        },
    });
}

function changeFocus(id) {
    $('#layer_top').find('.c_em').removeClass('cur');
    $('#layer_top em.' + id).addClass('cur');
    document.getElementById(id).scrollIntoView()
}


/**
 * //图片放大镜---------------------------------------------------
 */
window.onload = function () {
    //需求：鼠标放到小盒子上，让大盒子里面的图片和我们同步等比例移动。
    //技术点：οnmοuseenter==onmouseover 第一个不冒泡
    //技术点：οnmοuseleave==onmouseout  第一个不冒泡
    //步骤：
    //1.鼠标放上去显示盒子，移开隐藏盒子。
    //2.老三步和新五步（黄盒子跟随移动）
    //3.右侧的大图片，等比例移动。

    //0.获取相关元素
    var box = document.getElementsByClassName("img_box")[0];
    var small = box.firstElementChild || box.firstChild;
    var big = box.children[1];
    var mask = small.children[1];
    var bigImg = big.children[0];

    //1.鼠标放上去显示盒子，移开隐藏盒子。(为小盒子绑定事件)
    small.onmouseenter = function () {
        //封装好方法调用：显示元素
        show(mask);
        show(big);
    }
    small.onmouseleave = function () {
        //封装好方法调用：隐藏元素
        hide(mask);
        hide(big);
    }

    //2.老三步和新五步（黄盒子跟随移动）
    //绑定的事件是onmousemove，而事件源是small(只要在小盒子上移动1像素，黄盒子也要跟随)
    small.onmousemove = function (event) {
        //新五步
        event = event || window.event;

        //想要移动黄盒子，必须要知道鼠标在small小图中的位置。
        var pagex = event.pageX || scroll().left + event.clientX;
        var pagey = event.pageY || scroll().top + event.clientY;

        //x：mask的left值，y：mask的top值。
        var x = pagex - box.offsetLeft - mask.offsetWidth / 2; //除以2，可以保证鼠标mask的中间
        var y = pagey - box.offsetTop - mask.offsetHeight / 2;

        //限制换盒子的范围
        //left取值为大于0，小盒子的宽-mask的宽。
        if (x < 0) {
            x = 0;
        }
        if (x > small.offsetWidth - mask.offsetWidth) {
            x = small.offsetWidth - mask.offsetWidth;
        }
        //top同理。
        if (y < 0) {
            y = 0;
        }
        if (y > small.offsetHeight - mask.offsetHeight) {
            y = small.offsetHeight - mask.offsetHeight;
        }

        //移动黄盒子
        console.log(small.offsetHeight);
        mask.style.left = x + "px";
        mask.style.top = y + "px";

        //3.右侧的大图片，等比例移动。
        //如何移动大图片？等比例移动。
        //    大图片/大盒子 = 小图片/mask盒子
        //    大图片走的距离/mask走的距离 = （大图片-大盒子）/（小图片-黄盒子）
        //var bili = (bigImg.offsetWidth-big.offsetWidth)/(small.offsetWidth-mask.offsetWidth);

        //大图片走的距离/mask盒子都的距离 = 大图片/小图片
        var bili = bigImg.offsetWidth / small.offsetWidth;

        var xx = bili * x;  //知道比例，就可以移动大图片了
        var yy = bili * y;

        bigImg.style.marginTop = -yy + "px";
        bigImg.style.marginLeft = -xx + "px";
    }
}

//显示和隐藏
function show(ele) {
    ele.style.display = "block";
}

function hide(ele) {
    ele.style.display = "none";
}

function scroll() {  // 开始封装自己的scrollTop
    if (window.pageYOffset != null) {  // ie9+ 高版本浏览器
        // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if (document.compatMode === "CSS1Compat") {    // 标准浏览器   来判断有没有声明DTD
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return {   // 未声明 DTD
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}

//图片放大镜---------------------------------------------------