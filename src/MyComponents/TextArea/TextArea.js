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




/*import error from '../../images/error.gif';
import CopyLayout from '../Copy/CopyLayout';
*/



class TextAreaX extends Component {
	constructor(props) {
    super(props);
	
	this.RegExp_Phone = /^[+][\d]{8,9}[0-9]+$/; //phone number regExp for world wide
	this.RegExp_Phone_UA = /^[+]380[\d]{2}[0-9]{7}$/; //phone number regExp for Ukraine //must have strict +380 & 9 digits ///^[+]380[\d]{1,4}[0-9]+$/;

	this.limitLatin = 120; //limit for chars in sms
	this.limitCyrill = 70; //limit for Ru chars in sms
	
	
    this.state = {
		phoneNumberChild : "+380",
		smsTextChild : "I am set manually in state in child <Textarea/>",
		phoneNumberErrorMessage : "phone number message",
		isEnable: false, //true/false state to deisable/enable submit button  (tempo disabled)
		limitForSmstext : this.limitLatin, //limit for chats in sms text, set by ifCyrillicSmsCheck(), by default limit is 120
		//testMode Status is uplifted from <TopSectionButtons/> to <App/> and passed there to <TerxAreaX/> as this.props.ifTestModeData
		//testMode : true,  //true by default, updated/uplifted from <TopSectionButtons/> //used to switch between test/prod mode, when in test mode, Api uses on server side TextBelt test key {"textbelt_test"}
		ifTestMode: this.props.ifTestModeData,  //test/prod flag (set in <TopSectionButtons/>, uplifted to <App/> and passed here)
		answerFromTextbelt : {success:false, textId:'', quotaRemaining: '', clientMessage:'', errorFromApi: ''},
		ifUserClickedSendSms : false, //to detect if used clicked sendind sms (to decide if to show Div with "Message sent/not sent")
		//addressArray: [],  //this state will hold array with separ addresses from textarea input
	
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
	
	
	
	/*this.runAjax = this.runAjax.bind(this);
	this.drawResult = this.drawResult.bind(this);
	this.htmlAnyResult = this.htmlAnyResult.bind(this);
	*/
	//this.liftFinalCoordsHandler = this.liftFinalCoordsHandler.bind(this);
  }
  
   componentDidMount(){
	   //JQ UI autocomplete from injected function. Crashed in componentWillMount!!!!!
	   this.AutocompleteFunction();
   }
   
   componentWillMount(){

   }
   
   

   
   //just runs all functions together on submit button click
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
  run_This_Component_Functions_In_Queue() {
	  //var promises = [];  //array that will hold all promises
	  //var temp = [];     // temp array to store found coordinates before assigning it to this.state.coordinateArray
	  
	  //Does not work
	  if ($("#sendButton").is(":disabled"))  //($("#sendButton").attr('submit-button', 'disabled') == 'true') ////if ($(this).find('button.disabled').length > 0) {
      {
        swal("Stop!", "Button disabled, incorrect phone number");
      }
	  
	 
	  
	  //if texarea is empty, stop anything further, show/hide <Error/> component
	  if(this.getFormValue(/*promises,temp*/) === false)
	  {
		  setTimeout(function(){
		    $("html, body").animate({ scrollTop: 0 }, "slow"); //scroll the page to top(mostly for mobile convenience)
            $('.App').addClass('blur');  //blur the background
		    $(".error-parent").fadeIn(1500); //show error gif from <Error/>
		  }, 2000); // A delay of 1000ms
		
		   setTimeout(function(){
              $('.App').removeClass('blur'); //removes blur from background
			  $(".error-parent").fadeOut(1000); //hide error gif from <Error/>
           }, 3000); // A delay of 1000ms
		   
		  
		 
		  
	  } else if(this.getFormValue(/*promises,temp*/) === true) {
	  
	      
	      //send the sms message with axios if this.getFormValue == TRUE
          this.sendSmsMessage();
	 }
	   
		
	

		  
	  
	  
	  //run axios ajax in loop
	   /*this.runAjax(promises,temp); */  //must pass {promises,temp} as arg to make them visible in function runAjax()//!!!!!!! RETURN ME===============
	  //this.drawResult();  //assigned to Promise.all(promises)
	  
	  
	  
  }
  // **                                                                                  **
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
  
  
  
  
  
  //gets the textarea value, split it to arraye and set to state
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
  getFormValue(/*promises,temp*/){
	 

		 
	  if ($("#smsTextInput").val().trim() === ""){
		 //Display error
		 //alert("empty");
		 swal("Stop!", "No sms text!", "error");
         return false;		 
	   }
	   
	    if ($("#cellNumberInput").val().trim()=== ""){
		 //Display error
		 swal("Stop!", "No cell number!", "error");
         return false;		 
	   }
	   
	    //decides what regExt to use, if it is ua number use RegExp for ua numbers
	   if( $("#cellNumberInput").val().match(/^\+380/)){  //if it is ua number use RegExp for ua numbers
	        var regExpp = this.RegExp_Phone_UA; 
       } else {
		    var regExpp = this.RegExp_Phone; 
	   }			
			
	   //checks if cell number is correct, uses regular expressions RegExp_Phone_UA or RegExp_Phone. Additionally RegExp checking is used on cell number keypress (js/validate_regExp.js)
		if( !$("#cellNumberInput").val().match(regExpp)){
            swal("Stop!", "Phone number incorrect", "warning");
            return false;
		}
		
		//if all is OK
		return true;
 
  }
  // **                                                                                  **
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
   
   
   //NOT USED HERE, transfered to /functions_injected/sendSmsMessage. Can delete here.
   // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
  
   sendSmsMessagePREVV(){
	   
	    
	   
	    const headers = {
        //'Content-Type' : 'application/x-www-form-urlencoded',
		'Content-Type':  'application/json',
		//'Accept': 'application/json'
       };
	   
	   //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	   
	   /*
       axios.post('http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/sendSms.php',
	   {
		   serverPhone: this.state.phoneNumberChild, serverSms: this.state.smsTextChild 
	   },
	    {headers} )
       .then(res => {
		   //const posts = res.data.data.children.map(obj => obj.data);
           //this.setState({ posts });
          return res;
       });
	   */
	   
	   
	   /*
	   axios({ 
	       method: 'GET', url:'http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/sendSms.php', 
		   crossDomain: true, 
		   data: { serverPhone: this.state.phoneNumberChild, serverSms: this.state.smsTextChild }, 
		    headers: headers
		   }) 
	       .then(res => {
		     //const posts = res.data.data.children.map(obj => obj.data);
             //this.setState({ posts });
			 console.log(res);
            return res;
       })
	   .catch((error) => { console.log(error)});
	   
	   
	   */
	   
	   
	   
	   //data to send via ajax
	   var myData = { 
	      serverPhone: this.state.phoneNumberChild,     //number
		  serverSms: this.state.smsTextChild,           //sms text
		  serverIfTestStatus: this.props.ifTestModeData //test/prod flag (set in <TopSectionButtons/>, uplifted to <App/> and passed here)
	   };
	   
	   
	   /*
	    //------ Variant_1 (ajax without contentType/dataType) => Works!!!! (but with text only-> can not parse json )
	   
	      $.ajax({
            url: 'http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/sendSms.php', //url: '../Server_Side/ajax_script/sendSms.php',//my ajax url //'https://textbelt.com/quota/textbelt',
            type: 'POST',
			//contentType: "text/plain",
			//dataType: 'text/html', //'JSON', 'text/html' // without this it returned string(that can be alerted), now it returns object
	
			crossDomain: true,
			//headers: {  'Access-Control-Allow-Origin': 'http://The web site allowed to access' }, 
			//headers: { 'Content-Type': 'application/json' },
			//passing some data.....
            data: myData,
            success: function(data) {
               
			  alert("OK -> Variant_1");
			  alert(data);
			  alert("Variant_1 can work with plain text only, so it cant get JSON by keys");
			  alert("Variant_1 " + data.status);
            },  //end success
			error: function (error) {
				alert("Variant_1 failed");
            }	
        });
		
	   */
	   
	   
	   
	   //------ Variant_2 (ajax withcontentType/dataType) => Works!!!! (The most correct)!!!!!!!!!!!!!!!!
	          //http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/sendSms.php
	      $(".ajax-loader").show(); //show loader
		  
		  
		  
	      $.ajax({ //use {http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/sendSms.php'} to test on localhost, use {../Server_Side/ajax_script/sendSms.php} on real hosting
            url: 'http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/sendSms.php', //url: '../Server_Side/ajax_script/sendSms.php', //url: 'http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/sendSms.php',//url: 'http://dimmm931.000webhostapp.com/sms_react_js/Server_Side/ajax_script/sendSms.php',//
            type: 'POST',
			//contentType: "application/json",
			dataType: 'JSON', //'JSON', 'text/html' // without this it returned string(that can be alerted), now it returns object
	
			crossDomain: true,
			//headers: {  'Access-Control-Allow-Origin': 'http://The web site allowed to access' }, 
			//headers: { 'Content-Type': 'application/json' }, //NO HEADERS -> it will crash
			//passing some data.....
            data: myData,
			/*{ 
			    serverPhone: this.state.phoneNumberChild, 
				serverSms: this.state.smsTextChild, 
				serverIfTestStatus: this.props.ifTestModeData //testMode Status is uplifted from <TopSectionButtons/> to <App/> and passed there to <TerxAreaX/> as this.props.ifTestModeData
			},*/
            success: function(data) {
               
			  alert("OK -> Variant_2");
			  alert("Variant_2 " + data.cellar);
			  alert(JSON.stringify(data));
			  console.log(data);
			  
			  if(data.textBeltResponse){ //textBeltResponse array is set in Classes/SendSms.php
			      
				   //this.setState({answerFromTextbelt : data.textBeltResponse.success});
				   
				  //update this.state.answerFromTextbelt (Variant for array)
				 /* this.setState(prevState => ({
                      answerFromTextbelt: [prevState.array, data.textBeltResponse.success, data.textBeltResponse.textId, data.textBeltResponse.quotaRemaining]
                  })); */
				  
				  alert("textBeltResponse " + data.textBeltResponse.success);
				  
				  if(data.textBeltResponse.success === true){ //if sent
				      //update this.state.answerFromTextbelt (Variant for Object)
				      this.setState(prevState => ({
                          answerFromTextbelt: {    // object that we want to update
                              ...prevState.answerFromTextbelt,    // keep all other key-value pairs
                              success: data.textBeltResponse.success, textId:data.textBeltResponse.textId,  // update the Object with key:value
						      quotaRemaining:data.textBeltResponse.quotaRemaining, clientMessage:'Sms sent successfully',
                              errorFromApi: data.textBeltResponse.errorX						
                          }
                      }));
				  } else {
					  //update this.state.answerFromTextbelt (Variant for Object)
				      this.setState(prevState => ({
                          answerFromTextbelt: {    // object that we want to update
                              ...prevState.answerFromTextbelt,    // keep all other key-value pairs
                              success: data.textBeltResponse.success, textId:'',  // update the Object with key:value
						      quotaRemaining:'', clientMessage:'Sms was not sent successfully',
                              errorFromApi: data.textBeltResponse.errorX						
                          }
                      }));
					  
				  }
				  
			     
			  } else { //if NO data.textBeltResponse, i.e no response from TextBelt Api
				  /*this.setState(prevState => ({
                      answerFromTextbelt: [prevState.array, data.errorX]
                  })); */
				  //this.setState({answerFromTextbelt : data.errorX});
				  
				   //update this.state.answerFromTextbelt (Variant for Object)
				  this.setState(prevState => ({
                      answerFromTextbelt: {    // object that we want to update
                        ...prevState.answerFromTextbelt,    // keep all other key-value pairs
                        success: false, textId:'', quotaRemaining:'', // update the Object with key:value
						clientMessage:'Sms message was not send', errorFromApi: data.errorX  
                     }
                  }));
			  }
			
			  $(".ajax-loader").fadeOut(5000); //hide loader
			  
			  //set true to show Div with result in <ResultFromTextbeltApi/>
		     this.setState({ifUserClickedSendSms: true});
			 
             }.bind(this),  //end success //{.bind(this)} is a must otherwise setState won't work in success
			 error: function (error) {
				alert("Variant_2 failed");
				$(".ajax-loader").fadeOut(5000); //hide loader
				
				//update this.state.answerFromTextbelt (Variant for Object)
				this.setState(prevState => ({
                    answerFromTextbelt: {    // object that we want to update
                        ...prevState.answerFromTextbelt,    // keep all other key-value pairs
                        success: false, textId:'', quotaRemaining:'', clientMessage:'Sms message crashed'  // update the Object with key:value
                    }
                }));
				
			   //set true to show Div with result in <ResultFromTextbeltApi/>
		      this.setState({ifUserClickedSendSms: true});
		
            }.bind(this) //{.bind(this)} is a must otherwise setState won't work in success	
        });
		
		
		
		
	   /*
	   //------ Variant_3  JSONP1 => DOES NOT WORK!!!!
	   $.ajax({
            url: 'http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/sendSms.php',//my ajax url //'https://textbelt.com/quota/textbelt',
            type: 'POST',
			//contentType: "application/json; charset=utf-8",
			dataType: 'JSONP', //'JSON', 'text/html' // without this it returned string(that can be alerted), now it returns object
			jsonpCallback: 'photos',
            jsonp: 'photos',
			crossDomain: true,
			//headers: {  'Access-Control-Allow-Origin': 'http://The web site allowed to access' }, 
			//headers: { 'Content-Type': 'application/json' },
			//passing some data.....
            data: myData,
            success: function(data) {
               
			    alert("OK Variant_3 JSONP1 ");
				alert(JSON.stringify(data));
            },  //end success
			error: function (error) {
				alert("Variant_3 JSONP1 failed");
            }	
        });
		*/
		
		
		/*
		//---------Variant_4 JSONP2  => DOES NOT WORK!!!!
		$.getJSON("http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/sendSms.php?jsoncallback=?",
        {
            format: "json"
        },
       //RETURNED RESPONSE DATA IS LOOPED AND ONLY IMAGE IS APPENDED TO IMAGE DIV
       function(data) {
       //$.each(data.items, function(i,item){
		  alert("OK Variant_4 JSONP2 ");
		  alert(data);
       //$("<img/>").attr("src", item.media.m).appendTo("#images");
       //});
	   });
		//-----------------
		
		
		
		
		function photos (data) {
          alert('photo is OK Variant_3 JSONP1 ');
          console.log(data);
       }
	   */
	   
	   
   }
  



 
//===================================================================


  
  
  //On key press (on print)  in phone number input, take its value, set it to {this.state.phoneNumberChild} and send it to parent component's state in <App/>
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
   handlePhoneNumberKeyPress (event){
	   
	   
	   var inputPhone = event.target.value; //i.e == $("#cellNumberInput").val()
	   
	   if( inputPhone.match(/^\+3/)){  //decides what regExt to use, if it is ua number use RegExp for ua numbers //if( inputPhone.match(/^\+380/)){ 
	        var regExpp = this.RegExp_Phone_UA; 
		    var messageError = ' incomplete UA number';
		    var messageOK = "UA";
       } else {
		    var regExpp = this.RegExp_Phone; 
		    var messageError = ' incomplete EU number';
		    var messageOK = "EU";
	   }
	 
       this.myValidate(inputPhone, this.id, regExpp, 'sendButton', messageError, messageOK, event);   //{e} new must have arg, otherwise not visible
	   
	   // Remember that setState is asynchronous, so if you want to print the new state, you have to use the callback parameter
       this.setState({phoneNumberChild: event.target.value} //i.e == $("#cellNumberInput").val()
	     , () => {
          //sends {this.state.smsTextChild} to parent <App/>, send it as callback
	      this.props.liftPhoneNumberHandler(this.state.phoneNumberChild);
       });
	   
	   
   }
   
  
  //On key press (on print) in sms textarea, take texterea value, set it to {this.state.smsTextChild} and send it to parent component's state{state.smsText} in <App/>
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
   handleTextAreaKeyPress (event){
	   var smsText;
	   
	    // Handle the delete/backspace key
       /* if (event.keyCode === 8 || event.keyCode === 46) { alert('dd');
		   return;
	   } */
	   
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
		    //return false;
		   
		   //flash message to show that limit is reached
		   $(".flash-message").clearQueue().fadeIn(100).fadeOut(900);
		   
		   smsText = event.target.value/* this.state.smsTextChild */.substring(0, this.state.limitForSmstext); //trim sms to limit length

		  
	   } else {
		   
		   smsText = event.target.value;
	   }
	   
	       // Update this.state.smsTextChild with new sms textarea input.
		   //Remember that setState is asynchronous, so if you want to print the new state, you have to use the callback parameter
           this.setState({smsTextChild: smsText /*event.target.value*/}
	           , () => {
               //sends {this.state.smsTextChild} to parent <App/>, send it as callback
	           this.props.liftSmsTextHandler(this.state.smsTextChild);
           });
	   
	   
	   
   }
   
   
      
