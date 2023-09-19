//读取url参数
function scriptQueryString(name) {
  var scripts = document.getElementsByTagName("script");
  var url = scripts[scripts.length - 1].src;
  if (url.indexOf("?") == -1 || url.indexOf(name + '=') == -1) {
    return '';
  }
  var reg = new RegExp(name + "=([^&]*)(&|$)", "i");
  var r = url.match(reg);
  if (r != null) return unescape(r[1]);
  return '';
}

//获取栏目ID
var column=scriptQueryString("v");
var bigclassid=scriptQueryString("bigclassid");
var layerDialog=scriptQueryString("layerDialog");

//Jquery.Ajax提交表单所有项数据
function jAjaxSubmit(obj){
  //Ajax
  $.ajax({
    type:"POST", dataType:"html", url:$(obj).attr("action"), data:$(obj).serialize(),
    success:function(data){
      if(data.split("#")[0]=="ok"){//已输出成功标志
        alert(data.split("#")[2]);
        location.href=data.split("#")[1];
      }else{//程序出错
        alert("Run-time Error：\n------------------------------------------\n"+data);
      }
    },error:function(XMLHttpRequest,textStatus,errorThrown){//其它非200状态
      alert("Error：\n------------------------------------------\n"+XMLHttpRequest.status);
    }
  });
}

//menu pc
$('#head .menu ul>li').hover(function(){
  $(this).addClass('A');
  $(this).find('div').stop(true,true).slideDown(350);
  $('#banner').stop().animate({paddingTop:"80px"});
},function(){
  $(this).removeClass('A');  
  $(this).find('div').stop().slideUp(250);
  $('#banner').stop().animate({paddingTop:"0px"});
});


//wap search
$('#head .btn-search').click(function(){
  if($("#wap .search").css("display")=="none"){
    $("#wap .search").slideDown(300);
    $("#wap .language").slideUp(200);
    $("#wap .menu").stop().animate({left:"-100%"});
    $("#wap .menu ul>li").children('div').hide();
    $("#wap .menu ul>li").removeClass('A');
  }else{
    $("#wap .search").slideUp(200);
  }
});

//wap search
$('#head .btn-language').click(function(){
  if($("#wap .language").css("display")=="none"){
    $("#wap .language").slideDown(300);
    $("#wap .search").slideUp(200);
    $("#wap .menu").stop().animate({left:"-100%"});
    $("#wap .menu ul>li").children('div').hide();
    $("#wap .menu ul>li").removeClass('A');
  }else{
    $("#wap .language").slideUp(200);
  }
});

//wap menu
$("#head .btn-menu").click(function(){
  if(parseInt($("#wap .menu").css("left"))<0){
    $("#wap .menu").stop().animate({left:"0px"});
    $("#wap .search").slideUp(200);
    $("#wap .language").slideUp(200);
  }else{
    $("#wap .menu").stop().animate({left:"-100%"});
    $("#wap .menu ul>li").children('div').hide();
    $("#wap .menu ul>li").removeClass('A');
  }
});

//wap menu son
$("#wap .menu ul>li").click(function(){
  if($(this).find('div').css("display")=="none"){
    //隐藏所有内容
    $("#wap .menu ul>li").removeClass('A');
    $("#wap .menu ul>li").children('div').stop(true,true).slideUp(250);
    //显示当前内容
    $(this).addClass('A');
    $(this).children('div').stop(true,true).slideDown(350);
  }
});

//wap navpart
$("#navpart .wap>.btn").click(function(){
  if($("#navpart>ul").css("display")=="none"){
    $("#navpart>ul").slideDown(300);
    $(this).addClass('A');
  }else{
    $("#navpart>ul").slideUp(200);
    $(this).removeClass('A');
  }
});

//wap prolist
$("#prolist .wap>.btn").click(function(){
  if($("#prolist>ul").css("display")=="none"){
    $("#prolist>ul").slideDown(300);
    $(this).addClass('A');
  }else{
    $("#prolist>ul").slideUp(200);
    $(this).removeClass('A');
  }
});
//wap prolist son
$("#prolist>ul>li").click(function(){
  if($(this).find('div').css("display")=="none"){
    //隐藏所有内容
    $("#prolist>ul>li").removeClass('A');
    $("#prolist>ul>li").children('div').stop(true,true).slideUp(250);
    //显示当前内容
    $(this).addClass('A');
    $(this).children('div').stop(true,true).slideDown(350);
  }
});


