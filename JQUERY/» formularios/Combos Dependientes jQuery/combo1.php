<?php
$rpta="";
if ($_POST["elegido"]=="op1_1") {
	$rpta= '
	<option value="op2_1">Option1</option>
	<option value="op2_2">Option2</option>
	<option value="op2_3">Option3</option>
	';	
}
if ($_POST["elegido"]=="op1_2") {
	$rpta= '
	<option value="op2_1">Option21</option>
	<option value="op2_2">Option22</option>
	<option value="op2_3">Option23</option>
	';	
}
if ($_POST["elegido"]=="op1_3") {
	$rpta= '
	<option value="op2_1">Option</option>
	<option value="op2_2">Option</option>
	';	
}
echo $rpta;	
?>