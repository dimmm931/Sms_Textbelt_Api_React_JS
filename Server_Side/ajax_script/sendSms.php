<?php 
header("Access-Control-Allow-Origin: *");
//header('Content-Type: application/json); //header('Content-Type: application/json; charset=utf-8'); // <= MUST BE TURNED OFF, THIS CAUSED CRASH IN CORS JSON
header("Access-Control-Allow-Headers", "Content-Type"); //DOES NOT MATTER
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');


//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Headers:  Origin, X-Requested-With, Content-Type, Accept"); //Content-Type, Authorization, Accept, Origin, 
//header("Access-Control-Allow-Credentials : false");




$result = array('status' => 'OK!!!');
$result['cellar'] = $_POST['serverPhone']; //cell number from ajax
$result['smsText'] = $_POST['serverSms']; 
$result['ifTestMode'] = $_POST['serverIfTestStatus']; //switch between test/prod mode, when in test mode, Api uses on server side TextBelt test key {"textbelt_test"}



//decides whether include test or prod credentials based on value from ajax
if ($_POST['serverIfTestStatus'] === 'true') {
    $result['inclue'] = "Will include Credentials/test_credentials.php";
} else {
	$result['inclue'] = "Will include Will include Credentials/prod_credentials.php";
}


//Server regExp check 

//checking  phone number input
$RegExp_Phone = '/^[+][\d]{8,9}[0-9]+$/'; //phone number regExp for world wide
$RegExp_Phone_UA = '/^[+]380[\d]{2}[0-9]{7}$/'; //phone number regExp for Ukraine //must have strict +380 & 9 digits ///^[+]380[\d]{1,4}[0-9]+$/;
$RegExp_Sms = '/.*[a-zA-Z0-9].*/';

if (preg_match('/^[+]3/' , $_POST['serverPhone'])){
    if (!preg_match($RegExp_Phone_UA, $_POST['serverPhone'])){ 
         $result['errorPhone'] = 'UA Phone number is not OK';
	} else {
		$result['errorPhone'] = 'UA Phone number is Good';}
} else {
	if (!preg_match($RegExp_Phone, $_POST['serverPhone'])){ 
         $result['errorPhone'] = 'EU Phone number is not OK';
	} else {
		$result['errorPhone'] = 'EU Phone number is Good';}
}
 
 
//checks sms is at least 1 char_from_digit
if (!preg_match($RegExp_Sms, $_POST['serverSms'])){
	$result['errorSms'] = "Sms is NOT OK";
} else {
	$result['errorSms'] = "Sms is Good";
}
  

//returns json 
echo json_encode($result);
 


  
  
 /* if (!headers_sent()) {
    header('Access-Control-Allow-Origin: *');
} else {
    // handle your error here
}
*/
//die();
?>