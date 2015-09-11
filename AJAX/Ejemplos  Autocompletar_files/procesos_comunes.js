if(navigator.userAgent.indexOf("MSIE")>=0) navegador=0; // IE
else if(navigator.userAgent.indexOf("Opera")>=0) navegador=1; // Opera
else navegador=2; // Demas

function descarga()
{
	i=9;
	intervaloTransparencia=setInterval("aclarar()", 500);

	colocaCapa(); capaDescarga.style.display="block";
	intervaloPosicion=setInterval("colocaCapa()", 500);
}

function colocaCapa()
{
	if(navegador==0)
		desplazamiento=document.documentElement.scrollTop+(document.body.parentNode.offsetHeight/2);
	else if(navegador==1)
		desplazamiento=document.documentElement.scrollTop+(window.innerHeight/2);
	else
		desplazamiento=window.scrollY+(window.innerHeight/2);

	capaDescarga.style.top=desplazamiento+"px";
}

function aclarar(opacidad)
{
	if(i>0)
	{
		if(navegador==0) 
		{
			opacidad=i*10;
			capaTransparente.style.filter="alpha(opacity="+opacidad+")";
		}
		else
		{
			opacidad=i/10;
			capaTransparente.style.opacity=opacidad;	
		}
		i--;
	}
	else clearInterval(intervaloTransparencia);
}

function transparenciaInicial()
{
	if(navegador==0) capaTransparente.style.filter="alpha(opacity=100)";
	else capaTransparente.style.opacity="1";
}

function inicializaDescarga()
{
	capaTransparente=document.getElementById("transparente");
	capaDescarga=document.getElementById("descarga");
	
	transparenciaInicial();
}

function navegar()
{
	clearInterval(intervaloTransparencia); clearInterval(intervaloPosicion);
	transparenciaInicial();
	capaDescarga.style.display="none";
}