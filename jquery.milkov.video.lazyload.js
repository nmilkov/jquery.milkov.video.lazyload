/**
 * jQuery Milkov Lazyload
 * Lightweight plugin for lazyloading HTML5 videos
 */

 ;(function($) {
 	$.fn.milkov = function(threshold, callback) {
 		var $w = $(window),
 		th = threshold || 0,
 		videos = this,
 		loaded;

 		this.one("milkov", function() {
 			var that = this;
 			$(this).find('source').each(function() {
 				source = $(this).attr('data-src');
 				if (!source) return true;
 				this.setAttribute("src", source);
 				$(that).load();
 			});
 		});

 		function milkov() {
 			var inview = videos.filter(function() {
 				var $el = $(this);
 				if ($el.is(":hidden") || window.outerWidth < 768) return;
 				var wt = $w.scrollTop(), wb = wt + $w.height(), et = $el.offset().top, eb = et + $el.height();
 				return eb >= wt - th && et <= wb + th;
 			});
 			loaded = inview.trigger("milkov");
 			videos = videos.not(loaded);
 		}
 		$w.on("scroll.milkov resize.milkov lookup.milkov", milkov);
 		milkov();
 		return this;
 	};
 })(window.jQuery);
$("video").milkov();
