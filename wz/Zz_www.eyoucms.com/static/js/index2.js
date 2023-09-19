	
		
	
(function(d) {
	d.fn.lubo = function(b) {
		var g = {
				main: d(this),
				rlbtn: !0,
				Over: "mouseover",
				Out: "mouseout",
				Click: "click",
				Li: "li",
				_cirBox: ".lubo-box-btn",
				_cirOn: ".curr",
				luboTime: 4E3,
				switchTime: 400
			},
			a = d.extend(g, b);
		return this.each(function() {
			function b(a, b) {
				d(a).css("z-index", b)
			}

			function g() {
				f.append('<cite><a class="lubo-left"></a><a class="lubo-right"></a></cite>');
				var e = f.find(".lubo-left"),
					c = f.find(".lubo-right");
				e.bind(a.Click, function() {
					var c = d(a._cirBox),
						e = d(a._cirOn).val();
					f.children(a.Li).eq(e).stop(!1,
						!1).animate({
						opacity: 0
					}, a.switchTime, function() {
						b(this, 0)
					});
					0 >= e && (e = h);
					f.children(a.Li).eq(e - 1).stop(!1, !1).animate({
						opacity: 1
					}, a.switchTime, function() {
						b(this, 1)
					});
					c.children(a.Li).eq(e - 1).addClass(a._cirOn.substring(1)).siblings().removeClass(a._cirOn.substring(1))
				});
				c.bind(a.Click, function() {
					var e = d(a._cirBox),
						c = d(a._cirOn).val();
					f.children(a.Li).eq(c).stop(!1, !1).animate({
						opacity: 0
					}, a.switchTime, function() {
						b(this, 0)
					});
					c == h - 1 && (c = -1);
					f.children(a.Li).eq(c + 1).stop(!1, !1).animate({
							opacity: 1
						}, a.switchTime,
						function() {
							b(this, 1)
						});
					e.children(a.Li).eq(c + 1).addClass(a._cirOn.substring(1)).siblings().removeClass(a._cirOn.substring(1))
				})
			}

			function k() {
				var e = a.main.find(a._cirBox),
					c = e.find(a._cirOn).val();
				f.children(a.Li).eq(c).stop(!1, !1).animate({
					opacity: 0
				}, a.switchTime, function() {
					b(this, 0)
				});
				c == h - 1 && (c = -1);
				f.children(a.Li).eq(c + 1).stop(!1, !1).animate({
					opacity: 1
				}, a.switchTime, function() {
					b(this, 1)
				});
				e.children(a.Li).eq(c + 1).addClass(a._cirOn.substring(1)).siblings().removeClass(a._cirOn.substring(1))
			}
			var f =
				d("." + a.main.attr("class") + "-box"),
				h = f.children(a.Li).length;
			(function() {
				a.main.append('<ul class="' + a._cirBox.substring(1) + '"></ul>');
				for (var b = a.main.find(a._cirBox), c = 0; c < h; c++) b.append('<li style="" value="' + c + '"></li>');
				c = b.width();
				b.css({
					left: "50%",
					marginLeft: -c / 2,
					bottom: "10%"
				});
				b.children(a.Li).eq(0).addClass(a._cirOn.substring(1))
			})();
			a.rlbtn && g();
			int = setInterval(k, a.luboTime);
			a.main.bind(a.Over, function() {
				clearTimeout(int)
			});
			a.main.bind(a.Out, function() {
				int = setInterval(k, a.luboTime)
			});
			d(a._cirBox).children(a.Li).bind(a.Over,
				function() {
					var e = d(this).index();
					d(this).addClass(a._cirOn.substring(1)).siblings().removeClass(a._cirOn.substring(1));
					f.children(a.Li).stop(!1, !1).animate({
						opacity: 0
					}, a.switchTime, function() {
						b(this, 0)
					});
					f.children(a.Li).eq(e).stop(!1, !1).animate({
						opacity: 1
					}, a.switchTime, function() {
						b(this, 1)
					})
				})
		})
	}
})($);
$(function() {
	$(".index-lubo").lubo();
	$(".index-blog-lubo").lubo();
	$(".sidebar-toggle a").hover(function() {
		$(this).addClass("curr").siblings().removeClass("curr");
		$(this).closest(".index-goodsx").find(".goodsx-box>div:eq(" + $(this).index() + ")").removeClass("hide").siblings()
			.addClass("hide")
	});
	$(".rmerit li").hover(function() {
		$(this).addClass("curr").siblings().removeClass("curr");
		$(this).closest("dl").find("dd:eq(" + $(this).index() + ")").show().siblings("dd").hide()
	});
	$("#search_seller").click(function() {
		var d =
			$(this).siblings("input"),
			b = $.trim(d.val()),
			g = $(this).attr("id");
		if ("" == b) return layer.alert(
			"\u8bf7\u8f93\u5165\u8981\u641c\u7d22\u7684\u5546\u5bb6QQ\u6216\u624b\u673a\u53f7\u7801\uff01", {
				icon: 0
			},
			function(a) {
				d.focus();
				layer.close(a)
			});
		if (isNaN(b)) return layer.alert("QQ\u3001\u624b\u673a\u53f7\u7801\u53ea\u80fd\u4e3a\u7eaf\u6570\u5b57", {
			icon: 0
		}, function(a) {
			d.focus();
			layer.close(a)
		});
		if (5 > b.length || 11 < b.length) return layer.alert(
			"QQ\u3001\u624b\u673a\u53f7\u7801\u957f\u5ea6\u8303\u56f4\uff1a5~11\u4f4d", {
				icon: 0
			},
			function(a) {
				d.focus();
				layer.close(a)
			});
		g = $(this).attr("id");
		Aform(g, "value=" + b, function(a) {
			if (-2 == a.state) return layer_lp("\u641c\u7d22", g);
			"all" == a.state ? layer_ly(a.seller, "\u5546\u5bb6\u641c\u7d22\uff1a" + b + " \uff08\u5171<b>" + a.count +
				"</b>\u4e2a\uff09", !1, "400px") : Rs(a)
		})
	});
	$(".sidebar_item dd").hover(function() {
		$(this).find(".sidebar_menu").addClass("sidebar_focus");
		$(this).find(".sidebar_popup").show(0)
	}, function() {
		$(this).find(".sidebar_menu").removeClass("sidebar_focus");
		$(this).find(".sidebar_popup").hide(0)
	})
	


	
});
