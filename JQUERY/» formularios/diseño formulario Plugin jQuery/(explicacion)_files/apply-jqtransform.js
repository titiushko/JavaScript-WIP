$(function(){
	var strlocation = window.location+"";
	if(strlocation.match(/jqtransform/)){
		if($('form.jqtransform').length > 0){
			// tab de lib
			var tab = new Array(
				THEME_URL+'jscripts/vendors/jqtransformplugin/jquery.jqtransform.js'
			);
			loadJS(tab,function(){
					$('form.jqtransform').jqTransform();				
			});
		}
	}
});
