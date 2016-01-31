<?php

if (empty($_POST['email'])) {
	die('Error: Missing variables');
}

//$id_wyprawa = $_POST['id_wyprawa'];
$termin = $_POST['termin'];
$email = $_POST['email'];
$kiribati_club = $_POST['kiribati_club'];
$imie = $_POST['imie'];
$nazwisko = $_POST['nazwisko'];
$telefon = $_POST['telefon'];
$uwagi = $_POST['uwagi'];
$newsletter = $_POST['newsletter'];


//var_dump($_POST);

if ($email) {
	die(var_dump($_POST));
} else {
	die('Error: Mail failed');
}

?>