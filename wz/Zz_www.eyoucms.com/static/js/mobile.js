(function () {
	'use strict';
	var mobileMenuOutsidebarClick = function() {
		$(document).click(function (e) {
			var container = $("#m-nav, .nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ( $('body').hasClass('offcanvas-visible') ) {
					$('body').removeClass('offcanvas-visible');
					$('.nav-toggle').removeClass('cur');
					$('#m-nav').removeClass('show');
				}
			}
		});
	};
	var offcanvasMenu = function() {
		$('body').prepend('<div id="m-nav" />');
		if($('body  .top-member-boxs')){
		   $('body  .top-member-boxs').prepend('<div class="float-right m-menu-ico"><a href="#" class="nav-toggle fh5co-nav-toggle"><i></i></a></div>');
		}
		if($('#pc-header .nav')){
		  $('#m-nav').append($('#pc-header .nav').clone());
		}
        if($("body .sidebar")){
          $("body .sidebar").prepend('<a href="#" class="js-nav-toggle nav-toggle"><i></i></a>');
		}
		if($(".pc-nav ul.subnav"))
		{
          $("#m-nav").append($(".pc-nav ul.subnav").clone())
		}
	};
	var burgerMenu = function() {
		$('body').on('click', '.nav-toggle', function(event){
			var $this = $(this);
			$('body').toggleClass('fh5co-overflow offcanvas-visible');
			$this.toggleClass('cur');
			$('#m-nav').toggleClass('show');
			event.preventDefault();
		});
		$(window).resize(function() {
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.nav-toggle').removeClass('cur');
			$('#m-nav').removeClass('show');
		   }
		});
		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.nav-toggle').removeClass('cur');
			$('#m-nav').removeClass('show');
		   }
		});
	};
	$(function(){
        mobileMenuOutsidebarClick();
		offcanvasMenu();
		burgerMenu();
	});
}());