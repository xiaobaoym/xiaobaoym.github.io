var layer_shade = [0.7, '#fafafa'];
var ueditor_toolbars = [[
    'fullscreen', 'source', '|', 'undo', 'redo', '|',
    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
    'directionalityltr', 'directionalityrtl', 'indent', '|',
    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
    'link', 'unlink', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
    'simpleupload', 'insertimage', 'emotion', 'insertvideo', 'attachment', 'insertframe', 'insertcode', '|',
    'horizontal', 'spechars', '|',
    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
    'preview', 'searchreplace', 'drafts'
]];

var eyou_basefile = "/index.php";
function showErrorMsg(msg){
    layer.msg(msg, {icon: 5,time: 2000});
}
function showErrorAlert(msg, icon){
    if (!icon && icon != 0) {
        icon = 5;
    }
    layer.alert(msg, {icon: icon, title: false, closeBtn: false});
}

/**
 * 绑定邮箱
 * model   0:：不显示关闭按钮，1：正常的弹出框；2：关闭弹窗之后返回上一个页面；3：关闭之后不刷新当前页面
 */
function checkemail(model)
{
    var closeBtn = 1;
    var refresh = 1;
    if (3 == model) {
        refresh = 0;
    } else if (0 == model) {
        closeBtn = 0;
    }
    //iframe窗
    layer.open({
        type: 2,
        id: 'iframe_checkemail',
        title: '绑定邮箱',
        fixed: true, //不固定
        shadeClose: false,
        shade: 0.3,
        maxmin: false, //开启最大化最小化按钮
        closeBtn: closeBtn,
        area: ['650px','400px'],
        content: '/user/bindauth.php?fmdo=email&dopost=view&refresh='+refresh,
        end: function(layero, index){
            if (2 == model) {
                parent.window.history.go(-1);
            }
        }
    });
}

/**
 * 绑定手机号码
 * model   0:：不显示关闭按钮，1：正常的弹出框；2：关闭弹窗之后返回上一个页面；3：关闭之后不刷新当前页面
 */
function checkmobile(model)
{
    var closeBtn = 1;
    var refresh = 1;
    if (3 == model) {
        refresh = 0;
    } else if (0 == model) {
        closeBtn = 0;
    }
    //iframe窗
    layer.open({
        type: 2,
        id: 'iframe_checkmobile',
        title: '绑定手机号码',
        fixed: true, //不固定
        shadeClose: false,
        shade: 0.3,
        maxmin: false, //开启最大化最小化按钮
        closeBtn: closeBtn,
        area: ['650px','455px'],
        content: '/user/bindauth.php?fmdo=mobile&dopost=view&refresh='+refresh,
        end: function(layero, index){
            if (2 == model) {
                parent.window.history.go(-1);
            }
        }
    });
}

/**
 * 更换手机号码
 */
function checkeditmobile(model)
{
    //iframe窗
    layer.open({
        type: 2,
        id: 'iframe_checkmobile',
        title: '更换手机号码',
        fixed: true, //不固定
        shadeClose: false,
        shade: 0.3,
        maxmin: false, //开启最大化最小化按钮
        closeBtn: 1,
        area: ['650px','455px'],
        content: '/user/bindauth.php?fmdo=mobile&dopost=viewedit'
    });
}

/**
 * 输入域名
 */
function goAuth(cid,type)
{
    //iframe窗
    layer.open({
        type: 2,
        id: 'iframe_goAuth',
        title: '请输入授权域名',
        fixed: true, //不固定
        shadeClose: false,
        shade: 0.3,
        maxmin: false, //开启最大化最小化按钮
        closeBtn: 1,
        area: ['500px','400px'],
        content: '/user/giftpost.php?fmdo='+type+'&dopost=viewedit&cid='+cid
    });
}
/**
 * 输入收货人信息
 */
function goInfo(cid)
{
    //iframe窗
    layer.open({
        type: 2,
        id: 'iframe_goinfo',
        title: '请输入收货人信息',
        fixed: true, //不固定
        shadeClose: false,
        shade: 0.3,
        maxmin: false, //开启最大化最小化按钮
        closeBtn: 1,
        area: ['650px','455px'],
        content: '/user/giftpost.php?fmdo=info&dopost=viewedit&cid='+cid
    });
}
/**
 * 手机号码格式判断
 * @param tel
 * @returns {boolean}
 */
