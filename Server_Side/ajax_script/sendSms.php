<?php 
//this is ENDPOINT, handles ajax request from smsSendStatusArea.js (sends SMS  via ajax)

//headers
header("Access-Control-Allow-Origin: *"); //must-have CORS header
//header('Content-Type: application/json); //header('Content-Type: application/json; charset=utf-8'); // <= MUST BE TURNED OFF, THIS CAUSED CRASH IN CORS JSON
header("Access-Control-Allow-Headers", "Content-Type"); //DOES NOT MATTER
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');


//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Headers:  Origin, X-Requested-With, Content-Type, Accept"); //Content-Type, Authorization, Accept, Origin, 
//header("Access-Control-Allow-Credentials : false");

$result = array(); //test array to monitor


//decides whether include test or prod credentials based on $_POST['serverIfTestStatus'] value from ajax
if (isset($_POST['serverIfTestStatus']) && $_POST['serverIfTestStatus'] === 'true') { //FIX Aug_2021
	//by default $_POST['serverIfTestStatus'] is TRUE (i.e require test credentials)
	require_once '../Credentials/test_credentials.php';
    $result['includeFile'] = "Will include Credentials/test_credentials.php";
} else {
	require_once '../Credentials/prod_credentials.php';
	$result['includeFile'] = "Will include Will include Credentials/prod_credentials.php";
}


require_once '../Classes/SendSms.php';
require_once '../Classes/RegExpCheck.php';
require_once '../Classes/autoload.php'; //uses autoload instead of manual includin each class-> Error if it is included in 2 files=only1 is accepted 

if (isset($_POST['serverPhone']) && isset($_POST['serverSms'])){
	
    //Server regExp check 
    $RegExpChecking = new MySmsTetxBelt\Classes\RegExpCheck();
    $checked        = $RegExpChecking ->check($_POST['serverPhone'], $_POST['serverSms']);

    //Sending SMS
    $sms           = new MySmsTetxBelt\Classes\SendSms();
	$smsSendStatus = $sms->sendingSms($_POST['serverPhone'], $_POST['serverSms']);
	
} else {
    //FIX Aug_2021
    $smsSendStatus = array(
        'errorX'           => 'Phone number or sms smsSendStatus is missing', 
        'textBeltResponse' => array('success' => false, 'textId' => null, 'quotaRemaining' => null)
    ); 
    
	//$smsSendStatus = "Phone number or sms smsSendStatus is missing"; //FIX
    //$checked  = false;
    
    //FIX Aug_2021
    $checked = array(
        'errorPhone' => 'Error in ajax_script/sendSms.php', 
        'errorSms'   =>  'Error in sendSms'
    ); 
}



//FIX Aug_2021
$result['cellar']           = (isset($_POST['serverPhone']))        ? $_POST['serverPhone']        : 'not set' ; //cell number from ajax
$result['smssmsSendStatus'] = (isset($_POST['serverSms']))          ? $_POST['serverSms']          : 'not set'; 
$result['ifTestMode']       = (isset($_POST['serverIfTestStatus'])) ? $_POST['serverIfTestStatus'] : 'not set'; //switch between test/prod mode, when in test mode, Api uses on server side smsSendStatusBelt test key {"smsSendStatusbelt_test"}



//DO THIS IN CLASSES?SendSms.php
//$smsSendStatus2 = json_decode($smsSendStatus, true);

$result = array_merge($result, $checked, $smsSendStatus); 

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