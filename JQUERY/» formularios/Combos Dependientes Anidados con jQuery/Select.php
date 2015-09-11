<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<!--Creado por Walter en Micodigobeta.com.ar-->
<head>
<script src="jquery.min.js" type="text/javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Demo - Combos Dependientes </title>
</head>
<script>
$(document).ready(function(){
	$("#select1").change(function(){
		$.post("carga_select2.php",{ id:$(this).val() },function(data){$("#select2").html(data);})
	});
})
</script>

<body>
<?php
$array_areas = array( 
        0=>"Seleccione", 
        1=>"Direcciones", 
        2=>"Departamentos",
        3=>"Divisiones"); 
?>
<select name="select1" id="select1">
<option selected value="0">Seleccione</option>
<?php
for($i=0;$i<count($array_areas);$i++) {
  echo "<option value=".$i.">".$array_areas[$i]."</option>" ;
}
?>
</select>
<select name="select2" id="select2">
<option selected value="0">Seleccione</option>
</select>
</body>
</html>
