'use strict';

function imageAutoLazyloadHelper(content) {
	var str = content.replace(
		/<img.*?src="(.*?)" alt="(.*?)".*?\/?>/gi,
		'<img data-fancybox="gallery" data-sizes="auto" data-src="$1" alt="$2" class="lazyload">'
	);
	str = str.replace(
		/src="images\//g,
		'src="https://raw.sevencdn.com/nexmoe/nexmoe.github.io/images/'
	);
	str = str.replace(
		/\.\.\/\.\.\/images\//g,
		'https://raw.sevencdn.com/nexmoe/nexmoe.github.io/images/'
	);
	return str;
}
hexo.extend.helper.register('image_auto_lazyload', imageAutoLazyloadHelper);
