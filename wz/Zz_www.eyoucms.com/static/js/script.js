//窗口水平居中
$(window).resize(function(){
    tc_center();
});

function tc_center(){
    var _top=($(window).height()-$(".layerbox").height())/2;
    var _left=($(window).width()-$(".layerbox").width())/2;

    $(".layerbox").css({top:_top,left:_left});
}

$(document).ready(function(){
	//瀑布流代码
	var $container = $('.picbox');

    $(".lazy").scrollLoading({
     	callback: function() {
			$container.imagesLoaded(function(){
				$container.masonry('reload');
			});
		}
	});

	$container.imagesLoaded(function(){
		$container.masonry({
			itemSelector: '.item',
			columnWidth: 0 //每两列之间的间隙为5像素
		});
	});
});



