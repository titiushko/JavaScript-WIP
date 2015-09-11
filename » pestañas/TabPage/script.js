//Desarrollado por Jesus Liñán
//webmaster@ribosomatic.com
//ribosomatic.com
//Puedes hacer lo que quieras con el código
//pero visita la web cuando te acuerdes

function objetoAjax(){
	var xmlhttp=false;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
		   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
  		}
	}

	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

function MostrarPagina(pagina,boton){
	cont = document.getElementById('contenido');
	
	ajax=objetoAjax();
	
    ajax.open("GET", pagina);
    ajax.onreadystatechange = function(){
		if (ajax.readyState == 4 && ajax.status == 200) {
			cont.innerHTML = ajax.responseText;
		}
	}
	ajax.send(null);
	//----------- configuraciones previas -------------//
	
	//definir los titulos de los botones
	titulo=new Array();
	titulo[0]="CSS";
	titulo[1]="HTML";
	titulo[2]="PHP";
	
	//definir numero de botones
	nrobtn=3;
	
	//definir prefijo de botones
	//(esto con el objetivo de no tener
	//problemas al momento de validar
	//nuestra página.)
	pref="boton_";
	
	//-------------------- fin ------------------------//

	//quita el estilo a todos los botones
	for(i=1;i<=nrobtn;i++){
		tit=titulo[i-1];
		btn=document.getElementById(pref+i);
		btn.innerHTML="<span style=\"border-top:1px #FF9900 solid; border-left:1px #FF9900 solid; border-right:1px #FF9900 solid;	border-bottom:1px #FF9900 solid; margin-left:5px; padding-left:2px;padding-right:2px; padding-top:1px; padding-bottom:1px; text-decoration:none; 	background-color:#FFFFCC;\">"+tit+"</span>";
	}
	//le da estilo al boton actual
	btnA = document.getElementById(pref+boton);
	tit=titulo[boton-1];
	btnA.innerHTML="<span style=\"border-top:1px #FF9900 solid;	border-left:1px #FF9900 solid; border-right:1px #FF9900 solid;	margin-left:5px; padding-left:2px;padding-right:2px; padding-top:1px; padding-bottom:5px; text-decoration:none; 	background-color:#FFCCCC;\">"+tit+"</span>";
}
