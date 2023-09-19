window.useragent=navigator.userAgent,
    useragent_tlc=useragent.toLowerCase(),
    device_type = /iPad/.test(useragent) ? 't' : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(useragent) ? 'm' : 'd',
    is_ucbro=/UC/.test(useragent),
    is_lteie9=false;
// IE9浏览器判断
if(new RegExp('msie').test(useragent_tlc)){
    var iebrowser_ver=(useragent_tlc.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1];
    if(iebrowser_ver<10) is_lteie9=true;
}
if(Breakpoints) Breakpoints();// 窗口宽度断点函数
// js严格模式
(function(document, window, $) {
    'use strict';
    var Site=window.Site;
    $(function(){
        Site.run();
        // 中间弹窗隐藏效果优化（点击弹窗框外上下方隐藏弹窗）
        $(document).on('click', '.modal-dialog.modal-center', function(e) {
            if(!$(e.target).closest(".modal-dialog.modal-center .modal-content").length) $(this).parents('.modal').modal('hide');
        });
    })
})(document, window, jQuery);

/*jquery.appear.js*/
/*
 * jQuery appear plugin
 *
 * Copyright (c) 2012 Andrey Sidorov
 * licensed under MIT license.
 *
 * https://github.com/morr/jquery.appear/
 *
 * Version: 0.3.6
 */
(function($) {
  var selectors = [];

  var check_binded = false;
  var check_lock = false;
  var defaults = {
    interval: 250,
    force_process: false
  };
  var $window = $(window);

  var $prior_appeared = [];

  function process() {
    check_lock = false;
    for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
      var $appeared = $(selectors[index]).filter(function() {
        return $(this).is(':appeared');
      });

      $appeared.trigger('appear', [$appeared]);

      if ($prior_appeared[index]) {
        var $disappeared = $prior_appeared[index].not($appeared);
        $disappeared.trigger('disappear', [$disappeared]);
      }
      $prior_appeared[index] = $appeared;
    }
  };

  function add_selector(selector) {
    selectors.push(selector);
    $prior_appeared.push();
  }

  // "appeared" custom filter
  $.expr[':']['appeared'] = function(element) {
    var $element = $(element);
    if (!$element.is(':visible')) {
      return false;
    }

    var window_left = $window.scrollLeft();
    var window_top = $window.scrollTop();
    var offset = $element.offset();
    var left = offset.left;
    var top = offset.top;

    if (top + $element.height() >= window_top &&
        top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
        left + $element.width() >= window_left &&
        left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
      return true;
    } else {
      return false;
    }
  };

  $.fn.extend({
    // watching for element's appearance in browser viewport
    appear: function(options) {
      var opts = $.extend({}, defaults, options || {});
      var selector = this.selector || this;
      if (!check_binded) {
        var on_check = function() {
          if (check_lock) {
            return;
          }
          check_lock = true;

          setTimeout(process, opts.interval);
        };

        $(window).scroll(on_check).resize(on_check);
        check_binded = true;
      }

      if (opts.force_process) {
        setTimeout(process, opts.interval);
      }
      add_selector(selector);
      return $(selector);
    }
  });

  $.extend({
    // force elements's appearance check
    force_appear: function() {
      if (check_binded) {
        process();
        return true;
      }
      return false;
    }
  });
})(function() {
  if (typeof module !== 'undefined') {
    // Node
    return require('jquery');
  } else {
    return jQuery;
  }
}());

/*jquery.webui-popover.min.js*/
/*
 *  webui popover plugin  - v1.2.3
 *  A lightWeight popover plugin with jquery ,enchance the  popover plugin of bootstrap with some awesome new features. It works well with bootstrap ,but bootstrap is not necessary!
 *  https://github.com/sandywalker/webui-popover
 *
 *  Made by Sandy Duan
 *  Under MIT License
 */
!function(a,b,c){"use strict";function d(b,c){this.$element=a(b),c&&("string"===a.type(c.delay)||"number"===a.type(c.delay))&&(c.delay={show:c.delay,hide:c.delay}),this.options=a.extend({},h,c),this._defaults=h,this._name=e,this._targetclick=!1,this.init(),i.push(this.$element)}var e="webuiPopover",f="webui-popover",g="webui.popover",h={placement:"auto",width:"auto",height:"auto",trigger:"click",style:"",delay:{show:null,hide:null},async:{before:null,success:null},cache:!0,multi:!1,arrow:!0,title:"",content:"",closeable:!1,padding:!0,url:"",type:"html",animation:null,template:'<div class="webui-popover"><div class="arrow"></div><div class="webui-popover-inner"><a href="#" class="close">&times;</a><h3 class="webui-popover-title"></h3><div class="webui-popover-content"><i class="icon-refresh"></i> <p>&nbsp;</p></div></div></div>',backdrop:!1,dismissible:!0,onShow:null,onHide:null,abortXHR:!0,autoHide:!1,offsetTop:0,offsetLeft:0,iframeOptions:{frameborder:"0",allowtransparency:"true",id:"",name:"",scrolling:"",onload:"",height:"",width:""}},i=[],j=a('<div class="webui-popover-backdrop"></div>'),k=0,l=!1,m=-2e3,n=a(c),o=function(a,b){return isNaN(a)?b||0:Number(a)},p=function(a){return a.data("plugin_"+e)},q=function(){for(var a=0;a<i.length;a++)i[a].webuiPopover("hide");n.trigger("hiddenAll."+g)},r=function(a){var b={x:0,y:0};if("touchstart"===a.type||"touchmove"===a.type||"touchend"===a.type||"touchcancel"===a.type){var c=a.originalEvent.touches[0]||a.originalEvent.changedTouches[0];b.x=c.pageX,b.y=c.pageY}else("mousedown"===a.type||"mouseup"===a.type||"click"===a.type)&&(b.x=a.pageX,b.y=a.pageY);return b};d.prototype={init:function(){"click"===this.getTrigger()?this.$element.off("click touchend").on("click touchend",a.proxy(this.toggle,this)):"hover"===this.getTrigger()&&this.$element.off("mouseenter mouseleave click").on("mouseenter",a.proxy(this.mouseenterHandler,this)).on("mouseleave",a.proxy(this.mouseleaveHandler,this)),this._poped=!1,this._inited=!0,this._opened=!1,this._idSeed=k,this.options.backdrop&&j.appendTo(c.body).hide(),k++,"sticky"===this.getTrigger()&&this.show()},destroy:function(){for(var a=-1,b=0;b<i.length;b++)if(i[b]===this.$element){a=b;break}i.splice(a,1),this.hide(),this.$element.data("plugin_"+e,null),"click"===this.getTrigger()?this.$element.off("click"):"hover"===this.getTrigger()&&this.$element.off("mouseenter mouseleave"),this.$target&&this.$target.remove()},hide:function(b,c){if((b||"sticky"!==this.getTrigger())&&this._opened){c&&(c.preventDefault(),c.stopPropagation()),this.xhr&&this.options.abortXHR===!0&&(this.xhr.abort(),this.xhr=null);var d=a.Event("hide."+g);if(this.$element.trigger(d,[this.$target]),this.$target){this.$target.removeClass("in").addClass(this.getHideAnimation());var e=this;setTimeout(function(){e.$target.hide()},300)}this.options.backdrop&&j.hide(),this._opened=!1,this.$element.trigger("hidden."+g,[this.$target]),this.options.onHide&&this.options.onHide(this.$target)}},resetAutoHide:function(){var a=this,b=a.getAutoHide();b&&(a.autoHideHandler&&clearTimeout(a.autoHideHandler),a.autoHideHandler=setTimeout(function(){a.hide()},b))},toggle:function(a){a&&(a.preventDefault(),a.stopPropagation()),this[this.getTarget().hasClass("in")?"hide":"show"]()},hideAll:function(){q()},show:function(){var a=this.getTarget().removeClass().addClass(f).addClass(this._customTargetClass);this.options.multi||this.hideAll(),this._opened||(this.getCache()&&this._poped&&""!==this.content||(this.content="",this.setTitle(this.getTitle()),this.options.closeable||a.find(".close").off("click").remove(),this.isAsync()?this.setContentASync(this.options.content):this.setContent(this.getContent()),a.show()),this.displayContent(),this.options.onShow&&this.options.onShow(a),this.bindBodyEvents(),this.options.backdrop&&j.show(),this._opened=!0,this.resetAutoHide())},displayContent:function(){var b=this.getElementPosition(),d=this.getTarget().removeClass().addClass(f).addClass(this._customTargetClass),e=this.getContentElement(),h=d[0].offsetWidth,i=d[0].offsetHeight,j="bottom",k=a.Event("show."+g);this.$element.trigger(k,[d]);var l=this.$element.data("width")||this.options.width;""===l&&(l=this._defaults.width),"auto"!==l&&d.width(l);var n=this.$element.data("height")||this.options.height;""===n&&(n=this._defaults.height),"auto"!==n&&e.height(n),this.options.style&&this.$target.addClass(f+"-"+this.options.style),this.options.arrow||d.find(".arrow").remove(),d.detach().css({top:m,left:m,display:"block"}),this.getAnimation()&&d.addClass(this.getAnimation()),d.appendTo(c.body),j=this.getPlacement(b),this.$element.trigger("added."+g),this.initTargetEvents(),this.options.padding||("auto"!==this.options.height&&e.css("height",e.outerHeight()),this.$target.addClass("webui-no-padding")),h=d[0].offsetWidth,i=d[0].offsetHeight;var o=this.getTargetPositin(b,j,h,i);if(this.$target.css(o.position).addClass(j).addClass("in"),"iframe"===this.options.type){var p=d.find("iframe"),q=d.width(),r=p.parent().height();""!==this.options.iframeOptions.width&&"auto"!==this.options.iframeOptions.width&&(q=this.options.iframeOptions.width),""!==this.options.iframeOptions.height&&"auto"!==this.options.iframeOptions.height&&(r=this.options.iframeOptions.height),p.width(q).height(r)}if(this.options.arrow||this.$target.css({margin:0}),this.options.arrow){var s=this.$target.find(".arrow");s.removeAttr("style"),"left"===j||"right"===j?s.css({top:this.$target.height()/2}):("top"===j||"bottom"===j)&&s.css({left:this.$target.width()/2}),o.arrowOffset&&(-1===o.arrowOffset.left||-1===o.arrowOffset.top?s.hide():s.css(o.arrowOffset))}this._poped=!0,this.$element.trigger("shown."+g,[this.$target])},isTargetLoaded:function(){return 0===this.getTarget().find("i.glyphicon-refresh").length},getTriggerElement:function(){return this.$element},getTarget:function(){if(!this.$target){var b=e+this._idSeed;this.$target=a(this.options.template).attr("id",b).data("trigger-element",this.getTriggerElement()),this._customTargetClass=this.$target.attr("class")!==f?this.$target.attr("class"):null,this.getTriggerElement().attr("data-target",b)}return this.$target},getTitleElement:function(){return this.getTarget().find("."+f+"-title")},getContentElement:function(){return this.$contentElement||(this.$contentElement=this.getTarget().find("."+f+"-content")),this.$contentElement},getTitle:function(){return this.$element.attr("data-title")||this.options.title||this.$element.attr("title")},getUrl:function(){return this.$element.attr("data-url")||this.options.url},getAutoHide:function(){return this.$element.attr("data-auto-hide")||this.options.autoHide},getOffsetTop:function(){return o(this.$element.attr("data-offset-top"))||this.options.offsetTop},getOffsetLeft:function(){return o(this.$element.attr("data-offset-left"))||this.options.offsetLeft},getCache:function(){var a=this.$element.attr("data-cache");if("undefined"!=typeof a)switch(a.toLowerCase()){case"true":case"yes":case"1":return!0;case"false":case"no":case"0":return!1}return this.options.cache},getTrigger:function(){return this.$element.attr("data-trigger")||this.options.trigger},getDelayShow:function(){var a=this.$element.attr("data-delay-show");return"undefined"!=typeof a?a:0===this.options.delay.show?0:this.options.delay.show||100},getHideDelay:function(){var a=this.$element.attr("data-delay-hide");return"undefined"!=typeof a?a:0===this.options.delay.hide?0:this.options.delay.hide||100},getAnimation:function(){var a=this.$element.attr("data-animation");return a||this.options.animation},getHideAnimation:function(){var a=this.getAnimation();return a?a+"-out":"out"},setTitle:function(a){var b=this.getTitleElement();a?b.html(a):b.remove()},hasContent:function(){return this.getContent()},getIframe:function(){var b=a("<iframe></iframe>").attr("src",this.getUrl()),c=this;return a.each(this._defaults.iframeOptions,function(a){"undefined"!=typeof c.options.iframeOptions[a]&&b.attr(a,c.options.iframeOptions[a])}),b},getContent:function(){if(this.getUrl())switch(this.options.type){case"iframe":this.content=this.getIframe();break;case"html":try{this.content=a(this.getUrl()),this.content.is(":visible")||this.content.show()}catch(b){throw new Error("Unable to get popover content. Invalid selector specified.")}}else if(!this.content){var c="";if(c=a.isFunction(this.options.content)?this.options.content.apply(this.$element[0],[this]):this.options.content,this.content=this.$element.attr("data-content")||c,!this.content){var d=this.$element.next();d&&d.hasClass(f+"-content")&&(this.content=d)}}return this.content},setContent:function(a){var b=this.getTarget(),c=this.getContentElement();"string"==typeof a?c.html(a):a instanceof jQuery&&(a.removeClass(f+"-content"),c.html(""),a.appendTo(c)),this.$target=b},isAsync:function(){return"async"===this.options.type},setContentASync:function(b){var c=this;this.xhr||(this.xhr=a.ajax({url:this.getUrl(),type:"GET",cache:this.getCache(),beforeSend:function(a){c.options.async.before&&c.options.async.before(c,a)},success:function(d){c.bindBodyEvents(),c.content=b&&a.isFunction(b)?b.apply(c.$element[0],[d]):d,c.setContent(c.content);var e=c.getContentElement();e.removeAttr("style"),c.displayContent(),c.options.async.success&&c.options.async.success(c,d)},complete:function(){c.xhr=null}}))},bindBodyEvents:function(){this.options.dismissible&&"click"===this.getTrigger()&&!l&&(n.off("keyup.webui-popover").on("keyup.webui-popover",a.proxy(this.escapeHandler,this)),n.off("click.webui-popover touchend.webui-popover").on("click.webui-popover touchend.webui-popover",a.proxy(this.bodyClickHandler,this)))},mouseenterHandler:function(){var a=this;a._timeout&&clearTimeout(a._timeout),a._enterTimeout=setTimeout(function(){a.getTarget().is(":visible")||a.show()},this.getDelayShow())},mouseleaveHandler:function(){var a=this;clearTimeout(a._enterTimeout),a._timeout=setTimeout(function(){a.hide()},this.getHideDelay())},escapeHandler:function(a){27===a.keyCode&&this.hideAll()},bodyClickHandler:function(a){l=!0;for(var b=!0,c=0;c<i.length;c++){var d=p(i[c]);if(d._opened){var e=d.getTarget().offset().left,f=d.getTarget().offset().top,g=d.getTarget().offset().left+d.getTarget().width(),h=d.getTarget().offset().top+d.getTarget().height(),j=r(a),k=j.x>=e&&j.x<=g&&j.y>=f&&j.y<=h;if(k){b=!1;break}}}b&&q()},initTargetEvents:function(){"hover"===this.getTrigger()&&this.$target.off("mouseenter mouseleave").on("mouseenter",a.proxy(this.mouseenterHandler,this)).on("mouseleave",a.proxy(this.mouseleaveHandler,this)),this.$target.find(".close").off("click").on("click",a.proxy(this.hide,this,!0))},getPlacement:function(a){var b,d=c.documentElement,e=c.body,f=d.clientWidth,g=d.clientHeight,h=Math.max(e.scrollTop,d.scrollTop),i=Math.max(e.scrollLeft,d.scrollLeft),j=Math.max(0,a.left-i),k=Math.max(0,a.top-h);b="function"==typeof this.options.placement?this.options.placement.call(this,this.getTarget()[0],this.$element[0]):this.$element.data("placement")||this.options.placement;var l="horizontal"===b,m="vertical"===b,n="auto"===b||l||m;return n?b=f/3>j?g/3>k?l?"right-bottom":"bottom-right":2*g/3>k?m?g/2>=k?"bottom-right":"top-right":"right":l?"right-top":"top-right":2*f/3>j?g/3>k?l?f/2>=j?"right-bottom":"left-bottom":"bottom":2*g/3>k?l?f/2>=j?"right":"left":g/2>=k?"bottom":"top":l?f/2>=j?"right-top":"left-top":"top":g/3>k?l?"left-bottom":"bottom-left":2*g/3>k?m?g/2>=k?"bottom-left":"top-left":"left":l?"left-top":"top-left":"auto-top"===b?b=f/3>j?"top-right":2*f/3>j?"top":"top-left":"auto-bottom"===b?b=f/3>j?"bottom-right":2*f/3>j?"bottom":"bottom-left":"auto-left"===b?b=g/3>k?"left-top":2*g/3>k?"left":"left-bottom":"auto-right"===b&&(b=g/3>k?"right-top":2*g/3>k?"right":"right-bottom"),b},getElementPosition:function(){return a.extend({},this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTargetPositin:function(a,b,d,e){var f=a,g=c.documentElement,h=c.body,i=g.clientWidth,j=g.clientHeight,k=this.$element.outerWidth(),l=this.$element.outerHeight(),n=Math.max(h.scrollTop,g.scrollTop),o=Math.max(h.scrollLeft,g.scrollLeft),p={},q=null,r=this.options.arrow?20:0,s=10,t=r+s>k?r:0,u=r+s>l?r:0,v=0,w=j+n,x=i+o,y=f.left+f.width/2-t>0,z=f.left+f.width/2+t<x,A=f.top+f.height/2-u>0,B=f.top+f.height/2+u<w;switch(b){case"bottom":p={top:f.top+f.height,left:f.left+f.width/2-d/2};break;case"top":p={top:f.top-e,left:f.left+f.width/2-d/2};break;case"left":p={top:f.top+f.height/2-e/2,left:f.left-d};break;case"right":p={top:f.top+f.height/2-e/2,left:f.left+f.width};break;case"top-right":p={top:f.top-e,left:y?f.left-t:s},q={left:y?Math.min(k,d)/2+t:m};break;case"top-left":v=z?t:-s,p={top:f.top-e,left:f.left-d+f.width+v},q={left:z?d-Math.min(k,d)/2-t:m};break;case"bottom-right":p={top:f.top+f.height,left:y?f.left-t:s},q={left:y?Math.min(k,d)/2+t:m};break;case"bottom-left":v=z?t:-s,p={top:f.top+f.height,left:f.left-d+f.width+v},q={left:z?d-Math.min(k,d)/2-t:m};break;case"right-top":v=B?u:-s,p={top:f.top-e+f.height+v,left:f.left+f.width},q={top:B?e-Math.min(l,e)/2-u:m};break;case"right-bottom":p={top:A?f.top-u:s,left:f.left+f.width},q={top:A?Math.min(l,e)/2+u:m};break;case"left-top":v=B?u:-s,p={top:f.top-e+f.height+v,left:f.left-d},q={top:B?e-Math.min(l,e)/2-u:m};break;case"left-bottom":p={top:A?f.top-u:s,left:f.left-d},q={top:A?Math.min(l,e)/2+u:m}}return p.top+=this.getOffsetTop(),p.left+=this.getOffsetLeft(),{position:p,arrowOffset:q}}},a.fn[e]=function(b,c){var f=[],g=this.each(function(){var g=a.data(this,"plugin_"+e);g?"destroy"===b?g.destroy():"string"==typeof b&&f.push(g[b]()):(b?"string"==typeof b?"destroy"!==b&&(c||(g=new d(this,null),f.push(g[b]()))):"object"==typeof b&&(g=new d(this,b)):g=new d(this,null),a.data(this,"plugin_"+e,g))});return f.length?f:g}}(jQuery,window,document);
/*masonry.pkgd.min.js*/
/*!
 * Masonry PACKAGED v3.3.2
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c("object"==typeof exports?require("jquery"):a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(window),function(){function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:e.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a){function b(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}function c(){}function d(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=g.length;c>b;b++){var d=g[b];a[d]=0}return a}function e(c){function e(){if(!m){m=!0;var d=a.getComputedStyle;if(j=function(){var a=d?function(a){return d(a,null)}:function(a){return a.currentStyle};return function(b){var c=a(b);return c||f("Style returned "+c+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),c}}(),k=c("boxSizing")){var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style[k]="border-box";var g=document.body||document.documentElement;g.appendChild(e);var h=j(e);l=200===b(h.width),g.removeChild(e)}}}function h(a){if(e(),"string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var c=j(a);if("none"===c.display)return d();var f={};f.width=a.offsetWidth,f.height=a.offsetHeight;for(var h=f.isBorderBox=!(!k||!c[k]||"border-box"!==c[k]),m=0,n=g.length;n>m;m++){var o=g[m],p=c[o];p=i(a,p);var q=parseFloat(p);f[o]=isNaN(q)?0:q}var r=f.paddingLeft+f.paddingRight,s=f.paddingTop+f.paddingBottom,t=f.marginLeft+f.marginRight,u=f.marginTop+f.marginBottom,v=f.borderLeftWidth+f.borderRightWidth,w=f.borderTopWidth+f.borderBottomWidth,x=h&&l,y=b(c.width);y!==!1&&(f.width=y+(x?0:r+v));var z=b(c.height);return z!==!1&&(f.height=z+(x?0:s+w)),f.innerWidth=f.width-(r+v),f.innerHeight=f.height-(s+w),f.outerWidth=f.width+t,f.outerHeight=f.height+u,f}}function i(b,c){if(a.getComputedStyle||-1===c.indexOf("%"))return c;var d=b.style,e=d.left,f=b.runtimeStyle,g=f&&f.left;return g&&(f.left=b.currentStyle.left),d.left=c,c=d.pixelLeft,d.left=e,g&&(f.left=g),c}var j,k,l,m=!1;return h}var f="undefined"==typeof console?c:function(a){console.error(a)},g=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],e):"object"==typeof exports?module.exports=e(require("desandro-get-style-property")):a.getSize=e(a.getStyleProperty)}(window),function(a){function b(a){"function"==typeof a&&(b.isReady?a():g.push(a))}function c(a){var c="readystatechange"===a.type&&"complete"!==f.readyState;b.isReady||c||d()}function d(){b.isReady=!0;for(var a=0,c=g.length;c>a;a++){var d=g[a];d()}}function e(e){return"complete"===f.readyState?d():(e.bind(f,"DOMContentLoaded",c),e.bind(f,"readystatechange",c),e.bind(a,"load",c)),b}var f=a.document,g=[];b.isReady=!1,"function"==typeof define&&define.amd?define("doc-ready/doc-ready",["eventie/eventie"],e):"object"==typeof exports?module.exports=e(require("eventie")):a.docReady=e(a.eventie)}(window),function(a){function b(a,b){return a[g](b)}function c(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}function d(a,b){c(a);for(var d=a.parentNode.querySelectorAll(b),e=0,f=d.length;f>e;e++)if(d[e]===a)return!0;return!1}function e(a,d){return c(a),b(a,d)}var f,g=function(){if(a.matches)return"matches";if(a.matchesSelector)return"matchesSelector";for(var b=["webkit","moz","ms","o"],c=0,d=b.length;d>c;c++){var e=b[c],f=e+"MatchesSelector";if(a[f])return f}}();if(g){var h=document.createElement("div"),i=b(h,"div");f=i?b:e}else f=d;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return f}):"object"==typeof exports?module.exports=f:window.matchesSelector=f}(Element.prototype),function(a,b){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["doc-ready/doc-ready","matches-selector/matches-selector"],function(c,d){return b(a,c,d)}):"object"==typeof exports?module.exports=b(a,require("doc-ready"),require("desandro-matches-selector")):a.fizzyUIUtils=b(a,a.docReady,a.matchesSelector)}(window,function(a,b,c){var d={};d.extend=function(a,b){for(var c in b)a[c]=b[c];return a},d.modulo=function(a,b){return(a%b+b)%b};var e=Object.prototype.toString;d.isArray=function(a){return"[object Array]"==e.call(a)},d.makeArray=function(a){var b=[];if(d.isArray(a))b=a;else if(a&&"number"==typeof a.length)for(var c=0,e=a.length;e>c;c++)b.push(a[c]);else b.push(a);return b},d.indexOf=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},d.removeFrom=function(a,b){var c=d.indexOf(a,b);-1!=c&&a.splice(c,1)},d.isElement="function"==typeof HTMLElement||"object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1==a.nodeType&&"string"==typeof a.nodeName},d.setText=function(){function a(a,c){b=b||(void 0!==document.documentElement.textContent?"textContent":"innerText"),a[b]=c}var b;return a}(),d.getParent=function(a,b){for(;a!=document.body;)if(a=a.parentNode,c(a,b))return a},d.getQueryElement=function(a){return"string"==typeof a?document.querySelector(a):a},d.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},d.filterFindElements=function(a,b){a=d.makeArray(a);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f];if(d.isElement(h))if(b){c(h,b)&&e.push(h);for(var i=h.querySelectorAll(b),j=0,k=i.length;k>j;j++)e.push(i[j])}else e.push(h)}return e},d.debounceMethod=function(a,b,c){var d=a.prototype[b],e=b+"Timeout";a.prototype[b]=function(){var a=this[e];a&&clearTimeout(a);var b=arguments,f=this;this[e]=setTimeout(function(){d.apply(f,b),delete f[e]},c||100)}},d.toDashed=function(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()};var f=a.console;return d.htmlInit=function(c,e){b(function(){for(var b=d.toDashed(e),g=document.querySelectorAll(".js-"+b),h="data-"+b+"-options",i=0,j=g.length;j>i;i++){var k,l=g[i],m=l.getAttribute(h);try{k=m&&JSON.parse(m)}catch(n){f&&f.error("Error parsing "+h+" on "+l.nodeName.toLowerCase()+(l.id?"#"+l.id:"")+": "+n);continue}var o=new c(l,k),p=a.jQuery;p&&p.data(l,e,o)}})},d}),function(a,b){"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property","fizzy-ui-utils/utils"],function(c,d,e,f){return b(a,c,d,e,f)}):"object"==typeof exports?module.exports=b(a,require("wolfy87-eventemitter"),require("get-size"),require("desandro-get-style-property"),require("fizzy-ui-utils")):(a.Outlayer={},a.Outlayer.Item=b(a,a.EventEmitter,a.getSize,a.getStyleProperty,a.fizzyUIUtils))}(window,function(a,b,c,d,e){function f(a){for(var b in a)return!1;return b=null,!0}function g(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}function h(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}var i=a.getComputedStyle,j=i?function(a){return i(a,null)}:function(a){return a.currentStyle},k=d("transition"),l=d("transform"),m=k&&l,n=!!d("perspective"),o={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[k],p=["transform","transition","transitionDuration","transitionProperty"],q=function(){for(var a={},b=0,c=p.length;c>b;b++){var e=p[b],f=d(e);f&&f!==e&&(a[e]=f)}return a}();e.extend(g.prototype,b.prototype),g.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},g.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},g.prototype.getSize=function(){this.size=c(this.element)},g.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=q[c]||c;b[d]=a[c]}},g.prototype.getPosition=function(){var a=j(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=a[c?"left":"right"],f=a[d?"top":"bottom"],g=this.layout.size,h=-1!=e.indexOf("%")?parseFloat(e)/100*g.width:parseInt(e,10),i=-1!=f.indexOf("%")?parseFloat(f)/100*g.height:parseInt(f,10);h=isNaN(h)?0:h,i=isNaN(i)?0:i,h-=c?g.paddingLeft:g.paddingRight,i-=d?g.paddingTop:g.paddingBottom,this.position.x=h,this.position.y=i},g.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={},d=b.isOriginLeft?"paddingLeft":"paddingRight",e=b.isOriginLeft?"left":"right",f=b.isOriginLeft?"right":"left",g=this.position.x+a[d];c[e]=this.getXValue(g),c[f]="";var h=b.isOriginTop?"paddingTop":"paddingBottom",i=b.isOriginTop?"top":"bottom",j=b.isOriginTop?"bottom":"top",k=this.position.y+a[h];c[i]=this.getYValue(k),c[j]="",this.css(c),this.emitEvent("layout",[this])},g.prototype.getXValue=function(a){var b=this.layout.options;return b.percentPosition&&!b.isHorizontal?a/this.layout.size.width*100+"%":a+"px"},g.prototype.getYValue=function(a){var b=this.layout.options;return b.percentPosition&&b.isHorizontal?a/this.layout.size.height*100+"%":a+"px"},g.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={};j.transform=this.getTranslate(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},g.prototype.getTranslate=function(a,b){var c=this.layout.options;return a=c.isOriginLeft?a:-a,b=c.isOriginTop?b:-b,n?"translate3d("+a+"px, "+b+"px, 0)":"translate("+a+"px, "+b+"px)"},g.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},g.prototype.moveTo=m?g.prototype._transitionTo:g.prototype.goTo,g.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},g.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},g.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var r="opacity,"+h(q.transform||"transform");g.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:r,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(o,this,!1))},g.prototype.transition=g.prototype[k?"_transition":"_nonTransition"],g.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},g.prototype.onotransitionend=function(a){this.ontransitionend(a)};var s={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};g.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,c=s[a.propertyName]||a.propertyName;if(delete b.ingProperties[c],f(b.ingProperties)&&this.disableTransition(),c in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[c]),c in b.onEnd){var d=b.onEnd[c];d.call(this),delete b.onEnd[c]}this.emitEvent("transitionEnd",[this])}},g.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(o,this,!1),this.isTransitioning=!1},g.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var t={transitionProperty:"",transitionDuration:""};return g.prototype.removeTransitionStyles=function(){this.css(t)},g.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},g.prototype.remove=function(){if(!k||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.once("transitionEnd",function(){a.removeElem()}),this.hide()},g.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options,b={},c=this.getHideRevealTransitionEndProperty("visibleStyle");b[c]=this.onRevealTransitionEnd,this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0,onTransitionEnd:b})},g.prototype.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},g.prototype.getHideRevealTransitionEndProperty=function(a){var b=this.layout.options[a];if(b.opacity)return"opacity";for(var c in b)return c},g.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options,b={},c=this.getHideRevealTransitionEndProperty("hiddenStyle");b[c]=this.onHideTransitionEnd,this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:b})},g.prototype.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},g.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},g}),function(a,b){"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","eventEmitter/EventEmitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(c,d,e,f,g){return b(a,c,d,e,f,g)}):"object"==typeof exports?module.exports=b(a,require("eventie"),require("wolfy87-eventemitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):a.Outlayer=b(a,a.eventie,a.EventEmitter,a.getSize,a.fizzyUIUtils,a.Outlayer.Item)}(window,function(a,b,c,d,e,f){function g(a,b){var c=e.getQueryElement(a);if(!c)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(c||a)));this.element=c,i&&(this.$element=i(this.element)),this.options=e.extend({},this.constructor.defaults),this.option(b);var d=++k;this.element.outlayerGUID=d,l[d]=this,this._create(),this.options.isInitLayout&&this.layout()}var h=a.console,i=a.jQuery,j=function(){},k=0,l={};return g.namespace="outlayer",g.Item=f,g.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e.extend(g.prototype,c.prototype),g.prototype.option=function(a){e.extend(this.options,a)},g.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e.extend(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},g.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},g.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}return d},g.prototype._filterFindItemElements=function(a){return e.filterFindElements(a,this.options.itemSelector)},g.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},g.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},g.prototype._init=g.prototype.layout,g.prototype._resetLayout=function(){this.getSize()},g.prototype.getSize=function(){this.size=d(this.element)},g.prototype._getMeasurement=function(a,b){var c,f=this.options[a];f?("string"==typeof f?c=this.element.querySelector(f):e.isElement(f)&&(c=f),this[a]=c?d(c)[b]:f):this[a]=0},g.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},g.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}return b},g.prototype._layoutItems=function(a,b){if(this._emitCompleteOnItems("layout",a),a&&a.length){for(var c=[],d=0,e=a.length;e>d;d++){var f=a[d],g=this._getItemLayoutPosition(f);g.item=f,g.isInstant=b||f.isLayoutInstant,c.push(g)}this._processLayoutQueue(c)}},g.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},g.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},g.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},g.prototype._postLayout=function(){this.resizeContainer()},g.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},g.prototype._getContainerSize=j,g.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},g.prototype._emitCompleteOnItems=function(a,b){function c(){e.dispatchEvent(a+"Complete",null,[b])}function d(){g++,g===f&&c()}var e=this,f=b.length;if(!b||!f)return void c();for(var g=0,h=0,i=b.length;i>h;h++){var j=b[h];j.once(a,d)}},g.prototype.dispatchEvent=function(a,b,c){var d=b?[b].concat(c):c;if(this.emitEvent(a,d),i)if(this.$element=this.$element||i(this.element),b){var e=i.Event(b);e.type=a,this.$element.trigger(e,c)}else this.$element.trigger(a,c)},g.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},g.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},g.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},g.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e.removeFrom(this.stamps,d),this.unignore(d)}},g.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=e.makeArray(a)):void 0},g.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},g.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},g.prototype._manageStamp=j,g.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,e=d(a),f={left:b.left-c.left-e.marginLeft,top:b.top-c.top-e.marginTop,right:c.right-b.right-e.marginRight,bottom:c.bottom-b.bottom-e.marginBottom};return f},g.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},g.prototype.bindResize=function(){this.isResizeBound||(b.bind(a,"resize",this),this.isResizeBound=!0)},g.prototype.unbindResize=function(){this.isResizeBound&&b.unbind(a,"resize",this),this.isResizeBound=!1},g.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},g.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},g.prototype.needsResizeLayout=function(){var a=d(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},g.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},g.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},g.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},g.prototype.reveal=function(a){this._emitCompleteOnItems("reveal",a);for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.reveal()}},g.prototype.hide=function(a){this._emitCompleteOnItems("hide",a);for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.hide()}},g.prototype.revealItemElements=function(a){var b=this.getItems(a);this.reveal(b)},g.prototype.hideItemElements=function(a){var b=this.getItems(a);this.hide(b)},g.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},g.prototype.getItems=function(a){a=e.makeArray(a);for(var b=[],c=0,d=a.length;d>c;c++){var f=a[c],g=this.getItem(f);g&&b.push(g)}return b},g.prototype.remove=function(a){var b=this.getItems(a);if(this._emitCompleteOnItems("remove",b),b&&b.length)for(var c=0,d=b.length;d>c;c++){var f=b[c];f.remove(),e.removeFrom(this.items,f)}},g.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}this.unbindResize();var e=this.element.outlayerGUID;delete l[e],delete this.element.outlayerGUID,i&&i.removeData(this.element,this.constructor.namespace)},g.data=function(a){a=e.getQueryElement(a);var b=a&&a.outlayerGUID;return b&&l[b]},g.create=function(a,b){function c(){g.apply(this,arguments)}return Object.create?c.prototype=Object.create(g.prototype):e.extend(c.prototype,g.prototype),c.prototype.constructor=c,c.defaults=e.extend({},g.defaults),e.extend(c.defaults,b),c.prototype.settings={},c.namespace=a,c.data=g.data,c.Item=function(){f.apply(this,arguments)},c.Item.prototype=new f,e.htmlInit(c,a),i&&i.bridget&&i.bridget(a,c),c},g.Item=f,g}),function(a,b){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","fizzy-ui-utils/utils"],b):"object"==typeof exports?module.exports=b(require("outlayer"),require("get-size"),require("fizzy-ui-utils")):a.Masonry=b(a.Outlayer,a.getSize,a.fizzyUIUtils)}(window,function(a,b,c){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}var d=this.columnWidth+=this.gutter,e=this.containerWidth+this.gutter,f=e/d,g=d-e%d,h=g&&1>g?"round":"floor";f=Math[h](f),this.cols=Math.max(f,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c.indexOf(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d});

/*imagesloaded.js*/
/*!
 * imagesLoaded v3.0.2
 * JavaScript is all like "You images are done yet or what?"
 */

( function( window ) {

'use strict';

var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

// --------------------------  -------------------------- //

function defineImagesLoaded( EventEmitter, eventie ) {

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ImagesLoaded ) ) {
      return new ImagesLoaded( elem, options );
    }
    // use elem as selector string
    if ( typeof elem === 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options === 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0, len = this.elements.length; i < len; i++ ) {
      var elem = this.elements[i];
      // filter siblings
      if ( elem.nodeName === 'IMG' ) {
        this.addImage( elem );
      }
      // find children
      var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        var img = childElems[j];
        this.addImage( img );
      }
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.check = function() {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !length ) {
      this.complete();
      return;
    }

    function onConfirm( image, message ) {
      if ( _this.options.debug && hasConsole ) {
        console.log( 'confirm', image, message );
      }

      _this.progress( image );
      checkedCount++;
      if ( checkedCount === length ) {
        _this.complete();
      }
      return true; // bind once
    }

    for ( var i=0; i < length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.on( 'confirm', onConfirm );
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function( image ) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    this.emit( 'progress', this, image );
    if ( this.jqDeferred ) {
      this.jqDeferred.notify( this, image );
    }
  };

  ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    this.emit( eventName, this );
    this.emit( 'always', this );
    if ( this.jqDeferred ) {
      var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
      this.jqDeferred[ jqMethod ]( this );
    }
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
    $.fn.imagesLoaded = function( options, callback ) {
      var instance = new ImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  }


  // --------------------------  -------------------------- //

  var cache = {};

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
    // first check cached any previous images that have same src
    var cached = cache[ this.img.src ];
    if ( cached ) {
      this.useCached( cached );
      return;
    }
    // add this to cache
    cache[ this.img.src ] = this;

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var proxyImage = this.proxyImage = new Image();
    eventie.bind( proxyImage, 'load', this );
    eventie.bind( proxyImage, 'error', this );
    proxyImage.src = this.img.src;
  };

  LoadingImage.prototype.useCached = function( cached ) {
    if ( cached.isConfirmed ) {
      this.confirm( cached.isLoaded, 'cached was confirmed' );
    } else {
      var _this = this;
      cached.on( 'confirm', function( image ) {
        _this.confirm( image.isLoaded, 'cache emitted confirmed' );
        return true; // bind once
      });
    }
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  // trigger specified handler for event type
  LoadingImage.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  LoadingImage.prototype.onload = function() {
    this.confirm( true, 'onload' );
    this.unbindProxyEvents();
  };

  LoadingImage.prototype.onerror = function() {
    this.confirm( false, 'onerror' );
    this.unbindProxyEvents();
  };

  LoadingImage.prototype.unbindProxyEvents = function() {
    eventie.unbind( this.proxyImage, 'load', this );
    eventie.unbind( this.proxyImage, 'error', this );
  };

  // -----  ----- //

  return ImagesLoaded;
}

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [
      'eventEmitter',
      'eventie'
    ],
    defineImagesLoaded );
} else {
  // browser global
  window.imagesLoaded = defineImagesLoaded(
    window.EventEmitter,
    window.eventie
  );
}

})( window );
/*classie.js*/
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

