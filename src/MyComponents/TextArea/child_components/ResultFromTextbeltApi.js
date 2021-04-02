import React, { Component } from 'react';
import $ from 'jquery';
import {scrollResults} from '../functions_injected/scrollResults'; //import my function to scroll
import loaderX from '../../../images/loaddd.gif'
import loaderX1 from '../../../images/loaddd_PREV.gif'

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
		 //ifUserClickedCheckDelivery: this.props.ifUserClickedCheckDeliveryData, //false by default, //to detect if used clicked "Check Delivery" (to decide if to show Div with "Delivered/NotDelivered" Status). Value is used in <ResultFromTextbeltApi/>
		 deliveredOK: false, //deivery status for CSS styling (red or green bg)
      };
	  
	 // This binding is necessary to make `this` work in the callback
	 this.checkSmsDeliveryStatus = this.checkSmsDeliveryStatus.bind(this); //runs checkong delivery
	 this.runSomeActionsOnAjaxResult = this.runSomeActionsOnAjaxResult.bind(this); //runs checkong delivery
     this.scrollResults = scrollResults.bind(this); //for injected from files function
  }
  
  
  
  
   //function to run ajax to check delivery status
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
   checkSmsDeliveryStatus(){
       
	   //alert(this.props.ifUserClickedCheckDeliveryData);
	   
	   //set false to hide Div with Delivery result in <ResultFromTextbeltApi/> (if was shown prev)
		//this.setState({ifUserClickedCheckDelivery: false});
			 
	   
	   $(".child-div").css('opacity', '1'); //shows yellow overlay div-> react imitation of animation, analogue of {$(".del-st").stop().fadeOut("slow",function(){ /*$(this).html(finalText) */}).fadeIn(3000);
	   
	   
	
	   //------ Variant_2 (ajax withcontentType/dataType) => Works!!!! (The most correct)!!!!!!!!!!!!!!!!
	      $(".ajax-loader").show(); //show gif loader
		  
		  //decide which url to use, switching ajax url when running on localHost or real Hosting
		  var localhostURL = 'http://localhost/CLEANSED_GIT_HUB/Sms_Textbelt_Api_React_JS/Server_Side/ajax_script/getSmsDeliveryStatus.php';
		  var realServerProdURL = '../Server_Side/ajax_script/getSmsDeliveryStatus.php'; //can't use this on LocalHost as it'll redirect to http://localhost:3000/Server_Side/ajax_script/sendSms.php
		  var ajaxURL = '';
		  
		  //if finds "localhost" in current url
		  if(window.location.href.match(/localhost/)){  
			  ajaxURL = localhostURL; 
		  } else {
			  ajaxURL = realServerProdURL;
		  }
		  
		  
	      $.ajax({ //use {http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/getSmsDeliveryStatus.php'} to test on localhost, use {../Server_Side/ajax_script/getSmsDeliveryStatus.php} on real hosting
            url: ajaxURL, //'../Server_Side/ajax_script/getSmsDeliveryStatus.php', //url: 'http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/getSmsDeliveryStatus.php', //url: '../Server_Side/ajax_script/getSmsDeliveryStatus.php', //url: 'http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/getSmsDeliveryStatus.php',//url: 'http://dimmm931.000webhostapp.com/sms_react_js/Server_Side/ajax_script/sendSms.php',//
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
               //$(".del-st").stop().fadeOut("slow",function(){ /*$(this).html(finalText) */}).fadeIn(2000);
			  //alert("check delivery OK");
			  //alert(JSON.stringify(data));
			  console.log(data);
			  
			  if(data.status){ //textBeltResponse array is set in Classes/SendSms.php
				  
				  //alert("textBeltResponse " + data.status);
				  
				  //update this.state.deliveryStatus -> gets the relivery response status from Api
				  this.setState({deliveryStatus : data.status}); 
				  
				  if(data.status == 'DELIVERED'){
				      this.setState({deliveredOK : true});  //for CSS styling 
				  } else {
					  this.setState({deliveredOK : false});  //for CSS styling 
				  }
			     
			  } else { //if NO data.textBeltResponse, i.e no response from TextBelt Api
				  //update this.state.deliveryStatus
				  this.setState({deliveryStatus : 'error happened, may be a test message???'});	   
				 
			  }
			 
			 this.runSomeActionsOnAjaxResult();
			 
             }.bind(this),  //end success //{.bind(this)} is a must otherwise setState won't work in success
			 error: function (error) {
				alert("Check Delivery  failed");
				
				//update this.state.deliveryStatus
				this.setState({deliveryStatus : 'Check delivery error'});
				
				this.runSomeActionsOnAjaxResult();
			 
            }.bind(this) //{.bind(this)} is a must otherwise setState won't work in success	
        });
		

		
	   //
	  
   }
  
  //run some action both on ajax success/fail
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
   runSomeActionsOnAjaxResult(){
       $(".ajax-loader").fadeOut(3000); //hide loader
			  
	   //update/uplift {this.state.ifUserClickedCheckDelivery} in <TextArea/>, which is passed here as {this.props.ifUserClickedCheckDeliveryData} 
	    this.props.handleToUpdateIfDeliverClicked(true);
			 
	   //Scroll to results in Mobile only
	   //if(window.screen.width <= 640){ 
	       this.scrollResults(".btn-scroll"); //scroll the page down to .btn-scroll
	   //}
			 
	   setTimeout(function() {
	       $(".child-div").css('opacity', '0'); //hides yellow overlay div -> react imitation of animation, analogue of{$(".del-st").stop().fadeOut("slow",function(){ /*$(this).html(finalText) */}).fadeIn(3000);
	   }, 3000);
	   
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
	    
		<div className='col-sm-3 col-xs-0'></div>  {/*  just to center */}
	 
	 
	    <div className={'col-sm-6 col-xs-12' + (this.props.showHideDivData ? ' show-div': ' hide-div')}>
	   
	       {/* Shows this.state.answerFromTextbelt (type Object*) from Textarea.js. Most technical info */}
		   {/* <div className={'col-sm-12 col-xs-12 textbelt-answer font-small' + (this.props.answer.success? ' sms-sent': ' sms-not-sent')}> */} {/* if this.state.answerFromTextbelt.success is set as TRUE in Textarea.js, set css class 'sns-sent' */}
		      {/*this.props.answer */} 
		      {/*{itteratedArray}*/} {/* Shows => success => true textId => 888888888 quotaRemaining => 1 */} 
		   {/* </div> */}
		  
		  
		  
		  
		   {/* Message for client, My custom message: Message Sent/was not sent */}
		    <div className={'col-sm-12 col-xs-12  parent-div-sms'}>
		  
		         <div className="col-sm-12 col-xs-12 textbelt-answer child-div-sms">{/* overlay loader, hidden by default */}
                      <p>This should be over the parent</p>
				      <img src={loaderX1}  className="delivery-loader-sms" alt="logo" />  
                 </div>
			
		        {/* Message for client, My custom message: Sent/was not sent */}
		        <div className={'col-sm-12 col-xs-12 textbelt-answer' + (this.props.answer.success? ' sms-sent': ' sms-not-sent')}> {/* if this.state.answerFromTextbelt.success is set as TRUE in Textarea.js, set css class 'sns-sent' */}
		           <p>{this.props.answer.clientMessage}</p>{/* Shows=> My custom: Sent/was not sent*/} 
			       <p> Api Success: {this.props.answer.success.toString()}</p> {/* True/false status from TextBelt */} 
			       <p> Api error: {this.props.answer.errorFromApi}</p>  {/* error status from Classes/SendSms.php, value from($errorX)*/} 
				   <p> Left: {this.props.answer.quotaRemaining} quota</p> 
			       <p> if Test Sms: {this.props.ifTestModeData2.toString()} </p>
		        </div> 
				
			</div> {/* parent-div-sms */}
		    
			
			
			
			
			
		    {/* If sms is sent, show button "check delivery" */}
		    <div className={'col-sm-12 col-xs-12 btn-scroll' + (this.props.answer.success? ' show-delivery-button': ' hide-delivery-button')}>
		       <input type="button" className="btn btn-success btn-md el" value="Check Delivery"  onClick={this.checkSmsDeliveryStatus}/>
		    </div>
		   
		   
		   {/* Div to show sms delivery status */}
		    <div id="delivText" className={'col-sm-12 col-xs-12 textbelt-answer del-st parent-div' + ((this.props.answer.success && this.props.ifUserClickedCheckDeliveryData)? ' show-div': ' hide-div') + (this.state.deliveredOK? ' deliv-ok': ' deliv-fail')}>
			   
			   <div className="child-div">{/* overlay loader, hidden by default */}
                   <p>This should be over the parent</p>
				   <img src={loaderX}  className="delivery-loader" alt="logo" />  
               </div>
			   
			   {/* Show delivery text*/}
			   <p><i className="fa fa-envelope-o fa-2x" ></i></p>
			   <p>{this.state.deliveryStatus}</p>
		    </div>
		   
		
		</div>
		
    </div>
	  
    );
  }
}

export default ResultFromTextbeltApi;
