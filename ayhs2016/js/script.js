/**
 * script
 * 
 * @copyright   RaNa design associates, inc.
 * @author      keisuke YAMAMOTO <keisukey@ranadesign.com>
 * @link        http://kaelab.ranadesign.com/
 * @version     1.0
 * @date        2012
 *
 */
(function($) {

	$(function() {
		/*
			// コンテンツがテキストのみの場合は、これでOK。
			$("#container").masonry({
				isAnimated: true
			});
		*/
		// 画像を使う場合は、画像のローディング処理を待ってから実行する。（webkitで高さが取れないため）
		$("#container").imagesLoaded(function() {
			this.masonry({
				itemSelector: ".box",  // 省略時は直下の要素が対象になる。
				isAnimated: true
			});
		});
	});

}(jQuery));