   //on paste to sms textArea
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
   handleTextAreaPaste(e){
	   var smsText;
	   var pastedData = e.clipboardData.getData('Text'); //gets the paste text
	   e.preventDefault(); //must-have to work without errors
	   
	   //if current sms text in textarea or clipboard text contains russian
		if(this.ifCyrillicSmsCheck() || pastedData.match(/[а-яА-ЯЁё]/)){ //
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
		   //Remember that setState is asynchronous, so if you want to print the new state, you have to use the callback parameter
           this.setState({smsTextChild: smsText /*event.target.value*/}
	           , () => {
               //sends {this.state.smsTextChild} to parent <App/>, send it as callback
	           this.props.liftSmsTextHandler(this.state.smsTextChild);
           });
	   
		
		
   }
   
   
   
   
   //clear this State, ie. fields
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
   resetFields(){
	   this.setState({phoneNumberChild: ""}); //reset phone number
	   this.setState({smsTextChild: ""});     //reset sms text
	   this.setState({phoneNumberErrorMessage: ""}); //reset error message for phone number
	   this.setState({ifUserClickedSendSms: false}); //set false to hide Div with result in <ResultFromTextbeltApi/>
	   //$('.phone-error').html("");
           
   }
	  
  //to check if sms text ru or engl 
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     ** 
   ifCyrillicSmsCheck() { 
       var ruText = /[а-яА-ЯЁё]/;	
	   if( $('#smsTextInput').val().match(ruText)){  //alert('ru');
	       return true;
	   } else {
		   return false;
	   
        }
	}   
	

  
  //RENDER ------------------------------------------------
  render() {
      //var liftFinalCoordsHandler  =   this.props.liftFinalCoordsHandler ; //for lifting state up to parent
	  
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
			 
			 <ResultFromTextbeltApi answer={this.state.answerFromTextbelt} ifTestModeData2={this.state.ifTestMode}  showHideDivData={this.state.ifUserClickedSendSms}/>
			 
			 <AjaxLoader/>
		     <FlashMessage/>  {/* Left 0 chars */}
		</div>
	  
    );
  }
}

export default TextAreaX;
