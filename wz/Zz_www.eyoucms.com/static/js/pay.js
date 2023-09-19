var layer_shade = [0.7, '#fafafa'];
function pay(formData,payMethod,url) {
    var a_alipay_url = "";
    $.ajax({
        url: url,
        type: 'POST',
        async: false,
        data: formData,
        success: function(res){
            layer.closeAll();
            if (0 == res.code) {
                if (res.url) {
                    layerLogin();
                } else {
                    layer.alert(res.msg, {icon: 2, title: false});
                }
            } else if (1 == res.code) {
                // 若是代理使用次数完成授权则执行
                if ('proxy' == res.data.pay_mark || 'ub' == res.data.pay_mark) {
                    layer.msg(res.msg, {time: 1500} ,function() {
                        parent.window.location.reload();
                    });
                } else {
                    if ('alipay' == payMethod) {
                        // 支付宝支付
                        PayPolling = window.setInterval(function () {
                            OrderPayPolling(res.data);
                        }, 2000);
                        if (res.data.is_mobile){
                            window.location.href = res.data.alipay_url;
                        }else{
                            a_alipay_url = res.data.alipay_url;
                            // window.open(res.data.alipay_url, '_blank ');
                        }

                        layer.confirm('请在新打开的页面进行支付！', {
                            shade: layer_shade,
                            title: false,
                            area: ['480px', '190px'],
                            move: false,
                            title: '提示',
                            btnAlign:'r',
                            closeBtn: 3,
                            btn: ['支付成功', '支付失败'], //按钮
                            success: function () {
                                $(".layui-layer-content").css('text-align', 'left');
                            },
                            cancel: function(index, layero){
                                window.location.reload();
                                return false;
                            }
                        }, function () {
                            OrderPayPolling(res.data, 'payok');
                            return false;
                        }, function (index) {
                            window.location.reload();
                        });
                    } else if ('wechat' == payMethod) {
                        // 微信支付
                        if (res.data.url_qrcode){  //pc端，弹出二维码
                            AlertPayImg(res.data);
                        }else if(res.data.wechat_url){  //手机端h5页面
                            PayPolling = window.setInterval(function(){ OrderPayPolling(res.data); }, 2000);
                            window.location.href = res.data.wechat_url;
                        }else if(res.data.appId){ //微信端跳转到微信支付页面
                            callpay(res.data);
                        }else{
                            layer.msg('暂不支持该支付方式', {time: 2000});
                        }
                    } else {
                        layer.msg('请选择支付方式', {time: 2000});
                    }
                }


            }
        },
        error: function(e){
            layer.closeAll();
            layer.alert(e.responseText);
            return false;
        }
    });
    if (a_alipay_url != ""){
        newWin(a_alipay_url,"a_alipay_url");
    }
    return false;
}
//通过a标签点击事件弹出支付宝支付页面
function newWin(url, id) {
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", id);
    // 防止反复添加
    if(!document.getElementById(id)) {
        document.body.appendChild(a);
    }
    a.click();
}