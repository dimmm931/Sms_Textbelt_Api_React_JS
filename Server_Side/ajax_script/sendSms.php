<?php 
header("Access-Control-Allow-Origin: *");
//header('Content-Type: application/json); //header('Content-Type: application/json; charset=utf-8'); // <= MUST BE TURNED OFF, THIS CAUSED CRASH IN CORS JSON
header("Access-Control-Allow-Headers", "Content-Type"); //DOES NOT MATTER
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');


//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Headers:  Origin, X-Requested-With, Content-Type, Accept"); //Content-Type, Authorization, Accept, Origin, 
//header("Access-Control-Allow-Credentials : false");




$result = array('status' => 'OK!!!');
$result['cellar'] = $_GET['serverPhone']; //cell number from ajax
$result['smsText'] = $_GET['serverSms'];

echo json_encode($result);
 


  
  
 /* if (!headers_sent()) {
    header('Access-Control-Allow-Origin: *');
} else {
    // handle your error here
}
*/
//die();
?>