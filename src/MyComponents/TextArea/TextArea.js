import React, { Component } from 'react';
import $ from 'jquery';
import swal from 'sweetalert';
import axios from 'axios';
import '../../css/TextArea.css';
import {myValidate} from './functions_injected/Validate_RegExp'; //import function
import 'jquery-ui';
import 'jquery-ui/themes/base/autocomplete.css';  //according to folder structure in node_modules
import {AutocompleteFunction} from './functions_injected/Autocomplete'; //import my function
import {sendSmsMessage} from './functions_injected/sendSmsMessage'; //import my function to send sms
import {scrollResults} from './functions_injected/scrollResults'; //import my function to scroll
import DisplayPhoneRegExpMessage from './child_components/DisplayPhoneRegExpMessage';
import CountSmsText from './child_components/CountSmsText';
import FlashMessage from './child_components/FlashMessage';
import AjaxLoader from './child_components/AjaxLoader';
import ResultFromTextbeltApi from './child_components/ResultFromTextbeltApi';


class TextAreaX extends Component {
	constructor(props) {
        super(props);
	
	    this.RegExp_Phone = /^[+][\d]{8,9}[0-9]+$/;       //phone number regExp for world wide
	    this.RegExp_Phone_UA = /^[+]380[\d]{2}[0-9]{7}$/; //phone number regExp for Ukraine //must have strict +380 & 9 digits ///^[+]380[\d]{1,4}[0-9]+$/;

	    this.limitLatin = 120; //limit for chars in sms
	    this.limitCyrill = 70; //limit for Ru chars in sms
	
	
        this.state = {
		    phoneNumberChild : "+380",
		    smsTextChild : "", //I am set manually in state in child <Textarea/>
		    phoneNumberErrorMessage : "phone number message",
		    isEnable: false, //true/false state to deisable/enable submit button  (tempo disabled)
		    limitForSmstext : this.limitLatin, //limit for chats in sms text, set by ifCyrillicSmsCheck(), by default limit is 120
		    //testMode : true,  //true by default, updated/uplifted from <TopSectionButtons/> //used to switch between test/prod mode, when in test mode, Api uses on server side TextBelt test key {"textbelt_test"}
		    ifTestMode: this.props.ifTestModeData,  //test/prod flag (set in <TopSectionButtons/>, uplifted to <App/> and passed here)
		    answerFromTextbelt : {success:false, textId:'', quotaRemaining: '', clientMessage:'', errorFromApi: ''},
		    ifUserClickedSendSms : false, //to detect if used clicked sendind sms (to decide if to show Div with "Message sent/not sent")
		    ifUserClickedCheckDelivery: false, //to detect if used clicked button "Check delivery status" (to decide if to show Div with "Delivered/Not Delivered" Status). used in <ResultFromTextbeltApi/>. Updated/uplifted from there too.
        };
 
        // This binding is necessary to make `this` work in the callback
	    this.run_This_Component_Functions_In_Queue = this.run_This_Component_Functions_In_Queue.bind(this); //runs all functions together
	    this.getFormValue = this.getFormValue.bind(this);
	    this.handlePhoneNumberKeyPress = this.handlePhoneNumberKeyPress.bind(this); //sends this.state.phoneNumberChild to parent <App/> to set it in parent's state {state.phoneNumber}
	    this.handleTextAreaKeyPress = this.handleTextAreaKeyPress.bind(this); //sends this.state.smsTextChild to parent <App/> to set it in parent's state {state.smsText}
        this.resetFields = this.resetFields.bind(this);
	    this.myValidate = myValidate.bind(this); //for injected from files function, for non-injected function use {this.myValidate.bind(this);}
	    this.AutocompleteFunction = AutocompleteFunction.bind(this); //for binding this class/file functions
	    this.ifCyrillicSmsCheck = this.ifCyrillicSmsCheck.bind(this);
	    this.handleTextAreaPaste = this.handleTextAreaPaste.bind(this);
	    this.sendSmsMessage = sendSmsMessage.bind(this); //for injected from files function
        this.scrollResults = scrollResults.bind(this); //for injected from files function
    }
  
    componentDidMount(){
	    //JQ UI autocomplete from injected function.
	    this.AutocompleteFunction();
    }
   
    componentWillMount(){
    }
   
    //uplifting
    handleToUpdateIfDeliverClicked(someArg){
		this.setState({ifUserClickedCheckDelivery:someArg});
	}
	
