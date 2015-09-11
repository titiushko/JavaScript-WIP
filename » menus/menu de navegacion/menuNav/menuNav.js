////////////////////Please leave this notice/////////////////////
//	Dynamic JS Menu 1.0														//
//	By Pat Libby (Libbypa@maine.rr.com)									//
//	http://dragonsbane1.topcities.com									//
//	It works only with IE5.0(++) and Netscape6.0(++)				//
//	Free to use!																//
////////////////////Last modified 01-31-2003/////////////////////
// Traducido al español y comentado por El Codigo					//
// http://www.elcodigo.net													//
/////////////////////////////////////////////////////////////////

//	Colores del menu
var tdColor="#000000";		// color del texto de los elementos del menu
var tdBgColor="#BBDDFF";	// color de fondo de los elementos del menu
var hlColor="#000000";		// color texto cuando puntero encima
var hlBgColor="#FFFFFF";	// color fondo cuando punetor encima
//	Los mismos valores deben estar en menuNav.css

// Definicion del menu
//categoria taller
td_1 = "Taller"
url_1 = "http://www.elcodigo.net/taller/taller.html"
	//subcategorias del taller
	td_1_1 = "JavaScript"
	url_1_1 = "http://www.elcodigo.net/taller/javascript/indices.html"
		//subcategorias del taller de javascript
		td_1_1_1 = "Relojes y calendarios"
		url_1_1_1 = "http://www.elcodigo.net/cgi-bin/DBread.cgi?tabla=scripts&campo=5&clave=1x1"
		td_1_1_2 = "Cookies"
		url_1_1_2 = "http://www.elcodigo.net/cgi-bin/DBread.cgi?tabla=scripts&campo=5&clave=1x2"
	td_1_2 = "DHTML"
	url_1_2 = "http://www.elcodigo.net/taller/dhtml/indices.html"
		//subcategorias del taller de DHTML
		td_1_2_1 = "Efectos dinámicos"
		url_1_2_1 = "http://www.elcodigo.net/cgi-bin/DBread.cgi?tabla=scripts&campo=5&clave=2x12"
		td_1_2_2 = "Movimientos y desplazamientos"
		url_1_2_2 = "http://www.elcodigo.net/cgi-bin/DBread.cgi?tabla=scripts&campo=5&clave=2x6"

	td_1_3 = "HTML y CSS"
	url_1_3 = "http://www.elcodigo.net/taller/html/indices.html"

//categoria tiralineas
td_2 = "Tiralíneas"
url_2 = "http://www.elcodigo.net/tiralineas/tiralineas.html"
	//subcategorias tiralineas
	td_2_1 = "Creación de ventanas"
	url_2_1 = "http://www.elcodigo.net/tiralineas/tiralineas1.html"
	td_2_2 = "Textos barra estado"
	url_2_2 = "http://www.elcodigo.net/tiralineas/tiralineas2.html"
	td_2_3 = "Creación de formularios"
	url_2_3 = "http://www.elcodigo.net/tiralineas/tiralineas3.html"
	td_2_4 = "Fecha actual"
	url_2_4 = "http://www.elcodigo.net/tiralineas/tiralineas4.html"
	td_2_5 = "Ocultar código"
	url_2_5 = "http://www.elcodigo.net/tiralineas/tiralineas5.html"

//enlace al Top10	
td_3 = "Top 10"
url_3 = "http://www.elcodigo.net/taller/autores.html"


///////NO SON NECESARIOS CAMBIOS A PARTIR DE AQUI/////////////////
var md=250;
var ti=-1;
var oTd=new Object;
oTd=null;

