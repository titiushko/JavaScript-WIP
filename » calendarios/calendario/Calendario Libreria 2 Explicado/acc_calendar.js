/* acc-calendar v 1.0 / Calendario accesible en javascript.
   Copyright (C) 2007  Jorge Rumoroso
   http://www.niquelao.net

   Esta obra está hecha bajo una licencia de Creative Commons:
   http://creativecommons.org/licenses/by-nc-sa/2.5/es
*/
var formato = 'dd/mm/yyyy';
var fichero_consulta = '../days.php'; // Dirección que devuelve los días disponibles del mes y año
var dir_imagenes = 'acc_calendar/image'; //Direcctorio donde se encuentren las imágenes
var preposiciones = {
	ca : new Array('de','para'),
	es : new Array('de','para'),
	en : new Array('of','to')
	};
var carga = {
	ca : new Array('Carregant...'),
	es : new Array('Cargando...'),
	en : new Array('Loading...')
	};
var Meses = {
	ca : new Array('Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Septembre','Octubre','Novembre','Desembre'),
	es : new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'),
	en : new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
	};
var encabezados = {
	ca : new Array('Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte','Diumenge'),
	es : new Array('Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'),
	en : new Array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
	};
var texto_enlace = {
	ca : 'Calendari',
	es : 'Calendario',
	en : 'Calendar'
	};
var title_enlace = {
	ca : 'Desplegar per seleccionar la data per',
	es : 'Desplegar para seleccionar la fecha para',
	en : 'Unfold to select date to'
	};
var go_month = {
	ca : 'Accedir al mes',
	es : 'Acceder al mes',
	en : 'Go to month'
	};
var go_year = {
	ca : 'Accedir al any',
	es : 'Acceder al año',
	en : 'Go to year'
	};
var summary = {
	ca : 'Calendari amb els dies disponibles corresponents al mes de',
	es : 'Calendario con los días disponibles correspondientes al mes de',
	en : 'Calendar with the available days of'
	};
var close_text = {
	ca : 'Tancar el calendari',
	es : 'Cerrar el calendario',
	en : 'Close calendar'
	};
var tit_dia = {
	ca : 'Seleccionar aquesta data',
	es : 'Seleccionar esta fecha',
	en : 'Select this date'
	};
var label_mes = {
	ca : 'Mes',
	es : 'Mes',
	en : 'Month'
	};
var label_year = {
	ca : 'Any',
	es : 'Año',
	en : 'Year'
	};
var label_class = { // el nombre de clase que haga aparecer el enlace para abrir el calendario asociado a un campo
	ca : 'data',
	es : 'fecha',
	en : 'date'
	};
var lang = document.getElementsByTagName('html')[0].getAttribute('lang');
if(!lang) 
	var lang = document.getElementsByTagName('html')[0].getAttribute('xml:lang');
if(!lang)
	lang = 'es';
else
	lang = lang.toLowerCase();
if(lang.substr(0,2) != 'es' && lang.substr(0,2) != 'en' && lang.substr(0,2) != 'ca')
	var lang = 'es';
var DiasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var tope;
var destino;
var tope_mes = true;
var todact;
var Hoy_real = new Date();
var labels = document.getElementsByTagName('label');
var inputs = document.getElementsByTagName('input');
var nav = navigator.userAgent.toLowerCase(); 
this.nav = nav;
var destino;
var comp = 1900;
if(nav.indexOf("msie") != -1 || (nav.indexOf("opera") != -1 && parseFloat(navigator.appVersion,10) >= 9.5)) {
	comp = 0;
}
document.onkeydown = teclado;
var contador = 1;
function teclado(event){
	var key;
    if (!event)
      var event = window.event;
    if (window.event)
       key = window.event.keyCode;
    else if (event.which)
       key = event.which;
    else
       return true;
    if (!key)
       return true;
    if (key == 27 || key == 32 && document.getElementById('bio_calendar')){
		cierra(destino)
		return false;	  
	}
    return true;
}
function insertAfter(previo,nodo) {
	var parent_previo = previo.parentNode;
	if (previo.nextSibling) {
		parent_previo.insertBefore(nodo, previo.nextSibling)
	} else {
		parent_previo.appendChild(nodo);
	}
}
function cierra(destino) {
	if(document.getElementById('bio_calendar')){
		document.getElementById('bio_calendar').parentNode.removeChild(document.getElementById('bio_calendar'));
	        if(destino) {
        	    if (document.getElementById(destino).disabled == false){
	                document.getElementById(destino).focus()
        	    }
	        }
        }
}
function padre(element,tag) {
	if (element == null)
		return null;
	else if (element.nodeType == 1 && element.tagName.toLowerCase() == tag.toLowerCase())
		return (element)
	else
		return padre(element.parentNode,tag);
}
function zindex(element) {
	if (element == null)
		return null;
	else if (element.nodeType == 1 && element.tagName.toLowerCase() != 'body')
		element.parentNode.style.zIndex = 1000 + contador;
	else
		return zindex(element.parentNode)
}
function obten_texto(element) {
	if (element.nodeType == 3) return element.nodeValue;
	var texto = new Array(),i=0;
	while(element.childNodes[i]) {
		texto[texto.length] = obten_texto(element.childNodes[i]);
		i++;
	}
	return texto.join("");
}
function carga_estilos() {
	var scripts = document.getElementsByTagName('script');
	for (var i = 0; i < scripts.length; i++) {
		if(scripts[i].src.indexOf('acc_calendar.js') > -1) {
			var ruta = scripts[i].src.replace('.js','.css');
			var link_style = document.createElement('link');
			link_style.setAttribute('rel','stylesheet');
			link_style.setAttribute('type','text/css');
			link_style.setAttribute('href',ruta);
			insertAfter(scripts[i],link_style)
		}
	}
}
function cargaLinks() {
	for (var i = 0; i < labels.length; i++) {
		var asociado = labels[i].htmlFor;
		var elasociado = document.getElementById(asociado);
		if(!document.getElementById('cal_' + asociado)){
			var destinos = new Array();
			if(elasociado.type == 'text' && elasociado.className.indexOf(label_class[lang.substr(0,2)]) != -1) {
				if(elasociado.className) {
					var group = elasociado.className.split(' ');
					for(var a = 0; a < group.length; a++){
						if(group[a].indexOf(label_class[lang.substr(0,2)]) != -1 && group[a].length > label_class[lang.substr(0,2)].length){
							destinos = getElementsByClassName(document, 'input', group[a])
						}
					}
					if(destinos.length == 3){
						elasociado = destinos[0];
						i = i + 2;
					}
				}
				var dest = elasociado.id;
				var enl_cal = document.createElement('a');
				enl_cal.className = 'enl_cal';
				if(destinos.length == 3) enl_cal.className = 'enl_cal_group';
				enl_cal.id = 'cal_' + dest;
				var enl_cal_img = document.createElement('img');
				enl_cal_img.setAttribute('alt',texto_enlace[lang.substr(0,2)]);
				enl_cal_img.setAttribute('src',dir_imagenes + '/acc_calendar.png');
				enl_cal.appendChild(enl_cal_img);
				var rango = 0;
				if(elasociado.className.indexOf('rang') != -1) {
					var jar = elasociado.className.split('rang');
					var fin = jar[1].indexOf(' ');
					if (fin != -1)
						rango = jar[1].substr(0,fin);
					else
						rango = jar[1];
				}
				if(elasociado.className.indexOf('todnact') != -1)
					todact = false
				else
					todact = true;
				var cons_disp = false;
				if(elasociado.className.indexOf('disp') != -1)
					cons_disp = true;
				enl_cal.setAttribute('href','javascript:calendario(' + cons_disp + ',' + todact + ',' + Hoy_real.getMonth() + ',"","","' + dest +'",' + rango + ')');
				enl_cal.setAttribute('title',title_enlace[lang.substr(0,2)] + ' ' + obten_texto(labels[i]));
					if(destinos.length < 3){
						if(padre(elasociado,'label')){
							insertAfter(padre(elasociado,'label'),enl_cal);
						}else{
							insertAfter(elasociado,enl_cal);
						}
					}else{
						elasociado.parentNode.parentNode.insertBefore(enl_cal,elasociado.parentNode)
					}
					if(!enl_cal.parentNode.style.position)
						enl_cal.parentNode.style.position = 'relative';
			}
		}
	}
}
Array.prototype.indexOf = function(s) {
	for (var x=0;x<this.length;x++)
		if(this[x] == s)
			return x+1;
}
function calendario(cons_disp,todact,mes,year,nuevo,id,rango,dia) {
	var calendar = document.getElementById('bio_calendar')
	if(id != destino && calendar){
		cierra(destino)
		calendar = false;
	}
	if (calendar){
		var all_el = new Array('nav_mes','label_Meses');
		for(i = 0; i < all_el.length ; i++) {
			if(document.getElementById(all_el[i]))
				calendar.removeChild(document.getElementById(all_el[i]));
		}
		if(rango > 0) {
			calendar.removeChild(document.getElementById('nav_year'));
			calendar.removeChild(document.getElementById('label_year'));
		}
		document.getElementById('calendario').removeChild(document.getElementById('caption'));
		document.getElementById('calendario').removeChild(document.getElementById('tbody'));
	}else{
			calendar = document.createElement('div');
	}
	calendar.id = 'bio_calendar';
	if(!document.getElementById('calendario')){
		insertAfter(document.getElementById('cal_' + id),calendar);
		zindex(calendar);
		calendar.style.top = (document.getElementById(id).offsetHeight + document.getElementById(id).offsetTop) + 'px';
		calendar.style.left = (document.getElementById('cal_' + id).offsetLeft-2*(calendar.offsetWidth/3)) + 'px';
	}
	if(!document.getElementById('close_it')) {
		var close_it = document.createElement('div');
		close_it.id = 'close_it';
		var close_it_enl = document.createElement('a');
		var close_it_enl_text = document.createTextNode(close_text[lang.substr(0,2)]);
		close_it_enl.setAttribute('href','javascript:cierra("' + id +'")');
		close_it_enl.appendChild(close_it_enl_text);
		close_it.appendChild(close_it_enl);
		calendar.appendChild(close_it);
	}
	if(!document.getElementById('niquelao')) {
		var niquelao = document.createElement('img');
		niquelao.id = 'niquelao';
		niquelao.src = dir_imagenes + '/niquelao.png';
		niquelao.setAttribute('alt','www.niquelao.net');
		calendar.appendChild(niquelao);
	}
	var en_carga = document.createElement('img');
	en_carga.id = 'en_carga';
	en_carga.src = 'acc_calendar/loading.gif';
	en_carga.setAttribute('alt',carga[lang.substr(0,2)]);
	calendar.appendChild(en_carga)
	destino = id;
	var Hoy = new Date();
	if(document.getElementById(id).className.indexOf('post') != -1) {
		tope = 2;
	}else if(document.getElementById(id).className.indexOf('prev') != -1) {
		tope = 1;
	} else{
		tope = 0;
	}
	if(!(mes+1)){
		mes = Hoy.getMonth();
	}
	if(!year){
		year = Hoy.getYear()
	}

	ajax_izar.sendRequest(cons_disp,fichero_consulta,function(req,val,cons_disp) {
		if(destino == id){
		 	var disponibles = new Array;
		 	if(val){
				var disponibles = req.responseText.split(',');
				for(var i = 0; i < disponibles.length; i++)
					disponibles[i] = disponibles[i] + 'd';
			}else{
				for(var i = 0; i <= 31; i++)
					disponibles.push( i + 'd');
			}
			if(id != destino) cierra(destino)
			Hoy.setMonth(mes);
			Hoy.setYear(year+comp);
			Anyo = Hoy.getYear()+comp;
			if (((Anyo % 4 == 0) && (Anyo % 100 != 0)) || (Anyo % 400 == 0)){
		    	DiasPorMes[1] = 29;
			}else{
		    	DiasPorMes[1] = 28;
			}
			NDias =DiasPorMes[mes];
			PrimerDia = Hoy;
			PrimerDia.setDate(1);
			if(lang == 'en-us')
				PrimerDia.setDate(2);
			Comienzo = PrimerDia.getDay();
			if(Comienzo == 0) {
				Comienzo = 7;
			}
			var total = Comienzo+NDias;
			var celda = new Array();
			for(var i = 0; i < Comienzo-1; i++){
				celda[i] = '';
			}
			for(var i = Comienzo-1; i < total-1; i++){
				celda[i] = i-Comienzo+2;
			}
			var resto = 7 - (i % 7);
			if(resto < 7){
				var white = celda.length+resto;
				for(var cont = celda.length; cont < white; cont++){
					celda[cont] = '';
				}
			}
			var semanas = (celda.length/7)-1;
			var calendario_tbody_tr_td = new Array();
			for(var i = 0; i < celda.length; i++){
				calendario_tbody_tr_td[i] = document.createElement('td');
				var calendario_tbody_tr_td_text = document.createTextNode(celda[i]);
				if(disponibles.indexOf(celda[i] + 'd') >= 0){
					var marc_dia = document.createElement('a');
					marc_dia.id = 'dat_' + celda[i];
					marc_dia.setAttribute('href','javascript:send_date(' + cons_disp + ',' + todact + ',"' + calendario_tbody_tr_td_text.nodeValue + '/' + (mes+1) + '/' + (year+comp) + '","'+ id +'",'+ rango +')');
					marc_dia.onclick = function() {
						var day_week = document.getElementById('nombre_dia_'+id);
						if(day_week) {
							if(day_week.tagName.toLowerCase() != 'input') {
								if(document.getElementById('nw_'+id))
									day_week.removeChild(document.getElementById('nw_'+id));
								var nw = document.createElement('span');
								nw.id = 'nw_'+id;
								nw.appendChild(document.createTextNode(encabezados[lang.substr(0,2)][padre(this.parentNode,'td').id.substring(3,4)]));
								day_week.appendChild(nw);
							}else{
								day_week.value = encabezados[lang.substr(0,2)][padre(this.parentNode,'td').id.substring(3,4)];
							}
						}
					}
					marc_dia.setAttribute('title',tit_dia[lang.substr(0,2)]);
				}else{
					var marc_dia = document.createElement('span');
				}
				if(celda[i] == Hoy_real.getDate() && mes == Hoy_real.getMonth() && year == Hoy_real.getYear()) {
					var strong = document.createElement('strong');
					calendario_tbody_tr_td[i].className = 'hoy';
					if(todact) {
						marc_dia.appendChild(calendario_tbody_tr_td_text);
						strong.appendChild(marc_dia);
						calendario_tbody_tr_td[i].className = 'act';
					}else{
						strong.appendChild(calendario_tbody_tr_td_text);
						calendario_tbody_tr_td[i].className = 'inact';
					}
					calendario_tbody_tr_td[i].appendChild(strong);
				}else if(celda[i] > 0){
					if((((celda[i] < Hoy_real.getDate()) && (mes == Hoy_real.getMonth() && year == Hoy_real.getYear())) || (mes < Hoy_real.getMonth() && year == Hoy_real.getYear())  || (year < Hoy_real.getYear())) && celda[i] >0){
						if( tope != 2){
							marc_dia.appendChild(calendario_tbody_tr_td_text);
							calendario_tbody_tr_td[i].appendChild(marc_dia);
							calendario_tbody_tr_td[i].className = 'act';
						}else{
							calendario_tbody_tr_td[i].appendChild(calendario_tbody_tr_td_text);
							calendario_tbody_tr_td[i].className = 'inact';
						}
					} else {
						if( tope != 1){
							marc_dia.appendChild(calendario_tbody_tr_td_text);
							calendario_tbody_tr_td[i].appendChild(marc_dia);
							calendario_tbody_tr_td[i].className = 'act';
						}else{
							calendario_tbody_tr_td[i].appendChild(calendario_tbody_tr_td_text);
							calendario_tbody_tr_td[i].className = 'inact';
						}
					}
				} else {
					calendario_tbody_tr_td[i].appendChild(calendario_tbody_tr_td_text);
				}
				if(celda[i] == dia)
					calendario_tbody_tr_td[i].className = 'elect ' + calendario_tbody_tr_td[i].className;
			}
			if(!document.getElementById('calendario')) {
				var calendario = document.createElement('table');
				calendario.id = 'calendario';
			}else{
				calendario = document.getElementById('calendario')
			}
			calendario.setAttribute('summary',summary[lang.substr(0,2)] + ' ' + Meses[lang.substr(0,2)][mes] + ' ' + preposiciones[lang.substr(0,2)][0] + ' ' + Anyo);
			var calendario_caption = document.createElement('caption');
			calendario_caption.id = 'caption';
			var texto_caption = document.createTextNode( Meses[lang.substr(0,2)][mes] + ' ' + (year+comp));
			calendario_caption.appendChild(texto_caption);
			calendario.appendChild(calendario_caption);
			if(lang != 'en-us' && !document.getElementById('calendario')) {
				var nor_day = document.createElement('colgroup');
				nor_day.setAttribute('span','5');
				var week_day = document.createElement('colgroup');
				week_day.className = 'end';
				week_day.setAttribute('span','2');
				calendario.appendChild(nor_day);
				calendario.appendChild(week_day);
			}
			var calendario_thead = document.createElement('thead');
			var calendario_thead_tr = document.createElement('tr');
			for (var i = 0; i < encabezados[lang.substr(0,2)].length; i++) {
				var calendario_thead_tr_th = document.createElement('th');
				calendario_thead_tr_th.setAttribute('scope','col');
				var calendario_thead_tr_th_abbr = document.createElement('abbr');
				var n = i;
				if(lang == 'en-us') {
					n = i - 1;
					if(n == -1)
						n = 6;
					else if(n+1 == encabezados.length)
						n = 0;
				}
				calendario_thead_tr_th_abbr.setAttribute('title',encabezados[lang.substr(0,2)][n]);
				var calendario_thead_tr_th_abbr_text = document.createTextNode(encabezados[lang.substr(0,2)][n].substr(0,3));
				calendario_thead_tr_th_abbr.appendChild(calendario_thead_tr_th_abbr_text);
				calendario_thead_tr_th.appendChild(calendario_thead_tr_th_abbr);
				calendario_thead_tr.appendChild(calendario_thead_tr_th);
			}
			calendario_thead.appendChild(calendario_thead_tr);
			if(!document.getElementById('calendario'))
				calendario.appendChild(calendario_thead);
			var calendario_tbody = document.createElement('tbody');
			calendario_tbody.id = 'tbody';
			for(var i = 0; i <= semanas; i++){
				var calendario_tbody_tr = document.createElement('tr');
				for(a = 0; a < 7; a++){
					if(calendario_tbody_tr_td[(i*7)+a]) {
						calendario_tbody_tr_td[(i*7)+a].id = 'dw_' + a;
						if(a == 5) 
							calendario_tbody_tr_td[(i*7)+a].className = 'sat ' + calendario_tbody_tr_td[(i*7)+a].className;
						else if (a == 6)
							calendario_tbody_tr_td[(i*7)+a].className = 'sun ' + calendario_tbody_tr_td[(i*7)+a].className;
						calendario_tbody_tr.appendChild(calendario_tbody_tr_td[(i*7)+a]);
					}
				}
				calendario_tbody.appendChild(calendario_tbody_tr);
			}
			calendario.appendChild(calendario_tbody);
			if(!document.getElementById('calendario')){
				zindex(calendar);
				contador = contador + 1;
				calendar.style.top = (document.getElementById(id).offsetHeight + document.getElementById(id).offsetTop) + 'px';
				calendar.style.left = (document.getElementById('cal_' + id).offsetLeft-2*(calendar.offsetWidth/3)) + 'px';
			}
			crea_nav_year_select(cons_disp,todact,mes,year,id,rango);
			crea_nav_mes_select(cons_disp,todact,mes,year,id,rango);
			en_carga.parentNode.removeChild(en_carga);
			calendar.appendChild(calendario);
			crea_nav_mes(cons_disp,todact,mes,year,id,rango);
			crea_nav_year(cons_disp,todact,mes,year,id,rango);
			if(document.getElementById('nav_year_select')) {
				if(rango == 0)
					document.getElementById('nav_mes_select').focus();
				else
					document.getElementById('nav_year_select').focus();
			}
		}	
	},'month=' + (mes+1) + '&year=' + (year+comp))
	if(calendar)
		zindex(calendar);
}
function crea_nav_mes(cons_disp,todact,mes,year,id,rango){
	var nav_mes = document.createElement('ul');
	nav_mes.id = 'nav_mes';
	var nav_mes_li = document.createElement('li');
	if(mes-1 == -1) {
		var prev_mes = 11;
		var prev_year = year-1;
	}else{
		var prev_mes = mes-1;
		var prev_year = year;
	}
	var nav_mes_li_text = document.createTextNode(Meses[lang.substr(0,2)][prev_mes]);
	var nav_mes_li_a = document.createElement('a');
	nav_mes_li_a.setAttribute('href','javascript:calendario(' + cons_disp + ',' +  todact + ','+ prev_mes + ',' + prev_year + ',"","'+id+'",' + rango +')');
	nav_mes_li_a.appendChild(nav_mes_li_text);
	nav_mes_li_a.setAttribute('title',go_month[lang.substr(0,2)]);
	nav_mes_li.appendChild(nav_mes_li_a);
	var nav_mes_post_li = document.createElement('li');
	nav_mes_li.className = 'post';
	if(mes == 11) {
		var next_mes = 0;
		var next_year = year+1;
	}else{
		var next_mes = mes+1;
		var next_year = year;
	}
	var nav_mes_post_li_text = document.createTextNode(Meses[lang.substr(0,2)][next_mes]);
	var nav_mes_post_li_a = document.createElement('a');
	nav_mes_post_li_a.setAttribute('href','javascript:calendario(' + cons_disp + ',' +  todact + ','+ next_mes + ',' + next_year + ',"","'+id+'",' + rango +')');
	nav_mes_post_li_a.appendChild(nav_mes_post_li_text);
	nav_mes_post_li_a.setAttribute('title',go_month[lang.substr(0,2)]);
	nav_mes_post_li.appendChild(nav_mes_post_li_a);
	switch ( tope ) { 
		case 0:
			if(prev_year >= (Hoy_real.getYear()-rango))
				nav_mes.appendChild(nav_mes_li);
			if(next_year <= (Hoy_real.getYear()+rango))
				nav_mes.appendChild(nav_mes_post_li);
			break
		case 1:
			if(prev_year >= (Hoy_real.getYear()-rango))
				nav_mes.appendChild(nav_mes_li);
			if(next_year <= (Hoy_real.getYear()+1) && next_year <= (Hoy_real.getYear()+rango)){
				if((tope_mes && next_mes <= Hoy_real.getMonth()) || next_year < Hoy_real.getYear()){
					nav_mes.appendChild(nav_mes_post_li);
				}
			}
			break
		case 2:
			if(prev_year >= Hoy_real.getYear() && prev_year >= (Hoy_real.getYear()-rango)){
				if((tope_mes && prev_mes >= Hoy_real.getMonth()) || next_year > Hoy_real.getYear()){
					nav_mes.appendChild(nav_mes_li);
				}
			}
			if(next_year <= (Hoy_real.getYear()+rango))
				nav_mes.appendChild(nav_mes_post_li);
			break
	}
	document.getElementById('bio_calendar').appendChild(nav_mes);
}
function crea_nav_mes_select(cons_disp,todact,mes,year,id,rango){
	var nav_mes_select = document.createElement('select');
	nav_mes_select.id = 'nav_mes_select';
	var nav_mes_select_label = document.createElement('label');
	nav_mes_select_label.htmlFor =  'nav_mes_select';
	nav_mes_select_label.id =  'label_Meses';
	var nav_mes_select_label_text = document.createTextNode(label_mes[lang.substr(0,2)]);
	if(year == Hoy_real.getYear()) {
		switch ( tope ) {
			case 0:
				var from = 0;
				var to = Meses[lang.substr(0,2)].length;
				break
			case 1:
				var from = 0;
				var to = Hoy_real.getMonth()+1;
				break
			case 2:
				var from = Hoy_real.getMonth();
				var to = Meses[lang.substr(0,2)].length;
				break
		}
	}else{
		var from = 0;
		var to = Meses[lang.substr(0,2)].length;
	}
	for(i = from; i < to; i++){
		var nav_mes_select_opt = document.createElement('option');
		if(i == mes){
			nav_mes_select_opt.setAttribute('selected','selected');
		}
		nav_mes_select_opt.innerHTML = Meses[lang.substr(0,2)][i];
		nav_mes_select.appendChild(nav_mes_select_opt)
	}
	nav_mes_select.onchange = function() {
		switch ( tope ) {
			case 0:
				calendario(cons_disp,todact,nav_mes_select.selectedIndex ,year,'',id,rango)
				break
			case 1:
				if((tope_mes && year == Hoy_real.getYear() && nav_mes_select.selectedIndex <= Hoy_real.getMonth()) || year < Hoy_real.getYear()){
					calendario(cons_disp,todact,nav_mes_select.selectedIndex ,year,'',id,rango)
				}else{
					nav_mes_select.selectedIndex = mes
				}
				break
			case 2:
				if((tope_mes && year > Hoy_real.getYear()) || (tope_mes && year == Hoy_real.getYear() && (nav_mes_select.selectedIndex+Hoy_real.getMonth()) >= Hoy_real.getMonth()) || year > Hoy_real.getYear()){
					if(tope_mes && year > Hoy_real.getYear()){
						calendario(cons_disp,todact,nav_mes_select.selectedIndex ,year,'',id,rango)
					}else{
						calendario(cons_disp,todact,nav_mes_select.selectedIndex+Hoy_real.getMonth() ,year,'',id,rango)
					}
				}else{
					nav_mes_select.selectedIndex = mes
				}
				break
		}
	}
	nav_mes_select_label.appendChild(nav_mes_select_label_text);
	nav_mes_select_label.appendChild(nav_mes_select);
	if(document.getElementById('nav_mes_select'))
		document.getElementById('nav_mes_select').focus();
	if(to-from)
		document.getElementById('bio_calendar').appendChild(nav_mes_select_label);
}
function crea_nav_year(cons_disp,todact,mes,year,id,rango){
	var nav_year = document.createElement('ul');
	nav_year.id = 'nav_year';
	var nav_year_li = document.createElement('li');
	nav_year_li.className = 'post';
	var nav_year_li_text = document.createTextNode(year+comp-1);
	var nav_year_li_a = document.createElement('a');
	nav_year_li_a.setAttribute('title',go_year[lang.substr(0,2)]);
	var nav_year_post_li = document.createElement('li');
	var nav_year_post_li_text = document.createTextNode(year+comp+1);
	var nav_year_post_li_a = document.createElement('a');
	nav_year_post_li_a.setAttribute('title',go_year[lang.substr(0,2)]);
	if(!mes) mes = 0;
	nav_year_li_a.appendChild(nav_year_li_text);
	nav_year_li.appendChild(nav_year_li_a);
	nav_year_post_li_a.appendChild(nav_year_post_li_text);
	nav_year_post_li.appendChild(nav_year_post_li_a);
	switch ( tope ) { 
		case 0:
			nav_year_li_a.setAttribute('href','javascript:calendario(' + cons_disp + ',' + todact + ','+ mes + ',' + (year-1) + ',"","'+ id +'",' + rango +')');
			nav_year_post_li_a.setAttribute('href','javascript:calendario(' + cons_disp + ',' + todact + ','+ mes + ',' + (year+1) + ',"","'+ id +'",' + rango +')');
			if((year-1) >= (Hoy_real.getYear() - rango))
				nav_year.appendChild(nav_year_li);
			if(year+1 <= Hoy_real.getYear() + rango)
				nav_year.appendChild(nav_year_post_li);
			break
		case 1:
			nav_year_li_a.setAttribute('href','javascript:calendario(' + cons_disp + ',' + todact + ','+ mes + ',' + (year-1) + ',"","'+ id +'",' + rango +')');
			if(tope_mes && mes <= Hoy_real.getMonth()){
				nav_year_post_li_a.setAttribute('href','javascript:calendario(' + cons_disp + ',' + todact + ','+ mes + ',' + (year+1) + ',"","'+ id +'",' + rango +')');
			}else{
				nav_year_post_li_a.setAttribute('href','javascript:calendario(' + cons_disp + ',' + todact + ','+ Hoy_real.getMonth() + ',' + (year+1) + ',"","'+ id +'",' + rango +')');
			}
			if((year-1) >= (Hoy_real.getYear() - rango))
				nav_year.appendChild(nav_year_li);
			if(year+1 <= Hoy_real.getYear())
				nav_year.appendChild(nav_year_post_li);
			break
		case 2:
			if(tope_mes && mes >= Hoy_real.getMonth()){
				nav_year_li_a.setAttribute('href','javascript:calendario(' + cons_disp + ',' + todact + ',' + mes + ',' + (year-1) + ',"","'+ id +'",' + rango +')');
			}else{
				nav_year_li_a.setAttribute('href','javascript:calendario(' + cons_disp + ',' + todact + ','+ Hoy_real.getMonth() + ',' + (year-1) + ',"","'+ id +'",' + rango +')');
			}
			nav_year_post_li_a.setAttribute('href','javascript:calendario(' + cons_disp + ',' + todact + ','+ mes + ',' + (year+1) + ',"","'+ id +'",' + rango +')');
			if(year-1 >= Hoy_real.getYear())
				nav_year.appendChild(nav_year_li);
			if((year+1) <= (Hoy_real.getYear() + rango))
				nav_year.appendChild(nav_year_post_li);
			break
	}
	if(rango > 0) 
		document.getElementById('bio_calendar').appendChild(nav_year);
}
function crea_nav_year_select(cons_disp,todact,mes,year,id,rango){
	var nav_year_select = document.createElement('select');
	nav_year_select.id = 'nav_year_select';
	var nav_year_select_label = document.createElement('label');
	nav_year_select_label.htmlFor =  'nav_year_select';
	nav_year_select_label.id =  'label_year';
	var nav_year_select_label_text = document.createTextNode(label_year[lang.substr(0,2)]);
	var tope_pre = Hoy_real.getYear() - rango;
	var tope_post = Hoy_real.getYear() + rango;
	if ( tope ==  1)
		tope_post = Hoy_real.getYear();
	else if(tope == 2)
		tope_pre = Hoy_real.getYear();
	tope_pre = tope_pre + comp;
	tope_post = tope_post + comp;
	for(i = tope_pre; i<=tope_post; i++){
		var nav_year_select_opt = document.createElement('option');
		if(i == (year + comp) ){
			nav_year_select_opt.setAttribute('selected','selected');
		}
		nav_year_select_opt.innerHTML = i;
		nav_year_select.appendChild(nav_year_select_opt)
	}
	nav_year_select.onchange = function() {
		switch ( tope ) { 
			case 0:
				calendario(cons_disp,todact,mes ,nav_year_select.options[nav_year_select.selectedIndex].text-comp,"",id,rango)
				break
			case 1:
				if(tope_mes && (nav_year_select.options[nav_year_select.selectedIndex].text-comp < Hoy_real.getYear() || (nav_year_select.options[nav_year_select.selectedIndex].text-comp == Hoy_real.getYear() && mes <= Hoy_real.getMonth()))){
					calendario(cons_disp,todact,mes ,nav_year_select.options[nav_year_select.selectedIndex].text-comp,"",id,rango)
				}else{
					calendario(cons_disp,todact,Hoy_real.getMonth() ,nav_year_select.options[nav_year_select.selectedIndex].text-comp,"",id,rango)
				}
				break
			case 2:
				if(tope_mes &&((nav_year_select.options[nav_year_select.selectedIndex].text-comp > Hoy_real.getYear()) || ((nav_year_select.options[nav_year_select.selectedIndex].text-comp == Hoy_real.getYear()) && mes >= Hoy_real.getMonth()))){
					calendario(cons_disp,todact,mes ,nav_year_select.options[nav_year_select.selectedIndex].text-comp,"",id,rango)
				}else{
					calendario(cons_disp,todact,Hoy_real.getMonth() ,nav_year_select.options[nav_year_select.selectedIndex].text-comp,"",id,rango)
				}
				break
		}
	}
	nav_year_select_label.appendChild(nav_year_select_label_text);
	nav_year_select_label.appendChild(nav_year_select);
	if(rango > 0)
		document.getElementById('bio_calendar').appendChild(nav_year_select_label);
}
function getElementsByClassName(oElm, strTagName, oClassNames){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var arrRegExpClassNames = new Array();
    if(typeof oClassNames == "object"){


        for(var i = 0; i < oClassNames.length; i++){

            arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)"));
        }
    }
    else{
        arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)"));
    }
    var oElement;
    var bMatchesAll;
    for(var j=0; j<arrElements.length; j++){
        oElement = arrElements[j];
        bMatchesAll = true;
        for(var k=0; k<arrRegExpClassNames.length; k++){
            if(!arrRegExpClassNames[k].test(oElement.className)){
                bMatchesAll = false;
                break;                      
            }
        }
        if(bMatchesAll){
            arrReturnElements.push(oElement);
        }
    }
    return (arrReturnElements)
}