    /*
    |--------------------------------------------------------------------------
    | runs all functions together on submit button click
    |--------------------------------------------------------------------------
    |
    |
    */
    run_This_Component_Functions_In_Queue() {	  
	    if ($("#sendButton").is(":disabled")) {  
            swal("Stop!", "Button disabled, incorrect phone number");
        }
	  
	 
	  
	    //if texarea is empty, stop anything further, show/hide <Error/> component
	    if(this.getFormValue() === false) {
            /*
		    setTimeout(function(){
		        $("html, body").animate({ scrollTop: 0 }, "slow"); //scroll the page to top(mostly for mobile convenience)
                $('.App').addClass('blur');  //blur the background
		        $(".error-parent").fadeIn(1500); //show error gif from <Error/>
		    }, 2000); // A delay of 1000ms
		
		    setTimeout(function(){
                $('.App').removeClass('blur'); //removes blur from background
			    $(".error-parent").fadeOut(1000); //hide error gif from <Error/>
            }, 3000); // A delay of 1000ms
		    */
	    } else if(this.getFormValue() === true) {
	        //send the sms message with axios if this.getFormValue == TRUE
            this.sendSmsMessage();
	    }
	   
    }
  
  
    /*
    |--------------------------------------------------------------------------
    | gets the textarea value, splits it to array and sets to state
    |--------------------------------------------------------------------------
    |
    |
    */
    getFormValue(){
		if (this.state.smsTextChild.trim() === ""){ 
		    swal("Stop!", "No sms text!", "error");
            return false;		 
	    }
	   
	    if (this.state.phoneNumberChild.trim()=== ""){
		    swal("Stop!", "No cell number!", "error");
            return false;		 
	    }
	   
	    //decides what regExt to use, if it is ua number use RegExp for ua numbers
	    if (this.state.phoneNumberChild.match(/^\+380/)){  //if it is ua number use RegExp for ua numbers
	        var regExpp = this.RegExp_Phone_UA; 
        } else {
		    var regExpp = this.RegExp_Phone; 
	    }			
			
	   //checks if cell number is correct, uses regular expressions RegExp_Phone_UA or RegExp_Phone. Additionally RegExp checking is used on cell number keypress (js/validate_regExp.js)
		if (!this.state.phoneNumberChild.match(regExpp)){
            swal("Stop!", "Phone number incorrect", "warning");
            return false;
		}
		
		//if all is OK
		return true;
 
    }
 
   
   
    /*
    |--------------------------------------------------------------------------
    | On key press in phone number input, take its value, set it to {this.state.phoneNumberChild} and send it to parent component's state in <App/>
    |--------------------------------------------------------------------------
    |
    |
    */
    handlePhoneNumberKeyPress (event) {
	    var inputPhone = event.target.value; //i.e == $("#cellNumberInput").val()
	   
	    if (inputPhone.match(/^\+3/)) {  //decides what regExt to use, if it is ua number use RegExp for ua numbers //if( inputPhone.match(/^\+380/)){ 
	        var regExpp = this.RegExp_Phone_UA; 
		    var messageError = ' incomplete UA number';
		    var messageOK = "UA";
        } else {
		    var regExpp = this.RegExp_Phone; 
		    var messageError = ' incomplete EU number';
		    var messageOK = "EU";
	    }
	 
        this.myValidate(inputPhone, this.id, regExpp, 'sendButton', messageError, messageOK, event);   //{e} new must have arg
	   
	    //asynchronous
        this.setState({phoneNumberChild: event.target.value} 
	     , () => {
            //sends {this.state.smsTextChild} to parent <App/>, send it as callback
	        this.props.liftPhoneNumberHandler(this.state.phoneNumberChild);
        });   
    }
   
  

    /*
    |--------------------------------------------------------------------------
    | On key press in sms textarea, take texterea value, set it to {this.state.smsTextChild} and send it to parent component's state{state.smsText} in <App/>
    |--------------------------------------------------------------------------
    |
    |
    */
    handleTextAreaKeyPress (event) {
	    var smsText;
	   
	    //decide what limit to use for sms text input (based if text contain russ chars)
	    if(this.ifCyrillicSmsCheck()){
		    this.setState({limitForSmstext: this.limitCyrill});
			//this.limit = this.limitCyrill; //70;
		} else {
		    //this.limit = this.limitLatin; //120;
			this.setState({limitForSmstext: this.limitLatin});
		}
	    var texted = event.target.value; //textarea input

	    //Check if current sms textarea input is no bigger than limit(this.state.limitForSmstext)
	    if(texted.length >= this.state.limitForSmstext){
            
		    //flash message to show that limit is reached
		    $(".flash-message").clearQueue().fadeIn(100).fadeOut(900);
		    smsText = event.target.value.substring(0, this.state.limitForSmstext); //trim sms to limit length
	    
        } else {
		   
		   smsText = event.target.value;
	    }
	   
	    // Update this.state.smsTextChild with new sms textarea input.
        this.setState({smsTextChild: smsText /*event.target.value*/}
	        , () => {
            //sends {this.state.smsTextChild} to parent <App/>
	        this.props.liftSmsTextHandler(this.state.smsTextChild);
        });  
    }
   
   
   
