<html>
<body>
<?php

/*
 As you can see, this is a regular PHP script that returns a simple document
 after processing a form POST, so it's very backwards compatible.
 You can also use GETs with the client-side script!
*/

$num1 = (array_key_exists('num1', $_POST) ? $_POST['num1'] : 1);
$operator = (array_key_exists('operator', $_POST) ? $_POST['operator'] : '');
$num2 = (array_key_exists('num2', $_POST) ? $_POST['num2'] : 1);
$output = '';

if ($num1 && $num2)
{
 if ($operator == '*') $output = $num1 * $num2;
 if ($operator == '/') $output = $num1 / $num2;
 if ($operator == '+') $output = $num1 + $num2;
 if ($operator == '-') $output = $num1 - $num2;
}

echo($output ? $output : 'Error: Please specify 2 numbers');

?>
</body>
</html>