/*AnimOnScroll.js*/
/**
 * animOnScroll.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
    
    'use strict';
    
    var docElem = window.document.documentElement;

    function getViewportH() {
        var client = docElem['clientHeight'],
            inner = window['innerHeight'];
        
        if( client < inner )
            return inner;
        else
            return client;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    // http://stackoverflow.com/a/5598797/989439
    function getOffset( el ) {
        var offsetTop = 0, offsetLeft = 0;
        do {
            if ( !isNaN( el.offsetTop ) ) {
                offsetTop += el.offsetTop;
            }
            if ( !isNaN( el.offsetLeft ) ) {
                offsetLeft += el.offsetLeft;
            }
        } while( el = el.offsetParent )

        return {
            top : offsetTop,
            left : offsetLeft
        }
    }

    function inViewport( el, h ) {
        var elH = el.offsetHeight,
            scrolled = scrollY(),
            viewed = scrolled + getViewportH(),
            elTop = getOffset(el).top,
            elBottom = elTop + elH,
            // if 0, the element is considered in the viewport as soon as it enters.
            // if 1, the element is considered in the viewport only when it's fully inside
            // value in percentage (1 >= h >= 0)
            h = h || 0;

        return (elTop + elH * h) <= viewed && (elBottom - elH * h) >= scrolled;
    }

    function extend( a, b ) {
        for( var key in b ) { 
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function AnimOnScroll( el, options ) {  
        this.el = el;
        this.options = extend( this.defaults, options );
        this._init();
    }

    AnimOnScroll.prototype = {
        defaults : {
            // Minimum and a maximum duration of the animation (random value is chosen)
            minDuration : 0,
            maxDuration : 0,
            // The viewportFactor defines how much of the appearing item has to be visible in order to trigger the animation
            // if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport. 
            // If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
            viewportFactor : 0,
            MasonryOk   : true
        },
        _init : function() {
            this.items = Array.prototype.slice.call( document.querySelectorAll( '#' + this.el.id + ' > li' ) );
            this.itemsCount = this.items.length;
            this.itemsRenderedCount = 0;
            this.didScroll = false;

            var self = this;

            imagesLoaded( this.el, function() {
                
                // initialize masonry
                    var msnry = new Masonry( self.el, {
                        itemSelector: 'li',
                        transitionDuration : 0
                    } );
                    window.metgrid = msnry;
                
                if( Modernizr.cssanimations ) {
                    // the items already shown...
                    self.items.forEach( function( el, i ) {
                        if( inViewport( el ) ) {
                            self._checkTotalRendered();
                            classie.add( el, 'shown' );
                        }
                    } );

                    // animate on scroll the items inside the viewport
                    window.addEventListener( 'scroll', function() {
                        self._onScrollFn();
                    }, false );
                    window.addEventListener( 'resize', function() {
                        self._resizeHandler();
                    }, false );
                }

            });
        },
        _onScrollFn : function() {
            var self = this;
            if( !this.didScroll ) {
                this.didScroll = true;
                setTimeout( function() { self._scrollPage(); }, 60 );
            }
        },
        _scrollPage : function() {
            var self = this;
            this.items.forEach( function( el, i ) {
                if( !classie.has( el, 'shown' ) && !classie.has( el, 'animate' ) && inViewport( el, self.options.viewportFactor ) ) {
                    setTimeout( function() {
                        var perspY = scrollY() + getViewportH() / 2;
                        self.el.style.WebkitPerspectiveOrigin = '50% ' + perspY + 'px';
                        self.el.style.MozPerspectiveOrigin = '50% ' + perspY + 'px';
                        self.el.style.perspectiveOrigin = '50% ' + perspY + 'px';

                        self._checkTotalRendered();

                        if( self.options.minDuration && self.options.maxDuration ) {
                            var randDuration = ( Math.random() * ( self.options.maxDuration - self.options.minDuration ) + self.options.minDuration ) + 's';
                            el.style.WebkitAnimationDuration = randDuration;
                            el.style.MozAnimationDuration = randDuration;
                            el.style.animationDuration = randDuration;
                        }
                        
                        classie.add( el, 'animate' );
                    }, 25 );
                }
            });
            this.didScroll = false;
        },
        _resizeHandler : function() {
            var self = this;
            function delayed() {
                self._scrollPage();
                self.resizeTimeout = null;
            }
            if ( this.resizeTimeout ) {
                clearTimeout( this.resizeTimeout );
            }
            this.resizeTimeout = setTimeout( delayed, 1000 );
        },
        _checkTotalRendered : function() {
            ++this.itemsRenderedCount;
            if( this.itemsRenderedCount === this.itemsCount ) {
                window.removeEventListener( 'scroll', this._onScrollFn );
            }
        }
    }

    // add to global namespace
    window.AnimOnScroll = AnimOnScroll;

} )( window );

/*tweenmax.min.js*/
/*!
 * VERSION: beta 1.10.3
 * DATE: 2013-09-02
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue||(window._gsQueue=[])).push(function(){"use strict";window._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=[].slice,r=function(t,e,s){i.call(this,t,e,s),this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0,this.render=r.prototype.render},n=function(t){return t.jquery||t.length&&t!==window&&t[0]&&(t[0]===window||t[0].nodeType&&t[0].style&&!t.nodeType)},a=r.prototype=i.to({},.1,{}),o=[];r.version="1.10.3",a.constructor=r,a.kill()._gc=!1,r.killTweensOf=r.killDelayedCallsTo=i.killTweensOf,r.getTweensOf=i.getTweensOf,r.ticker=i.ticker,a.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),i.prototype.invalidate.call(this)},a.updateTo=function(t,e){var s,r=this.ratio;e&&this.timeline&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(s in t)this.vars[s]=t[s];if(this._initted)if(e)this._initted=!1;else if(this._notifyPluginsOfEnabled&&this._firstPT&&i._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var n=this._time;this.render(0,!0,!1),this._initted=!1,this.render(n,!0,!1)}else if(this._time>0){this._initted=!1,this._init();for(var a,o=1/(1-r),h=this._firstPT;h;)a=h.s+h.c,h.c*=o,h.s=a-h.c,h=h._next}return this},a.render=function(t,e,i){var s,r,n,a,h,l,_,u=this._dirty?this.totalDuration():this._totalDuration,p=this._time,f=this._totalTime,c=this._cycle;if(t>=u?(this._totalTime=u,this._cycle=this._repeat,this._yoyo&&0!==(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=this._duration,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(s=!0,r="onComplete"),0===this._duration&&((0===t||0>this._rawPrevTime)&&this._rawPrevTime!==t&&(i=!0,this._rawPrevTime>0&&(r="onReverseComplete",e&&(t=-1))),this._rawPrevTime=t)):1e-7>t?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==f||0===this._duration&&this._rawPrevTime>0)&&(r="onReverseComplete",s=this._reversed),0>t?(this._active=!1,0===this._duration&&(this._rawPrevTime>=0&&(i=!0),this._rawPrevTime=t)):this._initted||(i=!0)):(this._totalTime=this._time=t,0!==this._repeat&&(a=this._duration+this._repeatDelay,this._cycle=this._totalTime/a>>0,0!==this._cycle&&this._cycle===this._totalTime/a&&this._cycle--,this._time=this._totalTime-this._cycle*a,this._yoyo&&0!==(1&this._cycle)&&(this._time=this._duration-this._time),this._time>this._duration?this._time=this._duration:0>this._time&&(this._time=0)),this._easeType?(h=this._time/this._duration,l=this._easeType,_=this._easePower,(1===l||3===l&&h>=.5)&&(h=1-h),3===l&&(h*=2),1===_?h*=h:2===_?h*=h*h:3===_?h*=h*h*h:4===_&&(h*=h*h*h*h),this.ratio=1===l?1-h:2===l?h:.5>this._time/this._duration?h/2:1-h/2):this.ratio=this._ease.getRatio(this._time/this._duration)),p===this._time&&!i)return f!==this._totalTime&&this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||o)),void 0;if(!this._initted){if(this._init(),!this._initted)return;this._time&&!s?this.ratio=this._ease.getRatio(this._time/this._duration):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._active||!this._paused&&this._time!==p&&t>=0&&(this._active=!0),0===f&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._totalTime||0===this._duration)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||o))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(0>t&&this._startAt&&this._startAt.render(t,e,i),e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||o)),this._cycle!==c&&(e||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||o)),r&&(this._gc||(0>t&&this._startAt&&!this._onUpdate&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||o)))},r.to=function(t,e,i){return new r(t,e,i)},r.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new r(t,e,i)},r.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new r(t,e,s)},r.staggerTo=r.allTo=function(t,e,a,h,l,_,u){h=h||0;var p,f,c,m,d=a.delay||0,g=[],v=function(){a.onComplete&&a.onComplete.apply(a.onCompleteScope||this,arguments),l.apply(u||this,_||o)};for(t instanceof Array||("string"==typeof t&&(t=i.selector(t)||t),n(t)&&(t=s.call(t,0))),p=t.length,c=0;p>c;c++){f={};for(m in a)f[m]=a[m];f.delay=d,c===p-1&&l&&(f.onComplete=v),g[c]=new r(t[c],e,f),d+=h}return g},r.staggerFrom=r.allFrom=function(t,e,i,s,n,a,o){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,r.staggerTo(t,e,i,s,n,a,o)},r.staggerFromTo=r.allFromTo=function(t,e,i,s,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,r.staggerTo(t,e,s,n,a,o,h)},r.delayedCall=function(t,e,i,s,n){return new r(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:s,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:s,immediateRender:!1,useFrames:n,overwrite:0})},r.set=function(t,e){return new r(t,0,e)},r.isTweening=function(t){for(var e,s=i.getTweensOf(t),r=s.length;--r>-1;)if(e=s[r],e._active||e._startTime===e._timeline._time&&e._timeline._active)return!0;return!1};var h=function(t,e){for(var s=[],r=0,n=t._first;n;)n instanceof i?s[r++]=n:(e&&(s[r++]=n),s=s.concat(h(n,e)),r=s.length),n=n._next;return s},l=r.getAllTweens=function(e){return h(t._rootTimeline,e).concat(h(t._rootFramesTimeline,e))};r.killAll=function(t,i,s,r){null==i&&(i=!0),null==s&&(s=!0);var n,a,o,h=l(0!=r),_=h.length,u=i&&s&&r;for(o=0;_>o;o++)a=h[o],(u||a instanceof e||(n=a.target===a.vars.onComplete)&&s||i&&!n)&&(t?a.totalTime(a.totalDuration()):a._enabled(!1,!1))},r.killChildTweensOf=function(t,e){if(null!=t){var a,o,h,l,_,u=i._tweenLookup;if("string"==typeof t&&(t=i.selector(t)||t),n(t)&&(t=s(t,0)),t instanceof Array)for(l=t.length;--l>-1;)r.killChildTweensOf(t[l],e);else{a=[];for(h in u)for(o=u[h].target.parentNode;o;)o===t&&(a=a.concat(u[h].tweens)),o=o.parentNode;for(_=a.length,l=0;_>l;l++)e&&a[l].totalTime(a[l].totalDuration()),a[l]._enabled(!1,!1)}}};var _=function(t,i,s,r){i=i!==!1,s=s!==!1,r=r!==!1;for(var n,a,o=l(r),h=i&&s&&r,_=o.length;--_>-1;)a=o[_],(h||a instanceof e||(n=a.target===a.vars.onComplete)&&s||i&&!n)&&a.paused(t)};return r.pauseAll=function(t,e,i){_(!0,t,e,i)},r.resumeAll=function(t,e,i){_(!1,t,e,i)},r.globalTimeScale=function(e){var s=t._rootTimeline,r=i.ticker.time;return arguments.length?(e=e||1e-6,s._startTime=r-(r-s._startTime)*s._timeScale/e,s=t._rootFramesTimeline,r=i.ticker.frame,s._startTime=r-(r-s._startTime)*s._timeScale/e,s._timeScale=t._rootTimeline._timeScale=e,e):s._timeScale},a.progress=function(t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},a.totalProgress=function(t){return arguments.length?this.totalTime(this.totalDuration()*t,!1):this._totalTime/this.totalDuration()},a.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},a.duration=function(e){return arguments.length?t.prototype.duration.call(this,e):this._duration},a.totalDuration=function(t){return arguments.length?-1===this._repeat?this:this.duration((t-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},a.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},a.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},a.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},r},!0),window._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,s,r=this.vars;for(s in r)i=r[s],i instanceof Array&&-1!==i.join("").indexOf("{self}")&&(r[s]=this._swapSelfInParams(i));r.tweens instanceof Array&&this.add(r.tweens,0,r.align,r.stagger)},r=[],n=function(t){var e,i={};for(e in t)i[e]=t[e];return i},a=function(t,e,i,s){t._timeline.pause(t._startTime),e&&e.apply(s||t._timeline,i||r)},o=r.slice,h=s.prototype=new e;return s.version="1.10.3",h.constructor=s,h.kill()._gc=!1,h.to=function(t,e,s,r){return e?this.add(new i(t,e,s),r):this.set(t,s,r)},h.from=function(t,e,s,r){return this.add(i.from(t,e,s),r)},h.fromTo=function(t,e,s,r,n){return e?this.add(i.fromTo(t,e,s,r),n):this.set(t,r,n)},h.staggerTo=function(t,e,r,a,h,l,_,u){var p,f=new s({onComplete:l,onCompleteParams:_,onCompleteScope:u});for("string"==typeof t&&(t=i.selector(t)||t),!(t instanceof Array)&&t.length&&t!==window&&t[0]&&(t[0]===window||t[0].nodeType&&t[0].style&&!t.nodeType)&&(t=o.call(t,0)),a=a||0,p=0;t.length>p;p++)r.startAt&&(r.startAt=n(r.startAt)),f.to(t[p],e,n(r),p*a);return this.add(f,h)},h.staggerFrom=function(t,e,i,s,r,n,a,o){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,s,r,n,a,o)},h.staggerFromTo=function(t,e,i,s,r,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,s,r,n,a,o,h)},h.call=function(t,e,s,r){return this.add(i.delayedCall(0,t,e,s),r)},h.set=function(t,e,s){return s=this._parseTimeOrLabel(s,0,!0),null==e.immediateRender&&(e.immediateRender=s===this._time&&!this._paused),this.add(new i(t,0,e),s)},s.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var r,n,a=new s(t),o=a._timeline;for(null==e&&(e=!0),o._remove(a,!0),a._startTime=0,a._rawPrevTime=a._time=a._totalTime=o._time,r=o._first;r;)n=r._next,e&&r instanceof i&&r.target===r.vars.onComplete||a.add(r,r._startTime-r._delay),r=n;return o.add(a,0),a},h.add=function(r,n,a,o){var h,l,_,u,p,f;if("number"!=typeof n&&(n=this._parseTimeOrLabel(n,0,!0,r)),!(r instanceof t)){if(r instanceof Array){for(a=a||"normal",o=o||0,h=n,l=r.length,_=0;l>_;_++)(u=r[_])instanceof Array&&(u=new s({tweens:u})),this.add(u,h),"string"!=typeof u&&"function"!=typeof u&&("sequence"===a?h=u._startTime+u.totalDuration()/u._timeScale:"start"===a&&(u._startTime-=u.delay())),h+=o;return this._uncache(!0)}if("string"==typeof r)return this.addLabel(r,n);if("function"!=typeof r)throw"Cannot add "+r+" into the timeline; it is not a tween, timeline, function, or string.";r=i.delayedCall(0,r)}if(e.prototype.add.call(this,r,n),this._gc&&!this._paused&&this._duration<this.duration())for(p=this,f=p.rawTime()>r._startTime;p._gc&&p._timeline;)p._timeline.smoothChildTiming&&f?p.totalTime(p._totalTime,!0):p._enabled(!0,!1),p=p._timeline;return this},h.remove=function(e){if(e instanceof t)return this._remove(e,!1);if(e instanceof Array){for(var i=e.length;--i>-1;)this.remove(e[i]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},h._remove=function(t,i){return e.prototype._remove.call(this,t,i),this._last?this._time>this._last._startTime&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=0,this},h.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},h.insert=h.insertMultiple=function(t,e,i,s){return this.add(t,e||0,i,s)},h.appendMultiple=function(t,e,i,s){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,s)},h.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},h.addPause=function(t,e,i,s){return this.call(a,["{self}",e,i,s],this,t)},h.removeLabel=function(t){return delete this._labels[t],this},h.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},h._parseTimeOrLabel=function(e,i,s,r){var n;if(r instanceof t&&r.timeline===this)this.remove(r);else if(r instanceof Array)for(n=r.length;--n>-1;)r[n]instanceof t&&r[n].timeline===this&&this.remove(r[n]);if("string"==typeof i)return this._parseTimeOrLabel(i,s&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,s);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(n=e.indexOf("="),-1===n)return null==this._labels[e]?s?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(n-1)+"1",10)*Number(e.substr(n+1)),e=n>1?this._parseTimeOrLabel(e.substr(0,n-1),0,s):this.duration()}return Number(e)+i},h.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),e!==!1)},h.stop=function(){return this.paused(!0)},h.gotoAndPlay=function(t,e){return this.play(t,e)},h.gotoAndStop=function(t,e){return this.pause(t,e)},h.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,n,a,o,h,l=this._dirty?this.totalDuration():this._totalDuration,_=this._time,u=this._startTime,p=this._timeScale,f=this._paused;if(t>=l?(this._totalTime=this._time=l,this._reversed||this._hasPausedChild()||(n=!0,o="onComplete",0===this._duration&&(0===t||0>this._rawPrevTime)&&this._rawPrevTime!==t&&this._first&&(h=!0,this._rawPrevTime>0&&(o="onReverseComplete"))),this._rawPrevTime=t,t=l+1e-6):1e-7>t?(this._totalTime=this._time=0,(0!==_||0===this._duration&&this._rawPrevTime>0)&&(o="onReverseComplete",n=this._reversed),0>t?(this._active=!1,0===this._duration&&this._rawPrevTime>=0&&this._first&&(h=!0),this._rawPrevTime=t):(this._rawPrevTime=t,t=0,this._initted||(h=!0))):this._totalTime=this._time=this._rawPrevTime=t,this._time!==_&&this._first||i||h){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==_&&t>0&&(this._active=!0),0===_&&this.vars.onStart&&0!==this._time&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||r)),this._time>=_)for(s=this._first;s&&(a=s._next,!this._paused||f);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;else for(s=this._last;s&&(a=s._prev,!this._paused||f);)(s._active||_>=s._startTime&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||r)),o&&(this._gc||(u===this._startTime||p!==this._timeScale)&&(0===this._time||l>=this.totalDuration())&&(n&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[o]&&this.vars[o].apply(this.vars[o+"Scope"]||this,this.vars[o+"Params"]||r)))}},h._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof s&&t._hasPausedChild())return!0;t=t._next}return!1},h.getChildren=function(t,e,s,r){r=r||-9999999999;for(var n=[],a=this._first,o=0;a;)r>a._startTime||(a instanceof i?e!==!1&&(n[o++]=a):(s!==!1&&(n[o++]=a),t!==!1&&(n=n.concat(a.getChildren(!0,e,s)),o=n.length))),a=a._next;return n},h.getTweensOf=function(t,e){for(var s=i.getTweensOf(t),r=s.length,n=[],a=0;--r>-1;)(s[r].timeline===this||e&&this._contains(s[r]))&&(n[a++]=s[r]);return n},h._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},h.shiftChildren=function(t,e,i){i=i||0;for(var s,r=this._first,n=this._labels;r;)r._startTime>=i&&(r._startTime+=t),r=r._next;if(e)for(s in n)n[s]>=i&&(n[s]+=t);return this._uncache(!0)},h._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),s=i.length,r=!1;--s>-1;)i[s]._kill(t,e)&&(r=!0);return r},h.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return t!==!1&&(this._labels={}),this._uncache(!0)},h.invalidate=function(){for(var t=this._first;t;)t.invalidate(),t=t._next;return this},h._enabled=function(t,i){if(t===this._gc)for(var s=this._first;s;)s._enabled(t,!0),s=s._next;return e.prototype._enabled.call(this,t,i)},h.progress=function(t){return arguments.length?this.totalTime(this.duration()*t,!1):this._time/this.duration()},h.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},h.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,s=0,r=this._last,n=999999999999;r;)e=r._prev,r._dirty&&r.totalDuration(),r._startTime>n&&this._sortChildren&&!r._paused?this.add(r,r._startTime-r._delay):n=r._startTime,0>r._startTime&&!r._paused&&(s-=r._startTime,this._timeline.smoothChildTiming&&(this._startTime+=r._startTime/this._timeScale),this.shiftChildren(-r._startTime,!1,-9999999999),n=0),i=r._startTime+r._totalDuration/r._timeScale,i>s&&(s=i),r=e;this._duration=this._totalDuration=s,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},h.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},h.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},s},!0),window._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(t,e,i){var s=function(e){t.call(this,e),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},r=[],n=new i(null,null,1,0),a=function(t){for(;t;){if(t._paused)return!0;t=t._timeline}return!1},o=s.prototype=new t;return o.constructor=s,o.kill()._gc=!1,s.version="1.10.3",o.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),t.prototype.invalidate.call(this)},o.addCallback=function(t,i,s,r){return this.add(e.delayedCall(0,t,s,r),i)},o.removeCallback=function(t,e){if(t)if(null==e)this._kill(null,t);else for(var i=this.getTweensOf(t,!1),s=i.length,r=this._parseTimeOrLabel(e);--s>-1;)i[s]._startTime===r&&i[s]._enabled(!1,!1);return this},o.tweenTo=function(t,i){i=i||{};var s,a,o={ease:n,overwrite:2,useFrames:this.usesFrames(),immediateRender:!1};for(s in i)o[s]=i[s];return o.time=this._parseTimeOrLabel(t),a=new e(this,Math.abs(Number(o.time)-this._time)/this._timeScale||.001,o),o.onStart=function(){a.target.paused(!0),a.vars.time!==a.target.time()&&a.duration(Math.abs(a.vars.time-a.target.time())/a.target._timeScale),i.onStart&&i.onStart.apply(i.onStartScope||a,i.onStartParams||r)},a},o.tweenFromTo=function(t,e,i){i=i||{},t=this._parseTimeOrLabel(t),i.startAt={onComplete:this.seek,onCompleteParams:[t],onCompleteScope:this},i.immediateRender=i.immediateRender!==!1;var s=this.tweenTo(e,i);return s.duration(Math.abs(s.vars.time-t)/this._timeScale||.001)},o.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,n,a,o,h,l,_=this._dirty?this.totalDuration():this._totalDuration,u=this._duration,p=this._time,f=this._totalTime,c=this._startTime,m=this._timeScale,d=this._rawPrevTime,g=this._paused,v=this._cycle;if(t>=_?(this._locked||(this._totalTime=_,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(n=!0,o="onComplete",0===u&&(0===t||0>this._rawPrevTime)&&this._rawPrevTime!==t&&this._first&&(h=!0,this._rawPrevTime>0&&(o="onReverseComplete"))),this._rawPrevTime=t,this._yoyo&&0!==(1&this._cycle)?this._time=t=0:(this._time=u,t=u+1e-6)):1e-7>t?(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==p||0===u&&this._rawPrevTime>0&&!this._locked)&&(o="onReverseComplete",n=this._reversed),0>t?(this._active=!1,0===u&&this._rawPrevTime>=0&&this._first&&(h=!0),this._rawPrevTime=t):(this._rawPrevTime=t,t=0,this._initted||(h=!0))):(this._time=this._rawPrevTime=t,this._locked||(this._totalTime=t,0!==this._repeat&&(l=u+this._repeatDelay,this._cycle=this._totalTime/l>>0,0!==this._cycle&&this._cycle===this._totalTime/l&&this._cycle--,this._time=this._totalTime-this._cycle*l,this._yoyo&&0!==(1&this._cycle)&&(this._time=u-this._time),this._time>u?(this._time=u,t=u+1e-6):0>this._time?this._time=t=0:t=this._time))),this._cycle!==v&&!this._locked){var y=this._yoyo&&0!==(1&v),T=y===(this._yoyo&&0!==(1&this._cycle)),w=this._totalTime,x=this._cycle,b=this._rawPrevTime,P=this._time;if(this._totalTime=v*u,v>this._cycle?y=!y:this._totalTime+=u,this._time=p,this._rawPrevTime=0===u?d-1e-5:d,this._cycle=v,this._locked=!0,p=y?0:u,this.render(p,e,0===u),e||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||r),T&&(p=y?u+1e-6:-1e-6,this.render(p,!0,!1)),this._locked=!1,this._paused&&!g)return;this._time=P,this._totalTime=w,this._cycle=x,this._rawPrevTime=b}if(!(this._time!==p&&this._first||i||h))return f!==this._totalTime&&this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||r)),void 0;if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==f&&t>0&&(this._active=!0),0===f&&this.vars.onStart&&0!==this._totalTime&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||r)),this._time>=p)for(s=this._first;s&&(a=s._next,!this._paused||g);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;else for(s=this._last;s&&(a=s._prev,!this._paused||g);)(s._active||p>=s._startTime&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||r)),o&&(this._locked||this._gc||(c===this._startTime||m!==this._timeScale)&&(0===this._time||_>=this.totalDuration())&&(n&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[o]&&this.vars[o].apply(this.vars[o+"Scope"]||this,this.vars[o+"Params"]||r)))},o.getActive=function(t,e,i){null==t&&(t=!0),null==e&&(e=!0),null==i&&(i=!1);var s,r,n=[],o=this.getChildren(t,e,i),h=0,l=o.length;for(s=0;l>s;s++)r=o[s],r._paused||r._timeline._time>=r._startTime&&r._timeline._time<r._startTime+r._totalDuration/r._timeScale&&(a(r._timeline)||(n[h++]=r));return n},o.getLabelAfter=function(t){t||0!==t&&(t=this._time);var e,i=this.getLabelsArray(),s=i.length;for(e=0;s>e;e++)if(i[e].time>t)return i[e].name;return null},o.getLabelBefore=function(t){null==t&&(t=this._time);for(var e=this.getLabelsArray(),i=e.length;--i>-1;)if(t>e[i].time)return e[i].name;return null},o.getLabelsArray=function(){var t,e=[],i=0;for(t in this._labels)e[i++]={time:this._labels[t],name:t};return e.sort(function(t,e){return t.time-e.time}),e},o.progress=function(t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},o.totalProgress=function(t){return arguments.length?this.totalTime(this.totalDuration()*t,!1):this._totalTime/this.totalDuration()},o.totalDuration=function(e){return arguments.length?-1===this._repeat?this:this.duration((e-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(t.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},o.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},o.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},o.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},o.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},o.currentLabel=function(t){return arguments.length?this.seek(t,!0):this.getLabelBefore(this._time+1e-8)},s},!0),function(){var t=180/Math.PI,e=Math.PI/180,i=[],s=[],r=[],n={},a=function(t,e,i,s){this.a=t,this.b=e,this.c=i,this.d=s,this.da=s-t,this.ca=i-t,this.ba=e-t},o=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",h=function(t,e,i,s){var r={a:t},n={},a={},o={c:s},h=(t+e)/2,l=(e+i)/2,_=(i+s)/2,u=(h+l)/2,p=(l+_)/2,f=(p-u)/8;return r.b=h+(t-h)/4,n.b=u+f,r.c=n.a=(r.b+n.b)/2,n.c=a.a=(u+p)/2,a.b=p-f,o.b=_+(s-_)/4,a.c=o.a=(a.b+o.b)/2,[r,n,a,o]},l=function(t,e,n,a,o){var l,_,u,p,f,c,m,d,g,v,y,T,w,x=t.length-1,b=0,P=t[0].a;for(l=0;x>l;l++)f=t[b],_=f.a,u=f.d,p=t[b+1].d,o?(y=i[l],T=s[l],w=.25*(T+y)*e/(a?.5:r[l]||.5),c=u-(u-_)*(a?.5*e:0!==y?w/y:0),m=u+(p-u)*(a?.5*e:0!==T?w/T:0),d=u-(c+((m-c)*(3*y/(y+T)+.5)/4||0))):(c=u-.5*(u-_)*e,m=u+.5*(p-u)*e,d=u-(c+m)/2),c+=d,m+=d,f.c=g=c,f.b=0!==l?P:P=f.a+.6*(f.c-f.a),f.da=u-_,f.ca=g-_,f.ba=P-_,n?(v=h(_,P,g,u),t.splice(b,1,v[0],v[1],v[2],v[3]),b+=4):b++,P=m;f=t[b],f.b=P,f.c=P+.4*(f.d-P),f.da=f.d-f.a,f.ca=f.c-f.a,f.ba=P-f.a,n&&(v=h(f.a,P,f.c,f.d),t.splice(b,1,v[0],v[1],v[2],v[3]))},_=function(t,e,r,n){var o,h,l,_,u,p,f=[];if(n)for(t=[n].concat(t),h=t.length;--h>-1;)"string"==typeof(p=t[h][e])&&"="===p.charAt(1)&&(t[h][e]=n[e]+Number(p.charAt(0)+p.substr(2)));if(o=t.length-2,0>o)return f[0]=new a(t[0][e],0,0,t[-1>o?0:1][e]),f;for(h=0;o>h;h++)l=t[h][e],_=t[h+1][e],f[h]=new a(l,0,0,_),r&&(u=t[h+2][e],i[h]=(i[h]||0)+(_-l)*(_-l),s[h]=(s[h]||0)+(u-_)*(u-_));return f[h]=new a(t[h][e],0,0,t[h+1][e]),f},u=function(t,e,a,h,u,p){var f,c,m,d,g,v,y,T,w={},x=[],b=p||t[0];u="string"==typeof u?","+u+",":o,null==e&&(e=1);for(c in t[0])x.push(c);if(t.length>1){for(T=t[t.length-1],y=!0,f=x.length;--f>-1;)if(c=x[f],Math.abs(b[c]-T[c])>.05){y=!1;break}y&&(t=t.concat(),p&&t.unshift(p),t.push(t[1]),p=t[t.length-3])}for(i.length=s.length=r.length=0,f=x.length;--f>-1;)c=x[f],n[c]=-1!==u.indexOf(","+c+","),w[c]=_(t,c,n[c],p);for(f=i.length;--f>-1;)i[f]=Math.sqrt(i[f]),s[f]=Math.sqrt(s[f]);if(!h){for(f=x.length;--f>-1;)if(n[c])for(m=w[x[f]],v=m.length-1,d=0;v>d;d++)g=m[d+1].da/s[d]+m[d].da/i[d],r[d]=(r[d]||0)+g*g;for(f=r.length;--f>-1;)r[f]=Math.sqrt(r[f])}for(f=x.length,d=a?4:1;--f>-1;)c=x[f],m=w[c],l(m,e,a,h,n[c]),y&&(m.splice(0,d),m.splice(m.length-d,d));return w},p=function(t,e,i){e=e||"soft";var s,r,n,o,h,l,_,u,p,f,c,m={},d="cubic"===e?3:2,g="soft"===e,v=[];if(g&&i&&(t=[i].concat(t)),null==t||d+1>t.length)throw"invalid Bezier data";for(p in t[0])v.push(p);for(l=v.length;--l>-1;){for(p=v[l],m[p]=h=[],f=0,u=t.length,_=0;u>_;_++)s=null==i?t[_][p]:"string"==typeof(c=t[_][p])&&"="===c.charAt(1)?i[p]+Number(c.charAt(0)+c.substr(2)):Number(c),g&&_>1&&u-1>_&&(h[f++]=(s+h[f-2])/2),h[f++]=s;for(u=f-d+1,f=0,_=0;u>_;_+=d)s=h[_],r=h[_+1],n=h[_+2],o=2===d?0:h[_+3],h[f++]=c=3===d?new a(s,r,n,o):new a(s,(2*r+s)/3,(2*r+n)/3,n);h.length=f}return m},f=function(t,e,i){for(var s,r,n,a,o,h,l,_,u,p,f,c=1/i,m=t.length;--m>-1;)for(p=t[m],n=p.a,a=p.d-n,o=p.c-n,h=p.b-n,s=r=0,_=1;i>=_;_++)l=c*_,u=1-l,s=r-(r=(l*l*a+3*u*(l*o+u*h))*l),f=m*i+_-1,e[f]=(e[f]||0)+s*s},c=function(t,e){e=e>>0||6;var i,s,r,n,a=[],o=[],h=0,l=0,_=e-1,u=[],p=[];for(i in t)f(t[i],a,e);for(r=a.length,s=0;r>s;s++)h+=Math.sqrt(a[s]),n=s%e,p[n]=h,n===_&&(l+=h,n=s/e>>0,u[n]=p,o[n]=l,h=0,p=[]);return{length:l,lengths:o,segments:u}},m=window._gsDefine.plugin({propName:"bezier",priority:-1,API:2,global:!0,init:function(t,e,i){this._target=t,e instanceof Array&&(e={values:e}),this._func={},this._round={},this._props=[],this._timeRes=null==e.timeResolution?6:parseInt(e.timeResolution,10);var s,r,n,a,o,h=e.values||[],l={},_=h[0],f=e.autoRotate||i.vars.orientToBezier;this._autoRotate=f?f instanceof Array?f:[["x","y","rotation",f===!0?0:Number(f)||0]]:null;for(s in _)this._props.push(s);for(n=this._props.length;--n>-1;)s=this._props[n],this._overwriteProps.push(s),r=this._func[s]="function"==typeof t[s],l[s]=r?t[s.indexOf("set")||"function"!=typeof t["get"+s.substr(3)]?s:"get"+s.substr(3)]():parseFloat(t[s]),o||l[s]!==h[0][s]&&(o=l);if(this._beziers="cubic"!==e.type&&"quadratic"!==e.type&&"soft"!==e.type?u(h,isNaN(e.curviness)?1:e.curviness,!1,"thruBasic"===e.type,e.correlate,o):p(h,e.type,l),this._segCount=this._beziers[s].length,this._timeRes){var m=c(this._beziers,this._timeRes);this._length=m.length,this._lengths=m.lengths,this._segments=m.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(f=this._autoRotate)for(f[0]instanceof Array||(this._autoRotate=f=[f]),n=f.length;--n>-1;)for(a=0;3>a;a++)s=f[n][a],this._func[s]="function"==typeof t[s]?t[s.indexOf("set")||"function"!=typeof t["get"+s.substr(3)]?s:"get"+s.substr(3)]:!1;return!0},set:function(e){var i,s,r,n,a,o,h,l,_,u,p=this._segCount,f=this._func,c=this._target;if(this._timeRes){if(_=this._lengths,u=this._curSeg,e*=this._length,r=this._li,e>this._l2&&p-1>r){for(l=p-1;l>r&&e>=(this._l2=_[++r]););this._l1=_[r-1],this._li=r,this._curSeg=u=this._segments[r],this._s2=u[this._s1=this._si=0]}else if(this._l1>e&&r>0){for(;r>0&&(this._l1=_[--r])>=e;);0===r&&this._l1>e?this._l1=0:r++,this._l2=_[r],this._li=r,this._curSeg=u=this._segments[r],this._s1=u[(this._si=u.length-1)-1]||0,this._s2=u[this._si]}if(i=r,e-=this._l1,r=this._si,e>this._s2&&u.length-1>r){for(l=u.length-1;l>r&&e>=(this._s2=u[++r]););this._s1=u[r-1],this._si=r}else if(this._s1>e&&r>0){for(;r>0&&(this._s1=u[--r])>=e;);0===r&&this._s1>e?this._s1=0:r++,this._s2=u[r],this._si=r}o=(r+(e-this._s1)/(this._s2-this._s1))*this._prec}else i=0>e?0:e>=1?p-1:p*e>>0,o=(e-i*(1/p))*p;for(s=1-o,r=this._props.length;--r>-1;)n=this._props[r],a=this._beziers[n][i],h=(o*o*a.da+3*s*(o*a.ca+s*a.ba))*o+a.a,this._round[n]&&(h=h+(h>0?.5:-.5)>>0),f[n]?c[n](h):c[n]=h;if(this._autoRotate){var m,d,g,v,y,T,w,x=this._autoRotate;for(r=x.length;--r>-1;)n=x[r][2],T=x[r][3]||0,w=x[r][4]===!0?1:t,a=this._beziers[x[r][0]],m=this._beziers[x[r][1]],a&&m&&(a=a[i],m=m[i],d=a.a+(a.b-a.a)*o,v=a.b+(a.c-a.b)*o,d+=(v-d)*o,v+=(a.c+(a.d-a.c)*o-v)*o,g=m.a+(m.b-m.a)*o,y=m.b+(m.c-m.b)*o,g+=(y-g)*o,y+=(m.c+(m.d-m.c)*o-y)*o,h=Math.atan2(y-g,v-d)*w+T,f[n]?c[n](h):c[n]=h)}}}),d=m.prototype;m.bezierThrough=u,m.cubicToQuadratic=h,m._autoCSS=!0,m.quadraticToCubic=function(t,e,i){return new a(t,(2*e+t)/3,(2*e+i)/3,i)},m._cssRegister=function(){var t=window._gsDefine.globals.CSSPlugin;if(t){var i=t._internals,s=i._parseToProxy,r=i._setPluginRatio,n=i.CSSPropTween;i._registerComplexSpecialProp("bezier",{parser:function(t,i,a,o,h,l){i instanceof Array&&(i={values:i}),l=new m;var _,u,p,f=i.values,c=f.length-1,d=[],g={};if(0>c)return h;for(_=0;c>=_;_++)p=s(t,f[_],o,h,l,c!==_),d[_]=p.end;for(u in i)g[u]=i[u];return g.values=d,h=new n(t,"bezier",0,0,p.pt,2),h.data=p,h.plugin=l,h.setRatio=r,0===g.autoRotate&&(g.autoRotate=!0),!g.autoRotate||g.autoRotate instanceof Array||(_=g.autoRotate===!0?0:Number(g.autoRotate)*e,g.autoRotate=null!=p.end.left?[["left","top","rotation",_,!0]]:null!=p.end.x?[["x","y","rotation",_,!0]]:!1),g.autoRotate&&(o._transform||o._enableTransforms(!1),p.autoRotate=o._target._gsTransform),l._onInitTween(p.proxy,g,o._tween),h
}})}},d._roundProps=function(t,e){for(var i=this._overwriteProps,s=i.length;--s>-1;)(t[i[s]]||t.bezier||t.bezierThrough)&&(this._round[i[s]]=e)},d._kill=function(t){var e,i,s=this._props;for(e in this._beziers)if(e in t)for(delete this._beziers[e],delete this._func[e],i=s.length;--i>-1;)s[i]===e&&s.splice(i,1);return this._super._kill.call(this,t)}}(),window._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(t,e){var i,s,r,n,a=function(){t.call(this,"css"),this._overwriteProps.length=0,this.setRatio=a.prototype.setRatio},o={},h=a.prototype=new t("css");h.constructor=a,a.version="1.10.3",a.API=2,a.defaultTransformPerspective=0,h="px",a.suffixMap={top:h,right:h,bottom:h,left:h,width:h,height:h,fontSize:h,padding:h,margin:h,perspective:h};var l,_,u,p,f,c,m=/(?:\d|\-\d|\.\d|\-\.\d)+/g,d=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,g=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,v=/[^\d\-\.]/g,y=/(?:\d|\-|\+|=|#|\.)*/g,T=/opacity *= *([^)]*)/,w=/opacity:([^;]*)/,x=/alpha\(opacity *=.+?\)/i,b=/^(rgb|hsl)/,P=/([A-Z])/g,k=/-([a-z])/gi,S=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,R=function(t,e){return e.toUpperCase()},A=/(?:Left|Right|Width)/i,C=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,O=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,D=/,(?=[^\)]*(?:\(|$))/gi,M=Math.PI/180,I=180/Math.PI,F={},E=document,N=E.createElement("div"),L=E.createElement("img"),X=a._internals={_specialProps:o},z=navigator.userAgent,U=function(){var t,e=z.indexOf("Android"),i=E.createElement("div");return u=-1!==z.indexOf("Safari")&&-1===z.indexOf("Chrome")&&(-1===e||Number(z.substr(e+8,1))>3),f=u&&6>Number(z.substr(z.indexOf("Version/")+8,1)),p=-1!==z.indexOf("Firefox"),/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(z),c=parseFloat(RegExp.$1),i.innerHTML="<a style='top:1px;opacity:.55;'>a</a>",t=i.getElementsByTagName("a")[0],t?/^0.55/.test(t.style.opacity):!1}(),Y=function(t){return T.test("string"==typeof t?t:(t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100:1},j=function(t){window.console&&console.log(t)},B="",q="",V=function(t,e){e=e||N;var i,s,r=e.style;if(void 0!==r[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),i=["O","Moz","ms","Ms","Webkit"],s=5;--s>-1&&void 0===r[i[s]+t];);return s>=0?(q=3===s?"ms":i[s],B="-"+q.toLowerCase()+"-",q+t):null},Z=E.defaultView?E.defaultView.getComputedStyle:function(){},G=a.getStyle=function(t,e,i,s,r){var n;return U||"opacity"!==e?(!s&&t.style[e]?n=t.style[e]:(i=i||Z(t,null))?(t=i.getPropertyValue(e.replace(P,"-$1").toLowerCase()),n=t||i.length?t:i[e]):t.currentStyle&&(n=t.currentStyle[e]),null==r||n&&"none"!==n&&"auto"!==n&&"auto auto"!==n?n:r):Y(t)},$=function(t,e,i,s,r){if("px"===s||!s)return i;if("auto"===s||!i)return 0;var n,a=A.test(e),o=t,h=N.style,l=0>i;return l&&(i=-i),"%"===s&&-1!==e.indexOf("border")?n=i/100*(a?t.clientWidth:t.clientHeight):(h.cssText="border-style:solid;border-width:0;position:absolute;line-height:0;","%"!==s&&o.appendChild?h[a?"borderLeftWidth":"borderTopWidth"]=i+s:(o=t.parentNode||E.body,h[a?"width":"height"]=i+s),o.appendChild(N),n=parseFloat(N[a?"offsetWidth":"offsetHeight"]),o.removeChild(N),0!==n||r||(n=$(t,e,i,s,!0))),l?-n:n},Q=function(t,e,i){if("absolute"!==G(t,"position",i))return 0;var s="left"===e?"Left":"Top",r=G(t,"margin"+s,i);return t["offset"+s]-($(t,e,parseFloat(r),r.replace(y,""))||0)},W=function(t,e){var i,s,r={};if(e=e||Z(t,null))if(i=e.length)for(;--i>-1;)r[e[i].replace(k,R)]=e.getPropertyValue(e[i]);else for(i in e)r[i]=e[i];else if(e=t.currentStyle||t.style)for(i in e)r[i.replace(k,R)]=e[i];return U||(r.opacity=Y(t)),s=be(t,e,!1),r.rotation=s.rotation*I,r.skewX=s.skewX*I,r.scaleX=s.scaleX,r.scaleY=s.scaleY,r.x=s.x,r.y=s.y,xe&&(r.z=s.z,r.rotationX=s.rotationX*I,r.rotationY=s.rotationY*I,r.scaleZ=s.scaleZ),r.filters&&delete r.filters,r},H=function(t,e,i,s,r){var n,a,o,h={},l=t.style;for(a in i)"cssText"!==a&&"length"!==a&&isNaN(a)&&(e[a]!==(n=i[a])||r&&r[a])&&-1===a.indexOf("Origin")&&("number"==typeof n||"string"==typeof n)&&(h[a]="auto"!==n||"left"!==a&&"top"!==a?""!==n&&"auto"!==n&&"none"!==n||"string"!=typeof e[a]||""===e[a].replace(v,"")?n:0:Q(t,a),void 0!==l[a]&&(o=new ue(l,a,l[a],o)));if(s)for(a in s)"className"!==a&&(h[a]=s[a]);return{difs:h,firstMPT:o}},K={width:["Left","Right"],height:["Top","Bottom"]},J=["marginLeft","marginRight","marginTop","marginBottom"],te=function(t,e,i){var s=parseFloat("width"===e?t.offsetWidth:t.offsetHeight),r=K[e],n=r.length;for(i=i||Z(t,null);--n>-1;)s-=parseFloat(G(t,"padding"+r[n],i,!0))||0,s-=parseFloat(G(t,"border"+r[n]+"Width",i,!0))||0;return s},ee=function(t,e){(null==t||""===t||"auto"===t||"auto auto"===t)&&(t="0 0");var i=t.split(" "),s=-1!==t.indexOf("left")?"0%":-1!==t.indexOf("right")?"100%":i[0],r=-1!==t.indexOf("top")?"0%":-1!==t.indexOf("bottom")?"100%":i[1];return null==r?r="0":"center"===r&&(r="50%"),("center"===s||isNaN(parseFloat(s))&&-1===(s+"").indexOf("="))&&(s="50%"),e&&(e.oxp=-1!==s.indexOf("%"),e.oyp=-1!==r.indexOf("%"),e.oxr="="===s.charAt(1),e.oyr="="===r.charAt(1),e.ox=parseFloat(s.replace(v,"")),e.oy=parseFloat(r.replace(v,""))),s+" "+r+(i.length>2?" "+i[2]:"")},ie=function(t,e){return"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2)):parseFloat(t)-parseFloat(e)},se=function(t,e){return null==t?e:"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*Number(t.substr(2))+e:parseFloat(t)},re=function(t,e,i,s){var r,n,a,o,h=1e-6;return null==t?o=e:"number"==typeof t?o=t*M:(r=2*Math.PI,n=t.split("_"),a=Number(n[0].replace(v,""))*(-1===t.indexOf("rad")?M:1)-("="===t.charAt(1)?0:e),n.length&&(s&&(s[i]=e+a),-1!==t.indexOf("short")&&(a%=r,a!==a%(r/2)&&(a=0>a?a+r:a-r)),-1!==t.indexOf("_cw")&&0>a?a=(a+9999999999*r)%r-(0|a/r)*r:-1!==t.indexOf("ccw")&&a>0&&(a=(a-9999999999*r)%r-(0|a/r)*r)),o=e+a),h>o&&o>-h&&(o=0),o},ne={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},ae=function(t,e,i){return t=0>t?t+1:t>1?t-1:t,0|255*(1>6*t?e+6*(i-e)*t:.5>t?i:2>3*t?e+6*(i-e)*(2/3-t):e)+.5},oe=function(t){var e,i,s,r,n,a;return t&&""!==t?"number"==typeof t?[t>>16,255&t>>8,255&t]:(","===t.charAt(t.length-1)&&(t=t.substr(0,t.length-1)),ne[t]?ne[t]:"#"===t.charAt(0)?(4===t.length&&(e=t.charAt(1),i=t.charAt(2),s=t.charAt(3),t="#"+e+e+i+i+s+s),t=parseInt(t.substr(1),16),[t>>16,255&t>>8,255&t]):"hsl"===t.substr(0,3)?(t=t.match(m),r=Number(t[0])%360/360,n=Number(t[1])/100,a=Number(t[2])/100,i=.5>=a?a*(n+1):a+n-a*n,e=2*a-i,t.length>3&&(t[3]=Number(t[3])),t[0]=ae(r+1/3,e,i),t[1]=ae(r,e,i),t[2]=ae(r-1/3,e,i),t):(t=t.match(m)||ne.transparent,t[0]=Number(t[0]),t[1]=Number(t[1]),t[2]=Number(t[2]),t.length>3&&(t[3]=Number(t[3])),t)):ne.black},he="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(h in ne)he+="|"+h+"\\b";he=RegExp(he+")","gi");var le=function(t,e,i,s){if(null==t)return function(t){return t};var r,n=e?(t.match(he)||[""])[0]:"",a=t.split(n).join("").match(g)||[],o=t.substr(0,t.indexOf(a[0])),h=")"===t.charAt(t.length-1)?")":"",l=-1!==t.indexOf(" ")?" ":",",_=a.length,u=_>0?a[0].replace(m,""):"";return _?r=e?function(t){var e,p,f,c;if("number"==typeof t)t+=u;else if(s&&D.test(t)){for(c=t.replace(D,"|").split("|"),f=0;c.length>f;f++)c[f]=r(c[f]);return c.join(",")}if(e=(t.match(he)||[n])[0],p=t.split(e).join("").match(g)||[],f=p.length,_>f--)for(;_>++f;)p[f]=i?p[0|(f-1)/2]:a[f];return o+p.join(l)+l+e+h+(-1!==t.indexOf("inset")?" inset":"")}:function(t){var e,n,p;if("number"==typeof t)t+=u;else if(s&&D.test(t)){for(n=t.replace(D,"|").split("|"),p=0;n.length>p;p++)n[p]=r(n[p]);return n.join(",")}if(e=t.match(g)||[],p=e.length,_>p--)for(;_>++p;)e[p]=i?e[0|(p-1)/2]:a[p];return o+e.join(l)+h}:function(t){return t}},_e=function(t){return t=t.split(","),function(e,i,s,r,n,a,o){var h,l=(i+"").split(" ");for(o={},h=0;4>h;h++)o[t[h]]=l[h]=l[h]||l[(h-1)/2>>0];return r.parse(e,o,n,a)}},ue=(X._setPluginRatio=function(t){this.plugin.setRatio(t);for(var e,i,s,r,n=this.data,a=n.proxy,o=n.firstMPT,h=1e-6;o;)e=a[o.v],o.r?e=e>0?0|e+.5:0|e-.5:h>e&&e>-h&&(e=0),o.t[o.p]=e,o=o._next;if(n.autoRotate&&(n.autoRotate.rotation=a.rotation),1===t)for(o=n.firstMPT;o;){if(i=o.t,i.type){if(1===i.type){for(r=i.xs0+i.s+i.xs1,s=1;i.l>s;s++)r+=i["xn"+s]+i["xs"+(s+1)];i.e=r}}else i.e=i.s+i.xs0;o=o._next}},function(t,e,i,s,r){this.t=t,this.p=e,this.v=i,this.r=r,s&&(s._prev=this,this._next=s)}),pe=(X._parseToProxy=function(t,e,i,s,r,n){var a,o,h,l,_,u=s,p={},f={},c=i._transform,m=F;for(i._transform=null,F=e,s=_=i.parse(t,e,s,r),F=m,n&&(i._transform=c,u&&(u._prev=null,u._prev&&(u._prev._next=null)));s&&s!==u;){if(1>=s.type&&(o=s.p,f[o]=s.s+s.c,p[o]=s.s,n||(l=new ue(s,"s",o,l,s.r),s.c=0),1===s.type))for(a=s.l;--a>0;)h="xn"+a,o=s.p+"_"+h,f[o]=s.data[h],p[o]=s[h],n||(l=new ue(s,h,o,l,s.rxp[h]));s=s._next}return{proxy:p,end:f,firstMPT:l,pt:_}},X.CSSPropTween=function(t,e,s,r,a,o,h,l,_,u,p){this.t=t,this.p=e,this.s=s,this.c=r,this.n=h||e,t instanceof pe||n.push(this.n),this.r=l,this.type=o||0,_&&(this.pr=_,i=!0),this.b=void 0===u?s:u,this.e=void 0===p?s+r:p,a&&(this._next=a,a._prev=this)}),fe=a.parseComplex=function(t,e,i,s,r,n,a,o,h,_){i=i||n||"",a=new pe(t,e,0,0,a,_?2:1,null,!1,o,i,s),s+="";var u,p,f,c,g,v,y,T,w,x,P,k,S=i.split(", ").join(",").split(" "),R=s.split(", ").join(",").split(" "),A=S.length,C=l!==!1;for((-1!==s.indexOf(",")||-1!==i.indexOf(","))&&(S=S.join(" ").replace(D,", ").split(" "),R=R.join(" ").replace(D,", ").split(" "),A=S.length),A!==R.length&&(S=(n||"").split(" "),A=S.length),a.plugin=h,a.setRatio=_,u=0;A>u;u++)if(c=S[u],g=R[u],T=parseFloat(c),T||0===T)a.appendXtra("",T,ie(g,T),g.replace(d,""),C&&-1!==g.indexOf("px"),!0);else if(r&&("#"===c.charAt(0)||ne[c]||b.test(c)))k=","===g.charAt(g.length-1)?"),":")",c=oe(c),g=oe(g),w=c.length+g.length>6,w&&!U&&0===g[3]?(a["xs"+a.l]+=a.l?" transparent":"transparent",a.e=a.e.split(R[u]).join("transparent")):(U||(w=!1),a.appendXtra(w?"rgba(":"rgb(",c[0],g[0]-c[0],",",!0,!0).appendXtra("",c[1],g[1]-c[1],",",!0).appendXtra("",c[2],g[2]-c[2],w?",":k,!0),w&&(c=4>c.length?1:c[3],a.appendXtra("",c,(4>g.length?1:g[3])-c,k,!1)));else if(v=c.match(m)){if(y=g.match(d),!y||y.length!==v.length)return a;for(f=0,p=0;v.length>p;p++)P=v[p],x=c.indexOf(P,f),a.appendXtra(c.substr(f,x-f),Number(P),ie(y[p],P),"",C&&"px"===c.substr(x+P.length,2),0===p),f=x+P.length;a["xs"+a.l]+=c.substr(f)}else a["xs"+a.l]+=a.l?" "+c:c;if(-1!==s.indexOf("=")&&a.data){for(k=a.xs0+a.data.s,u=1;a.l>u;u++)k+=a["xs"+u]+a.data["xn"+u];a.e=k+a["xs"+u]}return a.l||(a.type=-1,a.xs0=a.e),a.xfirst||a},ce=9;for(h=pe.prototype,h.l=h.pr=0;--ce>0;)h["xn"+ce]=0,h["xs"+ce]="";h.xs0="",h._next=h._prev=h.xfirst=h.data=h.plugin=h.setRatio=h.rxp=null,h.appendXtra=function(t,e,i,s,r,n){var a=this,o=a.l;return a["xs"+o]+=n&&o?" "+t:t||"",i||0===o||a.plugin?(a.l++,a.type=a.setRatio?2:1,a["xs"+a.l]=s||"",o>0?(a.data["xn"+o]=e+i,a.rxp["xn"+o]=r,a["xn"+o]=e,a.plugin||(a.xfirst=new pe(a,"xn"+o,e,i,a.xfirst||a,0,a.n,r,a.pr),a.xfirst.xs0=0),a):(a.data={s:e+i},a.rxp={},a.s=e,a.c=i,a.r=r,a)):(a["xs"+o]+=e+(s||""),a)};var me=function(t,e){e=e||{},this.p=e.prefix?V(t)||t:t,o[t]=o[this.p]=this,this.format=e.formatter||le(e.defaultValue,e.color,e.collapsible,e.multi),e.parser&&(this.parse=e.parser),this.clrs=e.color,this.multi=e.multi,this.keyword=e.keyword,this.dflt=e.defaultValue,this.pr=e.priority||0},de=X._registerComplexSpecialProp=function(t,e,i){"object"!=typeof e&&(e={parser:i});var s,r,n=t.split(","),a=e.defaultValue;for(i=i||[a],s=0;n.length>s;s++)e.prefix=0===s&&e.prefix,e.defaultValue=i[s]||a,r=new me(n[s],e)},ge=function(t){if(!o[t]){var e=t.charAt(0).toUpperCase()+t.substr(1)+"Plugin";de(t,{parser:function(t,i,s,r,n,a,h){var l=(window.GreenSockGlobals||window).com.greensock.plugins[e];return l?(l._cssRegister(),o[s].parse(t,i,s,r,n,a,h)):(j("Error: "+e+" js file not loaded."),n)}})}};h=me.prototype,h.parseComplex=function(t,e,i,s,r,n){var a,o,h,l,_,u,p=this.keyword;if(this.multi&&(D.test(i)||D.test(e)?(o=e.replace(D,"|").split("|"),h=i.replace(D,"|").split("|")):p&&(o=[e],h=[i])),h){for(l=h.length>o.length?h.length:o.length,a=0;l>a;a++)e=o[a]=o[a]||this.dflt,i=h[a]=h[a]||this.dflt,p&&(_=e.indexOf(p),u=i.indexOf(p),_!==u&&(i=-1===u?h:o,i[a]+=" "+p));e=o.join(", "),i=h.join(", ")}return fe(t,this.p,e,i,this.clrs,this.dflt,s,this.pr,r,n)},h.parse=function(t,e,i,s,n,a){return this.parseComplex(t.style,this.format(G(t,this.p,r,!1,this.dflt)),this.format(e),n,a)},a.registerSpecialProp=function(t,e,i){de(t,{parser:function(t,s,r,n,a,o){var h=new pe(t,r,0,0,a,2,r,!1,i);return h.plugin=o,h.setRatio=e(t,s,n._tween,r),h},priority:i})};var ve="scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","),ye=V("transform"),Te=B+"transform",we=V("transformOrigin"),xe=null!==V("perspective"),be=function(t,e,i,s){if(t._gsTransform&&i&&!s)return t._gsTransform;var r,n,o,h,l,_,u,p,f,c,m,d,g,v=i?t._gsTransform||{skewY:0}:{skewY:0},y=0>v.scaleX,T=2e-5,w=1e5,x=-Math.PI+1e-4,b=Math.PI-1e-4,P=xe?parseFloat(G(t,we,e,!1,"0 0 0").split(" ")[2])||v.zOrigin||0:0;for(ye?r=G(t,Te,e,!0):t.currentStyle&&(r=t.currentStyle.filter.match(C),r=r&&4===r.length?[r[0].substr(4),Number(r[2].substr(4)),Number(r[1].substr(4)),r[3].substr(4),v.x||0,v.y||0].join(","):""),n=(r||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],o=n.length;--o>-1;)h=Number(n[o]),n[o]=(l=h-(h|=0))?(0|l*w+(0>l?-.5:.5))/w+h:h;if(16===n.length){var k=n[8],S=n[9],R=n[10],A=n[12],O=n[13],D=n[14];if(v.zOrigin&&(D=-v.zOrigin,A=k*D-n[12],O=S*D-n[13],D=R*D+v.zOrigin-n[14]),!i||s||null==v.rotationX){var M,I,F,E,N,L,X,z=n[0],U=n[1],Y=n[2],j=n[3],B=n[4],q=n[5],V=n[6],Z=n[7],$=n[11],Q=v.rotationX=Math.atan2(V,R),W=x>Q||Q>b;Q&&(E=Math.cos(-Q),N=Math.sin(-Q),M=B*E+k*N,I=q*E+S*N,F=V*E+R*N,k=B*-N+k*E,S=q*-N+S*E,R=V*-N+R*E,$=Z*-N+$*E,B=M,q=I,V=F),Q=v.rotationY=Math.atan2(k,z),Q&&(L=x>Q||Q>b,E=Math.cos(-Q),N=Math.sin(-Q),M=z*E-k*N,I=U*E-S*N,F=Y*E-R*N,S=U*N+S*E,R=Y*N+R*E,$=j*N+$*E,z=M,U=I,Y=F),Q=v.rotation=Math.atan2(U,q),Q&&(X=x>Q||Q>b,E=Math.cos(-Q),N=Math.sin(-Q),z=z*E+B*N,I=U*E+q*N,q=U*-N+q*E,V=Y*-N+V*E,U=I),X&&W?v.rotation=v.rotationX=0:X&&L?v.rotation=v.rotationY=0:L&&W&&(v.rotationY=v.rotationX=0),v.scaleX=(0|Math.sqrt(z*z+U*U)*w+.5)/w,v.scaleY=(0|Math.sqrt(q*q+S*S)*w+.5)/w,v.scaleZ=(0|Math.sqrt(V*V+R*R)*w+.5)/w,v.skewX=0,v.perspective=$?1/(0>$?-$:$):0,v.x=A,v.y=O,v.z=D}}else if(!(xe&&!s&&n.length&&v.x===n[4]&&v.y===n[5]&&(v.rotationX||v.rotationY)||void 0!==v.x&&"none"===G(t,"display",e))){var H=n.length>=6,K=H?n[0]:1,J=n[1]||0,te=n[2]||0,ee=H?n[3]:1;v.x=n[4]||0,v.y=n[5]||0,_=Math.sqrt(K*K+J*J),u=Math.sqrt(ee*ee+te*te),p=K||J?Math.atan2(J,K):v.rotation||0,f=te||ee?Math.atan2(te,ee)+p:v.skewX||0,c=_-Math.abs(v.scaleX||0),m=u-Math.abs(v.scaleY||0),Math.abs(f)>Math.PI/2&&Math.abs(f)<1.5*Math.PI&&(y?(_*=-1,f+=0>=p?Math.PI:-Math.PI,p+=0>=p?Math.PI:-Math.PI):(u*=-1,f+=0>=f?Math.PI:-Math.PI)),d=(p-v.rotation)%Math.PI,g=(f-v.skewX)%Math.PI,(void 0===v.skewX||c>T||-T>c||m>T||-T>m||d>x&&b>d&&false|d*w||g>x&&b>g&&false|g*w)&&(v.scaleX=_,v.scaleY=u,v.rotation=p,v.skewX=f),xe&&(v.rotationX=v.rotationY=v.z=0,v.perspective=parseFloat(a.defaultTransformPerspective)||0,v.scaleZ=1)}v.zOrigin=P;for(o in v)T>v[o]&&v[o]>-T&&(v[o]=0);return i&&(t._gsTransform=v),v},Pe=function(t){var e,i,s=this.data,r=-s.rotation,n=r+s.skewX,a=1e5,o=(0|Math.cos(r)*s.scaleX*a)/a,h=(0|Math.sin(r)*s.scaleX*a)/a,l=(0|Math.sin(n)*-s.scaleY*a)/a,_=(0|Math.cos(n)*s.scaleY*a)/a,u=this.t.style,p=this.t.currentStyle;if(p){i=h,h=-l,l=-i,e=p.filter,u.filter="";var f,m,d=this.t.offsetWidth,g=this.t.offsetHeight,v="absolute"!==p.position,w="progid:DXImageTransform.Microsoft.Matrix(M11="+o+", M12="+h+", M21="+l+", M22="+_,x=s.x,b=s.y;if(null!=s.ox&&(f=(s.oxp?.01*d*s.ox:s.ox)-d/2,m=(s.oyp?.01*g*s.oy:s.oy)-g/2,x+=f-(f*o+m*h),b+=m-(f*l+m*_)),v?(f=d/2,m=g/2,w+=", Dx="+(f-(f*o+m*h)+x)+", Dy="+(m-(f*l+m*_)+b)+")"):w+=", sizingMethod='auto expand')",u.filter=-1!==e.indexOf("DXImageTransform.Microsoft.Matrix(")?e.replace(O,w):w+" "+e,(0===t||1===t)&&1===o&&0===h&&0===l&&1===_&&(v&&-1===w.indexOf("Dx=0, Dy=0")||T.test(e)&&100!==parseFloat(RegExp.$1)||-1===e.indexOf("gradient("&&e.indexOf("Alpha"))&&u.removeAttribute("filter")),!v){var P,k,S,R=8>c?1:-1;for(f=s.ieOffsetX||0,m=s.ieOffsetY||0,s.ieOffsetX=Math.round((d-((0>o?-o:o)*d+(0>h?-h:h)*g))/2+x),s.ieOffsetY=Math.round((g-((0>_?-_:_)*g+(0>l?-l:l)*d))/2+b),ce=0;4>ce;ce++)k=J[ce],P=p[k],i=-1!==P.indexOf("px")?parseFloat(P):$(this.t,k,parseFloat(P),P.replace(y,""))||0,S=i!==s[k]?2>ce?-s.ieOffsetX:-s.ieOffsetY:2>ce?f-s.ieOffsetX:m-s.ieOffsetY,u[k]=(s[k]=Math.round(i-S*(0===ce||2===ce?1:R)))+"px"}}},ke=function(){var t,e,i,s,r,n,a,o,h,l,_,u,f,c,m,d,g,v,y,T,w,x,b,P,k,S,R=this.data,A=this.t.style,C=R.rotation,O=R.scaleX,D=R.scaleY,M=R.scaleZ,I=R.perspective;if(p&&(P=A.top?"top":A.bottom?"bottom":parseFloat(G(this.t,"top",null,!1))?"bottom":"top",T=G(this.t,P,null,!1),k=parseFloat(T)||0,S=T.substr((k+"").length)||"px",R._ffFix=!R._ffFix,A[P]=(R._ffFix?k+.05:k-.05)+S),C||R.skewX)v=Math.cos(C),y=Math.sin(C),t=v,r=y,R.skewX&&(C-=R.skewX,v=Math.cos(C),y=Math.sin(C)),e=-y,n=v;else{if(!(R.rotationY||R.rotationX||1!==M||I))return A[ye]="translate3d("+R.x+"px,"+R.y+"px,"+R.z+"px)"+(1!==O||1!==D?" scale("+O+","+D+")":""),void 0;t=n=1,e=r=0}_=1,i=s=a=o=h=l=u=f=c=0,m=I?-1/I:0,d=R.zOrigin,g=1e5,C=R.rotationY,C&&(v=Math.cos(C),y=Math.sin(C),h=_*-y,f=m*-y,i=t*y,a=r*y,_*=v,m*=v,t*=v,r*=v),C=R.rotationX,C&&(v=Math.cos(C),y=Math.sin(C),T=e*v+i*y,w=n*v+a*y,x=l*v+_*y,b=c*v+m*y,i=e*-y+i*v,a=n*-y+a*v,_=l*-y+_*v,m=c*-y+m*v,e=T,n=w,l=x,c=b),1!==M&&(i*=M,a*=M,_*=M,m*=M),1!==D&&(e*=D,n*=D,l*=D,c*=D),1!==O&&(t*=O,r*=O,h*=O,f*=O),d&&(u-=d,s=i*u,o=a*u,u=_*u+d),s=(T=(s+=R.x)-(s|=0))?(0|T*g+(0>T?-.5:.5))/g+s:s,o=(T=(o+=R.y)-(o|=0))?(0|T*g+(0>T?-.5:.5))/g+o:o,u=(T=(u+=R.z)-(u|=0))?(0|T*g+(0>T?-.5:.5))/g+u:u,A[ye]="matrix3d("+[(0|t*g)/g,(0|r*g)/g,(0|h*g)/g,(0|f*g)/g,(0|e*g)/g,(0|n*g)/g,(0|l*g)/g,(0|c*g)/g,(0|i*g)/g,(0|a*g)/g,(0|_*g)/g,(0|m*g)/g,s,o,u,I?1+-u/I:1].join(",")+")"},Se=function(){var t,e,i,s,r,n,a,o,h,l=this.data,_=this.t,u=_.style;p&&(t=u.top?"top":u.bottom?"bottom":parseFloat(G(_,"top",null,!1))?"bottom":"top",e=G(_,t,null,!1),i=parseFloat(e)||0,s=e.substr((i+"").length)||"px",l._ffFix=!l._ffFix,u[t]=(l._ffFix?i+.05:i-.05)+s),l.rotation||l.skewX?(r=l.rotation,n=r-l.skewX,a=1e5,o=l.scaleX*a,h=l.scaleY*a,u[ye]="matrix("+(0|Math.cos(r)*o)/a+","+(0|Math.sin(r)*o)/a+","+(0|Math.sin(n)*-h)/a+","+(0|Math.cos(n)*h)/a+","+l.x+","+l.y+")"):u[ye]="matrix("+l.scaleX+",0,0,"+l.scaleY+","+l.x+","+l.y+")"};de("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D",{parser:function(t,e,i,s,n,a,o){if(s._transform)return n;var h,l,_,u,p,f,c,m=s._transform=be(t,r,!0,o.parseTransform),d=t.style,g=1e-6,v=ve.length,y=o,T={};if("string"==typeof y.transform&&ye)_=d.cssText,d[ye]=y.transform,d.display="block",h=be(t,null,!1),d.cssText=_;else if("object"==typeof y){if(h={scaleX:se(null!=y.scaleX?y.scaleX:y.scale,m.scaleX),scaleY:se(null!=y.scaleY?y.scaleY:y.scale,m.scaleY),scaleZ:se(null!=y.scaleZ?y.scaleZ:y.scale,m.scaleZ),x:se(y.x,m.x),y:se(y.y,m.y),z:se(y.z,m.z),perspective:se(y.transformPerspective,m.perspective)},c=y.directionalRotation,null!=c)if("object"==typeof c)for(_ in c)y[_]=c[_];else y.rotation=c;h.rotation=re("rotation"in y?y.rotation:"shortRotation"in y?y.shortRotation+"_short":"rotationZ"in y?y.rotationZ:m.rotation*I,m.rotation,"rotation",T),xe&&(h.rotationX=re("rotationX"in y?y.rotationX:"shortRotationX"in y?y.shortRotationX+"_short":m.rotationX*I||0,m.rotationX,"rotationX",T),h.rotationY=re("rotationY"in y?y.rotationY:"shortRotationY"in y?y.shortRotationY+"_short":m.rotationY*I||0,m.rotationY,"rotationY",T)),h.skewX=null==y.skewX?m.skewX:re(y.skewX,m.skewX),h.skewY=null==y.skewY?m.skewY:re(y.skewY,m.skewY),(l=h.skewY-m.skewY)&&(h.skewX+=l,h.rotation+=l)}for(null!=y.force3D&&(m.force3D=y.force3D,f=!0),p=m.force3D||m.z||m.rotationX||m.rotationY||h.z||h.rotationX||h.rotationY||h.perspective,p||null==y.scale||(h.scaleZ=1);--v>-1;)i=ve[v],u=h[i]-m[i],(u>g||-g>u||null!=F[i])&&(f=!0,n=new pe(m,i,m[i],u,n),i in T&&(n.e=T[i]),n.xs0=0,n.plugin=a,s._overwriteProps.push(n.n));return u=y.transformOrigin,(u||xe&&p&&m.zOrigin)&&(ye?(f=!0,i=we,u=(u||G(t,i,r,!1,"50% 50%"))+"",n=new pe(d,i,0,0,n,-1,"transformOrigin"),n.b=d[i],n.plugin=a,xe?(_=m.zOrigin,u=u.split(" "),m.zOrigin=(u.length>2&&(0===_||"0px"!==u[2])?parseFloat(u[2]):_)||0,n.xs0=n.e=d[i]=u[0]+" "+(u[1]||"50%")+" 0px",n=new pe(m,"zOrigin",0,0,n,-1,n.n),n.b=_,n.xs0=n.e=m.zOrigin):n.xs0=n.e=d[i]=u):ee(u+"",m)),f&&(s._transformType=p||3===this._transformType?3:2),n},prefix:!0}),de("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),de("borderRadius",{defaultValue:"0px",parser:function(t,e,i,n,a){e=this.format(e);var o,h,l,_,u,p,f,c,m,d,g,v,y,T,w,x,b=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],P=t.style;for(m=parseFloat(t.offsetWidth),d=parseFloat(t.offsetHeight),o=e.split(" "),h=0;b.length>h;h++)this.p.indexOf("border")&&(b[h]=V(b[h])),u=_=G(t,b[h],r,!1,"0px"),-1!==u.indexOf(" ")&&(_=u.split(" "),u=_[0],_=_[1]),p=l=o[h],f=parseFloat(u),v=u.substr((f+"").length),y="="===p.charAt(1),y?(c=parseInt(p.charAt(0)+"1",10),p=p.substr(2),c*=parseFloat(p),g=p.substr((c+"").length-(0>c?1:0))||""):(c=parseFloat(p),g=p.substr((c+"").length)),""===g&&(g=s[i]||v),g!==v&&(T=$(t,"borderLeft",f,v),w=$(t,"borderTop",f,v),"%"===g?(u=100*(T/m)+"%",_=100*(w/d)+"%"):"em"===g?(x=$(t,"borderLeft",1,"em"),u=T/x+"em",_=w/x+"em"):(u=T+"px",_=w+"px"),y&&(p=parseFloat(u)+c+g,l=parseFloat(_)+c+g)),a=fe(P,b[h],u+" "+_,p+" "+l,!1,"0px",a);return a},prefix:!0,formatter:le("0px 0px 0px 0px",!1,!0)}),de("backgroundPosition",{defaultValue:"0 0",parser:function(t,e,i,s,n,a){var o,h,l,_,u,p,f="background-position",m=r||Z(t,null),d=this.format((m?c?m.getPropertyValue(f+"-x")+" "+m.getPropertyValue(f+"-y"):m.getPropertyValue(f):t.currentStyle.backgroundPositionX+" "+t.currentStyle.backgroundPositionY)||"0 0"),g=this.format(e);if(-1!==d.indexOf("%")!=(-1!==g.indexOf("%"))&&(p=G(t,"backgroundImage").replace(S,""),p&&"none"!==p)){for(o=d.split(" "),h=g.split(" "),L.setAttribute("src",p),l=2;--l>-1;)d=o[l],_=-1!==d.indexOf("%"),_!==(-1!==h[l].indexOf("%"))&&(u=0===l?t.offsetWidth-L.width:t.offsetHeight-L.height,o[l]=_?parseFloat(d)/100*u+"px":100*(parseFloat(d)/u)+"%");d=o.join(" ")}return this.parseComplex(t.style,d,g,n,a)},formatter:ee}),de("backgroundSize",{defaultValue:"0 0",formatter:ee}),de("perspective",{defaultValue:"0px",prefix:!0}),de("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),de("transformStyle",{prefix:!0}),de("backfaceVisibility",{prefix:!0}),de("margin",{parser:_e("marginTop,marginRight,marginBottom,marginLeft")}),de("padding",{parser:_e("paddingTop,paddingRight,paddingBottom,paddingLeft")}),de("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(t,e,i,s,n,a){var o,h,l;return 9>c?(h=t.currentStyle,l=8>c?" ":",",o="rect("+h.clipTop+l+h.clipRight+l+h.clipBottom+l+h.clipLeft+")",e=this.format(e).split(",").join(l)):(o=this.format(G(t,this.p,r,!1,this.dflt)),e=this.format(e)),this.parseComplex(t.style,o,e,n,a)}}),de("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),de("autoRound,strictUnits",{parser:function(t,e,i,s,r){return r}}),de("border",{defaultValue:"0px solid #000",parser:function(t,e,i,s,n,a){return this.parseComplex(t.style,this.format(G(t,"borderTopWidth",r,!1,"0px")+" "+G(t,"borderTopStyle",r,!1,"solid")+" "+G(t,"borderTopColor",r,!1,"#000")),this.format(e),n,a)},color:!0,formatter:function(t){var e=t.split(" ");return e[0]+" "+(e[1]||"solid")+" "+(t.match(he)||["#000"])[0]}}),de("float,cssFloat,styleFloat",{parser:function(t,e,i,s,r){var n=t.style,a="cssFloat"in n?"cssFloat":"styleFloat";return new pe(n,a,0,0,r,-1,i,!1,0,n[a],e)}});var Re=function(t){var e,i=this.t,s=i.filter||G(this.data,"filter"),r=0|this.s+this.c*t;100===r&&(-1===s.indexOf("atrix(")&&-1===s.indexOf("radient(")&&-1===s.indexOf("oader(")?(i.removeAttribute("filter"),e=!G(this.data,"filter")):(i.filter=s.replace(x,""),e=!0)),e||(this.xn1&&(i.filter=s=s||"alpha(opacity="+r+")"),-1===s.indexOf("opacity")?0===r&&this.xn1||(i.filter=s+" alpha(opacity="+r+")"):i.filter=s.replace(T,"opacity="+r))};de("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(t,e,i,s,n,a){var o=parseFloat(G(t,"opacity",r,!1,"1")),h=t.style,l="autoAlpha"===i;return e=parseFloat(e),l&&1===o&&"hidden"===G(t,"visibility",r)&&0!==e&&(o=0),U?n=new pe(h,"opacity",o,e-o,n):(n=new pe(h,"opacity",100*o,100*(e-o),n),n.xn1=l?1:0,h.zoom=1,n.type=2,n.b="alpha(opacity="+n.s+")",n.e="alpha(opacity="+(n.s+n.c)+")",n.data=t,n.plugin=a,n.setRatio=Re),l&&(n=new pe(h,"visibility",0,0,n,-1,null,!1,0,0!==o?"inherit":"hidden",0===e?"hidden":"inherit"),n.xs0="inherit",s._overwriteProps.push(n.n),s._overwriteProps.push(i)),n}});var Ae=function(t,e){e&&(t.removeProperty?t.removeProperty(e.replace(P,"-$1").toLowerCase()):t.removeAttribute(e))},Ce=function(t){if(this.t._gsClassPT=this,1===t||0===t){this.t.className=0===t?this.b:this.e;for(var e=this.data,i=this.t.style;e;)e.v?i[e.p]=e.v:Ae(i,e.p),e=e._next;1===t&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.className!==this.e&&(this.t.className=this.e)};de("className",{parser:function(t,e,s,n,a,o,h){var l,_,u,p,f,c=t.className,m=t.style.cssText;if(a=n._classNamePT=new pe(t,s,0,0,a,2),a.setRatio=Ce,a.pr=-11,i=!0,a.b=c,_=W(t,r),u=t._gsClassPT){for(p={},f=u.data;f;)p[f.p]=1,f=f._next;u.setRatio(1)}return t._gsClassPT=a,a.e="="!==e.charAt(1)?e:c.replace(RegExp("\\s*\\b"+e.substr(2)+"\\b"),"")+("+"===e.charAt(0)?" "+e.substr(2):""),n._tween._duration&&(t.className=a.e,l=H(t,_,W(t),h,p),t.className=c,a.data=l.firstMPT,t.style.cssText=m,a=a.xfirst=n.parse(t,l.difs,a,o)),a}});var Oe=function(t){if((1===t||0===t)&&this.data._totalTime===this.data._totalDuration){var e,i,s,r,n=this.t.style,a=o.transform.parse;if("all"===this.e)n.cssText="",r=!0;else for(e=this.e.split(","),s=e.length;--s>-1;)i=e[s],o[i]&&(o[i].parse===a?r=!0:i="transformOrigin"===i?we:o[i].p),Ae(n,i);r&&(Ae(n,ye),this.t._gsTransform&&delete this.t._gsTransform)}};for(de("clearProps",{parser:function(t,e,s,r,n){return n=new pe(t,s,0,0,n,2),n.setRatio=Oe,n.e=e,n.pr=-10,n.data=r._tween,i=!0,n}}),h="bezier,throwProps,physicsProps,physics2D".split(","),ce=h.length;ce--;)ge(h[ce]);h=a.prototype,h._firstPT=null,h._onInitTween=function(t,e,o){if(!t.nodeType)return!1;this._target=t,this._tween=o,this._vars=e,l=e.autoRound,i=!1,s=e.suffixMap||a.suffixMap,r=Z(t,""),n=this._overwriteProps;var h,p,c,m,d,g,v,y,T,x=t.style;if(_&&""===x.zIndex&&(h=G(t,"zIndex",r),("auto"===h||""===h)&&(x.zIndex=0)),"string"==typeof e&&(m=x.cssText,h=W(t,r),x.cssText=m+";"+e,h=H(t,h,W(t)).difs,!U&&w.test(e)&&(h.opacity=parseFloat(RegExp.$1)),e=h,x.cssText=m),this._firstPT=p=this.parse(t,e,null),this._transformType){for(T=3===this._transformType,ye?u&&(_=!0,""===x.zIndex&&(v=G(t,"zIndex",r),("auto"===v||""===v)&&(x.zIndex=0)),f&&(x.WebkitBackfaceVisibility=this._vars.WebkitBackfaceVisibility||(T?"visible":"hidden"))):x.zoom=1,c=p;c&&c._next;)c=c._next;y=new pe(t,"transform",0,0,null,2),this._linkCSSP(y,null,c),y.setRatio=T&&xe?ke:ye?Se:Pe,y.data=this._transform||be(t,r,!0),n.pop()}if(i){for(;p;){for(g=p._next,c=m;c&&c.pr>p.pr;)c=c._next;(p._prev=c?c._prev:d)?p._prev._next=p:m=p,(p._next=c)?c._prev=p:d=p,p=g}this._firstPT=m}return!0},h.parse=function(t,e,i,n){var a,h,_,u,p,f,c,m,d,g,v=t.style;for(a in e)f=e[a],h=o[a],h?i=h.parse(t,f,a,this,i,n,e):(p=G(t,a,r)+"",d="string"==typeof f,"color"===a||"fill"===a||"stroke"===a||-1!==a.indexOf("Color")||d&&b.test(f)?(d||(f=oe(f),f=(f.length>3?"rgba(":"rgb(")+f.join(",")+")"),i=fe(v,a,p,f,!0,"transparent",i,0,n)):!d||-1===f.indexOf(" ")&&-1===f.indexOf(",")?(_=parseFloat(p),c=_||0===_?p.substr((_+"").length):"",(""===p||"auto"===p)&&("width"===a||"height"===a?(_=te(t,a,r),c="px"):"left"===a||"top"===a?(_=Q(t,a,r),c="px"):(_="opacity"!==a?0:1,c="")),g=d&&"="===f.charAt(1),g?(u=parseInt(f.charAt(0)+"1",10),f=f.substr(2),u*=parseFloat(f),m=f.replace(y,"")):(u=parseFloat(f),m=d?f.substr((u+"").length)||"":""),""===m&&(m=s[a]||c),f=u||0===u?(g?u+_:u)+m:e[a],c!==m&&""!==m&&(u||0===u)&&(_||0===_)&&(_=$(t,a,_,c),"%"===m?(_/=$(t,a,100,"%")/100,_>100&&(_=100),e.strictUnits!==!0&&(p=_+"%")):"em"===m?_/=$(t,a,1,"em"):(u=$(t,a,u,m),m="px"),g&&(u||0===u)&&(f=u+_+m)),g&&(u+=_),!_&&0!==_||!u&&0!==u?void 0!==v[a]&&(f||"NaN"!=f+""&&null!=f)?(i=new pe(v,a,u||_||0,0,i,-1,a,!1,0,p,f),i.xs0="none"!==f||"display"!==a&&-1===a.indexOf("Style")?f:p):j("invalid "+a+" tween value: "+e[a]):(i=new pe(v,a,_,u-_,i,0,a,l!==!1&&("px"===m||"zIndex"===a),0,p,f),i.xs0=m)):i=fe(v,a,p,f,!0,null,i,0,n)),n&&i&&!i.plugin&&(i.plugin=n);return i},h.setRatio=function(t){var e,i,s,r=this._firstPT,n=1e-6;if(1!==t||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(t||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;r;){if(e=r.c*t+r.s,r.r?e=e>0?0|e+.5:0|e-.5:n>e&&e>-n&&(e=0),r.type)if(1===r.type)if(s=r.l,2===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2;else if(3===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3;else if(4===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3+r.xn3+r.xs4;else if(5===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3+r.xn3+r.xs4+r.xn4+r.xs5;else{for(i=r.xs0+e+r.xs1,s=1;r.l>s;s++)i+=r["xn"+s]+r["xs"+(s+1)];r.t[r.p]=i}else-1===r.type?r.t[r.p]=r.xs0:r.setRatio&&r.setRatio(t);else r.t[r.p]=e+r.xs0;r=r._next}else for(;r;)2!==r.type?r.t[r.p]=r.b:r.setRatio(t),r=r._next;else for(;r;)2!==r.type?r.t[r.p]=r.e:r.setRatio(t),r=r._next},h._enableTransforms=function(t){this._transformType=t||3===this._transformType?3:2,this._transform=this._transform||be(this._target,r,!0)},h._linkCSSP=function(t,e,i,s){return t&&(e&&(e._prev=t),t._next&&(t._next._prev=t._prev),t._prev?t._prev._next=t._next:this._firstPT===t&&(this._firstPT=t._next,s=!0),i?i._next=t:s||null!==this._firstPT||(this._firstPT=t),t._next=e,t._prev=i),t},h._kill=function(e){var i,s,r,n=e;if(e.autoAlpha||e.alpha){n={};for(s in e)n[s]=e[s];n.opacity=1,n.autoAlpha&&(n.visibility=1)}return e.className&&(i=this._classNamePT)&&(r=i.xfirst,r&&r._prev?this._linkCSSP(r._prev,i._next,r._prev._prev):r===this._firstPT&&(this._firstPT=i._next),i._next&&this._linkCSSP(i._next,i._next._next,r._prev),this._classNamePT=null),t.prototype._kill.call(this,n)};var De=function(t,e,i){var s,r,n,a;if(t.slice)for(r=t.length;--r>-1;)De(t[r],e,i);else for(s=t.childNodes,r=s.length;--r>-1;)n=s[r],a=n.type,n.style&&(e.push(W(n)),i&&i.push(n)),1!==a&&9!==a&&11!==a||!n.childNodes.length||De(n,e,i)};return a.cascadeTo=function(t,i,s){var r,n,a,o=e.to(t,i,s),h=[o],l=[],_=[],u=[],p=e._internals.reservedProps;for(t=o._targets||o.target,De(t,l,u),o.render(i,!0),De(t,_),o.render(0,!0),o._enabled(!0),r=u.length;--r>-1;)if(n=H(u[r],l[r],_[r]),n.firstMPT){n=n.difs;for(a in s)p[a]&&(n[a]=s[a]);h.push(e.to(u[r],i,n))}return h},t.activate([a]),a},!0),function(){var t=window._gsDefine.plugin({propName:"roundProps",priority:-1,API:2,init:function(t,e,i){return this._tween=i,!0}}),e=t.prototype;e._onInitAllProps=function(){for(var t,e,i,s=this._tween,r=s.vars.roundProps instanceof Array?s.vars.roundProps:s.vars.roundProps.split(","),n=r.length,a={},o=s._propLookup.roundProps;--n>-1;)a[r[n]]=1;for(n=r.length;--n>-1;)for(t=r[n],e=s._firstPT;e;)i=e._next,e.pg?e.t._roundProps(a,!0):e.n===t&&(this._add(e.t,t,e.s,e.c),i&&(i._prev=e._prev),e._prev?e._prev._next=i:s._firstPT===e&&(s._firstPT=i),e._next=e._prev=null,s._propLookup[t]=o),e=i;return!1},e._add=function(t,e,i,s){this._addTween(t,e,i,i+s,e,!0),this._overwriteProps.push(e)
}}(),window._gsDefine.plugin({propName:"attr",API:2,init:function(t,e){var i;if("function"!=typeof t.setAttribute)return!1;this._target=t,this._proxy={};for(i in e)this._addTween(this._proxy,i,parseFloat(t.getAttribute(i)),e[i],i)&&this._overwriteProps.push(i);return!0},set:function(t){this._super.setRatio.call(this,t);for(var e,i=this._overwriteProps,s=i.length;--s>-1;)e=i[s],this._target.setAttribute(e,this._proxy[e]+"")}}),window._gsDefine.plugin({propName:"directionalRotation",API:2,init:function(t,e){"object"!=typeof e&&(e={rotation:e}),this.finals={};var i,s,r,n,a,o,h=e.useRadians===!0?2*Math.PI:360,l=1e-6;for(i in e)"useRadians"!==i&&(o=(e[i]+"").split("_"),s=o[0],r=parseFloat("function"!=typeof t[i]?t[i]:t[i.indexOf("set")||"function"!=typeof t["get"+i.substr(3)]?i:"get"+i.substr(3)]()),n=this.finals[i]="string"==typeof s&&"="===s.charAt(1)?r+parseInt(s.charAt(0)+"1",10)*Number(s.substr(2)):Number(s)||0,a=n-r,o.length&&(s=o.join("_"),-1!==s.indexOf("short")&&(a%=h,a!==a%(h/2)&&(a=0>a?a+h:a-h)),-1!==s.indexOf("_cw")&&0>a?a=(a+9999999999*h)%h-(0|a/h)*h:-1!==s.indexOf("ccw")&&a>0&&(a=(a-9999999999*h)%h-(0|a/h)*h)),(a>l||-l>a)&&(this._addTween(t,i,r,r+a,i),this._overwriteProps.push(i)));return!0},set:function(t){var e;if(1!==t)this._super.setRatio.call(this,t);else for(e=this._firstPT;e;)e.f?e.t[e.p](this.finals[e.p]):e.t[e.p]=this.finals[e.p],e=e._next}})._autoCSS=!0,window._gsDefine("easing.Back",["easing.Ease"],function(t){var e,i,s,r=window.GreenSockGlobals||window,n=r.com.greensock,a=2*Math.PI,o=Math.PI/2,h=n._class,l=function(e,i){var s=h("easing."+e,function(){},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,s},_=t.register||function(){},u=function(t,e,i,s){var r=h("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new s},!0);return _(r,t),r},p=function(t,e,i){this.t=t,this.v=e,i&&(this.next=i,i.prev=this,this.c=i.v-e,this.gap=i.t-t)},f=function(e,i){var s=h("easing."+e,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,r.config=function(t){return new s(t)},s},c=u("Back",f("BackOut",function(t){return(t-=1)*t*((this._p1+1)*t+this._p1)+1}),f("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),f("BackInOut",function(t){return 1>(t*=2)?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),m=h("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:t>1&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=i===!0},!0),d=m.prototype=new t;return d.constructor=m,d.getRatio=function(t){var e=t+(.5-t)*this._p;return this._p1>t?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},m.ease=new m(.7,.7),d.config=m.config=function(t,e,i){return new m(t,e,i)},e=h("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0),d=e.prototype=new t,d.constructor=e,d.getRatio=function(t){return 0>t?t=0:t>=1&&(t=.999999999),(this._p2*t>>0)*this._p1},d.config=e.config=function(t){return new e(t)},i=h("easing.RoughEase",function(e){e=e||{};for(var i,s,r,n,a,o,h=e.taper||"none",l=[],_=0,u=0|(e.points||20),f=u,c=e.randomize!==!1,m=e.clamp===!0,d=e.template instanceof t?e.template:null,g="number"==typeof e.strength?.4*e.strength:.4;--f>-1;)i=c?Math.random():1/u*f,s=d?d.getRatio(i):i,"none"===h?r=g:"out"===h?(n=1-i,r=n*n*g):"in"===h?r=i*i*g:.5>i?(n=2*i,r=.5*n*n*g):(n=2*(1-i),r=.5*n*n*g),c?s+=Math.random()*r-.5*r:f%2?s+=.5*r:s-=.5*r,m&&(s>1?s=1:0>s&&(s=0)),l[_++]={x:i,y:s};for(l.sort(function(t,e){return t.x-e.x}),o=new p(1,1,null),f=u;--f>-1;)a=l[f],o=new p(a.x,a.y,o);this._prev=new p(0,0,0!==o.t?o:o.next)},!0),d=i.prototype=new t,d.constructor=i,d.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&e.t>=t;)e=e.prev;return this._prev=e,e.v+(t-e.t)/e.gap*e.c},d.config=function(t){return new i(t)},i.ease=new i,u("Bounce",l("BounceOut",function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),l("BounceIn",function(t){return 1/2.75>(t=1-t)?1-7.5625*t*t:2/2.75>t?1-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),l("BounceInOut",function(t){var e=.5>t;return t=e?1-2*t:2*t-1,t=1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),u("Circ",l("CircOut",function(t){return Math.sqrt(1-(t-=1)*t)}),l("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),l("CircInOut",function(t){return 1>(t*=2)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),s=function(e,i,s){var r=h("easing."+e,function(t,e){this._p1=t||1,this._p2=e||s,this._p3=this._p2/a*(Math.asin(1/this._p1)||0)},!0),n=r.prototype=new t;return n.constructor=r,n.getRatio=i,n.config=function(t,e){return new r(t,e)},r},u("Elastic",s("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*a/this._p2)+1},.3),s("ElasticIn",function(t){return-(this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*a/this._p2))},.3),s("ElasticInOut",function(t){return 1>(t*=2)?-.5*this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*a/this._p2):.5*this._p1*Math.pow(2,-10*(t-=1))*Math.sin((t-this._p3)*a/this._p2)+1},.45)),u("Expo",l("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),l("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),l("ExpoInOut",function(t){return 1>(t*=2)?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),u("Sine",l("SineOut",function(t){return Math.sin(t*o)}),l("SineIn",function(t){return-Math.cos(t*o)+1}),l("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),h("easing.EaseLookup",{find:function(e){return t.map[e]}},!0),_(r.SlowMo,"SlowMo","ease,"),_(i,"RoughEase","ease,"),_(e,"SteppedEase","ease,"),c},!0)}),function(t){"use strict";var e,i,s,r,n,a=t.GreenSockGlobals||t,o=function(t){var e,i=t.split("."),s=a;for(e=0;i.length>e;e++)s[i[e]]=s=s[i[e]]||{};return s},h=o("com.greensock"),l=[].slice,_=function(){},u={},p=function(e,i,s,r){this.sc=u[e]?u[e].sc:[],u[e]=this,this.gsClass=null,this.func=s;var n=[];this.check=function(h){for(var l,_,f,c,m=i.length,d=m;--m>-1;)(l=u[i[m]]||new p(i[m],[])).gsClass?(n[m]=l.gsClass,d--):h&&l.sc.push(this);if(0===d&&s)for(_=("com.greensock."+e).split("."),f=_.pop(),c=o(_.join("."))[f]=this.gsClass=s.apply(s,n),r&&(a[f]=c,"function"==typeof define&&define.amd?define((t.GreenSockAMDPath?t.GreenSockAMDPath+"/":"")+e.split(".").join("/"),[],function(){return c}):"undefined"!=typeof module&&module.exports&&(module.exports=c)),m=0;this.sc.length>m;m++)this.sc[m].check()},this.check(!0)},f=t._gsDefine=function(t,e,i,s){return new p(t,e,i,s)},c=h._class=function(t,e,i){return e=e||function(){},f(t,[],function(){return e},i),e};f.globals=a;var m=[0,0,1,1],d=[],g=c("easing.Ease",function(t,e,i,s){this._func=t,this._type=i||0,this._power=s||0,this._params=e?m.concat(e):m},!0),v=g.map={},y=g.register=function(t,e,i,s){for(var r,n,a,o,l=e.split(","),_=l.length,u=(i||"easeIn,easeOut,easeInOut").split(",");--_>-1;)for(n=l[_],r=s?c("easing."+n,null,!0):h.easing[n]||{},a=u.length;--a>-1;)o=u[a],v[n+"."+o]=v[o+n]=r[o]=t.getRatio?t:t[o]||new t};for(s=g.prototype,s._calcEnd=!1,s.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,s=1===e?1-t:2===e?t:.5>t?2*t:2*(1-t);return 1===i?s*=s:2===i?s*=s*s:3===i?s*=s*s*s:4===i&&(s*=s*s*s*s),1===e?1-s:2===e?s:.5>t?s/2:1-s/2},e=["Linear","Quad","Cubic","Quart","Quint,Strong"],i=e.length;--i>-1;)s=e[i]+",Power"+i,y(new g(null,null,1,i),s,"easeOut",!0),y(new g(null,null,2,i),s,"easeIn"+(0===i?",easeNone":"")),y(new g(null,null,3,i),s,"easeInOut");v.linear=h.easing.Linear.easeIn,v.swing=h.easing.Quad.easeInOut;var T=c("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});s=T.prototype,s.addEventListener=function(t,e,i,s,a){a=a||0;var o,h,l=this._listeners[t],_=0;for(null==l&&(this._listeners[t]=l=[]),h=l.length;--h>-1;)o=l[h],o.c===e&&o.s===i?l.splice(h,1):0===_&&a>o.pr&&(_=h+1);l.splice(_,0,{c:e,s:i,up:s,pr:a}),this!==r||n||r.wake()},s.removeEventListener=function(t,e){var i,s=this._listeners[t];if(s)for(i=s.length;--i>-1;)if(s[i].c===e)return s.splice(i,1),void 0},s.dispatchEvent=function(t){var e,i,s,r=this._listeners[t];if(r)for(e=r.length,i=this._eventTarget;--e>-1;)s=r[e],s.up?s.c.call(s.s||i,{type:t,target:i}):s.c.call(s.s||i)};var w=t.requestAnimationFrame,x=t.cancelAnimationFrame,b=Date.now||function(){return(new Date).getTime()},P=b();for(e=["ms","moz","webkit","o"],i=e.length;--i>-1&&!w;)w=t[e[i]+"RequestAnimationFrame"],x=t[e[i]+"CancelAnimationFrame"]||t[e[i]+"CancelRequestAnimationFrame"];c("Ticker",function(t,e){var i,s,a,o,h,l=this,u=b(),p=e!==!1&&w,f=function(t){P=b(),l.time=(P-u)/1e3;var e,r=l.time-h;(!i||r>0||t===!0)&&(l.frame++,h+=r+(r>=o?.004:o-r),e=!0),t!==!0&&(a=s(f)),e&&l.dispatchEvent("tick")};T.call(l),l.time=l.frame=0,l.tick=function(){f(!0)},l.sleep=function(){null!=a&&(p&&x?x(a):clearTimeout(a),s=_,a=null,l===r&&(n=!1))},l.wake=function(){null!==a&&l.sleep(),s=0===i?_:p&&w?w:function(t){return setTimeout(t,0|1e3*(h-l.time)+1)},l===r&&(n=!0),f(2)},l.fps=function(t){return arguments.length?(i=t,o=1/(i||60),h=this.time+o,l.wake(),void 0):i},l.useRAF=function(t){return arguments.length?(l.sleep(),p=t,l.fps(i),void 0):p},l.fps(t),setTimeout(function(){p&&(!a||5>l.frame)&&l.useRAF(!1)},1500)}),s=h.Ticker.prototype=new h.events.EventDispatcher,s.constructor=h.Ticker;var k=c("core.Animation",function(t,e){if(this.vars=e=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(e.delay)||0,this._timeScale=1,this._active=e.immediateRender===!0,this.data=e.data,this._reversed=e.reversed===!0,X){n||r.wake();var i=this.vars.useFrames?L:X;i.add(this,i._time),this.vars.paused&&this.paused(!0)}});r=k.ticker=new h.Ticker,s=k.prototype,s._dirty=s._gc=s._initted=s._paused=!1,s._totalTime=s._time=0,s._rawPrevTime=-1,s._next=s._last=s._onUpdate=s._timeline=s.timeline=null,s._paused=!1;var S=function(){b()-P>2e3&&r.wake(),setTimeout(S,2e3)};S(),s.play=function(t,e){return arguments.length&&this.seek(t,e),this.reversed(!1).paused(!1)},s.pause=function(t,e){return arguments.length&&this.seek(t,e),this.paused(!0)},s.resume=function(t,e){return arguments.length&&this.seek(t,e),this.paused(!1)},s.seek=function(t,e){return this.totalTime(Number(t),e!==!1)},s.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,e!==!1,!0)},s.reverse=function(t,e){return arguments.length&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},s.render=function(){},s.invalidate=function(){return this},s._enabled=function(t,e){return n||r.wake(),this._gc=!t,this._active=t&&!this._paused&&this._totalTime>0&&this._totalTime<this._totalDuration,e!==!0&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},s._kill=function(){return this._enabled(!1,!1)},s.kill=function(t,e){return this._kill(t,e),this},s._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},s._swapSelfInParams=function(t){for(var e=t.length,i=t.concat();--e>-1;)"{self}"===t[e]&&(i[e]=this);return i},s.eventCallback=function(t,e,i,s){if("on"===(t||"").substr(0,2)){var r=this.vars;if(1===arguments.length)return r[t];null==e?delete r[t]:(r[t]=e,r[t+"Params"]=i instanceof Array&&-1!==i.join("").indexOf("{self}")?this._swapSelfInParams(i):i,r[t+"Scope"]=s),"onUpdate"===t&&(this._onUpdate=e)}return this},s.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},s.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},s.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},s.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},s.totalTime=function(t,e,i){if(n||r.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>t&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var s=this._totalDuration,a=this._timeline;if(t>s&&!i&&(t=s),this._startTime=(this._paused?this._pauseTime:a._time)-(this._reversed?s-t:t)/this._timeScale,a._dirty||this._uncache(!1),a._timeline)for(;a._timeline;)a._timeline._time!==(a._startTime+a._totalTime)/a._timeScale&&a.totalTime(a._totalTime,!0),a=a._timeline}this._gc&&this._enabled(!0,!1),this._totalTime!==t&&this.render(t,e,!1)}return this},s.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},s.timeScale=function(t){if(!arguments.length)return this._timeScale;if(t=t||1e-6,this._timeline&&this._timeline.smoothChildTiming){var e=this._pauseTime,i=e||0===e?e:this._timeline.totalTime();this._startTime=i-(i-this._startTime)*this._timeScale/t}return this._timeScale=t,this._uncache(!1)},s.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._totalTime,!0)),this):this._reversed},s.paused=function(t){if(!arguments.length)return this._paused;if(t!=this._paused&&this._timeline){n||t||r.wake();var e=this._timeline,i=e.rawTime(),s=i-this._pauseTime;!t&&e.smoothChildTiming&&(this._startTime+=s,this._uncache(!1)),this._pauseTime=t?i:null,this._paused=t,this._active=!t&&this._totalTime>0&&this._totalTime<this._totalDuration,t||0===s||0===this._duration||this.render(e.smoothChildTiming?this._totalTime:(i-this._startTime)/this._timeScale,!0,!0)}return this._gc&&!t&&this._enabled(!0,!1),this};var R=c("core.SimpleTimeline",function(t){k.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});s=R.prototype=new k,s.constructor=R,s.kill()._gc=!1,s._first=s._last=null,s._sortChildren=!1,s.add=s.insert=function(t,e){var i,s;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),i=this._last,this._sortChildren)for(s=t._startTime;i&&i._startTime>s;)i=i._prev;return i?(t._next=i._next,i._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=i,this._timeline&&this._uncache(!0),this},s._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t.timeline=null,t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),this._timeline&&this._uncache(!0)),this},s.render=function(t,e,i){var s,r=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;r;)s=r._next,(r._active||t>=r._startTime&&!r._paused)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=s},s.rawTime=function(){return n||r.wake(),this._totalTime};var A=c("TweenLite",function(e,i,s){if(k.call(this,i,s),this.render=A.prototype.render,null==e)throw"Cannot tween a null target.";this.target=e="string"!=typeof e?e:A.selector(e)||e;var r,n,a,o=e.jquery||e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType),h=this.vars.overwrite;if(this._overwrite=h=null==h?N[A.defaultOverwrite]:"number"==typeof h?h>>0:N[h],(o||e instanceof Array)&&"number"!=typeof e[0])for(this._targets=a=l.call(e,0),this._propLookup=[],this._siblings=[],r=0;a.length>r;r++)n=a[r],n?"string"!=typeof n?n.length&&n!==t&&n[0]&&(n[0]===t||n[0].nodeType&&n[0].style&&!n.nodeType)?(a.splice(r--,1),this._targets=a=a.concat(l.call(n,0))):(this._siblings[r]=z(n,this,!1),1===h&&this._siblings[r].length>1&&U(n,this,null,1,this._siblings[r])):(n=a[r--]=A.selector(n),"string"==typeof n&&a.splice(r+1,1)):a.splice(r--,1);else this._propLookup={},this._siblings=z(e,this,!1),1===h&&this._siblings.length>1&&U(e,this,null,1,this._siblings);(this.vars.immediateRender||0===i&&0===this._delay&&this.vars.immediateRender!==!1)&&this.render(-this._delay,!1,!0)},!0),C=function(e){return e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType)},O=function(t,e){var i,s={};for(i in t)E[i]||i in e&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i&&"border"!==i||!(!M[i]||M[i]&&M[i]._autoCSS)||(s[i]=t[i],delete t[i]);t.css=s};s=A.prototype=new k,s.constructor=A,s.kill()._gc=!1,s.ratio=0,s._firstPT=s._targets=s._overwrittenProps=s._startAt=null,s._notifyPluginsOfEnabled=!1,A.version="1.10.3",A.defaultEase=s._ease=new g(null,null,1,1),A.defaultOverwrite="auto",A.ticker=r,A.autoSleep=!0,A.selector=t.$||t.jQuery||function(e){return t.$?(A.selector=t.$,t.$(e)):t.document?t.document.getElementById("#"===e.charAt(0)?e.substr(1):e):e};var D=A._internals={},M=A._plugins={},I=A._tweenLookup={},F=0,E=D.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1},N={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},L=k._rootFramesTimeline=new R,X=k._rootTimeline=new R;X._startTime=r.time,L._startTime=r.frame,X._active=L._active=!0,k._updateRoot=function(){if(X.render((r.time-X._startTime)*X._timeScale,!1,!1),L.render((r.frame-L._startTime)*L._timeScale,!1,!1),!(r.frame%120)){var t,e,i;for(i in I){for(e=I[i].tweens,t=e.length;--t>-1;)e[t]._gc&&e.splice(t,1);0===e.length&&delete I[i]}if(i=X._first,(!i||i._paused)&&A.autoSleep&&!L._first&&1===r._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||r.sleep()}}},r.addEventListener("tick",k._updateRoot);var z=function(t,e,i){var s,r,n=t._gsTweenID;if(I[n||(t._gsTweenID=n="t"+F++)]||(I[n]={target:t,tweens:[]}),e&&(s=I[n].tweens,s[r=s.length]=e,i))for(;--r>-1;)s[r]===e&&s.splice(r,1);return I[n].tweens},U=function(t,e,i,s,r){var n,a,o,h;if(1===s||s>=4){for(h=r.length,n=0;h>n;n++)if((o=r[n])!==e)o._gc||o._enabled(!1,!1)&&(a=!0);else if(5===s)break;return a}var l,_=e._startTime+1e-10,u=[],p=0,f=0===e._duration;for(n=r.length;--n>-1;)(o=r[n])===e||o._gc||o._paused||(o._timeline!==e._timeline?(l=l||Y(e,0,f),0===Y(o,l,f)&&(u[p++]=o)):_>=o._startTime&&o._startTime+o.totalDuration()/o._timeScale+1e-10>_&&((f||!o._initted)&&2e-10>=_-o._startTime||(u[p++]=o)));for(n=p;--n>-1;)o=u[n],2===s&&o._kill(i,t)&&(a=!0),(2!==s||!o._firstPT&&o._initted)&&o._enabled(!1,!1)&&(a=!0);return a},Y=function(t,e,i){for(var s=t._timeline,r=s._timeScale,n=t._startTime,a=1e-10;s._timeline;){if(n+=s._startTime,r*=s._timeScale,s._paused)return-100;s=s._timeline}return n/=r,n>e?n-e:i&&n===e||!t._initted&&2*a>n-e?a:(n+=t.totalDuration()/t._timeScale/r)>e+a?0:n-e-a};s._init=function(){var t,e,i,s,r=this.vars,n=this._overwrittenProps,a=this._duration,o=r.immediateRender,h=r.ease;if(r.startAt){if(this._startAt&&this._startAt.render(-1,!0),r.startAt.overwrite=0,r.startAt.immediateRender=!0,this._startAt=A.to(this.target,0,r.startAt),o)if(this._time>0)this._startAt=null;else if(0!==a)return}else if(r.runBackwards&&r.immediateRender&&0!==a)if(this._startAt)this._startAt.render(-1,!0),this._startAt=null;else if(0===this._time){i={};for(s in r)E[s]&&"autoCSS"!==s||(i[s]=r[s]);return i.overwrite=0,this._startAt=A.to(this.target,0,i),void 0}if(this._ease=h?h instanceof g?r.easeParams instanceof Array?h.config.apply(h,r.easeParams):h:"function"==typeof h?new g(h,r.easeParams):v[h]||A.defaultEase:A.defaultEase,this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(t=this._targets.length;--t>-1;)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],n?n[t]:null)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,n);if(e&&A._onPluginEvent("_onInitAllProps",this),n&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),r.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=r.onUpdate,this._initted=!0},s._initProps=function(e,i,s,r){var n,a,o,h,l,_;if(null==e)return!1;this.vars.css||e.style&&e!==t&&e.nodeType&&M.css&&this.vars.autoCSS!==!1&&O(this.vars,e);for(n in this.vars){if(_=this.vars[n],E[n])_ instanceof Array&&-1!==_.join("").indexOf("{self}")&&(this.vars[n]=_=this._swapSelfInParams(_,this));else if(M[n]&&(h=new M[n])._onInitTween(e,this.vars[n],this)){for(this._firstPT=l={_next:this._firstPT,t:h,p:"setRatio",s:0,c:1,f:!0,n:n,pg:!0,pr:h._priority},a=h._overwriteProps.length;--a>-1;)i[h._overwriteProps[a]]=this._firstPT;(h._priority||h._onInitAllProps)&&(o=!0),(h._onDisable||h._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else this._firstPT=i[n]=l={_next:this._firstPT,t:e,p:n,f:"function"==typeof e[n],n:n,pg:!1,pr:0},l.s=l.f?e[n.indexOf("set")||"function"!=typeof e["get"+n.substr(3)]?n:"get"+n.substr(3)]():parseFloat(e[n]),l.c="string"==typeof _&&"="===_.charAt(1)?parseInt(_.charAt(0)+"1",10)*Number(_.substr(2)):Number(_)-l.s||0;l&&l._next&&(l._next._prev=l)}return r&&this._kill(r,e)?this._initProps(e,i,s,r):this._overwrite>1&&this._firstPT&&s.length>1&&U(e,this,i,this._overwrite,s)?(this._kill(i,e),this._initProps(e,i,s,r)):o},s.render=function(t,e,i){var s,r,n,a=this._time;if(t>=this._duration)this._totalTime=this._time=this._duration,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(s=!0,r="onComplete"),0===this._duration&&((0===t||0>this._rawPrevTime)&&this._rawPrevTime!==t&&(i=!0,this._rawPrevTime>0&&(r="onReverseComplete",e&&(t=-1))),this._rawPrevTime=t);else if(1e-7>t)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==a||0===this._duration&&this._rawPrevTime>0)&&(r="onReverseComplete",s=this._reversed),0>t?(this._active=!1,0===this._duration&&(this._rawPrevTime>=0&&(i=!0),this._rawPrevTime=t)):this._initted||(i=!0);else if(this._totalTime=this._time=t,this._easeType){var o=t/this._duration,h=this._easeType,l=this._easePower;(1===h||3===h&&o>=.5)&&(o=1-o),3===h&&(o*=2),1===l?o*=o:2===l?o*=o*o:3===l?o*=o*o*o:4===l&&(o*=o*o*o*o),this.ratio=1===h?1-o:2===h?o:.5>t/this._duration?o/2:1-o/2}else this.ratio=this._ease.getRatio(t/this._duration);if(this._time!==a||i){if(!this._initted){if(this._init(),!this._initted)return;this._time&&!s?this.ratio=this._ease.getRatio(this._time/this._duration):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._active||!this._paused&&this._time!==a&&t>=0&&(this._active=!0),0===a&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._time||0===this._duration)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||d))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(0>t&&this._startAt&&this._startAt.render(t,e,i),e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||d)),r&&(this._gc||(0>t&&this._startAt&&!this._onUpdate&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||d)))}},s._kill=function(t,e){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._enabled(!1,!1);e="string"!=typeof e?e||this._targets||this.target:A.selector(e)||e;var i,s,r,n,a,o,h,l;if((e instanceof Array||C(e))&&"number"!=typeof e[0])for(i=e.length;--i>-1;)this._kill(t,e[i])&&(o=!0);else{if(this._targets){for(i=this._targets.length;--i>-1;)if(e===this._targets[i]){a=this._propLookup[i]||{},this._overwrittenProps=this._overwrittenProps||[],s=this._overwrittenProps[i]=t?this._overwrittenProps[i]||{}:"all";break}}else{if(e!==this.target)return!1;a=this._propLookup,s=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(a){h=t||a,l=t!==s&&"all"!==s&&t!==a&&(null==t||t._tempKill!==!0);for(r in h)(n=a[r])&&(n.pg&&n.t._kill(h)&&(o=!0),n.pg&&0!==n.t._overwriteProps.length||(n._prev?n._prev._next=n._next:n===this._firstPT&&(this._firstPT=n._next),n._next&&(n._next._prev=n._prev),n._next=n._prev=null),delete a[r]),l&&(s[r]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return o},s.invalidate=function(){return this._notifyPluginsOfEnabled&&A._onPluginEvent("_onDisable",this),this._firstPT=null,this._overwrittenProps=null,this._onUpdate=null,this._startAt=null,this._initted=this._active=this._notifyPluginsOfEnabled=!1,this._propLookup=this._targets?{}:[],this},s._enabled=function(t,e){if(n||r.wake(),t&&this._gc){var i,s=this._targets;if(s)for(i=s.length;--i>-1;)this._siblings[i]=z(s[i],this,!0);else this._siblings=z(this.target,this,!0)}return k.prototype._enabled.call(this,t,e),this._notifyPluginsOfEnabled&&this._firstPT?A._onPluginEvent(t?"_onEnable":"_onDisable",this):!1},A.to=function(t,e,i){return new A(t,e,i)},A.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new A(t,e,i)},A.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new A(t,e,s)},A.delayedCall=function(t,e,i,s,r){return new A(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:s,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:s,immediateRender:!1,useFrames:r,overwrite:0})},A.set=function(t,e){return new A(t,0,e)},A.killTweensOf=A.killDelayedCallsTo=function(t,e){for(var i=A.getTweensOf(t),s=i.length;--s>-1;)i[s]._kill(e,t)},A.getTweensOf=function(t){if(null==t)return[];t="string"!=typeof t?t:A.selector(t)||t;var e,i,s,r;if((t instanceof Array||C(t))&&"number"!=typeof t[0]){for(e=t.length,i=[];--e>-1;)i=i.concat(A.getTweensOf(t[e]));for(e=i.length;--e>-1;)for(r=i[e],s=e;--s>-1;)r===i[s]&&i.splice(e,1)}else for(i=z(t).concat(),e=i.length;--e>-1;)i[e]._gc&&i.splice(e,1);return i};var j=c("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=j.prototype},!0);if(s=j.prototype,j.version="1.10.1",j.API=2,s._firstPT=null,s._addTween=function(t,e,i,s,r,n){var a,o;return null!=s&&(a="number"==typeof s||"="!==s.charAt(1)?Number(s)-i:parseInt(s.charAt(0)+"1",10)*Number(s.substr(2)))?(this._firstPT=o={_next:this._firstPT,t:t,p:e,s:i,c:a,f:"function"==typeof t[e],n:r||e,r:n},o._next&&(o._next._prev=o),o):void 0},s.setRatio=function(t){for(var e,i=this._firstPT,s=1e-6;i;)e=i.c*t+i.s,i.r?e=0|e+(e>0?.5:-.5):s>e&&e>-s&&(e=0),i.f?i.t[i.p](e):i.t[i.p]=e,i=i._next},s._kill=function(t){var e,i=this._overwriteProps,s=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;--e>-1;)null!=t[i[e]]&&i.splice(e,1);for(;s;)null!=t[s.n]&&(s._next&&(s._next._prev=s._prev),s._prev?(s._prev._next=s._next,s._prev=null):this._firstPT===s&&(this._firstPT=s._next)),s=s._next;return!1},s._roundProps=function(t,e){for(var i=this._firstPT;i;)(t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&(i.r=e),i=i._next},A._onPluginEvent=function(t,e){var i,s,r,n,a,o=e._firstPT;if("_onInitAllProps"===t){for(;o;){for(a=o._next,s=r;s&&s.pr>o.pr;)s=s._next;(o._prev=s?s._prev:n)?o._prev._next=o:r=o,(o._next=s)?s._prev=o:n=o,o=a}o=e._firstPT=r}for(;o;)o.pg&&"function"==typeof o.t[t]&&o.t[t]()&&(i=!0),o=o._next;return i},j.activate=function(t){for(var e=t.length;--e>-1;)t[e].API===j.API&&(M[(new t[e])._propName]=t[e]);return!0},f.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,s=t.priority||0,r=t.overwriteProps,n={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},a=c("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){j.call(this,i,s),this._overwriteProps=r||[]},t.global===!0),o=a.prototype=new j(i);o.constructor=a,a.API=t.API;for(e in n)"function"==typeof t[e]&&(o[n[e]]=t[e]);return a.version=t.version,j.activate([a]),a},e=t._gsQueue){for(i=0;e.length>i;i++)e[i]();for(s in u)u[s].func||t.console.log("GSAP encountered missing dependency: com.greensock."+s)}n=!1}(window);