function checkMobile(tel) {
    var reg = /(^1[0-9]{10}$)/;
    if (reg.test(tel)) {
        return true;
    }else{
        return false;
    };
}

/**
 * 邮箱格式判断
 * @param str
 */
function checkEmail(str){
    var reg = /^[a-z0-9]([a-z0-9\\.]*[-_]{0,4}?[a-z0-9-_\\.]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+([\.][\w_-]+){1,5}$/i;
    if(reg.test(str)){
        return true;
    }else{
        return false;
    }
}

/**
 * 封装的加载层
 */
function layer_loading(msg){
    if (!msg) msg = ''; 
    if (msg == '') {
        //loading层
        var loading = layer.load(3, {
            shade: [0.2,'#000'] //0.1透明度的白色背景
        });
    } else {
        var loading = layer.msg(
        msg+'...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请勿刷新页面', 
        {
            icon: 1,
            time: 3600000, //1小时后后自动关闭
            shade: [0.2] //0.1透明度的白色背景
        });
        //loading层
        var index = layer.load(3, {
            shade: [0.1,'#fff'] //0.1透明度的白色背景
        });  
    }

    return loading;
}

/**
 * 父窗口 - 封装的加载层
 */
function parent_layer_loading(msg){
    var loading = parent.layer.msg(
    msg+'...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请勿刷新页面', 
    {
        icon: 1,
        time: 3600000, //1小时后后自动关闭
        shade: [0.2] //0.1透明度的白色背景
    });
    //loading层
    var index = parent.layer.load(3, {
        shade: [0.1,'#fff'] //0.1透明度的白色背景
    });

    return loading;
}

function gourl(url)
{
    window.location.href = url;
}

// 微信扫码支付，用于PC端
function weipay(formData,url)
{
    // var formData = new FormData();
    // formData.append('product', product);
    // formData.append('pid', pid);
    formData.append('_ajax', 1);
    layer_loading('正在处理');
    $.ajax({
        url: url, //'/user/buy_action.php',
        type: 'POST',
        data: formData,
        dataType: "json", //声明成功使用json数据类型回调
        //如果传递的是FormData数据类型，那么下来的三个参数是必须的，否则会报错
        cache: false,  //默认是true，但是一般不做缓存
        processData: false, //用于对data参数进行序列化处理，这里必须false；如果是true，就会将FormData转换为String类型
        contentType: false,  //一些文件上传http协议的关系，自行百度，如果上传的有文件，那么只能设置为false
        success: function(res){
            layer.closeAll();
            if (res.code == 1) {
                if (!res.url) {
                    //iframe窗
                    var url = "/index.php?m=user&c=Buy&a=weipay&vars="+res.vars;
                    // var url = "/user/weipay.php?vars="+res.vars;
                    layer.open({
                        type: 2,
                        title: '微信扫码支付',
                        id: 'WeChatScanCode_20191120',
                        skin: 'WeChatScanCode_20191120',
                        shadeClose: false,
                        maxmin: false, //开启最大化最小化按钮
                        area: ['310px', '350px'],
                        content: url
                    });
                } else {
                    top.window.location.href = res.url;
                }
            } else {
                layer.alert(res.msg, {icon: 5});
            }
        },
        error: function(e){
            layer.closeAll();
            layer.alert('生成二维码错误，无法继续！', {icon: 5});
        }
    });
}

// 表单提交
function submitForm(formid)
{
    $('#'+formid).submit();
}

// 选择支付方式（购买商业授权）
function payselect(pid,product,domain,custom_money)
{
    var content = '';
    content += '<div style="margin-top:20px;">';
    content += '<a href="javascript:void(0);" onclick="layer.closeAll();parent.submitForm(\'buyForm\');" style="float: left;">';
    content += ' <img src="/skin/images/alipay.png" width="150" height="50" alt="支付宝支付" />';
    content += '</a>';
    content += '<a href="javascript:void(0);" onclick="layer.closeAll();parent.WeChatScanCode('+pid+', \''+product+'\', \''+domain+'\', '+custom_money+');" style="float: right;">';
    content += ' <img src="/skin/images/weipay.png" width="150" height="50" alt="微信支付" />';
    content += '</a>';
    content += '</div>';

    layer.open({
        type: 1,
        title: '选择支付方式',
        shadeClose: false,
        maxmin: false, //开启最大化最小化按钮
        skin: 'WeChatScanCode_20191120',
        area: ['320px', '150px'],
        content: content
    });
}

// 微信扫码支付，用于PC端（购买商业授权）
function WeChatScanCode(pid, product, domain,custom_money)
{
    var formData = new FormData();
    formData.append('product', product);
    formData.append('pid', pid);
    formData.append('custom_money', custom_money);
    if (1 == pid || 2 == pid) {
        formData.append('domain', domain);
    }

    weipay(formData);
}

// 选择支付方式（应用市场）
function payselect2(formname)
{
    var content = '';
    content += '<div style="margin-top:20px;">';
    content += '<a href="javascript:void(0);" onclick="layer.closeAll();parent.formSubmit();" style="float: left;">';
    content += ' <img src="/skin/images/alipay.png" width="150" height="50" alt="支付宝支付" />';
    content += '</a>';
    content += '<a href="javascript:void(0);" onclick="layer.closeAll();parent.WeChatScanCode2(\''+formname+'\');" style="float: right;">';
    content += ' <img src="/skin/images/weipay.png" width="150" height="50" alt="微信支付" />';
    content += '</a>';
    content += '</div>';
    
    layer.open({
        type: 1,
        title: '选择支付方式',
        shadeClose: false,
        maxmin: false, //开启最大化最小化按钮
        skin: 'WeChatScanCode_20191120',
        area: ['320px', '150px'],
        content: content
    });
}

// 微信扫码支付，用于PC端（应用市场）
function WeChatScanCode2(formname)
{
    var pid = $('form[name='+formname+']').find('input[name=pid]').val();
    var product = $('form[name='+formname+']').find('input[name=product]').val();
    var arcaid = $('form[name='+formname+']').find('input[name=arcaid]').val();
    var domain = $('form[name='+formname+']').find('input[name=domain]').val();
    var mallsl = $('form[name='+formname+']').find('input[name=mallsl]').val();
    var weapp_code = $('form[name='+formname+']').find('input[name=weapp_code]').val();
    var meal_type = $('form[name='+formname+']').find('input[name=meal_type]').val();
    var meal = $('form[name='+formname+']').find('input[name=meal]').val();

    var formData = new FormData();
    if (undefined != pid && 0 < parseInt(pid)) {
        formData.append('pid', pid);
    }
    if (undefined != product && '' != product) {
        formData.append('product', product);
    }
    if (undefined != arcaid && '' != arcaid) {
        formData.append('arcaid', arcaid);
    }
    if (undefined != domain) {
        formData.append('domain', domain);
    }
    if (undefined != mallsl) {
        formData.append('mallsl', mallsl);
    }
    if (undefined != weapp_code) {
        formData.append('weapp_code', weapp_code);
    }
    if (undefined != meal_type) {
        formData.append('meal_type', meal_type);
    }
    if (undefined != meal) {
        formData.append('meal', meal);
    }

    weipay(formData);
}

// 选择支付方式（修改域名）
function payselect3(pid,product,domain,buyid)
{
    var content = '';
    content += '<div style="margin-top:20px;">';
    content += '<a href="javascript:void(0);" onclick="layer.closeAll();parent.ey_buy('+pid+',\''+product+'\',\''+domain+'\',\''+buyid+'\');" style="float: left;">';
    content += ' <img src="/skin/images/alipay.png" width="150" height="50" alt="支付宝支付" />';
    content += '</a>';
    content += '<a href="javascript:void(0);" onclick="layer.closeAll();parent.WeChatScanCode3('+pid+',\''+product+'\',\''+domain+'\',\''+buyid+'\');" style="float: right;">';
    content += ' <img src="/skin/images/weipay.png" width="150" height="50" alt="微信支付" />';
    content += '</a>';
    content += '</div>';
    
    layer.open({
        type: 1,
        title: '选择支付方式',
        shadeClose: false,
        maxmin: false, //开启最大化最小化按钮
        skin: 'WeChatScanCode_20191120',
        area: ['320px', '150px'],
        content: content
    });
}

// 微信扫码支付，用于PC端（修改域名）
function WeChatScanCode3(pid,product,domain,buyid)
{
    var formData = new FormData();
    formData.append('pid', pid);
    formData.append('product', product);
    formData.append('domain', domain);
    formData.append('join_buyid', buyid);

    weipay(formData);
}

// 微信内部支付时，先进行数据判断
function callpay(data) {
    if (typeof WeixinJSBridge == "undefined") {
        if ( document.addEventListener ) {
            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
        }
    } else {
        jsApiCall(data);
    }
}

// 调用微信JS api 支付
function jsApiCall(data) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', data,
        function(res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                layer.msg('微信支付完成！', {time: 1000}, function() {
                    OrderPayPolling();
                });
            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                layer.alert('用户取消支付！', {icon:0, title: false, closeBtn: 0});
            } else {
                layer.alert('支付失败！', {icon:0, title: false, closeBtn: 0});
            }
        }
    );
}

