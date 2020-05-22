//USED in <TextArea/> as injected function 

//import React, { Component } from 'react';
import $ from 'jquery';
//import swal from 'sweetalert';







//Function that sends Sms via ajax
// **************************************************************************************
// **************************************************************************************
// 
//                                                                                     ** 
export function sendSmsMessage (){
	
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
            url: '../Server_Side/ajax_script/sendSms.php', //url: 'http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/sendSms.php', //url: '../Server_Side/ajax_script/sendSms.php', //url: 'http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/sendSms.php',//url: 'http://dimmm931.000webhostapp.com/sms_react_js/Server_Side/ajax_script/sendSms.php',//
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
			 
			 //Scroll to results in Mobile only
		     if(window.screen.width <= 640){ 
	            this.scrollResults(".resultScroll"); //scroll the page down to weather results
		     }
			 
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
			  
			 //Scroll to results in Mobile only
		     if(window.screen.width <= 640){ 
	            this.scrollResults(".resultScroll"); //scroll the page down to weather results
		     }
		
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