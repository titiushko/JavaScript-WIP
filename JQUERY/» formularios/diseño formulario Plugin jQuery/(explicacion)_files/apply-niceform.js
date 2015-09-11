$(function(){

	if($('.niceform').size() > 0){
		
		// tab de lib
		var tab = new Array(
			THEME_URL+'jscripts/vendors/nicejforms.js'
		);
		
		loadScript(0,tab,function(){ 
		
			setTimeout(function(){ 
			
				$.NiceJForms.build({
					imagesPath:THEME_URL+"img/formtheme/"
				});
				
			},400);
			
		});
		
	}
});