$(function() {
    /*产品列表页*/
    if ($('.ey-product').length) {
        //产品列表页瀑布流
        if ($('#ey-grid').length) MetAnimOnScroll();
        //图片懒加载
        $(".ey-product img[data-original]").lazyload({
            threshold: 50,
            effect: "fadeIn"
        });
        if(device_type=='d'){
            autoScro('.ey-product .widget-header,.ey-product .imgmb div', 'img'); //图片hover上下滚动
            $('.ey-product .widget-header,.ey-product .imgmb div').click(function() {
                $('span',this).stop().animate({top: 0},0);
            });
        };
        if ($(window).width() < 370) resZoom('.ey-product.type-1 li.mobileli .widget-header');
        // 产品分类列表跳转
        $('.classfiy-fenlei .classfiy-list li .dropdown>a').click(function(event) {
            location=$(this).attr('href');
        });
    }
})
/*瀑布流配置*/
function MetAnimOnScroll(okno) {
    new AnimOnScroll(document.getElementById('ey-grid'), {
        minDuration: 0.4,
        maxDuration: 0.7,
        viewportFactor: 0.2
    });
}
// 图片hover上下滚动
function autoScro(ascObj,sonObj) {
    $(ascObj).find(sonObj).each(function() {
        var this_obj=$(this).parents('span');
        removeImageSize(this,function(){
            var this_obj_p=this_obj.parents(ascObj),
                sonObjY = this_obj.height() - this_obj_p.height();
            if (sonObjY > 0) {
                this_obj_p.hover(function() {
                    var sn = (parseInt(this_obj.css('top')) + sonObjY) / 150 * 1000;
                    this_obj.stop().animate({top: -sonObjY},sn);
                },function() {
                    var po = -parseInt(this_obj.css('top')) / 150 * 1000;
                    this_obj.stop().animate({top: 0},po);
                });
            }
        });
    });
}
/*news.js*/
$(function() {
    /*侧栏图片列表延迟加载及瀑布流*/
    $('.mob-masonry img[data-original]').lazyload({
        threshold: 50,
        effect: "fadeIn",
        load: function() {
            Breakpoints.get('xs').on({
                enter: function() {
                    $('.ey-news-muban .mob-masonry').masonry({
                        itemSelector: ".masonry-item"
                    });
                }
            });
        }
    })
})
$(function() {
    /*导航处理*/
    $('.ey-nav .dropdown a.link').click(function(){
        if(device_type=='d' && !Breakpoints.is('xs') && $(this).data("hover")) window.location.href = $(this).attr('href');
    });

    /*导航固定定位处理*/
    if($(".navbar-fixed-top").length){
        // 导航添加投影
        $(window).scroll(function (){
            if($(".navbar-fixed-top").offset().top>1){
                $(".navbar-fixed-top").addClass("navbar-shadow");
            }else{
                $(".navbar-fixed-top").removeClass("navbar-shadow");
            }
        });
        // 导航绑定滚动条方向事件
        // scrollbarFun(function () {
        //  $('.navbar-fixed-top').css({top:-50});
        // },function () {
        //  $('.navbar-fixed-top').css({top:0});
        // })
    }

    /*下拉菜单动画修复*/
    $(".navlist .dropdown-submenu").hover(
        function(){
            $(this).parent('.dropdown-menu').addClass('overflow-visible');
        },
        function(){
            $(this).parent('.dropdown-menu').removeClass('overflow-visible');
        }
    );

    //内页内滚导航条（移动端）
    if($('.ey-column-nav-ul').length) navtabSwiper('.ey-column-nav-ul');

    //底部导航手机端处理
    if($('.ey-footnav').length){
        Breakpoints.get('xs').on({
            enter: function(){
                $('.ey-footnav .mob-masonry').masonry({itemSelector: ".masonry-item"});
            }
        });
    }
})