//以下都是大黄新增
// 微信支付弹窗
function AlertPayImg(data) {
    // var html = "<img src='"+data.url_qrcode+"' style='width: 250px; height: 250px;'><br/><span style='color: red; display: inline-block; width: 100%; text-align: center;'>正在支付中...请勿刷新</span>";
    var html = '<style>.layui-layer-dialog .layui-layer-content{overflow-y:hidden;}</style>';
    html += '<div class="ey-modal-body">';
    html += '    <div class="ey-modal-body-popup-container"></div>';
    html += '    <div class="comp-wxpay">';
    html += '        <div class="comp-wxpay-order">';
    html += '            <div class="comp-wxpay-order-title">'+data.type_name+'</div>';
    html += '            <div class="comp-wxpay-order-desc">';
    html += '                <span class="comp-wxpay-order-desc-label">支付金额：</span>';
    html += '                <span class="comp-wxpay-order-desc-value">¥'+data.unified_amount+'</span>';
    html += '            </div>';
    html += '        </div>';
    html += '        <div class="ey-loading">';
    html += '            <div class="ey-loading-content">';
    html += '                <div class="comp-wxpay-qrcode">';
    html += '                    <div class="comp-wxpay-qrcode-content">';
    html += '                        <div class="comp-wxpay-qrcode-content-wrap">';
    html += '                            <img src="'+data.url_qrcode+'" style="height: 200px; width: 200px;">';
    html += '                        </div>';
    html += '                        <div class="comp-wxpay-qrcode-content-notice">请打开手机微信，扫一扫完成支付</div>';
    html += '                    </div>';
    html += '                    <div class="comp-wxpay-qrcode-tip">';
    html += '                        <img src="/skin/img/wxpay_tip.png">';
    html += '                    </div>';
    html += '                </div>';
    html += '            </div>';
    html += '        </div>';
    html += '    </div>';
    html += '</div>';
    layer.alert(html, {
        shade: layer_shade,
        area: ['720px', '520px'],
        move: false,
        title: '微信支付',
        btnAlign:'r',
        closeBtn: 3,
        btn: [],
        success: function() {
            PayPolling = window.setInterval(function(){ OrderPayPolling(data); }, 2000);
        },
        cancel: function() {
            window.clearInterval(PayPolling);
        }
    });
}

