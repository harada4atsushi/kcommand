(function($) {
	var defaultHeight = 70;
	var defaultDuration = 2500;
	var defaultFn = function(imgName, height, duration) {
		$img = $('<img src="' + imgName + '"  />').css('position', 'absolute').css('height', height ? height : defaultHeight);
		$img.css('top', '50%').css('left', - $img.width()).css('margin-top', -($img.height() / 2));
		$(document.body).append($img);
		$img.animate({marginLeft: $(window).width() + $img.width()}, duration ? duration : defaultDuration, 'linear', function() {
			$(this).remove();
		});
	};
	
	// builtin Images
	var imgPaths = {
		default: 'http://harada-atsushi.site44.com/kcommand/images/gradius.png',
		yoyo: 'http://harada-atsushi.site44.com/kcommand/images/yoyo.png',
		fsm: 'http://harada-atsushi.site44.com/kcommand/images/fsm.gif',
	};
	
	// builtin command function
	var funcs = {
		// default, konami command 
		'38,38,40,40,37,39,37,39,66,65': function() {
			defaultFn(imgPaths.default);
		},
		// yoyo
		'89,79,89,79': function() {
			defaultFn(imgPaths.yoyo, 300, 3700);
		},
		// fsm
		'70,83,77': function() {
			defaultFn(imgPaths.fsm, 100, 2000);
		},
	};

	var methods = {
		// initialize
		init: function() {
			var that = this;
			var keyarr = [];
			var imgarr = [];

			// Images preload
			for (key in imgPaths) if (imgPaths.hasOwnProperty(key)) {
				var imgObj = new Image();
				imgObj.src = imgPaths[key];
				imgarr.push(imgObj);
			}

			return this.each(function() {
				$(that).on('keydown', function(event) {
					keyarr.push(event.keyCode);
				
					for (key in funcs) if (funcs.hasOwnProperty(key)) {
						if (keyarr.toString().indexOf(key) >= 0) {
							keyarr = [];
							funcs[key]();
						}
					}	
				});
			});
		},
	   // add custom command and function
		addCommand: function(command, fn) {
			funcs[command] = fn;
		},
		// chamge default image
		setDefault: function(imgPath, height, duration) {
			if (height) defaultHeight = height;
			if (duration) defaultDuration = duration;
			imgPaths.default = imgPath;
		}
	};

	// Method calling logic
 	$.fn.kcommand = function(methodNm) {
		if (methods[methodNm] ) {
			return methods[methodNm].apply(this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof methodNm === 'object' || !methodNm ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'methodNm ' +  methodNm + ' does not exist on jQuery.kcommand' );
		}    
	};
})(jQuery);

// auto apply
$(function() {
	$(document).kcommand('init');
});
