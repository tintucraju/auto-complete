<?php
/*
	Demo of Tin Complete Remote source 
	Connect to your database and write your own query and encode it to json 
*/ 
 if(isset($_REQUEST['tinCompleteRequest'])){
	$search = $_REQUEST['tinCompleteRequest'];
 	$con = new mysqli("localhost","root","","test");
 	$res = $con->query("select * from sample where nm like'$search%'");
 	$ar = array();
 	while($row=mysqli_fetch_array($res))
 	array_push($ar,$row[0]);
    echo json_encode($ar);
 }
?>
