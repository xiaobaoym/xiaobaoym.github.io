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
            console.log(555)
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
})
//由于评论载入时使用异步传输，因此必须在最后一步加载（DIGG和评论框须放在评论内容前面）
//如果一定需要提前的把myajax.SendGet改为myajax.SendGet2，但可能会引起页面阻滞

function changeAuthCode2() {
    var num =   new Date().getTime();
    var rand = Math.round(Math.random() * 10000);
    num = num + rand;
    if ($("#formfeedback #validateimg")[0]) {
        $("#formfeedback #validateimg")[0].src = "../include/vdimgck.php?tag=" + num;
    }
    return false;
}

function LoadCommets(obj)
{
    var page = $(obj).attr('data-p');

    layer_loading('正在加载');
    var aid = $('#commetcontent_aid').val();
    var url = "/index.php?m=home&c=Ajax&a=users_order_comment&aid="+aid;
    $.ajax({
        url: url,
        data: {p: page},
        type:'post',
        success:function(res){
            layer.closeAll();
            $('#code_pg_scTop').empty().html(res);
        }
    });

    // $.ajax({
    //     url: $('#commetcontent_url').val(),
    //     type: 'GET',
    //     dataType: 'JSON',
    //     data: {page:page},
    //     success: function(res) {
    //         if (page > 1) {
    //             layer.closeAll();
    //         }
    //         if (res.code == 1) {
		// 		if(res.msg == '暂无'){
		// 			$("#comment-div").hide();
		// 		}else{
		// 			$('#commetcontent').html(res.msg);
		// 		}
    //         } else {
    //             $('#commetcontent').html('加载失败~');
    //         }
    //     },
    //     error: function(e) {
    //         if (page > 1) {
    //             layer.closeAll();
    //         }
    //         $('#commetcontent').html('未知错误，无法继续~');
    //     }
    // });
}

function PostComment()
{
    var mid = ey_getCookie('users_id');
    if (0 < mid) {

    } else {
        layerLogin();
        return false;
    }

    var f = document.feedback;
    var nvalidate = '';
    if(f.msg.value=='')
    {
        f.msg.focus();
        layer.msg("评论内容不能为空！", {icon:5, time:1500});
        return false;
    }
    if(f.validate)
    {
        if(f.validate.value=='') {
            f.validate.focus();
            layer.msg("请填写验证码！", {icon:5, time:1500});
            return false;
        }
        else {
            nvalidate = f.validate.value;
        }
    }
    if(f.msg.value.length > 500)
    {
        f.msg.focus();
        layer.msg("你的评论是不是太长了？请填写500字以内的评论。", {icon:5, time:1500});
        return false;
    }

    layer_loading('正在处理');
    $.ajax({
        url: $('#formfeedback').attr('action'),
        type: 'POST',
        dataType: 'JSON',
        data: $('#formfeedback').serialize(),
        success: function(res) {
            if (res.code == 1) {
                layer.closeAll();
                $('#comment-div').show();
                layer.msg('评论成功！', {icon: 1, time: 1000}, function(){
                    window.location.reload();
                });
            } else {
                layer.closeAll();
                if (res.url){
                    layerLogin();
                } else{
                    layer.msg(res.msg, {icon: 5, time: 1500});
                }
            }
        },
        error: function(e) {
            layer.closeAll();
            // changeAuthCode2();
            layer.alert('未知错误，无法继续~', {icon: 5, title:false});
        }
    });
}

 /* 
function ajaxFeedback(aid, fid, type)
{
    var taget_obj = $('#ajaxfeedback_reply_'+fid);
    if(taget_obj.html() == '')
    {
        $.ajax({
            url: "/plus/feedback.php?action=quote&type=ajax",
            type: 'GET',
            dataType: 'html',
            data: {aid:aid, fid:fid},
            success: function(res) {
                $('.ajaxfeedback_reply').hide();
                taget_obj.html(res).show();
            },
            error: function(e) {
                taget_obj.html('加载失败~');
            }
        });
    } else {
        $('.ajaxfeedback_reply').hide();
        taget_obj.show();
    }
}
*/

/*
function ajaxQuotePost(fid)
{
    var mid = GetCookie('DedeUserID');
    if (0 < mid) {

    } else {
        layer.alert("请先登录", {icon:5});
        return false;
    }

    var f = $('#ajaxfeedback_'+fid);
    if(f.find('#msg_'+fid).val()=='')
    {
        f.find('#msg_'+fid).focus();
        layer.msg("回复内容不能为空！", {icon:5, time:1500});
        return;
    }
    if(f.find('#msg_'+fid).val().length > 500)
    {
        f.find('#msg_'+fid).focus();
        layer.msg("你的回复是不是太长了？请填写500字以内的内容。", {icon:5, time:1500});
        return;
    }

    layer_loading('正在处理');
    $.ajax({
        url: '/plus/feedback_ajax.php',
        type: 'POST',
        dataType: 'JSON',
        data: $('#ajaxfeedback_'+fid).serialize(),
        success: function(res) {
            if (res.code == 1) {
                layer.closeAll();
                f.find('#msg_'+fid).val('');
                changeAuthCode2();
                $('#commetcontentNew').html(res.msg);
                if ($('#ajaxfeedback_reply_'+fid).html() != '') {
                    $('#ajaxfeedback_reply_'+fid).html('');
                }
                // scroll(0, taget_obj.offsetTop);
            } else {
                layer.closeAll();
                changeAuthCode2();
                if (res.code == -2) {
                    layer.alert(res.msg, {icon: 5});
                } else {
                    layer.msg(res.msg, {icon: 5, time: 1500});
                }
            }
        },
        error: function(e) {
            layer.closeAll();
            changeAuthCode2();
            layer.alert('未知错误，无法继续~', {icon: 5, title:false});
        }
    });
}
*/
// LoadCommets(1);