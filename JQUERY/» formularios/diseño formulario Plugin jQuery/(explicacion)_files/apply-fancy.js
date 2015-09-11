$(function(){
	strSearch='#logoSage, .full, .fancyzoom';
	if($(strSearch).size() > 0){
		
		// tab de lib
		var tab = new Array(
			THEME_URL+'jscripts/vendors/jquery.shadow.js',
			THEME_URL+'jscripts/vendors/jquery.fancyzoom.js'
		);
		
		loadScript(0,tab,function(){ 
		
			setTimeout(function(){ 
			
				$.fn.fancyzoom.defaultsOptions.imgDir=THEME_URL+'img/fancyzoom/';
				$(strSearch).fancyzoom({Speed:400,showoverlay:true,overlay:4/10});
			
			},800);
			
		});
		
		
	}
});
