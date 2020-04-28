import React, { Component } from 'react';
import $ from 'jquery';
import swal from 'sweetalert';
/*import error from '../../images/error.gif';
import '../../css/TextArea.css';
import axios from 'axios';
import CopyLayout from '../Copy/CopyLayout';
*/



class TextAreaX extends Component {
	constructor(props) {
    super(props);
    this.state = {
		addressArray: [],  //this state will hold array with separ addresses from textarea input
		coordinateArray: [],  //this state will hold array with ready coordinates returned by axios
    };
 
    // This binding is necessary to make `this` work in the callback
	this.run_This_Component_Functions_In_Queue = this.run_This_Component_Functions_In_Queue.bind(this); //runs all functions together
	/*this.getFormValue = this.getFormValue.bind(this);
    this.runAjax = this.runAjax.bind(this);
	this.drawResult = this.drawResult.bind(this);
	this.htmlAnyResult = this.htmlAnyResult.bind(this);
	*/
	//this.liftFinalCoordsHandler = this.liftFinalCoordsHandler.bind(this);
  }
  
  
   //just runs all functions together
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
  run_This_Component_Functions_In_Queue() {
	  //var promises = [];  //array that will hold all promises
	  //var temp = [];     // temp array to store found coordinates before assigning it to this.state.coordinateArray
	  
	  //temp.splice(0, temp.length);
	  
	  
	  
	  
	  //if texarea is empty, stop anything further, show/hide <Error/> component
	  if(this.getFormValue(/*promises,temp*/) === false)
	  {
		   $("html, body").animate({ scrollTop: 0 }, "slow"); //scroll the page to top(mostly for mobile convenience)
		   
           $('.App').addClass('blur');  //blur the background
		   $(".error-parent").fadeIn(2500); //show error gif from <Error/>
		
		   setTimeout(function(){
              $('.App').removeClass('blur'); //removes blur from background
			  $(".error-parent").fadeOut(1000); //hide error gif from <Error/>
           }, 4000); // A delay of 1000ms
		   
		   //display error text with function
		   this.htmlAnyResult("<h2 class='red' id='errorSign'>You submitted Empty Input</h2>");
		  
		  // calling parent method from child {this.props. + method}-> passing/uplifting array with found coords to App.js, method is described in Parent App.js
		   /*this.props.liftFinalCoordsHandler([]);*/ //sending empty array to reset this.state.arg1 in <App/>.js. Otherwise, when u found coordinates by texarea input and get the result and then solved to empty the input and click the "Geocode" button, the sign "Empty input" will appear, but table with prev coords result will stay

		  return false; //must have to stop futher Action
	  }
	  
	  
	  
       //Resetting state to Null ,calling parent method from child {this.props. + method}-> passing/uplifting alert info, described in Parent App.js
	   //this.props.techInfoHandler("");   
	   /* this.props.reset_techInfo_State("x"); */
		
	

		  
	  
	  
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
	 

		 
	  if ($("#coordsInput").val().trim()===""){
		 //Display error
		 //alert("empty");
		 swal("Stop!", "No sms text!", "error");
         return false;		 
	   }
	   
	    if ($("#cellNumberInput").val().trim()===""){
		 //Display error
		 swal("Stop!", "No cell number!", "error");
         return false;		 
	   }
	   
	   
	   //check if "You submitted Empty Input" error sign exists and remove it if it does exists. it is done to prevent this sign to appear again if further input is not empty. Otherwise, new table coors result will appear, but error sign will remain on the screen
	   if ($("#errorSign").length){
           //alert('Does exist!');
	       $("#errorSign").remove();
       }



	   let textareaX = $("#coordsInput").val(); //alert(textarea);
       textareaX = textareaX.trim();
	   let arrayX2 = textareaX.split('\n');
	   
	   //alert(arrayX2);  //reassigned to this.props.techInfoHandler
	   //instead of alert, it calls parent method from child {this.props. + method}-> passing/uplifting alert info to method techInfoHandler described in Parent App.js
	   /* this.props.techInfoHandler("arrayX2: " + arrayX2);  */
	   
	 
	   
	   //adding arraay with address to state---------!!!!!!!!!!!!! ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR=================================
	   let addressTempArray = this.state.addressArray; //getting state to array
	   /*addressTempArray.forEach(item => {  //this is var if u want to add existing array new values
           addressTempArray.push(arrayX2); 
       });
	   */
	   addressTempArray.unshift(arrayX2); //adds to array in this way: addressArray = [[arrayX2]]; //MEGA FIX, change push() to unshift()
	   //alert("9999cccc addressTempArray[0].length " + addressTempArray[0].length + " consists=> " +  addressTempArray[0] );
	   
	   
       this.setState({ //sets new value to state
           addressArray:addressTempArray/*[0]*/ // arrayX2 //addressTempArray[0]
       }); 
	   
	  
		   
	   
	   //instead of alert, it calls parent method from child {this.props. + method}-> passing/uplifting alert info to method techInfoHandler described in Parent App.js
	   //this.props.techInfoHandler("this.state.addressArray[0][0] => " + this.state.addressArray[0][0]); 

 
  }
  // **                                                                                  **
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
   
   
   
   
  

   
   
   //Logik to Html the result with function
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
  htmlAnyResult(textX){
	  $("#resultFinal").stop().fadeOut("slow",function(){ 
            $(this).append( textX )   //use .append() instead of .html() to remove this <h2> error sign if texarea input is not empty
       }).fadeIn(11000);

       $("#resultFinal").css("border","1px solid red"); //  set  red  border  for  result  div 
  }
   // **                                                                                  **
   // **                                                                                  **
   // **************************************************************************************
   // **************************************************************************************
   
  
  
  
  
  //RENDER ------------------------------------------------
  render() {
      //var liftFinalCoordsHandler  =   this.props.liftFinalCoordsHandler ; //for lifting state up to parent
	  
      return (
	   
	     <div>
		 {/*<CopyLayout/>*/}
	         <form className="textarea-my">
			     
				 <div className="form-group">
                     <input type="text" id="cellNumberInput"  placeholder="Cell number" className="form-control" /> 
				 </div>
			 
			     <div className="form-group">
                     <textarea id="coordsInput" rows="8" cols="80" placeholder="Your sms..." className="form-control" /> 
				 </div>
				 
				 <div className="form-group">
                      <input type="button" className="btn btn-primary btn-lg" value="Send" id="splitButton" onClick={this.run_This_Component_Functions_In_Queue} />
				     {/*<input type="button"  value="Lift Coords" onClick={() => liftFinalCoordsHandler('Lifted_TextArea')}/> */}
				</div>
				  
             </form>
		
		</div>
	  
    );
  }
}

export default TextAreaX;
