$.cachedScript = function(url,type,options) {
	if($.isPlainObject(type)){
		options = type;
		type = false;
	}
	if(type){
		ext = type;
	}else{
		ext=url.split('.');
		ext=ext[ext.length-1].split('?')[0];
	}
	if(ext=='js'){
		options = $.extend( options || {}, {
			dataType: "script",
			cache: true,
			url: url
		});
	}else if(ext=='css'){
		$("<link/>", {
		   rel: "stylesheet",
		   cache: true,
		   type: "text/css",
		   href: url
		}).appendTo("head");
		options = $.extend( options || {}, {
			url: 'libraries/system/index.php'
		});
	}else{
		alert('No admitido .'+ext+' en la ruta: '+url);
	}
	return $.ajax( options );
}