function send_date(cons_disp,todact,date,destino,rango) {
		var fecha = date.split('/');
		var day = fecha[0];
		var month = fecha[1];
		var year = fecha[2];
		var destinos = new Array();
		var long_dia = formato.lastIndexOf('d')- formato.indexOf('d') +1;
		var long_mes = formato.lastIndexOf('m')- formato.indexOf('m') +1;
		var long_year = formato.lastIndexOf('y')- formato.indexOf('y') +1;
		if(long_year < 2 || long_year == 3)
			long_year = 2;
		if(long_year > 4)
			long_year = 4;
		var fecha_format = formato;
		if(fecha[0].length == 1 && long_dia >= 2)
			fecha[0] = '0' + fecha[0]
		fecha_format = fecha_format.replace('d',fecha[0]);
		for(i = 0; i <= long_dia; i++) 
			fecha_format = fecha_format.replace('d','');
		if(fecha[1].length == 1 && long_mes >= 2)
			fecha[1] = '0' + fecha[1]
		fecha_format = fecha_format.replace('m',fecha[1]);
		for(i = 0; i <= long_mes; i++) 
			fecha_format = fecha_format.replace('m','');
		var inic = 0;
		if(long_year == 2)
			inic = 2;
		fecha_format = fecha_format.replace('y',fecha[2].substr(inic,long_year));
		for(i = 0; i <= long_year; i++) 
			fecha_format = fecha_format.replace('y','');
		var	input_destino =	document.getElementById(destino)
		var group = input_destino.className.split(' ');
		for(var i = 0; i < group.length; i++){
			if(group[i].indexOf(label_class[lang.substr(0,2)]) != -1 && group[i].length > label_class[lang.substr(0,2)].length){
				destinos = getElementsByClassName(document, 'input', group[i])
			}
		}
		if(destinos.length == 3){
			for(var i = 0; i <= 2; i++){
				if(destinos[i].className.indexOf('day') != -1) destinos[i].value = fecha[0];
				if(destinos[i].className.indexOf('month') != -1) destinos[i].value = fecha[1];
				if(destinos[i].className.indexOf('year') != -1) destinos[i].value = fecha[2];
			}
			cierra(destinos[2].id);
		}else{
			input_destino.value = fecha_format;
			cierra(destino);
		}
			document.getElementById('cal_' + destino).setAttribute('href','javascript:calendario(' + cons_disp + ',' + todact + ',' + (fecha[1]-1) + ', ' + (fecha[2]-comp) + ' ,"","' + destino +'",' + rango + ',' + fecha[0] + ')');
}
ajax_izar = {
	XMLHttpFactories: [
		function () {return new XMLHttpRequest()},
		function () {return new ActiveXObject("Msxml2.XMLHTTP")},
		function () {return new ActiveXObject("Msxml3.XMLHTTP")},
		function () {return new ActiveXObject("Microsoft.XMLHTTP")},
		],
	sendRequest: function(send,url,callback,postData) {
		if(send){
			var req = ajax_izar.createXMLHTTPObject();
			if (!req) return;
			var method = (postData) ? "POST" : "GET";
			req.open(method,url,true);
			req.setRequestHeader('User-Agent','XMLHTTP/1.0');
			if (postData)
				req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
				req.onreadystatechange = function () {
				if (req.readyState != 4) return;
				if (req.status != 200 && req.status != 304) {
					callback(req,false,send);
					return;
				}else{
					callback(req,true,send);
				}
			}
			if (req.readyState == 4) return;
				req.send(postData);
		}else{
			callback(req,false,send);
		}
	},
	createXMLHTTPObject: function(url,callback,postData) {
		var xmlhttp = false;
		for (var i = 0; i < ajax_izar.XMLHttpFactories.length; i++)
		{
			try {
				xmlhttp = ajax_izar.XMLHttpFactories[i]();
			}
			catch (e) {


				continue;
			}
			break;
		}
		return xmlhttp;
	}

}
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
addLoadEvent(carga_estilos);
addLoadEvent(cargaLinks);

