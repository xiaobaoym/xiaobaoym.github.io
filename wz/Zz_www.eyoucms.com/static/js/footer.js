
    if (typeof(root_dir) == 'undefined') {
        var root_dir = '';
    }

    //相册
    layer.photos({
        id: 'layui-layer-photos_20220402'
        ,photos: '#view_content'
        ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
    });
    layer.photos({
        id: 'layui-layer-photos_20220402'
        ,photos: '.ey-layui-layer-photos'
        ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
    });

  $(function(){
      $('#close_im').bind('click',function(){
        $('#main-im').css("height","0");
        $('#im_main').hide();
        $('#open_im').show();
      });
      $('#open_im').bind('click',function(e){
        $('#main-im').css("height","272");
        $('#im_main').show();
        $(this).hide();
      });
      $('.go-top').bind('click',function(){
          var speed = 200;
          $('body,html').animate({scrollTop: 0}, speed);
      });
      
       
      $(".fuli").bind('mouseenter',function(){
        $('.fuli-showx').show();
      })
      $(".fuli").bind('mouseleave',function(){        
        $('.fuli-showx').hide();
      });
      
      $(".weixing-container").bind('mouseenter',function(){
        $('.weixing-showx').show();
      })
      $(".weixing-container").bind('mouseleave',function(){        
        $('.weixing-showx').hide();
      });
  });
  function copyContent(){
      var copy = document.getElementById('copyContent');
      copy.value = window.location.href;
      copy.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      layer.msg("复制成功！", {icon:1000});
  }
  try {
     $("img").lazyload({
       effect: "fadeIn",
       placeholder : "/skin/img/grey.gif",
       threshold: 200
     });
  }catch(e){}


    //节假日活动 ---  重制版

    // 当前时间
    var nowTime = new Date().getTime();
    //设置开始日期
    var startYmd = new Date("2023/06/13").getTime();
    //设置开始时间
    var str = "2023/06/13 10:00:00";
    var startDate = new Date(str);
    var start = startDate.getTime();
    //第二段活动开始时间
    var str2 = "2023/06/13 14:30:00";
    var start2Date = new Date(str2);
    var middle = start2Date.getTime();   //第一波活动结束时间
    //设置截止时间
    var str3 = "2023/06/13 18:00:00";
    var endDate = new Date(str3);
    var end = endDate.getTime();   //活动结束时间

    if (nowTime > startYmd && nowTime < end) {
        //商业授权页面
        var pid_1_price = $('#pid_1_price').find('span').text();
        var pid_2_price = $('#pid_2_price').find('span').text();
        var pid_3_price = $('#pid_3_price').find('span').text();
        var pid_5_price = $('#pid_5_price').find('span').text();
        var pid_15_price = $('#pid_15_price').find('span').text();
        var pid_18_price = $('#pid_18_price').find('span').text();
        var price = $('#price').text();  //源码、插件文档页面
        var price_strong_1654673892_status = price_h2_1654673892_status = false;
        var price_strong_1654673892 = [];  //列表初始数据(源码、插件)
        var price_h2_1654673892 = [];  //列表初始数据（应用市场）
        var flag_changeTime = null;
        flag_changeTime = setInterval(changeTime,500);
        var flag_times = 0;

        var old_rate = 0;
        var span_text = '第一波';
        show_top_interval(nowTime, middle);   //显示顶部信息
    } else {
        $('#shuang11_tonggao').hide();
    }

    //循环倒计时
    function changeTime(){
        var ey_loginusers_level = $("#ey_loginusers_level").length == 0  ? 1 : $("#ey_loginusers_level").val(); //会员级别
        if (ey_loginusers_level > 0){
            //获取当前时间
            var date = new Date();
            var now = date.getTime();
            //时间差
            var leftTime = 0;
            //开始时间差（小于等于0表示已经开始）
            var leftTimeStart = start - now;
            //第一波结束时间差
            var leftTimeMiddle =  middle - now;
            //结束时间差（大于零表示活动还未结束）
            var leftTimeEnd = end - now;
            var rate = getRate(ey_loginusers_level,now,start,middle,end);
            var vip_rate = getRate(ey_loginusers_level,now,start,middle,end,'vip');
            var banner_rate = getRate(ey_loginusers_level,now,start,middle,end,'vip','banner');
            if (leftTimeStart <= 0 && leftTimeEnd > 0){   //活动进行中
                if (leftTimeMiddle > 0){
                    span_text = '第一波';
                    leftTime = leftTimeMiddle;
                }else{
                    span_text = '第二波';
                    leftTime = leftTimeEnd;
                }
                if (old_rate != rate || flag_times == 0){    //第一次进来，修改所有价格为活动价格，显示顶部倒计时
                    old_rate = rate;
                    $('#shuang11_tonggao').find("#rate").html(Number(banner_rate*10).toFixed(1));
                    $('#shuang11_tonggao').find("#text").html(span_text);
                    $('#shuang11_tonggao').show();
                    $('#show').show();
                    $('#test').show();
                    //商业授权
                    setNewPrice([['pid_1_price',pid_1_price],['pid_2_price',pid_2_price]],rate);
                    setNewPrice([['pid_3_price',pid_3_price],['pid_5_price',pid_5_price],['pid_15_price',pid_15_price],['pid_18_price',pid_18_price]],vip_rate);
                    //源码、插件列表
                    $('.price_strong_1654673892').each(function(index, item){
                        if (!price_strong_1654673892_status){
                            var old_price = $(item).text();
                            price_strong_1654673892.push(old_price);
                        }else{
                            var old_price = price_strong_1654673892[index];
                        }
                        $(item).html(Math.ceil(old_price * rate));
                    });
                    price_strong_1654673892_status = true;
                    //应用市场列表
                    $('.price_h2_1654673892').each(function(index, item){
                        if (!price_h2_1654673892_status){
                            var old_price = $(item).text();
                            old_price = old_price.replace('￥', '');
                            old_price = old_price.replace('元', '');
                            old_price = old_price.replace(' ', '');
                            price_h2_1654673892.push(old_price);
                        }else{
                            old_price =  price_h2_1654673892[index];
                        }
                        $(item).html(' ￥'+Math.ceil(old_price * rate)+'元');
                    });
                    price_h2_1654673892_status = true;
                    //源码、插件内页
                    var new_price = Math.ceil(price * rate);
                    $("#price").html(new_price);
                    $('#ey_users_price_txt').html("(活动价)");
                    $('#ey_users_price_txt').show();
                    flag_times++;

                    var daili_price = $('#daili_li_price').find('#daili_price').text();
                    var hd_price = $('#mall_li_price').find('#price').text();
                    if (hd_price > 0 && daili_price > hd_price) {
                        $('#daili_li_price').addClass('txp').css('text-decoration','line-through');
                        $('#mall_li_price').removeClass('txp').css('text-decoration','unset');
                    }
                }
            }else{                      //活动尚未开始或者已经结束
                leftTime = leftTimeStart;
                if (leftTimeEnd <= 0 && flag_times > 0){   //活动已经结束，且过程和中修改过价格，关掉定时器，还原原来的价格
                    clearInterval(flag_changeTime);
                    $('#shuang11_tonggao').hide();
                    $('#ey_users_price_txt').hide();
                    $('#show').hide();
                    $('#test').hide();
                    setOldPrice([['pid_1_price',pid_1_price],['pid_2_price',pid_2_price],['pid_3_price',pid_3_price],['pid_5_price',pid_5_price],['pid_15_price',pid_15_price],['pid_18_price',pid_18_price]]);
                    $('.price_strong_1654673892').each(function(index, item){
                        $(item).html(price_strong_1654673892[index]);
                    });
                    $('.price_h2_1654673892').each(function(index, item){
                        $(item).html(' ￥'+price_h2_1654673892[index]+'元');
                    });
                    $("#price").html(price);
                    $('#ey_users_price_txt').hide();
                }

                return false;
            }
            //定义变量 d,h,m,s保存倒计时的时间
            var d,h,m,s;
            if (leftTime>=0) {
                d = Math.floor(leftTime/1000/60/60/24);
                h = Math.floor(leftTime/1000/60/60%24);
                m = Math.floor(leftTime/1000/60%60);
                s = Math.floor(leftTime/1000%60);
            }
            //将倒计时赋值到div中
            if (h < 10) {
                h = '0' + h;
            }
            if (m < 10) {
                m = '0' + m;
            }
            if (s < 10) {
                s = '0' + s;
            }
            if (leftTime > 0 && leftTimeStart > 0) {
                $('#show').show().html("开始倒时计：" + h + "小时" + m + "分钟" + s + '秒');
            } else if (leftTime > 0 && leftTimeEnd > 0) {
                $('#show').show().html("结束倒时计：" + h + "小时" + m + "分钟" + s + '秒');
            }
        }

    }
    /*
     * 计算折扣率
     * curtime      当前时间（戳）
     * startime     第一段开始时间
     * startime2    第二段开始时间
     * endtime       活动结束时间
     * product       购买类型
     * type         banner
     */
    function getRate(ey_loginusers_level,curtime,startime,startime2,endtime,product = '',type = 'rate'){
        if(startime <= curtime && curtime <= startime2){
            return 0.78;
        }else if (startime2 < curtime && curtime <= endtime){
            if (type == 'banner'){
                return  0.88;
            }else{
                if (['vip'].indexOf(product)<0 && ey_loginusers_level && [4,5,6].indexOf(parseInt(ey_loginusers_level)) >= 0) {
                    return 0.8;
                } else {
                    return  0.88;
                }
            }

        }

        return 1;
    }
    /*
     *  计算节日优惠价格，并修改页面显示
     *  data    需要转化的元素和初始数据
     *  rate    折扣率
     */
    function setNewPrice(data,rate=0.88){
        var txt='（活动价）';
        var new_rate = rate;
        for(var item of data){
            if (item[0] == 'pid_3_price' || item[0] == 'pid_15_price' || item[0] == 'pid_18_price') {
                rate = 0.88;
            } else {
                rate = new_rate;
            }
            if($('#'+item[0]).length){
                var new_price = Math.ceil(item[1] * rate);
                $('#'+item[0]).find('span').html(new_price);
                $('#'+item[0]+"_txt").show().html(txt);
            }
        }
    }
    /*
     * 还原为活动前价格
     * data    需要转化的元素和初始数据
     */
    function setOldPrice(data){
        for(var item of data){
            if($('#'+item[0]).length){
                $('#'+item[0]).find('span').html(item[1]);
                $('#'+item[0]+"_txt").hide();
            }
        }
    }
    //显示顶部倒计时
    function show_top_interval(nowTime, middle) {
        if (nowTime < middle) {
            var rate = 7.8;
            var text = '第一波';
        } else {
            var rate = 8.8;
            var text = '第二波';
        }

        var type_36_url = $("#type_36_url").data("url");
        var str = '<div id="shuang11_tonggao" class="top-avd" style="display: ;">'+
            '<div class="top_avd-info">'+
        '<div class="top_avd-info-icon">'+
        '<img src="/skin/img/time.png">'+
        '</div>'+
        '<span>'+
        '2023.6.13 10点00分 活动开始，全场产品<span style="font-weight: bold;"><b style="font-weight: bold;" id="rate">'+rate+'</b>折</span>（代理产品除外~8.8折），仅限今日 数量有限 抓紧采购！'+
        '<form id="form1" runat="server" style=" display: inline-block; ">'+
        '<span id="text">'+text+'</span>'+
        '<span id="show" style="display: none;"> </span>'+
        '</form>'+
        ' <a href="'+ type_36_url +'" title="点击查看" target="_blank" style="color: #1989fa;">点击查看</a>'+
        '</span>'+
        '<span class="top_avd-info-close">' +
        '<svg width="1em" height="1em" viewBox="0 0 16 16">' +
        '<path fill="currentColor" d="M12.2928932,2.29289322 L13.7071068,3.70710678 L9.41389322,7.99989322 L13.7071068,12.2928932 L12.2928932,13.7071068 L7.99989322,9.41389322 L3.70710678,13.7071068 L2.29289322,12.2928932 L6.58589322,7.99989322 L2.29289322,3.70710678 L3.70710678,2.29289322 L7.99989322,6.58589322 L12.2928932,2.29289322 Z"></path>' +
        '</svg>'+
        '</span>'+
        '</div>'+
        '</div>';
        $("#type_36_url").before(str);
    }
    //关闭顶部倒计时
    $(document.body).on("click", ".top_avd-info-close", function () {
        this.parentElement.style.display = 'none';
    });






/*const str = "张元元欠我123.html";
const result = str.replace(/(\d+)(.html)/, '$1');
console.log(result);参考
	*/
	
	$(".shown a").each(function(){ //遍历shown每一个下的a元素
		
		
		var href=$(this).attr('href'); //获取href属
		
	const result = href.replace(/(\d+)(.html)/, 'https://www.eyoucms.com/plus/demo.php?aid=$1');//正则修改获取数字后面的html
		
		$(this).attr('href',result);//整体href修改
		
	})
	
	
	//增加div
	$div1=$('<div></div>');
	$div1.attr('class','wzjg');
	//$div1.text('以下模板制网站制作标配仅需1999元（包含电脑端网站+手机端网站+1年阿里云服务器），选配（微信小程序499~999元，抖音可视化小程序统一499元）')
	$div1.html("<p>以下模板制网站制作标配仅需1999元（包含电脑端网站+手机端网站+1年阿里云服务器），</p><p>选配（微信小程序499~999元，抖音可视化小程序统一499元)</p><p>其他定制功能或仿站请私聊</p>")
	$('.classfiy-fenlei').append($div1);
	