function doMenu(td){
	clearTimeout(ti);
	td.style.backgroundColor=hlBgColor;
	td.style.color=hlColor;
	var i;
	var sT="";
	var tda=new Array();
	tda=td.id.split("_");
	if(oTd!=null){
		var tdo=new Array();
		tdo=oTd.id.split("_");
		for(i=1;i<tdo.length;i++){
			sT+="_"+tdo[i];
			if(tdo[i]!=tda[i]){
				document.getElementById("td"+sT).style.backgroundColor=tdBgColor;
				document.getElementById("td"+sT).style.color=tdColor;
				if(document.getElementById("tbl"+sT)!=null)
					document.getElementById("tbl"+sT).style.visibility="hidden";
			}
		}			
	}
	oTd=td;
	sT="tbl";
	for(i=1;i<tda.length;i++)
		sT+="_"+tda[i];
	if(document.getElementById(sT)!=null)
		document.getElementById(sT).style.visibility="visible";

}

function clearMenu(){
	if(oTd!=null){
		var tdo=new Array();
		tdo=oTd.id.split("_");
		var sT="";
		for(var i=1;i<tdo.length;i++){
			sT+="_"+tdo[i];
			document.getElementById("td"+sT).style.backgroundColor=tdBgColor;
			document.getElementById("td"+sT).style.color=tdColor;
			if(document.getElementById("tbl"+sT)!=null)
				document.getElementById("tbl"+sT).style.visibility="hidden";
		}
		oTd=null;			
	}
}

function runMenu(strURL){
	location.href=strURL;
}

var tt="";
var sT="";
var pT=new Array();
var tA=new Array();

function getCoord(st){
	tA=st.split("_");
	if(tA.length>2){
		tA=tA.slice(0,-1);
		tt=tA.join("_");
		return (document.getElementById("tbl"+tt).offsetTop+document.getElementById("td"+st).offsetTop+4)+"px;left:"+
			(document.getElementById("tbl"+tt).offsetLeft+document.getElementById("td"+st).offsetWidth-2)+"px\">";
	}
	return (document.getElementById("mainmenu").offsetTop+document.getElementById("td"+st).offsetHeight-2)+"px;left:"+
		  (document.getElementById("mainmenu").offsetLeft+document.getElementById("td"+st).offsetLeft+5)+"px\">";
}


//UTILIZACION
//<!-- Incluir estas lineas entre <body> y </body>, donde se desea aparezca el menu -->
//<script language="JavaScript1.2">
//var sH="<table class=\"menu\" id=\"mainmenu\" cellspacing=\"0\"><tr>";
//var p=0;
//var j=0;
//while(eval("typeof(td_"+ ++j +")!=\"undefined\"")){
//	sH+="<td id=\"td_"+j+"\" onmouseover=\"doMenu(this)\" onmouseout=\"ti=setTimeout('clearMenu()',md)\"";
//	sH+=(eval("typeof(url_"+j+")!=\"undefined\""))?" onclick=\"runMenu('"+eval("url_"+j)+"')\">":">";
//	sH+=eval("td_"+j)+"</td>";
//	if (eval("typeof(td_"+j+"_1)!=\"undefined\""))
//		pT[p++]="_"+j;
//}
//sH+="</tr></table>";
//document.write(sH);
//for(var q=0;typeof(pT[q])!="undefined";q++){
//	sT=pT[q];
//	sH="";
//	j=0;
//	sH+="<table class=\"menu\" id=\"tbl"+sT+"\" cellspacing=\"0\" style=\"top:"+getCoord(sT);
//	while (eval("typeof(td"+sT+"_"+ ++j +")!=\"undefined\"")){
//		sH+="<tr><td id=\"td"+sT+"_"+j+"\" onmouseover=\"doMenu(this)\" onmouseout=\"ti=setTimeout('clearMenu()',md)\"";
//		sH+=(eval("typeof(url"+sT+"_"+j+")!=\"undefined\""))?" onclick=\"runMenu('"+eval("url"+sT+"_"+j)+"')\">":">";
//		sH+=eval("td"+sT+"_"+j)+"</td></tr>";
//		if (eval("typeof(td"+sT+"_"+j+"_1)!=\"undefined\""))
//			pT[p++]=sT+"_"+j;
//	}
//	sH+="</table>";
//	document.write(sH);
//}
//document.getElementById("mainmenu").style.visibility="visible";
//</script>

