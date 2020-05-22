import React, { Component } from 'react';
import $ from 'jquery';
import {scrollResults} from '../functions_injected/scrollResults'; //import my function to scroll

//import '../../css/Technical_Info.css';
//import LiftedTo_Component from '../LiftUpComponent/LiftedTo_Component';
//import error from '../../images/error.gif';
/*
import State_Array_List_Builder from '../Build_List_from_State_Array/State_Array_List_Builder';  //Component creates List from State Array
import LiftedFrom_Component from '../LiftUpComponent/LiftedFrom_Component';
*/
//import $ from 'jquery';



class ResultFromTextbeltApi extends Component {
	constructor(props) {
      super(props);
      this.state = {
	     deliveryStatus:'here will be status',
		 textIfTestModeOn: this.props.ifTestModeData2, // ? 'Test mode ON' : ' Test OFF, it"s Prod',  //just for test, to show if it is TEST or Prod
		 deliveryStatus: 'some status',
		 ifUserClickedCheckDelivery: false, //to detect if used clicked "Check Delivery" (to decide if to show Div with "Delivered/NotDelivered")CSS styling
		 deliveredOK: false, //deivery status for CSS styling (red or green bg)
      };
	  
	 // This binding is necessary to make `this` work in the callback
	 this.checkSmsDeliveryStatus = this.checkSmsDeliveryStatus.bind(this); //runs all functions together
     this.scrollResults = scrollResults.bind(this); //for injected from files function
  }
  