/*选项卡滑动导航标准处理（移动端）*/
function navtabSwiper(navObj) {
    var navtabSdefault=function(){
        var navObjW=sonWidthSum(navObj+'>li')+$('.caret',navObj).length;
        if(navObjW>$(navObj).parent().width()){
            if($(navObj).hasClass('swiper-wrapper')){
                if(!$(navObj).hasClass('flex-start')) $(navObj).addClass('flex-start');
            }else{
                $(navObj)
                .addClass("swiper-wrapper flex-start")
                .wrap("<div class=\"swiper-container swiper-navtab\"></div>").after('<div class="swiper-scrollbar"></div>')
                .find(">li").addClass("swiper-slide");
                var swiperNavtab = new Swiper('.swiper-navtab', {
                    slidesPerView: 'auto',
                    scrollbar:'.swiper-scrollbar',
                    scrollbarHide:false,
                    scrollbarDraggable:true
                });
            }
        }else if($(navObj).hasClass('flex-start')){
            $(navObj).removeClass('flex-start');
        }
    };
    navtabSdefault();
    $(window).resize(function() {
        navtabSdefault();
    })
    //下拉菜单被隐藏特殊情况处理
    if($(navObj+' .dropdown').length) $(".swiper-navtab").addClass("overflow-visible");
}
//去除图片宽高属性
function removeImageSize(risObj,fun) {
    $(risObj).each(function() {
        if ($(this).data('original') || $(this).data('lazy')) {
            var risTobj=$(this),
                risT=setInterval(function() {
                    if (risTobj.data('original') == risTobj.attr('src') || risTobj.data('lazy') == risTobj.attr('src')) {
                        risTobj.height('').removeAttr('width').removeAttr('height');
                        if (typeof fun === "function") fun();
                        clearInterval(risT);
                    }
                }, 10);
        } else {
            var img = new Image();
            img.src = $(this).attr('src')?$(this).attr('src'):$(this).attr('srcset');
            if (img.complete) {
                $(this).height('').removeAttr('width').removeAttr('height');
                if (typeof fun === "function") fun();
                return;
            }
            img.onload = function() {
                $(this).height('').removeAttr('width').removeAttr('height');
                if (typeof fun === "function") fun();
            };
        }
    });
};
/*滚动触发*/
function scrollFun(sfObj,top,loop,visible,fun){
    if (typeof fun === "function") {
        var funOpen=1,tops=top?top:0;
        $(window).scroll(function(){
            if(funOpen==1){
                $(sfObj).each(function() {
                    var sfObjT = $(this).offset().top - $(window).scrollTop()-$(window).height(),
                        sfObjB = $(this).offset().top + $(this).outerHeight() - $(window).scrollTop();
                    visible=visible?visible:$(this).is(":visible")?1:0;
                    if(sfObjT<tops && sfObjB>0 && visible){
                        fun();
                        if(loop) funOpen=0;
                    }
                });
            }
        })
    }
}
/*父元素宽度计算*/
function sonWidthSum(sonObj,sonNum){
    var sonObjs=$(sonObj),
        sonTrueNum=sonObjs.length,
        parentObjW=0;
    if(sonNum>sonTrueNum||!sonNum) sonNum=sonTrueNum;
    for (var i = 0; i < sonNum; i++) {
        var sonObjW=sonObjs.eq(i).outerWidth()+parseInt(sonObjs.eq(i).css('marginLeft'))+parseInt(sonObjs.eq(i).css('marginRight'));
        parentObjW+=sonObjW;
    }
    return parentObjW+sonNum;
}
/*手动appear动画*/
function appear(appearObj){
    thisAppear=$(appearObj).hasClass('invisible')?$(appearObj):$(appearObj).find('.invisible');
    thisAppear.each(function() {
        if(!$(this).hasClass('appear-no-repeat')){
            var animate=$(this).data('animate'),
                animation='animation-'+animate+'';
            $(this).addClass(animation).addClass('appear-no-repeat').removeClass('invisible');
        }
    });
}
/*响应式缩放*/
function resZoom(zoomObj) {
    var zoomObjs = typeof zoomObj == "string" ? [zoomObj] : zoomObj,
        zoomdeFault=function(thisObj){
            var thisObj=$(thisObj),
                zoom=thisObj.parent().width()/thisObj.outerWidth();
            if(zoom<1){
                thisObj.css({zoom:zoom});
            }else{
                thisObj.css({zoom:1});
            };
        };
    for (var i = 0; i < zoomObjs.length; i++) {
        $(zoomObjs[i]).each(function() {
            var thisObj=this;
            zoomdeFault(this);
            $(window).resize(function() {
                /*if($(thisObj).is(":visible"))*/ zoomdeFault(thisObj);
            });
            // $(window).scroll(function() {
            //     if($(thisObj).is(":visible")) zoomdeFault(thisObj);
            // });
        });
    }
};
// 在线交流
/*isotope.pkgd.min.js*/
/*!
 * Isotope PACKAGED v2.2.2
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */

