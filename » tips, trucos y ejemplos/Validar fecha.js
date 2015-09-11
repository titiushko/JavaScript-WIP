// LIBARDO D�AZ FL�REZ Bucaramanga(Colombia)
/*
Este codigo JavaScript Permite validar la fecha en formato 00/00/0000.
Valida bisiestos y meses de 30 y 31 dias, asegurandose dem�s de que la fecha sea mayor de 1900.
*/
// Esta funci�n permitir� validar la fecha
// En el objeto text hacemos lo Siguiente
/*
   <input type=\'text\' name=cajaFecha onChange=\'fechas(this.value); this.value=borrar\'>
*/
function fechas(caja)
{ 
   if (caja)
   {  
      borrar = caja;
      if ((caja.substr(2,1) == \"/\") && (caja.substr(5,1) == \"/\"))
      {      
         for (i=0; i<10; i++)
	     {	
            if (((caja.substr(i,1)<\"0\") || (caja.substr(i,1)>\"9\")) && (i != 2) && (i != 5))
			{
               borrar = \'\';
               break;  
			}  
         }
	     if (borrar)
	     { 
	        a = caja.substr(6,4);
		    m = caja.substr(3,2);
		    d = caja.substr(0,2);
		    if((a < 1900) || (a > 2050) || (m < 1) || (m > 12) || (d < 1) || (d > 31))
		       borrar = \'\';
		    else
		    {
		       if((a%4 != 0) && (m == 2) && (d > 28))	   
		          borrar = \'\'; // A�o no viciesto y es febrero y el dia es mayor a 28
			   else	
			   {
		          if ((((m == 4) || (m == 6) || (m == 9) || (m==11)) && (d>30)) || ((m==2) && (d>29)))
			         borrar = \'\';	      				  	 
			   }  // else
		    } // fin else
         } // if (error)
      } // if ((caja.substr(2,1) == \"/\") && (caja.substr(5,1) == \"/\"))			    			
	  else
	     borrar = \'\';
	  if (borrar == \'\')
	     alert(\'Fecha erronea\');
   } // if (caja)   
} // FUNCION