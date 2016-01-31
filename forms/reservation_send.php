<?php

if (empty($_POST['email'])) {
	die('Error: Missing variables');
}

$id_termin = $_POST['id_termin'];
$id_wyprawa = $_POST['id_wyprawa'];
$email = $_POST['email'];
$kiribati_club = $_POST['kiribati_club'];
$imie = $_POST['imie'];
$nazwisko = $_POST['nazwisko'];
$adres = $_POST['adres'];
$telefon = $_POST['telefon'];
$data_urodzenia = $_POST['data_urodzenia'];
$uwagi = $_POST['uwagi'];
$koszulka = $_POST['koszulka'];
$ubezpieczenie_1 = $_POST['ubezpieczenie_1'];
$ubezpieczenie_2 = $_POST['ubezpieczenie_2'];
$ubezpieczenie_3 = $_POST['ubezpieczenie_3'];
$oplaty_wizowe = $_POST['oplaty_wizowe'];
$newsletter = $_POST['newsletter'];


//var_dump($_POST);

 if ($email) {
	die('ok');
} else {
	die('Error: Mail failed');
}

?>