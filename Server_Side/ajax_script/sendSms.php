<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
//header("Access-Control-Allow-Origin: http://localhost:4200");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers:  Origin, X-Requested-With, Content-Type, Accept"); //Content-Type, Authorization, Accept, Origin, 



//header("Access-Control-Allow-Credentials : false");



$text = array('result' => 'Sent!!!');
echo json_encode($text);
  
 /* if (!headers_sent()) {
    header('Access-Control-Allow-Origin: *');
} else {
    // обработка ошибки или уведомление разработчикам
}
*/
//die();
?>