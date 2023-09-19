
if (ask_type_id == 0) {
    var minAwayBtm = 700;  // 距离页面底部的最小距离
    var page = 1;
    var loading = false;
    var total_page = 2;
    $(function () {
        if (!ey_isMobile()) {
            $(window).scroll(function () {
                var awayBtm = $(document).height() - $(window).scrollTop() - $(window).height();
                if (awayBtm <= minAwayBtm) {
                    next_page();
                }
            });
        }
    })
}

function next_page() {
    if (loading == false && page < total_page) {
        loading = true;
        page++;
        if ($('#mobile_more_msg')){
            $('#mobile_more_msg').text('加载中...');
        }
        $.ajax({
            type: 'post',
            url: root_dir+'/index.php?m=plugins&c=Ask&a=ajax_list',
            data: {is_recom: ask_IsRecom, search_name: ask_SearchName, page: page, _ajax: 1},
            dataType: 'json',
            success: function (res) {
                total_page = res.data.total;
                res.data.list.forEach(function (val, index) {

                    var html = '<li class="article-list-item"> \n';
                    if (val.money > 0) {
                        html += '<a class="list-avter">\n' +
                            '                        <div class="p ';
                        if(val.bestanswer_id > 0){
                            html += ' g ';
                        }
                        html +='" style=""> <em class="iconfont icon-hongbao" style="color:#f44747;margin-left: 2px"></em> </div>\n' +
                            '                    <div class="rmbb" style=" ">'+val.money+'</div>\n' +
                            '                    </a>'
                    }else{
                        html += '      <a class="list-avter user_card avatar ';
                        if (0 < val.authorization_total) {
                            html += ' ey_user_zysq ';
                        }
                        html += '" href="' + val.userhomeurl + '" rel="nofollow"> \n';

                        html += '          <img src="' + val.head_pic + '">\n' +
                            '          <i class="u_svip"></i>\n';

                        if (3 == val.level) {
                            html += '          <i class="u_svip"></i>\n';
                        } else if (2 == val.level) {
                            html += '          <i class="u_vip"></i>\n';
                        }
                        html += '<label>';
                        if (val.scores_level.name) {
                            html += val.scores_level.name;
                        } else {
                            html += '神秘';
                        }
                        html += ' </label>\n' +
                            '      </a>\n';
                    }

                    html += '      <div>\n' +
                        '          <a href="' + val.AskUrl + '" class="went-head">\n';
                    if (1 == ask_IsRecom && 1 == val.is_recom) {
                        html += '                      <span class="jxuan">推荐</span>\n';
                    } else if (1 == val.is_top) {
                        html += '                      <span class="jxuan">置顶</span>\n';

                    }
                    html += '              <span class="went-head-text">' + val.ask_title + '</span>\n' +
                        '          </a>\n';
                    if (val.zidian.length > 0){
                        html += '<ul style="display: flex; ">';
                        val.zidian.forEach(function (v, i) {
                            html += '<li style="margin-right: 8px;background: #fff5ee;font-size: 12px;color: #ff6f06;padding: 0 8px;"><a href="'+v.arcurl+'" target="_blank">'+v.title+'</a></li>';
                        });
                        html += '</ul>';
                    }

                    html +=     '          <div class="tx-list">\n';


                    val.HeadPic.forEach(function (v, i) {
                        html += '<a href="' + v.userhomeurl + '" rel="nofollow">\n' +
                            '                  <img src="' + v.head_pic + '">\n' +
                            '              </a>\n';
                    });

                    html += '              <i class="icon iconfont icon-people-more" style="font-size:20px;color:#e5e5e5;margin-right: 10px;"></i>\n' +
                        '              <div class="list-text">\n' + val.UsersConut + ' | ' + val.add_time + ' | \n' +
                        '                  <a href="' + val.TypeUrl + '" target="_blank">' + val.type_name + '</a>\n' +
                        '              </div>\n' +
                        '              <div style=" flex-grow:1 "></div>\n' +
                        '              <div class="more-info">\n' +
                        '                  <span style="margin-right:5px">\n' +
                        '                      <i class="icon wt-iconfont wt-icon-liulan" style="font-size:16px;display: inline-block;transform: translateY(1px);"></i> ' + val.click + '\n' +
                        '                  </span> | \n' +
                        '                  <span style="margin-left:5px">\n' +
                        '                      <i class="icon wt-iconfont wt-icon-kuaisuhuifu" style="font-size:15px;display: inline-block;transform: translateY(1px);"></i> ' + val.replies + '\n' +
                        '                  </span>\n' +
                        '              </div>\n' +
                        '          </div>\n' +
                        '      </div>\n' +
                        '</li>';
                    $('.article-ul').append(html);
                });
                loading = false;
                $('#mobile_more_msg').text('加载更多');
            },
            error: function (e) {
                layer.closeAll();
                layer.alert(e.responseText, {icon: 5, title: false});
            }
        });
    }
}

function add_ask()
{
    var users_id = getCookie('users_id');
    var add_ask_url = root_dir+'/index.php?m=plugins&c=Ask&a=add_ask';
    if (0 < users_id) {
        window.location.href=add_ask_url;
    } else {
        layerLogin(add_ask_url);
    }
}