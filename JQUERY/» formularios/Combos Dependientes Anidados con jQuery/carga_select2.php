<?php
//Creado por Cesar Walter Gerez en Micodigobeta.com.ar
//A manera de ejemplo solo lo realizo con array, pero para que realmente sea dinamico se debería traer las opciones de una base de datos.
$Area= $_REQUEST["id"];
//realizamos la consulta
switch($Area){
	case 1:
		$array_select2 = array(0=>"Seleccione",
		1=>"Marketing",
		2=>"Recursos Humanos",
		3=>"Contable",
		4=>"Informatica",
		5=>"Atencion al Cliente");
		break; 
	case 2:	
		$array_select2 = array(0=>"Seleccione",
		1=>"Tesoreria",
		2=>"Archivos",
		3=>"Estadistica",
		4=>"Farmacia");
		break; 
	case 3:	
		$array_select2 = array(0=>"Seleccione",
		1=>"Desarrollo",
		2=>"Personal",
		3=>"Tesoreria");
		break; 
}		
//el bucle para cargar las opciones
for ($i=0; $i<count($array_select2);$i++){
	echo "<option value=".$i.">".$array_select2[$i]."</option>";
}
?>