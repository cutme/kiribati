<?php

if (empty($_POST['email'])) {
	die('Error: Missing variables');
}

$id_wyprawa = $_POST['id_wyprawa'];
$name = $_POST['name'];
$email = $_POST['email'];
$akcja = $_POST['akcja'];

if ($email) {
	die('oks');
} else {
	die('Error: Mail failed');
}

?>