var interval_1684229824 = '';
function countdown_1684229824(wait)
{
    interval_1684229824 = setInterval(function(){
        var time = --wait;
        if(time <= 0) {
            $('#err_1684225132').remove();
            clearInterval(interval_1684229824);
        };
    }, 1000);
}

// 订单轮询
function OrderPayPolling(data, opt) {
    if (!data) data = '';
    if (!opt) opt = 'default';
    // 检测信息是否完整
    if ( !data.unified_id || !data.unified_number) {
        layer.msg('订单异常，刷新重试', {time: 1500}, function() {
            window.location.reload();
        });
    }
    
    // 执行轮询
    $.ajax({
        url : data.polling_url,
        data: {
            pay_id: data.pay_id,
            pay_mark: data.pay_mark,
            type_id: data.type_id,
            unified_id: data.unified_id,
            unified_number: data.unified_number
        },
        type:'post',
        dataType:'json',
        success:function(res) {
            if (1 == res.code) {
                if (res.data) {
                    window.clearInterval(PayPolling);
                    layer.msg(res.msg, {time: 1500}, function() {
                        parent.layer.closeAll();
                        parent.window.location.href = res.url;
                        // if (2000 == data.type_id || 2001 == data.type_id) {
                        //     parent.layer.closeAll();
                        //     parent.window.location.href = res.url;
                        // }else{
                        //     window.location.reload();
                        // }
                    });
                } else {
                    if (opt == 'payok') {
                        $('#err_1684225132').remove();
                        if (interval_1684229824 != '') clearInterval(interval_1684229824);
                        if (!document.getElementById('err_1684225132')) {
                            $('body').append('<div class="comp-toaster" id="err_1684225132"><div class="comp-toaster-notice">支付失败，请重试</div><script language="javascript" type="text/javascript">countdown_1684229824(2);</script></div>');
                        }
                    }
                }
            } else if (0 == res.code) {
                layer.alert(res.msg, {icon:0, title: false, closeBtn: 0},function(index){
                    window.location.reload();
                    return false;
                });
            }
        }
    });
}

