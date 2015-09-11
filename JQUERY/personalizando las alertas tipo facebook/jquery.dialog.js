(function($){
	$.fn.dialog = function(data){
		var title, content;
		if(data && data.title){ title = data.title; }else{ title = "Javascript alert"; }
		if(data && data.content){ content = data.content; }else{ content = data; }

		var currentTop = $(document).scrollTop();
		var $dialog = $('<div>', {id: 'dialog', css:{top: currentTop + 150}}).prependTo('body');

		var $wrapper = $('<div>', {id: 'dialog-wrapper'}).appendTo($dialog);
		var $title = $('<h1>').text(title).appendTo($wrapper);
		var $content = $('<div>', {id: 'dialog-content'}).html("<p>"+content+"</p>").appendTo($wrapper);
		var $footer = $('<div>', {id: 'dialog-footer'}).append(
			$('<a>', {'class': 'awesome small orange'})
			.text("Aceptar")
			.click(function(){
				$dialog.fadeOut(function(){$dialog.remove()});
				return false;
			})
		).appendTo($wrapper);
		$dialog.hide().appendTo('body').fadeIn();

		return $(this).keyup(function(evt){
		if (evt.which == 27 || evt.which == 13){
				$dialog.fadeOut(function(){$dialog.remove()});
			}
		});
	}
})(jQuery);

$(document).ready(function(){
	window.alert = $(document).dialog;
	$('[data-title]').click(function(evt){
		evt.preventDefault();
		$(document).dialog({title: $(this).attr('data-title'), content: $(this).attr('data-content')});
	});
});