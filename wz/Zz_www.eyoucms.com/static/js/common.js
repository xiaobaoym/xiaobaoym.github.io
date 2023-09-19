jQuery(document).ready(function(){
$(function(){
    //锚点跳转滑动效果  
    $('a[href*=#],area[href*=#]').click(function() {  
        console.log(this.pathname)  
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {  
            var $target = $(this.hash);  
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');  
            if ($target.length) {  
                var targetOffset = $target.offset().top-50;  
                $('html,body').animate({  
                            scrollTop: targetOffset  
                        },  
                        800);  
                return false;  
            }  
        }  
    }); 
	 $(".one").click(function(){
          $(this).next().slideToggle();
          $(this).parent().siblings().children("ul").slideUp();
    });
	
	$(".subnav li ul li a").click(function(){ 
	      $(".subnav li ul li a").removeClass('cur');
          $(this).addClass('cur');
    });
})
})
// 置顶
function goTop() {
	$('html,body').animate({
		scrollTop: 0
	},
	500)
}