//USED in <TextArea/> as injected function 
import $ from 'jquery';

//Function that Validates inputs on change.
export function myValidate (thisX, id, regExp, butttonToDisable,  messageErr, messageSuccess, e) { 
//{e} -. it is change event from {$(document).on("change", '.fileCheck', function(e) { }
//args(input, $this.id, RegExp, button to disable, error message to show, event) 
    if (thisX !=='') {
		//gets the input
        var idm = thisX;

        //if  REgEXp  match
        if (idm.match(regExp)){ 
		    this.setState({phoneNumberErrorMessage: 'correct ' + messageSuccess + ' phone'});
			this.setState({isEnable : false});
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
         $("#" + butttonToDisable).html('OK');  
		 return false;
    } 
}	
	   