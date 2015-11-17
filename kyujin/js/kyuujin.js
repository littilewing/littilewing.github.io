$("#seachbtn").click(function () {
		$("#seachform").submit();

});
$(document).ready(function() {
		var pagetop = $('.pagetop');
		$(window).scroll(function () {
				if ($(this).scrollTop() > 400) {
						pagetop.fadeIn();
				} else {
						pagetop.fadeOut();
				}
		});
		pagetop.click(function () {
				$('body, html').animate({ scrollTop: 0 }, 500);
				return false;
		});
});



