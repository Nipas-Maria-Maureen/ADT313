<h1> Var dump </h1>
<?php


$cars =array("Volvo","BMW","Toyota");
$cars[]= "Lexus";

print_r($cars);

//echo "<br/>  <h2> Var Dump <h2>";
var_dump($cars);

echo $cars[3];

$user = array(
    //key => value
    "firstname"=>"Maureen",
    "lastname"=>" Nipas",
);

echo $user['lastname'];

?>