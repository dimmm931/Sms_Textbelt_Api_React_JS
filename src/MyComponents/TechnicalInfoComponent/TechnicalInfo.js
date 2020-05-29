import React, { Component } from 'react';
import '../../css/Technical_Info.css';
import LiftedTo_Component from '../LiftUpComponent/LiftedTo_Component';
//import error from '../../images/error.gif';
/*
import State_Array_List_Builder from '../Build_List_from_State_Array/State_Array_List_Builder';  //Component creates List from State Array
import LiftedFrom_Component from '../LiftUpComponent/LiftedFrom_Component';
*/
//import $ from 'jquery';



class TechnicalInfo extends Component {
	constructor(props) {
    super(props);
    this.state = {
		
    };
 
    // This binding is necessary to make `this` work in the callback
	//this.run_This_Component_Functions_In_Queue = this.run_This_Component_Functions_In_Queue.bind(this); //runs all functions together
    /* var handleToUpdate = this.handleToUpdate.bind(this);  //for catching lifted state from LiftedFrom_Component */
  }
  

   //methodfor catching lifted state from LiftedFrom_Component, triggerd onClick
    /* handleToUpdate(someArg){
            alert('We pass argument from Child to Parent (now we are in <Technical_Info/>): ' + someArg);
            //this.setState({arg1:someArg});
			//let v = someArg;
			this.props.handleToUpdate(someArg);
    } */
  
  
  
  
  //RENDER ------------------------------------------------
  render() {
	  /* var handleToUpdate =  this.handleToUpdate; */ //for catching lifted state from LiftedFrom_Component
	  
	  /* maps() args=>(content, iterator, arryitself)*/
      /* let constructed_answer = this.props.techInfoData.map((techItem, i, arrayZ) =>{ {}
	       
	       return(
               <li key={techItem.toString()}>
		          {techItem}
		       </li>
		   );
		   
       }) */
	  
      return (
		<div className="col-sm-12 col-xs-12"> 	 
          <div className="dropdown">
              <input type="button" className="btn btn-primary border-x" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" value="Technical Info" />
			       
			
				  
              <div className="collapse col-sm-12 col-xs-12 text-left" id="collapseExample">
			         <p className="underline"> Alerts Replacer (TechnicalInfo/> -- uses LiftUpComponent/ LiftedTo_Component/>): </p>
				     {/* {constructed_answer} */} {/* alerts goes there */}
					 
					 {/* <LiftedFrom_Component handleToUpdate = {handleToUpdate.bind(this)}/>  */ } { /* LiftedComponent component, send/uplift value onClick to App.js */ }
					 <LiftedTo_Component passedSmsValue={this.props.smsTextData}  passedPhoneNumberValue={this.props.phoneNumberData} passedIfTestModeValue={this.props.ifTestModeData}  passedtechInfoValue={this.props.techInfoDate} />               { /* LiftedComponent component for displaying states from App.js */ }
					 {/*<State_Array_List_Builder numbers={this.props.numbers}/>  */ }         {/*techInfoHandler={techInfoHandler.bind(this)}*/}   {/* Component creates List from State Array*/}
              </div>
			 
          </div>
		</div>
	  
    );
  }
}

export default TechnicalInfo;
