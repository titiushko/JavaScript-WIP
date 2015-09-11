require(['log4javascript'], function(log4j) {
	var log4j = log4javascript;

	var ajaxAppender = new log4j.AjaxAppender('http://localhost/error/Log4JavaScript');
	var ajaxLayout = new log4j.PatternLayout('%d{HH:mm:ss} %-5p %c %m%n');
	ajaxAppender.setLayout(ajaxLayout);
	ajaxAppender.setThreshold(log4j.Level.DEBUG);

	log4j.setEnabled(true);

	var log = log4j.getLogger('tito');

	log.addAppender(ajaxAppender);

	// Capturador de errores javascript
	window.onerror = function(message, url, linenumber) {
		alert("mensaje=" + message + "\nurl=" + url + "\nlinenumber=" + linenumber);
		log.error(message + ", " + url + ", " + linenumber);
	}

	// ¡Atención!: La siguiente linea de código va a producir un error
	//error;
});