//prolist
$(".prolist ul>li").click(function(){
  if($(this).find('div').css("display")=="none"){
    //隐藏所有内容
    $(".prolist ul>li").removeClass('A');
    $(".prolist ul>li").children('div').stop(true,true).slideUp(250);
    //显示当前内容
    $(this).addClass('A');
    $(this).children('div').stop(true,true).slideDown(350);
  }
});



//当窗口改变宽度时执行此函数
window.onresize=resizewindow;
function resizewindow(){
  var screenSwitch=false;
  var sWidth=$(window).width();
  if(sWidth>1280){
    screenSwitch=false;
  }else if(sWidth<=420){
    screenSwitch=true;
  }
  //document.getElementById("fe").innerHTML=screenSwitch;
  $("#navpart .wap>.btn").unbind('click');

  if(screenSwitch){
    $("#navpart>ul").css("display","none");
    $("#navpart .wap>.btn").click(function(){
      if($("#navpart>ul").css("display")=="none"){
        $("#navpart>ul").slideDown(300);
        $(this).addClass('A');
      }else{
        $("#navpart>ul").slideUp(200);
        $(this).removeClass('A');
      }
    });
  }else if(screenSwitch==false){
    $("#navpart>ul").css("display","block");
  }
}



//栏目JS
if(column==1){

  //banner
  var swiper = new Swiper('#banner .swiper-container', {
    spaceBetween: 30,
    effect: 'fade',
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '#banner .swiper-pagination',
      clickable: true,
    },
  });

  //newpro
  var swiper = new Swiper('.newpro .swiper-container', {
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.newpro .swiper-pagination',
      clickable: true,
    },
  });

  //news
  function newsSHOW(obj,img,url){
    document.getElementById("newsimg").src=img;
    document.getElementById("newsurl").href=url;
  }

}else if(column==3){

  //imgbox
  var swiper = new Swiper('.img-box .swiper-container', {
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.img-box .swiper-pagination',
      clickable: true,
    },
  });

}else if(column==6){

  var focusImg = new Swiper('#focus .focus-img', {
    spaceBetween: 10,
    loop:true,
    loopedSlides: 5,
    pagination: {
      el: '#focus .swiper-pagination',
      clickable: true,
    },
  });
  var focusList = new Swiper('#focus .focus-list', {
    direction: 'vertical',
    spaceBetween: 30,
    slidesPerView: 3,
    mousewheel: true,
    loop: true,
    loopedSlides: 5,
    slideToClickedSlide: true,
  });
  focusImg.controller.control = focusList;
  focusList.controller.control = focusImg;

}else if(column==7){

  //jobs
  $('#jobs .list-td').on('click',function(){
    if($(this).next('#jobs .list-son').is(':hidden')){
      $(this).next('#jobs .list-son').stop().slideDown().siblings('#jobs .list-son').slideUp();
      $(this).addClass('A').siblings('#jobs .list-td').removeClass('A');
      $(this).find(".btn img").attr("src","images/icon-arrow-up.png").css({"opacity":"1","filter":"grayscale(0)"}).parent().parent().parent().siblings('#jobs .list-td').find(".btn img").attr("src","images/icon-arrow-down.png").css({"opacity":"0.3","filter":"grayscale(100%)"});
    }else{
      $(this).next('#jobs .list-son').stop().slideUp();
      $(this).removeClass('A');
      $(this).find(".btn img").attr("src","images/icon-arrow-down.png").css({"opacity":"0.3","filter":"grayscale(100%)"});
    }
  });

}

$("#newsview .text table").wrap("<div class='tableWap'></div>");

//产品列表高亮
function prolistHid(bigclassid){
  var bigclassid;
  if(!isNaN(bigclassid) && bigclassid!=null){
    //当前级高亮 电脑端
    var thislev=$('.prolist a[datavalue='+bigclassid+']');
    thislev.parents('li').addClass("A");
    thislev.addClass("A");
    //打开上级
    thislev.siblings('div').css("display","block");
    thislev.parent('div').css("display","block");

    //当前级高亮 移动端
    var thislevwap=$('.protype>.container a[datavalue='+bigclassid+']');
    thislevwap.parents('li').addClass("A");
    thislevwap.addClass("A");
    //打开上级
    thislevwap.siblings('div').css("display","block");
    thislevwap.parent('div').css("display","block");

  }
}
prolistHid(bigclassid);


//启用弹出窗口
if(layerDialog==1){

  function openLayer(url,tit,w,h){
    layer.open({
      type:2,
      title:tit,
      area:[w,h],
      fix:true,
      shadeClose:true,
      scrollbar:false,
      content:url
    });
  }
}