    /*
    |--------------------------------------------------------------------------
    | on paste to sms textArea
    |--------------------------------------------------------------------------
    |
    |
    */
    handleTextAreaPaste(e){
	    var smsText;
	    var pastedData = e.clipboardData.getData('Text'); //gets the paste text
	    e.preventDefault(); //must-have to work without errors
	   
	    //if current sms text in textarea or clipboard text contains russian
		if(this.ifCyrillicSmsCheck() || pastedData.match(/[а-яА-ЯЁё]/)){ 
			this.setState({limitForSmstext: this.limitCyrill});
			//this.limit = this.limitCyrill; //70;
		} else {
		    //this.limit = this.limitLatin; //120;
			this.setState({limitForSmstext: this.limitLatin});
		}
		
		//Check if current sms textarea input is no bigger than limit(this.state.limitForSmstext)
	    if(pastedData.length >= this.state.limitForSmstext){
            
		    //flash message to show that limit is reached
		    $(".flash-message").clearQueue().fadeIn(100).fadeOut(700);
		    smsText = pastedData.substring(0, this.state.limitForSmstext); //trim sms to limit length
	    } else {
            
		   smsText = pastedData;
	    }
	   
	    // Update this.state.smsTextChild with new sms textarea input.
        this.setState({smsTextChild: smsText /*event.target.value*/}
	        , () => {
            //sends {this.state.smsTextChild} to parent <App/>
	        this.props.liftSmsTextHandler(this.state.smsTextChild);
        });
    }
   
   
    /*
    |--------------------------------------------------------------------------
    | clear the states, ie. fields.
    |--------------------------------------------------------------------------
    |
    |
    */
    resetFields(){
	    this.setState({phoneNumberChild: ""}); //reset phone number
	    this.setState({smsTextChild: ""});     //reset sms text
	    this.setState({phoneNumberErrorMessage: ""}); //reset error message for phone number
	    this.setState({ifUserClickedSendSms: false}); //set false to hide Div with result in <ResultFromTextbeltApi/>
	   
	    //reset vallues in this.state.answerFromTextbelt (Variant for Object).In order to hide prev Delivery status
	    this.setState(prevState => ({
            answerFromTextbelt: {    // object that we want to update
                ...prevState.answerFromTextbelt,    // keep all other key-value pairs
                success: false, textId:'',  // update the Object with key:value
			    quotaRemaining:'', clientMessage:'',errorFromApi: ''					
            }
        }));
           
    }
	  
  
    /*
    |--------------------------------------------------------------------------
    | method to check if sms text ru or engl 
    |--------------------------------------------------------------------------
    |
    |
    */
    ifCyrillicSmsCheck() { 
        var ruText = /[а-яА-ЯЁё]/;	
	    if( $('#smsTextInput').val().match(ruText)){  //alert('ru');
	        return true;
	    } else {
		    return false;
        }
	}   
	

  
    //RENDER --------------------------
    render() {
	    var handleToUpdateIfDeliverClicked  = this.handleToUpdateIfDeliverClicked; //uplift to <TextArea/>
        return (
	      <div>
		  {/*<CopyLayout/>*/}
	        <form className="textarea-my">
		      <div className="form-group">
			    <DisplayPhoneRegExpMessage status={this.state.isEnable} phoneNumberErrorMessageX={this.state.phoneNumberErrorMessage}/> {/* Message if RegExp founds cell number OK/or NOT*/}
			    {/*<span className={this.state.isEnable ? 'err-mess-wrong phone-error' : 'err-mess-ok phone-error'} > {this.state.phoneNumberErrorMessage} </span> */ }  {/* Message if RegExp founds cell number OK/or NOT*/}
				<input type="text" id="cellNumberInput"  placeholder="Cell number" className="form-control shadow-xx shadow-text" value={this.state.phoneNumberChild} onChange={this.handlePhoneNumberKeyPress}/> 
			  </div>
			 
			  <div className="form-group">
                <textarea id="smsTextInput" rows="8" cols="80" placeholder="Your sms..." className="form-control shadow-xx shadow-text" value={this.state.smsTextChild}  onChange={this.handleTextAreaKeyPress} onPaste={this.handleTextAreaPaste}/> 
			  </div>
				 
			  <CountSmsText smsText={(this.state.limitForSmstext - this.state.smsTextChild.length)}/> {/* count chars left for smsText, i.e current limit - currentText length */}

			  <div className="form-group buttonsX">
                <input type="button" className="btn btn-success btn-md el" value="Send" id="sendButton" onClick={this.run_This_Component_Functions_In_Queue} /* disabled = {this.state.isEnable} */ /> {/* Functionality to disable button if cell number is not OK is TURNED OFF HERE */}
			    <input type="button" className="btn btn-primary btn-md el" value="Reset" id="" onClick={this.resetFields} />
				{/*<input type="button"  value="Lift Coords" onClick={() => liftFinalCoordsHandler('Lifted_TextArea')}/> */}
			  </div>  		
				
            </form>
			 
	        <ResultFromTextbeltApi answer={this.state.answerFromTextbelt} 
                                   ifTestModeData2={this.props.ifTestModeData}  
			                       showHideDivData={this.state.ifUserClickedSendSms} ifUserClickedCheckDeliveryData={this.state.ifUserClickedCheckDelivery} 
			                       handleToUpdateIfDeliverClicked = {handleToUpdateIfDeliverClicked.bind(this)}/>
			 
			 <AjaxLoader/>
		     <FlashMessage/>  {/* Left 0 chars */}
		</div>
	  
    );
  }
}

export default TextAreaX;