jQuery(document).ready(
	
function() {

/**CUSTOM SELECT**/
var ulprovincias="";

      $("#Inicio_idProvincia option").each(function(){
	  		  	  
        ulprovincias +="<li value="+$(this).attr('value')+">"+ $(this).text() + "</li>";
		 
      });
	  
	  	$('#Inicio_idProvincia').css('display','none');
				
		$('#Inicio_idProvincia').parent().prepend("<ul class='custom-options-provincias'>" + ulprovincias + "</ul>");
		$('#Inicio_idProvincia').parent().prepend("<div class='custom-select-provincias'></div>");
		
		$('.custom-select-provincias').click(function(){
			$('.custom-options-recursos').slideUp('fast');
			if ($('.custom-options-provincias').css('display')=='none'){
			$('.custom-options-provincias').slideDown('fast');}
			
			else{
				$('.custom-options-provincias').slideUp('fast');
			}
						
		});
		
		$('.custom-options-provincias li').click(function(){
		
			$('.custom-select-provincias').html($(this).text());
			
			$('#Inicio_idProvincia').attr('value',$(this).attr('value'));
			$('.custom-options-provincias').slideUp('fast');
		
		});
		



			

		
});