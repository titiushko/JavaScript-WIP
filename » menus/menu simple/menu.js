//MENU DE NAVEGACION SIMPLE
//
//Este script y otros muchos pueden
//descarse on-line de forma gratuita
//en El Código: www.elcodigo.net

//ARRAYS MENUS
var principal = new Array (
"Taller", "navegacion.html?menu1=taller",
"Tutoriales", "navegacion.html?menu1=tutoriales",
"Utilidades", "navegacion.html?menu1=utilidades",
"", "navegacion.html?menu1=",
"", "navegacion.html?menu1="
)
var taller = new Array (
"Ventanas", "navegacion.html?menu1=taller&menu2=ventanas",
"Enlaces", "navegacion.html?menu1=taller&menu2=enlaces"
)
var tutoriales = new Array (
"HTML", "navegacion.html?menu1=tutoriales&menu2=html"
)
var utilidades = new Array (
"Editores", "navegacion.html?menu1=utilidades&menu2=editores",
"Navegadores", "navegacion.html?menu1=utilidades&menu2=navegadores",
"El Codigo", "navegacion.html?menu1=utilidades&menu2=http://www.elcodigo.net"
)

//VARIABLES
var index = ' class="menu"'

//---------------------------------------------------------
function Enlace(ruta, item, pagina) {
	var enlace
	var ventana
	if (pagina.indexOf('navegacion')==-1) ventana = 'target="cen" '
   else ventana = ''
	if ( pagina.indexOf(":") == -1 ) {
		//si la pagina no es una url http://
		//y es la actual, no hay enlace
		enlace = (item != pagina? '<a class="menu" '  + ventana + 'href="' + ruta + pagina + '">' : '<span class="menu">')	
	} else {
		//enlace con URL
		enlace = '<a class="menu" href="' + pagina + '">'
	}
	return enlace 
}

//---------------------------------------------------------
function EnlaceOff(item, pagina) {
return (item != pagina? '</a>' : '</span>')
}

//---------------------------------------------------------
function MenuNavegacion( ruta, item, paginas, nivel ) {
  numelem = paginas.length
 
  var menu = ''
  var pos = 0

  var borde = (nivel == 2) ? 'style="border-top: thin dotted #000000;"' : ''

  //indexa hacia la derecha el segundo menu
  if ( nivel == 2 ) {
    while (principal[pos+1].indexOf(seleccion1) == -1 ) {
      pos += 2
    }
    //ajuste posicion submenu
    while ( (pos + paginas.length) > (principal.length) ) { 
      pos -= Math.floor(paginas.length / 2) 
      if ( Math.floor(pos / 2) != (pos / 2)) { pos++ }
    }
    if ( pos > (principal.length - 2) ) { pos -= 2 }
    if ( pos < 0 ) { pos = 0 }
    for ( x = 0; x < pos; x=x+2 ) {
      menu += '<td valign="top" width="100" height="40"></td>'    
    }
  }

  for ( x = 0; x < numelem; x=x+2 ) {
   menu += '<td valign="top" width="100" height="40" ' + borde + '>'
  	if ( paginas[x+1] == "" ) {
  		//posibilidad de añadir separadores aqui
   } else if (paginas[x+1].indexOf(item) != -1 ) {
   	menu += '<strong class="seleccionado">' + paginas[x] + '</strong>\n'
   } else {
   	menu += Enlace(ruta, item, paginas[x+1]) + paginas[x] + EnlaceOff(item, paginas[x+1]) + '\n'
   }
   menu += "</td>"
   
  }
  
  document.write(menu)
}

//---------------------------------------------------------
function getVar(nomb){
    var url = document.location.href
    if ( url.indexOf(nomb) != -1 ) {
        posiBeg = url.indexOf("=", url.indexOf(nomb))
        barre = url.indexOf("&", posiBeg)
        posiEnd = (barre != -1 ? barre : url.length)
        return url.substring(posiBeg+1,posiEnd)
    } else {	//informar de la ausencia del parametro
    	  return ''
    }
}



//Recuper valores parametros
seleccion1 = getVar('menu1')
seleccion2 = getVar('menu2')