// 上传头像
function upload_head_pic(e){
    var file = $(e)[0].files[0];
    if (!file) {
        return false;
    }
    var formData = new FormData();
    formData.append('file',file);
    var max_file_size = $(e).attr('data-max_file_size') * 1024 * 1024;
    formData.append('max_file_size', max_file_size);
    formData.append('compress', '200-200');
    formData.append('_ajax',1);
    layer_loading('正在处理');
    $.ajax({
        type: 'post',
        url: eyou_basefile + "?m=user&c=Uploadify&a=imageUp",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (res) {
            if (res.state == 'SUCCESS') {
                $.ajax({
                    url: eyou_basefile + "?m=user&c=Users&a=edit_users_head_pic",
                    data: {filename:res.url, _ajax:1},
                    type:'post',
                    dataType:'json',
                    success:function(res2){
                        layer.closeAll();
                        if (1 == res2.code) {
                            $('#ey_head_pic_a').attr('src', res2.data.head_pic);
                        } else {
                            showErrorAlert(res2.msg);
                        }
                    },
                    error : function(e) {
                        layer.closeAll();
                        showErrorAlert(e.responseText);
                    }
                });
            } else {
                layer.closeAll();
                showErrorAlert(res.state);
            }
        },
        error : function(e) {
            layer.closeAll();
            showErrorAlert(e.responseText);
        }
    })
}

function is_followed_wechat(users_id, is_loading, closeBtn, title)
{
    if (!closeBtn) closeBtn = false;
    if (!is_loading) is_loading = false;
    if (is_loading) layer_loading();
    if (!title) title = '关注公众号，订阅订单动态'; 
    $.ajax({
        url : '/index.php?m=plugins&c=Wechat&a=ajax_post_wechat_qrcode',
        data: {ctl:'Basis', _ajax:1},
        type:'post',
        dataType:'json',
        success:function(qr_res) {
            layer.closeAll();
            if (0 == qr_res.code) {
                // 用户不存在
                layer.alert(qr_res.msg, {icon: 5, title: false, closeBtn: false}, function(index){
                    layer.close(index);
                    history.back();
                });
            } else if (2 == qr_res.code) {
                // 关注后实时获知消息
                var html_content = '<img src="'+ qr_res.url +'" style="width: 250px; height: 250px;"> <script type="text/javascript"> FollowPolling = window.setInterval( function() { WeChatFollowPolling(); }, 1000); <\/script>';
                layer.open({
                    type: 1,
                    title: title,
                    id: 'layer_official_account',
                    closeBtn: closeBtn,
                    shadeClose: false,
                    // skin: 'layui-layer-rim2', //加上边框
                    content: html_content,
                    end: function() {
                        // 关闭轮询
                        window.clearInterval(FollowPolling);
                    }
                });
            }
        },
        error: function(e){
            layer.closeAll();
            layer.alert(e.responseText, {icon: 5, title: false, closeBtn: false});
        }
    });
}

// 轮询用户是否关注了公众号
function WeChatFollowPolling() {
    $.ajax({
        url : "/user/ajax_zujianku.php",
        data: {dopost: 'ajax_wechat_follow_polling'},
        type:'post',
        dataType:'json',
        success:function(polling_res) {
            if (1 == polling_res.code) {
                // 关闭轮询
                window.clearInterval(FollowPolling);
                // 关闭全部弹层
                layer.closeAll();
            }
        }
    });
}

/**
 * 获取指定会员ID的公众号二维码
 * @return {[type]} [description]
 */
function get_wechat_qrcode(htmlid, phtmlid)
{
    $.ajax({
        url : '/index.php?m=plugins&c=Wechat&a=ajax_post_wechat_qrcode',
        data: {ctl:'Basis', always_show:1, _ajax:1},
        type:'get',
        dataType:'json',
        success:function(qr_res) {
            if (2 == qr_res.code) {
                var src = qr_res.url;
                $("#"+htmlid).attr('src', src);
                $("#"+phtmlid).show();
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
function eyou_setCookies(name, value, time)
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
function eyou_getCookie(c_name)
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