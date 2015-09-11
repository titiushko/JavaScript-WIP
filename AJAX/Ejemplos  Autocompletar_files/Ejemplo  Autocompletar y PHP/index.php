<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<!-- 



Este contenido es de libre uso y modificación bajo la siguiente licencia: http://creativecommons.org/licenses/by-nc-sa/2.5/deed.es

Sobre el reconocimiento:
Todos los códigos han sido realizados con la idea de que sirvan para colaborar con el aprendizage de aquellos que se están introduciendo
en estas tecnologías y no con el objetivo de que sean utilizados directamente en sitios web. No obstante si utilizas algún código en tu sitio 
(ya sea sin modificar o modificado), o si ofreces los fuentes para descargar o si bien decides publicar alguno de los artículos debes cumplir con:
-Colocar un link a http://www.formatoweb.com.ar/ajax/ visible por tus usuarios como forma de mención a la fuente original del contenido.
-Enviar un correo a edanps@gmail.com informando la URL donde el contenido se ha publicado o se va a publicar en un futuro.
-Si publicas los fuentes para descargar este texto no debe ser eliminado ni alterado.

Más ejemplos y material sobre AJAX en: http://www.formatoweb.com.ar/ajax/
Cualquier sugerencia, crítica o comentario son bienvenidos.
Contacto: edanps@gmail.com



-->

<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>AJAX, Ejemplos: Autocompletar (suggest), codigo fuente - ejemplo</title>
<link rel="stylesheet" type="text/css" href="index.css">
<script type="text/javascript" src="index.js"></script>
</head>

<body onload="asignaVariables();">
			
			<div id="demo" style="width:600px;">
				<div id="demoDer">
					<input type="text" id="input_2" class="input"
					onfocus="if(document.getElementById('lista').childNodes[0]!=null && this.value!='') { filtraLista(this.value); formateaLista(this.value); 
						reiniciaSeleccion(); document.getElementById('lista').style.display='block'; }" 
					onblur="if(v==1) document.getElementById('lista').style.display='none';" 
					onkeyup="if(navegaTeclado(event)==1) {
						clearTimeout(ultimoIdentificador); 
						ultimoIdentificador=setTimeout('rellenaLista()', 1000); }">
					<div id="lista" onmouseout="v=1;" onmouseover="v=0;"></div>
				</div>
				<div id="demoIzq">
					<input type="text" id="input_1" class="input">
					<button type="button" class="boton" id="boton_1" onclick="nuevoDato();">Ingresar</button>
				</div>
				<div class="mensaje" id="error"></div>
			</div>
			
</body>
</html>