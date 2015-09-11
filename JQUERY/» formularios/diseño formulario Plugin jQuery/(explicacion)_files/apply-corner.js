$(function(){

	if($('.rounded').size() > 0){
		
		// tab de lib
		var tab = new Array(
			THEME_URL+'jscripts/vendors/jquery.curvycorners.js'
		);
		
		loadScript(0,tab,function(){ 
		
			setTimeout(function(){ 
			
				$(".rounded").corner();
				
			},400);
			
		});
		
	}
});