/*
!function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c("object"==typeof exports?require("jquery"):a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(window),function(){"use strict";function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:e.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a,b){function c(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}function d(){}function e(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=h.length;c>b;b++){var d=h[b];a[d]=0}return a}function f(b){function d(){if(!m){m=!0;var d=a.getComputedStyle;if(j=function(){var a=d?function(a){return d(a,null)}:function(a){return a.currentStyle};return function(b){var c=a(b);return c||g("Style returned "+c+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),c}}(),k=b("boxSizing")){var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style[k]="border-box";var f=document.body||document.documentElement;f.appendChild(e);var h=j(e);l=200===c(h.width),f.removeChild(e)}}}function f(a){if(d(),"string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var b=j(a);if("none"===b.display)return e();var f={};f.width=a.offsetWidth,f.height=a.offsetHeight;for(var g=f.isBorderBox=!(!k||!b[k]||"border-box"!==b[k]),m=0,n=h.length;n>m;m++){var o=h[m],p=b[o];p=i(a,p);var q=parseFloat(p);f[o]=isNaN(q)?0:q}var r=f.paddingLeft+f.paddingRight,s=f.paddingTop+f.paddingBottom,t=f.marginLeft+f.marginRight,u=f.marginTop+f.marginBottom,v=f.borderLeftWidth+f.borderRightWidth,w=f.borderTopWidth+f.borderBottomWidth,x=g&&l,y=c(b.width);y!==!1&&(f.width=y+(x?0:r+v));var z=c(b.height);return z!==!1&&(f.height=z+(x?0:s+w)),f.innerWidth=f.width-(r+v),f.innerHeight=f.height-(s+w),f.outerWidth=f.width+t,f.outerHeight=f.height+u,f}}function i(b,c){if(a.getComputedStyle||-1===c.indexOf("%"))return c;var d=b.style,e=d.left,f=b.runtimeStyle,g=f&&f.left;return g&&(f.left=b.currentStyle.left),d.left=c,c=d.pixelLeft,d.left=e,g&&(f.left=g),c}var j,k,l,m=!1;return f}var g="undefined"==typeof console?d:function(a){console.error(a)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],f):"object"==typeof exports?module.exports=f(require("desandro-get-style-property")):a.getSize=f(a.getStyleProperty)}(window),function(a){function b(a){"function"==typeof a&&(b.isReady?a():g.push(a))}function c(a){var c="readystatechange"===a.type&&"complete"!==f.readyState;b.isReady||c||d()}function d(){b.isReady=!0;for(var a=0,c=g.length;c>a;a++){var d=g[a];d()}}function e(e){return"complete"===f.readyState?d():(e.bind(f,"DOMContentLoaded",c),e.bind(f,"readystatechange",c),e.bind(a,"load",c)),b}var f=a.document,g=[];b.isReady=!1,"function"==typeof define&&define.amd?define("doc-ready/doc-ready",["eventie/eventie"],e):"object"==typeof exports?module.exports=e(require("eventie")):a.docReady=e(a.eventie)}(window),function(a){"use strict";function b(a,b){return a[g](b)}function c(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}function d(a,b){c(a);for(var d=a.parentNode.querySelectorAll(b),e=0,f=d.length;f>e;e++)if(d[e]===a)return!0;return!1}function e(a,d){return c(a),b(a,d)}var f,g=function(){if(a.matches)return"matches";if(a.matchesSelector)return"matchesSelector";for(var b=["webkit","moz","ms","o"],c=0,d=b.length;d>c;c++){var e=b[c],f=e+"MatchesSelector";if(a[f])return f}}();if(g){var h=document.createElement("div"),i=b(h,"div");f=i?b:e}else f=d;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return f}):"object"==typeof exports?module.exports=f:window.matchesSelector=f}(Element.prototype),function(a,b){"use strict";"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["doc-ready/doc-ready","matches-selector/matches-selector"],function(c,d){return b(a,c,d)}):"object"==typeof exports?module.exports=b(a,require("doc-ready"),require("desandro-matches-selector")):a.fizzyUIUtils=b(a,a.docReady,a.matchesSelector)}(window,function(a,b,c){var d={};d.extend=function(a,b){for(var c in b)a[c]=b[c];return a},d.modulo=function(a,b){return(a%b+b)%b};var e=Object.prototype.toString;d.isArray=function(a){return"[object Array]"==e.call(a)},d.makeArray=function(a){var b=[];if(d.isArray(a))b=a;else if(a&&"number"==typeof a.length)for(var c=0,e=a.length;e>c;c++)b.push(a[c]);else b.push(a);return b},d.indexOf=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},d.removeFrom=function(a,b){var c=d.indexOf(a,b);-1!=c&&a.splice(c,1)},d.isElement="function"==typeof HTMLElement||"object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1==a.nodeType&&"string"==typeof a.nodeName},d.setText=function(){function a(a,c){b=b||(void 0!==document.documentElement.textContent?"textContent":"innerText"),a[b]=c}var b;return a}(),d.getParent=function(a,b){for(;a!=document.body;)if(a=a.parentNode,c(a,b))return a},d.getQueryElement=function(a){return"string"==typeof a?document.querySelector(a):a},d.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},d.filterFindElements=function(a,b){a=d.makeArray(a);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f];if(d.isElement(h))if(b){c(h,b)&&e.push(h);for(var i=h.querySelectorAll(b),j=0,k=i.length;k>j;j++)e.push(i[j])}else e.push(h)}return e},d.debounceMethod=function(a,b,c){var d=a.prototype[b],e=b+"Timeout";a.prototype[b]=function(){var a=this[e];a&&clearTimeout(a);var b=arguments,f=this;this[e]=setTimeout(function(){d.apply(f,b),delete f[e]},c||100)}},d.toDashed=function(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()};var f=a.console;return d.htmlInit=function(c,e){b(function(){for(var b=d.toDashed(e),g=document.querySelectorAll(".js-"+b),h="data-"+b+"-options",i=0,j=g.length;j>i;i++){var k,l=g[i],m=l.getAttribute(h);try{k=m&&JSON.parse(m)}catch(n){f&&f.error("Error parsing "+h+" on "+l.nodeName.toLowerCase()+(l.id?"#"+l.id:"")+": "+n);continue}var o=new c(l,k),p=a.jQuery;p&&p.data(l,e,o)}})},d}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property","fizzy-ui-utils/utils"],function(c,d,e,f){return b(a,c,d,e,f)}):"object"==typeof exports?module.exports=b(a,require("wolfy87-eventemitter"),require("get-size"),require("desandro-get-style-property"),require("fizzy-ui-utils")):(a.Outlayer={},a.Outlayer.Item=b(a,a.EventEmitter,a.getSize,a.getStyleProperty,a.fizzyUIUtils))}(window,function(a,b,c,d,e){"use strict";function f(a){for(var b in a)return!1;return b=null,!0}function g(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}function h(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}var i=a.getComputedStyle,j=i?function(a){return i(a,null)}:function(a){return a.currentStyle},k=d("transition"),l=d("transform"),m=k&&l,n=!!d("perspective"),o={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[k],p=["transform","transition","transitionDuration","transitionProperty"],q=function(){for(var a={},b=0,c=p.length;c>b;b++){var e=p[b],f=d(e);f&&f!==e&&(a[e]=f)}return a}();e.extend(g.prototype,b.prototype),g.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},g.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},g.prototype.getSize=function(){this.size=c(this.element)},g.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=q[c]||c;b[d]=a[c]}},g.prototype.getPosition=function(){var a=j(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=a[c?"left":"right"],f=a[d?"top":"bottom"],g=this.layout.size,h=-1!=e.indexOf("%")?parseFloat(e)/100*g.width:parseInt(e,10),i=-1!=f.indexOf("%")?parseFloat(f)/100*g.height:parseInt(f,10);h=isNaN(h)?0:h,i=isNaN(i)?0:i,h-=c?g.paddingLeft:g.paddingRight,i-=d?g.paddingTop:g.paddingBottom,this.position.x=h,this.position.y=i},g.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={},d=b.isOriginLeft?"paddingLeft":"paddingRight",e=b.isOriginLeft?"left":"right",f=b.isOriginLeft?"right":"left",g=this.position.x+a[d];c[e]=this.getXValue(g),c[f]="";var h=b.isOriginTop?"paddingTop":"paddingBottom",i=b.isOriginTop?"top":"bottom",j=b.isOriginTop?"bottom":"top",k=this.position.y+a[h];c[i]=this.getYValue(k),c[j]="",this.css(c),this.emitEvent("layout",[this])},g.prototype.getXValue=function(a){var b=this.layout.options;return b.percentPosition&&!b.isHorizontal?a/this.layout.size.width*100+"%":a+"px"},g.prototype.getYValue=function(a){var b=this.layout.options;return b.percentPosition&&b.isHorizontal?a/this.layout.size.height*100+"%":a+"px"},g.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={};j.transform=this.getTranslate(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},g.prototype.getTranslate=function(a,b){var c=this.layout.options;return a=c.isOriginLeft?a:-a,b=c.isOriginTop?b:-b,n?"translate3d("+a+"px, "+b+"px, 0)":"translate("+a+"px, "+b+"px)"},g.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},g.prototype.moveTo=m?g.prototype._transitionTo:g.prototype.goTo,g.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},g.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},g.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var r="opacity,"+h(q.transform||"transform");g.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:r,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(o,this,!1))},g.prototype.transition=g.prototype[k?"_transition":"_nonTransition"],g.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},g.prototype.onotransitionend=function(a){this.ontransitionend(a)};var s={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};g.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,c=s[a.propertyName]||a.propertyName;if(delete b.ingProperties[c],f(b.ingProperties)&&this.disableTransition(),c in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[c]),c in b.onEnd){var d=b.onEnd[c];d.call(this),delete b.onEnd[c]}this.emitEvent("transitionEnd",[this])}},g.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(o,this,!1),this.isTransitioning=!1},g.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var t={transitionProperty:"",transitionDuration:""};return g.prototype.removeTransitionStyles=function(){this.css(t)},g.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},g.prototype.remove=function(){if(!k||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.once("transitionEnd",function(){a.removeElem()}),this.hide()},g.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options,b={},c=this.getHideRevealTransitionEndProperty("visibleStyle");b[c]=this.onRevealTransitionEnd,this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0,onTransitionEnd:b})},g.prototype.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},g.prototype.getHideRevealTransitionEndProperty=function(a){var b=this.layout.options[a];if(b.opacity)return"opacity";for(var c in b)return c},g.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options,b={},c=this.getHideRevealTransitionEndProperty("hiddenStyle");b[c]=this.onHideTransitionEnd,this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:b})},g.prototype.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},g.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},g}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","eventEmitter/EventEmitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(c,d,e,f,g){return b(a,c,d,e,f,g)}):"object"==typeof exports?module.exports=b(a,require("eventie"),require("wolfy87-eventemitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):a.Outlayer=b(a,a.eventie,a.EventEmitter,a.getSize,a.fizzyUIUtils,a.Outlayer.Item)}(window,function(a,b,c,d,e,f){"use strict";function g(a,b){var c=e.getQueryElement(a);if(!c)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(c||a)));this.element=c,i&&(this.$element=i(this.element)),this.options=e.extend({},this.constructor.defaults),this.option(b);var d=++k;this.element.outlayerGUID=d,l[d]=this,this._create(),this.options.isInitLayout&&this.layout()}var h=a.console,i=a.jQuery,j=function(){},k=0,l={};return g.namespace="outlayer",g.Item=f,g.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e.extend(g.prototype,c.prototype),g.prototype.option=function(a){e.extend(this.options,a)},g.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e.extend(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},g.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},g.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}return d},g.prototype._filterFindItemElements=function(a){return e.filterFindElements(a,this.options.itemSelector)},g.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},g.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},g.prototype._init=g.prototype.layout,g.prototype._resetLayout=function(){this.getSize()},g.prototype.getSize=function(){this.size=d(this.element)},g.prototype._getMeasurement=function(a,b){var c,f=this.options[a];f?("string"==typeof f?c=this.element.querySelector(f):e.isElement(f)&&(c=f),this[a]=c?d(c)[b]:f):this[a]=0},g.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},g.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}return b},g.prototype._layoutItems=function(a,b){if(this._emitCompleteOnItems("layout",a),a&&a.length){for(var c=[],d=0,e=a.length;e>d;d++){var f=a[d],g=this._getItemLayoutPosition(f);g.item=f,g.isInstant=b||f.isLayoutInstant,c.push(g)}this._processLayoutQueue(c)}},g.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},g.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},g.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},g.prototype._postLayout=function(){this.resizeContainer()},g.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},g.prototype._getContainerSize=j,g.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},g.prototype._emitCompleteOnItems=function(a,b){function c(){e.dispatchEvent(a+"Complete",null,[b])}function d(){g++,g===f&&c()}var e=this,f=b.length;if(!b||!f)return void c();for(var g=0,h=0,i=b.length;i>h;h++){var j=b[h];j.once(a,d)}},g.prototype.dispatchEvent=function(a,b,c){var d=b?[b].concat(c):c;if(this.emitEvent(a,d),i)if(this.$element=this.$element||i(this.element),b){var e=i.Event(b);e.type=a,this.$element.trigger(e,c)}else this.$element.trigger(a,c)},g.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},g.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},g.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},g.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e.removeFrom(this.stamps,d),this.unignore(d)}},g.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=e.makeArray(a)):void 0},g.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},g.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},g.prototype._manageStamp=j,g.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,e=d(a),f={left:b.left-c.left-e.marginLeft,top:b.top-c.top-e.marginTop,right:c.right-b.right-e.marginRight,bottom:c.bottom-b.bottom-e.marginBottom};return f},g.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},g.prototype.bindResize=function(){this.isResizeBound||(b.bind(a,"resize",this),this.isResizeBound=!0)},g.prototype.unbindResize=function(){this.isResizeBound&&b.unbind(a,"resize",this),this.isResizeBound=!1},g.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},g.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},g.prototype.needsResizeLayout=function(){var a=d(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},g.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},g.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},g.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},g.prototype.reveal=function(a){this._emitCompleteOnItems("reveal",a);for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.reveal()}},g.prototype.hide=function(a){this._emitCompleteOnItems("hide",a);for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.hide()}},g.prototype.revealItemElements=function(a){var b=this.getItems(a);this.reveal(b)},g.prototype.hideItemElements=function(a){var b=this.getItems(a);this.hide(b)},g.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},g.prototype.getItems=function(a){a=e.makeArray(a);for(var b=[],c=0,d=a.length;d>c;c++){var f=a[c],g=this.getItem(f);g&&b.push(g)}return b},g.prototype.remove=function(a){var b=this.getItems(a);if(this._emitCompleteOnItems("remove",b),b&&b.length)for(var c=0,d=b.length;d>c;c++){var f=b[c];f.remove(),e.removeFrom(this.items,f)}},g.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}this.unbindResize();var e=this.element.outlayerGUID;delete l[e],delete this.element.outlayerGUID,i&&i.removeData(this.element,this.constructor.namespace)},g.data=function(a){a=e.getQueryElement(a);var b=a&&a.outlayerGUID;return b&&l[b]},g.create=function(a,b){function c(){g.apply(this,arguments)}return Object.create?c.prototype=Object.create(g.prototype):e.extend(c.prototype,g.prototype),c.prototype.constructor=c,c.defaults=e.extend({},g.defaults),e.extend(c.defaults,b),c.prototype.settings={},c.namespace=a,c.data=g.data,c.Item=function(){f.apply(this,arguments)},c.Item.prototype=new f,e.htmlInit(c,a),i&&i.bridget&&i.bridget(a,c),c},g.Item=f,g}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],b):"object"==typeof exports?module.exports=b(require("outlayer")):(a.Isotope=a.Isotope||{},a.Isotope.Item=b(a.Outlayer))}(window,function(a){"use strict";function b(){a.Item.apply(this,arguments)}b.prototype=new a.Item,b.prototype._create=function(){this.id=this.layout.itemGUID++,a.Item.prototype._create.call(this),this.sortData={}},b.prototype.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var a=this.layout.options.getSortData,b=this.layout._sorters;for(var c in a){var d=b[c];this.sortData[c]=d(this.element,this)}}};var c=b.prototype.destroy;return b.prototype.destroy=function(){c.apply(this,arguments),this.css({display:""})},b}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],b):"object"==typeof exports?module.exports=b(require("get-size"),require("outlayer")):(a.Isotope=a.Isotope||{},a.Isotope.LayoutMode=b(a.getSize,a.Outlayer))}(window,function(a,b){"use strict";function c(a){this.isotope=a,a&&(this.options=a.options[this.namespace],this.element=a.element,this.items=a.filteredItems,this.size=a.size)}return function(){function a(a){return function(){return b.prototype[a].apply(this.isotope,arguments)}}for(var d=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout"],e=0,f=d.length;f>e;e++){var g=d[e];c.prototype[g]=a(g)}}(),c.prototype.needsVerticalResizeLayout=function(){var b=a(this.isotope.element),c=this.isotope.size&&b;return c&&b.innerHeight!=this.isotope.size.innerHeight},c.prototype._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},c.prototype.getColumnWidth=function(){this.getSegmentSize("column","Width")},c.prototype.getRowHeight=function(){this.getSegmentSize("row","Height")},c.prototype.getSegmentSize=function(a,b){var c=a+b,d="outer"+b;if(this._getMeasurement(c,d),!this[c]){var e=this.getFirstItemSize();this[c]=e&&e[d]||this.isotope.size["inner"+b]}},c.prototype.getFirstItemSize=function(){var b=this.isotope.filteredItems[0];return b&&b.element&&a(b.element)},c.prototype.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},c.prototype.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},c.modes={},c.create=function(a,b){function d(){c.apply(this,arguments)}return d.prototype=new c,b&&(d.options=b),d.prototype.namespace=a,c.modes[a]=d,d},c}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size","fizzy-ui-utils/utils"],b):"object"==typeof exports?module.exports=b(require("outlayer"),require("get-size"),require("fizzy-ui-utils")):a.Masonry=b(a.Outlayer,a.getSize,a.fizzyUIUtils)}(window,function(a,b,c){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}var d=this.columnWidth+=this.gutter,e=this.containerWidth+this.gutter,f=e/d,g=d-e%d,h=g&&1>g?"round":"floor";f=Math[h](f),this.cols=Math.max(f,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c.indexOf(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],b):"object"==typeof exports?module.exports=b(require("../layout-mode"),require("masonry-layout")):b(a.Isotope.LayoutMode,a.Masonry)}(window,function(a,b){"use strict";function c(a,b){for(var c in b)a[c]=b[c];return a}var d=a.create("masonry"),e=d.prototype._getElementOffset,f=d.prototype.layout,g=d.prototype._getMeasurement;
c(d.prototype,b.prototype),d.prototype._getElementOffset=e,d.prototype.layout=f,d.prototype._getMeasurement=g;var h=d.prototype.measureColumns;d.prototype.measureColumns=function(){this.items=this.isotope.filteredItems,h.call(this)};var i=d.prototype._manageStamp;return d.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,i.apply(this,arguments)},d}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],b):"object"==typeof exports?module.exports=b(require("../layout-mode")):b(a.Isotope.LayoutMode)}(window,function(a){"use strict";var b=a.create("fitRows");return b.prototype._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},b.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth+this.gutter,c=this.isotope.size.innerWidth+this.gutter;0!==this.x&&b+this.x>c&&(this.x=0,this.y=this.maxY);var d={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+a.size.outerHeight),this.x+=b,d},b.prototype._getContainerSize=function(){return{height:this.maxY}},b}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],b):"object"==typeof exports?module.exports=b(require("../layout-mode")):b(a.Isotope.LayoutMode)}(window,function(a){"use strict";var b=a.create("vertical",{horizontalAlignment:0});return b.prototype._resetLayout=function(){this.y=0},b.prototype._getItemLayoutPosition=function(a){a.getSize();var b=(this.isotope.size.innerWidth-a.size.outerWidth)*this.options.horizontalAlignment,c=this.y;return this.y+=a.size.outerHeight,{x:b,y:c}},b.prototype._getContainerSize=function(){return{height:this.y}},b}),function(a,b){"use strict";"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","matches-selector/matches-selector","fizzy-ui-utils/utils","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],function(c,d,e,f,g,h){return b(a,c,d,e,f,g,h)}):"object"==typeof exports?module.exports=b(a,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("./item"),require("./layout-mode"),require("./layout-modes/masonry"),require("./layout-modes/fit-rows"),require("./layout-modes/vertical")):a.Isotope=b(a,a.Outlayer,a.getSize,a.matchesSelector,a.fizzyUIUtils,a.Isotope.Item,a.Isotope.LayoutMode)}(window,function(a,b,c,d,e,f,g){function h(a,b){return function(c,d){for(var e=0,f=a.length;f>e;e++){var g=a[e],h=c.sortData[g],i=d.sortData[g];if(h>i||i>h){var j=void 0!==b[g]?b[g]:b,k=j?1:-1;return(h>i?1:-1)*k}}return 0}}var i=a.jQuery,j=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^\s+|\s+$/g,"")},k=document.documentElement,l=k.textContent?function(a){return a.textContent}:function(a){return a.innerText},m=b.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});m.Item=f,m.LayoutMode=g,m.prototype._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),b.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var a in g.modes)this._initLayoutMode(a)},m.prototype.reloadItems=function(){this.itemGUID=0,b.prototype.reloadItems.call(this)},m.prototype._itemize=function(){for(var a=b.prototype._itemize.apply(this,arguments),c=0,d=a.length;d>c;c++){var e=a[c];e.id=this.itemGUID++}return this._updateItemsSortData(a),a},m.prototype._initLayoutMode=function(a){var b=g.modes[a],c=this.options[a]||{};this.options[a]=b.options?e.extend(b.options,c):c,this.modes[a]=new b(this)},m.prototype.layout=function(){return!this._isLayoutInited&&this.options.isInitLayout?void this.arrange():void this._layout()},m.prototype._layout=function(){var a=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,a),this._isLayoutInited=!0},m.prototype.arrange=function(a){function b(){d.reveal(c.needReveal),d.hide(c.needHide)}this.option(a),this._getIsInstant();var c=this._filter(this.items);this.filteredItems=c.matches;var d=this;this._bindArrangeComplete(),this._isInstant?this._noTransition(b):b(),this._sort(),this._layout()},m.prototype._init=m.prototype.arrange,m.prototype._getIsInstant=function(){var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;return this._isInstant=a,a},m.prototype._bindArrangeComplete=function(){function a(){b&&c&&d&&e.dispatchEvent("arrangeComplete",null,[e.filteredItems])}var b,c,d,e=this;this.once("layoutComplete",function(){b=!0,a()}),this.once("hideComplete",function(){c=!0,a()}),this.once("revealComplete",function(){d=!0,a()})},m.prototype._filter=function(a){var b=this.options.filter;b=b||"*";for(var c=[],d=[],e=[],f=this._getFilterTest(b),g=0,h=a.length;h>g;g++){var i=a[g];if(!i.isIgnored){var j=f(i);j&&c.push(i),j&&i.isHidden?d.push(i):j||i.isHidden||e.push(i)}}return{matches:c,needReveal:d,needHide:e}},m.prototype._getFilterTest=function(a){return i&&this.options.isJQueryFiltering?function(b){return i(b.element).is(a)}:"function"==typeof a?function(b){return a(b.element)}:function(b){return d(b.element,a)}},m.prototype.updateSortData=function(a){var b;a?(a=e.makeArray(a),b=this.getItems(a)):b=this.items,this._getSorters(),this._updateItemsSortData(b)},m.prototype._getSorters=function(){var a=this.options.getSortData;for(var b in a){var c=a[b];this._sorters[b]=n(c)}},m.prototype._updateItemsSortData=function(a){for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.updateSortData()}};var n=function(){function a(a){if("string"!=typeof a)return a;var c=j(a).split(" "),d=c[0],e=d.match(/^\[(.+)\]$/),f=e&&e[1],g=b(f,d),h=m.sortDataParsers[c[1]];return a=h?function(a){return a&&h(g(a))}:function(a){return a&&g(a)}}function b(a,b){var c;return c=a?function(b){return b.getAttribute(a)}:function(a){var c=a.querySelector(b);return c&&l(c)}}return a}();m.sortDataParsers={parseInt:function(a){return parseInt(a,10)},parseFloat:function(a){return parseFloat(a)}},m.prototype._sort=function(){var a=this.options.sortBy;if(a){var b=[].concat.apply(a,this.sortHistory),c=h(b,this.options.sortAscending);this.filteredItems.sort(c),a!=this.sortHistory[0]&&this.sortHistory.unshift(a)}},m.prototype._mode=function(){var a=this.options.layoutMode,b=this.modes[a];if(!b)throw new Error("No layout mode: "+a);return b.options=this.options[a],b},m.prototype._resetLayout=function(){b.prototype._resetLayout.call(this),this._mode()._resetLayout()},m.prototype._getItemLayoutPosition=function(a){return this._mode()._getItemLayoutPosition(a)},m.prototype._manageStamp=function(a){this._mode()._manageStamp(a)},m.prototype._getContainerSize=function(){return this._mode()._getContainerSize()},m.prototype.needsResizeLayout=function(){return this._mode().needsResizeLayout()},m.prototype.appended=function(a){var b=this.addItems(a);if(b.length){var c=this._filterRevealAdded(b);this.filteredItems=this.filteredItems.concat(c)}},m.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){this._resetLayout(),this._manageStamps();var c=this._filterRevealAdded(b);this.layoutItems(this.filteredItems),this.filteredItems=c.concat(this.filteredItems),this.items=b.concat(this.items)}},m.prototype._filterRevealAdded=function(a){var b=this._filter(a);return this.hide(b.needHide),this.reveal(b.matches),this.layoutItems(b.matches,!0),b.matches},m.prototype.insert=function(a){var b=this.addItems(a);if(b.length){var c,d,e=b.length;for(c=0;e>c;c++)d=b[c],this.element.appendChild(d.element);var f=this._filter(b).matches;for(c=0;e>c;c++)b[c].isLayoutInstant=!0;for(this.arrange(),c=0;e>c;c++)delete b[c].isLayoutInstant;this.reveal(f)}};var o=m.prototype.remove;return m.prototype.remove=function(a){a=e.makeArray(a);var b=this.getItems(a);o.call(this,a);var c=b&&b.length;if(c)for(var d=0;c>d;d++){var f=b[d];e.removeFrom(this.filteredItems,f)}},m.prototype.shuffle=function(){for(var a=0,b=this.items.length;b>a;a++){var c=this.items[a];c.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},m.prototype._noTransition=function(a){var b=this.options.transitionDuration;this.options.transitionDuration=0;var c=a.call(this);return this.options.transitionDuration=b,c},m.prototype.getFilteredItemElements=function(){for(var a=[],b=0,c=this.filteredItems.length;c>b;b++)a.push(this.filteredItems[b].element);return a},m});
*/

