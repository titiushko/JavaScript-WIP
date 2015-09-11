function obtiene_fecha(){
	var fecha_actual = new Date()
	dia = fecha_actual.getDate()
	mes = fecha_actual.getMonth() + 1
	anio = fecha_actual.getYear()
	if (anio < 100)
	anio = '19' + anio
	else if ( ( anio > 100 ) && ( anio < 999 ) ) {
		var cadena_anio = new String(anio)
		anio = '20' + cadena_anio.substring(1,3)
	}
	if (mes < 10)
	mes = '0' + mes
	if (dia < 10)
	dia = '0' + dia
	return (dia + "/" + mes + "/" + anio)
}

function calendario(){
	var x, y, fila, valor
	var fecha_actual = new Date()
	var dia_mes = fecha_actual.getDate()		//dia del mes
	var mes = fecha_actual.getMonth() + 1		//mes del año
	var anio = fecha_actual.getYear()		//año
	var dia_semana = fecha_actual.getDay() - 1	//dia de la semana (-1 para domingo, 0 para lunes, etc.)
	//array de dias que tiene cada mes
	dias_por_mes = new Array(12)
	dias_por_mes[0] = 31
	dias_por_mes[1] = 28
	dias_por_mes[2] = 31
	dias_por_mes[3] = 30
	dias_por_mes[4] = 31
	dias_por_mes[5] = 30
	dias_por_mes[6] = 31
	dias_por_mes[7] = 31
	dias_por_mes[8] = 30
	dias_por_mes[9] = 31
	dias_por_mes[10] = 30
	dias_por_mes[11] = 31
	//corrige dia de la semana
	if(dia_semana == -1) 
		dia_semana = 6
	//corrige dias de febrero si año bisiesto
	if((anio % 4) == 0) 
		dias_por_mes[1]++
	//crea matriz de datos
	matriz = new Array(6)
	for (fila = 0; fila < 6; fila++) 
		matriz[fila] = new Array(7)
	//obtiene posición día 1
	y = dia_semana + 1
	for (x = dia_mes; x > 0; x--) {
		y--	
		if (y < 0) 
		y = 6
	}
	//guarda valores en variable matriz
	valor = 1
	for (fila = 0; fila < 6; fila++) {
		for (x = 0; x < 7; x++) {
			if ((fila == 0) && (x < y)) {				//valores vacíos primera fila
				matriz[fila][x] = ""
			} else if (valor > dias_por_mes[mes - 1]) {		//valores vacíos última línea
				matriz[fila][x] = ""
			} else if (valor == dia_mes) {				//valor día actual
				matriz[fila][x] = "<b><font color='red'>" + valor + "</font></b>"
				valor++
			} else {
				matriz[fila][x] = valor				//valores ocupados
				valor++
			}
		}
	}
	//impresion del calendario
	document.write("<div align='center'><center>")
	document.write("")
	document.write("<table border='1' width='85%' cellspacing='1' cellpadding='5'>")
	document.write("  <tr>")
	document.write("    <td width='100%' colspan='7' align='center'><strong>" + obtiene_fecha() + "</strong></td>")
	document.write("  </tr>")
	document.write("  <tr>")												//crea fila de nombres de días
	document.write("    <td width='14%' align='center'><small>Lunes</small></td>")
	document.write("    <td width='14%' align='center'><small>Martes</small></td>")
	document.write("    <td width='14%' align='center'><small>Miercoles</small></td>")
	document.write("    <td width='14%' align='center'><small>Jueves</small></td>")
	document.write("    <td width='14%' align='center'><small>Viernes</small></td>")
	document.write("    <td width='15%' align='center' bgcolor='#C0C0C0'><small>Sabado</small></td>")
	document.write("    <td width='15%' align='center' bgcolor='#C0C0C0'><small>Domingo</small></td>")
	document.write("  </tr>")

	for(fila = 0; fila < 6; fila++) {
		if ((matriz[fila][0] == "") && (matriz[fila][6] == "")) 		//no muestra ultima fila vacía
			break
		document.write("  <tr>")											//crea fila de tabla calendario
		document.write("    <td width='14%' align='left'>" + matriz[fila][0] + "<p> </p></td>")
		document.write("    <td width='14%' align='left'>" + matriz[fila][1] + "<p> </p></td>")
		document.write("    <td width='14%' align='left'>" + matriz[fila][2] + "<p> </p></td>")
		document.write("    <td width='14%' align='left'>" + matriz[fila][3] + "<p> </p></td>")
		document.write("    <td width='14%' align='left'>" + matriz[fila][4] + "<p> </p></td>")
		document.write("    <td width='15%' align='left' bgcolor='#C0C0C0'>" + matriz[fila][5] + "<p> </p></td>")
		document.write("    <td width='15%' align='left' bgcolor='#C0C0C0'>" + matriz[fila][6] + "<p> </p></td>")
		document.write("  </tr>")
	}
	document.write("</table>")
	document.write("</center></div>")
}