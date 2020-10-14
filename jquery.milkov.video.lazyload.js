/**
 * jQuery Video Lazyload
 * Lightweight plugin for lazyloading HTML5 videos
 */

 ;(function($) {
 	$.fn.lazyVideo = function(threshold, callback) {
 		var $w = $(window),
 		th = threshold || 0,
 		videos = this,
 		loaded;

 		this.one("lazyVideo", function() {
 			var that = this;
 			$(this).find('source').each(function() {
 				source = $(this).attr('data-src');
 				if (!source) return true;
 				this.setAttribute("src", source);
 				$(that).load();
 			});
 		});

 		function lazyVideo() {
 			var inview = videos.filter(function() {
 				var $el = $(this);
 				if ($el.is(":hidden") || window.outerWidth < 768) return;
 				var wt = $w.scrollTop(), wb = wt + $w.height(), et = $el.offset().top, eb = et + $el.height();
 				return eb >= wt - th && et <= wb + th;
 			});
 			loaded = inview.trigger("lazyVideo");
 			videos = videos.not(loaded);
 		}
 		$w.on("scroll.lazyVideo resize.lazyVideo lookup.lazyVideo", lazyVideo);
 		lazyVideo();
 		return this;
 	};
 })(window.jQuery);
