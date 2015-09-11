/*		Alias para document.getElementById	*/
function tag(id)	{return document.getElementById(id);}

/*		Alias para document.createElement	*/
function crear(t)	{return document.createElement(t);}

/*		Alias para document.createTextNode	*/
function texto(cual)	{return document.createTextNode(cual);}

/*		Alias para la instrucci�n de cancelaci�n: return false;		*/
function cancelar()	{return false;}

/************************************************************************
*		Selecci�n de pesta�as declaradas inline			*
************************************************************************/

window["mostrarPesta�a"] = function(sistema, cual)	{
	soy = cual.id;
	contenido = soy.substr(1);
	for (var i = 0, total = sistema.items.length; i < total; i ++)
		tag(sistema.items[i]).style.display = (sistema.items[i] == contenido) ? "block" : "none";
	for (i = 0, todos = sistema.items, total = todos.length; i < total; i ++)
		tag("P" + todos[i]).className = "pesta�a " +  sistema.off;
	tag("P" + contenido).className = "pesta�a " + sistema.on;
}


/************************************************************************
*		Selecci�n de pesta�as: asignaci�n onload		*
************************************************************************/

window["mostrar_Pesta�a"] = function(e)	{
	yo = (e) ? e.target : event.srcElement;
	soy = yo.id;
//alert(soy);

	sistema = window[yo.parentNode.parentNode.id];
	contenido = soy.substr(1);
	for (var i = 0, total = sistema.items.length; i < total; i ++)
		tag(sistema.items[i]).style.display = (sistema.items[i] == contenido) ? "block" : "none";
	for (i = 0, todos = sistema.items, total = todos.length; i < total; i ++)
		tag("P" + todos[i]).className = "pesta�a " +  sistema.off;
	tag("P" + contenido).className = "pesta�a " + sistema.on;
}


/************************************************************************
*		Inicializaci�n "onload" del sistema de pesta�as		*
************************************************************************/

window["inicializaPesta�as"] = function (sistema, inicial)	{
	for (i = 0, datos = sistema.items, total = datos.length; i < total; i ++)	{
		with	(tag("P" + datos[i]))	{
			className = "pesta�a " + ((datos[i] == inicial) ? sistema.on : sistema.off);
			onclick = mostrar_Pesta�a;
		}
		tag(datos[i]).style.display = (datos[i] == inicial) ? "block" : "none";
		tag("_" + datos[i]).onclick = cancelar;
	}
}
