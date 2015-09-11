/*		Alias para document.getElementById	*/
function tag(id)	{return document.getElementById(id);}

/*		Alias para document.createElement	*/
function crear(t)	{return document.createElement(t);}

/*		Alias para document.createTextNode	*/
function texto(cual)	{return document.createTextNode(cual);}

/*		Alias para la instrucción de cancelación: return false;		*/
function cancelar()	{return false;}

/************************************************************************
*		Selección de pestañas declaradas inline			*
************************************************************************/

window["mostrarPestaña"] = function(sistema, cual)	{
	soy = cual.id;
	contenido = soy.substr(1);
	for (var i = 0, total = sistema.items.length; i < total; i ++)
		tag(sistema.items[i]).style.display = (sistema.items[i] == contenido) ? "block" : "none";
	for (i = 0, todos = sistema.items, total = todos.length; i < total; i ++)
		tag("P" + todos[i]).className = "pestaña " +  sistema.off;
	tag("P" + contenido).className = "pestaña " + sistema.on;
}


/************************************************************************
*		Selección de pestañas: asignación onload		*
************************************************************************/

window["mostrar_Pestaña"] = function(e)	{
	yo = (e) ? e.target : event.srcElement;
	soy = yo.id;
//alert(soy);

	sistema = window[yo.parentNode.parentNode.id];
	contenido = soy.substr(1);
	for (var i = 0, total = sistema.items.length; i < total; i ++)
		tag(sistema.items[i]).style.display = (sistema.items[i] == contenido) ? "block" : "none";
	for (i = 0, todos = sistema.items, total = todos.length; i < total; i ++)
		tag("P" + todos[i]).className = "pestaña " +  sistema.off;
	tag("P" + contenido).className = "pestaña " + sistema.on;
}


/************************************************************************
*		Inicialización "onload" del sistema de pestañas		*
************************************************************************/

window["inicializaPestañas"] = function (sistema, inicial)	{
	for (i = 0, datos = sistema.items, total = datos.length; i < total; i ++)	{
		with	(tag("P" + datos[i]))	{
			className = "pestaña " + ((datos[i] == inicial) ? sistema.on : sistema.off);
			onclick = mostrar_Pestaña;
		}
		tag(datos[i]).style.display = (datos[i] == inicial) ? "block" : "none";
		tag("_" + datos[i]).onclick = cancelar;
	}
}