   //function to run ajax to check delivery status
   checkSmsDeliveryStatus(){
	 
	
	   //------ Variant_2 (ajax withcontentType/dataType) => Works!!!! (The most correct)!!!!!!!!!!!!!!!!
	      $(".ajax-loader").show(); //show loader
		  
		  
		  
	      $.ajax({ //use {http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/getSmsDeliveryStatus.php'} to test on localhost, use {../Server_Side/ajax_script/getSmsDeliveryStatus.php} on real hosting
            url: '../Server_Side/ajax_script/getSmsDeliveryStatus.php', //url: 'http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/getSmsDeliveryStatus.php', //url: '../Server_Side/ajax_script/getSmsDeliveryStatus.php', //url: 'http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/getSmsDeliveryStatus.php',//url: 'http://dimmm931.000webhostapp.com/sms_react_js/Server_Side/ajax_script/sendSms.php',//
            type: 'GET',
			//contentType: "application/json",
			dataType: 'JSON', //'JSON', 'text/html' // without this it returned string(that can be alerted), now it returns object
			crossDomain: true,
			//headers: {  'Access-Control-Allow-Origin': 'http://The web site allowed to access' }, 
			//headers: { 'Content-Type': 'application/json' }, //NO HEADERS -> it will crash
			//passing some data.....
            data: 
			{ 
			    serverTextID: this.props.answer.textId 
			},
            success: function(data) {
               
			  alert("check delivery OK");
			  alert(JSON.stringify(data));
			  console.log(data);
			  
			  if(data.status){ //textBeltResponse array is set in Classes/SendSms.php
				  
				  alert("textBeltResponse " + data.status);
				  
				  //update this.state.deliveryStatus -> gets the relivery response status from Api
				  this.setState({deliveryStatus : data.status}); 
				  
				  if(data.status == 'DELIVERED'){
				      this.setState({deliveredOK : true});  //for CSS styling 
				  }
			     
			  } else { //if NO data.textBeltResponse, i.e no response from TextBelt Api
				  //update this.state.deliveryStatus
				  this.setState({deliveryStatus : 'error happened'});	   
				 
			  }
			
			  $(".ajax-loader").fadeOut(5000); //hide loader
			  
			 //set true to show Div with Delivery result in <ResultFromTextbeltApi/>
		     this.setState({ifUserClickedCheckDelivery: true});
			 
			 //Scroll to results in Mobile only
		     if(window.screen.width <= 640){ 
	            this.scrollResults(".btn-scroll"); //scroll the page down to .btn-scroll
		     }
			 
             }.bind(this),  //end success //{.bind(this)} is a must otherwise setState won't work in success
			 error: function (error) {
				alert("Check Delivery  failed");
				$(".ajax-loader").fadeOut(5000); //hide loader
				
				//update this.state.deliveryStatus
				this.setState({deliveryStatus : error});
				
			    //set true to show Div with Delivery result in <ResultFromTextbeltApi/>
		       this.setState({ifUserClickedCheckDelivery: true});
		       
			 //Scroll to results in Mobile only
		     if(window.screen.width <= 640){ 
	            this.scrollResults(".btn-scroll"); //scroll the page down to .btn-scroll
		     }
			 
            }.bind(this) //{.bind(this)} is a must otherwise setState won't work in success	
        });
		
	   //
   }
  
  
  
  
  //RENDER ------------------------------------------------
  render() {
	  
	
	//iterate over state Array[], if  typeof(state) == ARRAY
	/* const itteratedArray = this.props.answer.map(function(item, i){
	   return <li key={i}>{item}</li>
    }); */
	
   //iterate over state Object{}, if  typeof(state) == OBJECT
   var myObjX = this.props.answer;   
   const itteratedArray = Object.keys(myObjX).map(function(key, index) {
      return <span key={index}> #{key} => {myObjX[key]/*.toString()*/} &nbsp;&nbsp; </span> //index is i++;  key is Object key name;  myObjX[key] is the value of key //toString() is do display Boolean true/false
     //return <li key={index}> {key} => {myObjX[key].toString()}  </li>
   });

	 
      return (
	  <div className='col-sm-12 col-xs-12 resultScroll'>
	    
		<div className='col-sm-3 col-xs-0'></div>
	 
	 
	    <div className={'col-sm-6 col-xs-12' + (this.props.showHideDivData ? ' show-div': ' hide-div')}>
	   
	       {/* Shows this.state.answerFromTextbelt (type Object*) from Textarea.js */}
		    <div className={'col-sm-12 col-xs-12 textbelt-answer font-small' + (this.props.answer.success? ' sms-sent': ' sms-not-sent')}> {/* if this.state.answerFromTextbelt.success is set as TRUE in Textarea.js, set css class 'sns-sent' */}
		      {/*this.props.answer */} 
		      {itteratedArray} {/* Shows => success => true textId => 888888888 quotaRemaining => 1 */} 
		    </div> 
		  
		  
		    {/* Message for client, My custom message: Sent/was not sent */}
		    <div className={'col-sm-12 col-xs-12 textbelt-answer' + (this.props.answer.success? ' sms-sent': ' sms-not-sent')}> {/* if this.state.answerFromTextbelt.success is set as TRUE in Textarea.js, set css class 'sns-sent' */}
		      {this.props.answer.clientMessage} {/* Shows=> My custom: Sent/was not sent*/} 
			  <p> Api Success: {this.props.answer.success.toString()}</p> {/* True/false status from TextBelt */} 
			  <p> Api error: {this.props.answer.errorFromApi}</p>  {/* error status from Classes/SendSms.php, value from($errorX)*/} 
			  <p> ifTest: {this.state.textIfTestModeOn.toString()} </p>
		    </div> 
		    
			
		    {/* If sms is sent, show button "check delivery" */}
		    <div className={'col-sm-12 col-xs-12 btn-scroll' + (this.props.answer.success? ' show-delivery-button': ' hide-delivery-button')}>
		       <input type="button" className="btn btn-success btn-md el" value="Check Delivery"  onClick={this.checkSmsDeliveryStatus}/>
		    </div>
		   
		   
		   {/* Div to show sms delivery status */}
		    <div className={'col-sm-12 col-xs-12 textbelt-answer' + (this.state.ifUserClickedCheckDelivery? ' show-div': ' hide-div') + (this.state.deliveredOK? ' deliv-ok': ' deliv-fail')}>
			   <p><i className="fa fa-envelope-o" ></i></p>
			   {this.state.deliveryStatus}
		    </div>
		   
		
		</div>
		
    </div>
	  
    );
  }
}

export default ResultFromTextbeltApi;
