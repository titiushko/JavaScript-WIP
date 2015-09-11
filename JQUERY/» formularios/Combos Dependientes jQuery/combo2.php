<?php
$rpta="";
if ($_POST["elegido"]=="op2_1") {
	$rpta= '
	<option value="op3_1">Option1</option>
	<option value="op3_2">Option2</option>
	<option value="op3_3">Option3</option>
	';	
}
if ($_POST["elegido"]=="op2_2") {
	$rpta= '
	<option value="op3_1">Option31</option>
	<option value="op3_2">Option32</option>
	<option value="op3S_3">Option33</option>
	';	
}
echo $rpta;	
?>