/*eyoucms.js*/
$(document).ready(function() {
    var navHead = {
            init: function() {
                if (device_type == 'd') {
                    var _this = this,
                        navList = $('.navlist'),
                        $moveEl,
                        $moveShow,
                        navItem = $('.nav-item'),
                        navActive = $('.nav-item>.active').closest('.nav-item');
                    if(!navActive.length) return false;
                    function getWidth(el) {
                        return $(el).width();
                    }

                    function getPos(el) {
                        return $(el).position();
                    }
                    (function creatMoveEl(el) {
                        $moveEl = $('<li class="navMoveEl"><span></span></li>').appendTo('.navlist');
                        $moveShow = $moveEl.find('span');
                        navList.css('position', 'relative');
                        $moveEl.css({
                            position: 'absolute',
                            left: getPos(navActive).left,
                            bottom: '15px',
                            width: getWidth(navActive),
                            height: '3px',
                            'z-index': -1,
                            background: '#ff5500'
                        });

                    })();
                    navItem.on('mouseenter', function(event) {
                        var _this = this,
                            subNav = $(this).find('.subnav:not(:animated)')
                        if (subNav[0]) {
                            subNav.slideDown(200);
                            $moveEl.stop().animate({
                                width: getWidth(_this),
                                left: getPos(_this).left,
                                opacity: 0
                            });
                        } else {
                            $moveEl.stop().animate({
                                width: getWidth(_this),
                                left: getPos(_this).left,
                                opacity: 1
                            });
                        }
                        $moveShow.stop().animate({
                            width: '100%',
                            opacity: '1'
                        });
                    });
                    navItem.on('mouseleave', function(event) {
                        var subNav = $(this).find('.subnav');
                        if (subNav.length) {
                            subNav.slideUp();
                        }
                        navList.on('mouseleave', function(event) {
                            $moveEl.stop().animate({
                                width: getWidth(navActive),
                                left: getPos(navActive).left,
                                opacity: '1'
                            });
                        });
                    });
                }
            }
        },
        banner = {
            init: function() {
                if($('.ey-banner').length>0){
                    function c() {
                        a.bullets.eq(0).addClass("firsrCurrent")
                    }
                    var b, a = new Swiper(".ey-banner .banner-container", {
                            wrapperClass: 'banner-wrapper',
                            slideClass: 'banner-item',
                            autoplay: 4000,
                            speed: 1e3,
                            loop: !0,
                            runCallbacksOnInit: !1,
                            watchSlidesProgress: !0,
                            pagination: ".banner-pagination",
                            paginationClickable: !0,
                            paginationBulletRender: function(a, b, c) {
                                return '<li class="' + b + '"><span><i></i></span></li>'
                            },
                            nextButton: ".banner-next",
                            prevButton: ".banner-prev"
                        });
                    for (b = 0; b < a.slides.length; b++) a.slides[b].style.zIndex = b;
                    setTimeout(c, 1);
                }
            }
        },
        templates = {
            init: function() {
                var tab = '.ey-index-templates .nav-tabs li',
                    tem = '.ey-index-templates #templates';
                if(!$(tem).length) return false;
                IsotopeNum(tem, tab);

                function IsotopeNum(itObj, itControl) {
                    var itFun = $(itObj).isotope(),
                        intItControlAttr = $(itControl + '.active a').data('filter');
                    $(itControl).on('click', 'a', function() {
                        var filterValue = $(this).data('filter'),
                            filterValues = filterValue == '*' ? '[data-type]' : '[data-type=' + filterValue + ']',
                            num = $(this).data('num');
                        if (num) filterValues = function() {
                            return $(this).index() < num;
                        } || filterValues;
                        itFun.isotope({
                            filter: filterValues
                        });
                        if (filterValue != intItControlAttr) {
                            $(filterValues + ' [data-original]').each(function() {
                                if ($(this).data('original') != $(this).attr('src'))
                                    $(this).lazyload({
                                        event: 'sporty'
                                    }).trigger('sporty');
                            });
                        }
                    });
                    // 触发默认选项点击效果
                    if ($(itControl + '.active').length>0) {
                        setTimeout(function() {
                            $(itControl + '.active a').trigger('click');
                        }, 230);
                    }
                }
            }
        };
    // M['index'] = [navHead, banner, templates];
    // for (var i = M['index'].length - 1; i >= 0; i--) {
    //  M['index'][i].init();
    // }
    $('.ey-index-body [data-original]').lazyload({
        threshold:50
    });
})

/**
 * 封装的加载层
 */
function layer_loading(msg){
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

    return loading;
}

//在iframe内打开页面操作
function openFullframe(obj,title,width,height) {
    //iframe窗
    var url = '';
    if (typeof(obj) == 'string' && obj.indexOf("?m=admin&c=") != -1) {
        url = obj;
    } else {
        url = $(obj).data('href');
    }
    if (!width) width = '80%';
    if (!height) height = '80%';
    var iframes = layer.open({
        type: 2,
        title: title,
        fixed: true, //不固定
        shadeClose: false,
        shade: 0.3,
        // maxmin: true, //开启最大化最小化按钮
        area: [width, height],
        content: url,
        end: function() {
            if (1 == $(obj).data('closereload')) window.location.reload();
        }
    });
    if (width == '100%' && height == '100%') {
        layer.full(iframes);
    }
}