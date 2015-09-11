/**----------------------------------------------------------------------------------
					validar formularios con jquery
------------------------------------------------------------------------------------*/
(function($){
	$.fn.validador = function(opts){
		$(this).find('.elementoVacio').live('keyup', function(){
			if($(this).val()!=""){
				$(this).removeClass('elementoVacio');
			}
		});
		return $(this).submit(function(evt){
			$(this).find('.requiredo').each(function(){
				if ($(this).attr('value') == ''){
					$(this).addClass('elementoVacio');
					evt.preventDefault();
				}
			});
			$(this).find('.elementoVacio').first().focus();
		});
	};
})(jQuery);