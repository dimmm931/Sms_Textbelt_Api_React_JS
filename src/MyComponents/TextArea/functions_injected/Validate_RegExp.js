//import React, { Component } from 'react';
import $ from 'jquery';
//import swal from 'sweetalert';

/*import error from '../../images/error.gif';
import '../../css/TextArea.css';
import axios from 'axios';
import CopyLayout from '../Copy/CopyLayout';
*/





//Function that Validates inputs on change (confirm delete 2nd arg (id)?????).
// **************************************************************************************
// **************************************************************************************
// 
//export const myValidate =(thisX, id, regExp, butttonToDisable,  messageErr, messageSuccess, e) =>{                                                                                   ** 
export function myValidate (thisX, id, regExp, butttonToDisable,  messageErr, messageSuccess, e) { //{e} -. it is change event from {$(document).on("change", '.fileCheck', function(e) { }
//args(input, $this.id, RegExp, button to disable, error message to show, event)

     
	 
     //if (e.target.files[0].name !=='')
     if(thisX !==''){
		

		//gets the input
        var idm = thisX;

        //if  REgEXp  match
        if (idm.match(regExp)){ 
		    this.setState({phoneNumberErrorMessage: 'correct ' + messageSuccess + ' phone'});
			this.setState({isEnable : false});
            //$('.phone-error').html('<span style="color:green;">correct ' + messageSuccess + ' phone</span>');//thisX.prevAll(".sp:first").html('Correct');// erase  error  message //$("#" +id).prevAll(".sp:first").html('Correct');// erase  error  message
			//$("#" + butttonToDisable)/*$(':input[type="submit"]')*/.prop('disabled', false); //enable  button  //$(':input[type="button"]').prop('disabled', false);
            $("#" + butttonToDisable).html('OK');
                      
         } else {  //if RegExp does not  match
		     this.setState({phoneNumberErrorMessage: messageErr});
			 this.setState({isEnable : true});
             //$('.phone-error').html('<span style="color:red;padding:0.1em 1em;background: white;">' + messageErr + '</span>');//thisX.prevAll(".sp").html(messageErr);   //$("#" +id).prevAll(".sp:first").html(messageErr);   //finds the 1st prev span
			 //$("#" + butttonToDisable)/*$(':input[type="submit"]')*/.prop('disabled', true);
             $("#" + butttonToDisable).html/*val*/('Disabled');
         }
   
     } else {//if  the input is empty, set no  error to span
	      this.setState({phoneNumberErrorMessage: '*'});
		  this.setState({isEnable : false});
         //$(".phone-error").html('');
		 //$("#" + butttonToDisable).prop('disabled', false);
         $("#" + butttonToDisable).html('OK');  
		 return false;
     } 
}	
	   