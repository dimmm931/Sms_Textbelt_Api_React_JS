import React, { Component } from 'react';
//import '../../css/Technical_Info.css';
//import LiftedTo_Component from '../LiftUpComponent/LiftedTo_Component';
//import error from '../../images/error.gif';
/*
import State_Array_List_Builder from '../Build_List_from_State_Array/State_Array_List_Builder';  //Component creates List from State Array
import LiftedFrom_Component from '../LiftUpComponent/LiftedFrom_Component';
*/
//import $ from 'jquery';


//Message if RegExp founds cell number OK/or NOT*/}

class DisplayPhoneRegExpMessage extends Component {
	constructor(props) {
    super(props);
    this.state = {
		
    };
 
   
  }
  

 
  
  
  
  
  //RENDER ------------------------------------------------
  render() {
	
	  
      return (
		<div className="col-sm-12 col-xs-12 err-message-div"> 	 

              <span className={this.props.status ? 'err-mess-wrong phone-error' : 'err-mess-ok phone-error'} > {this.props.phoneNumberErrorMessageX} </span>  {/* Message if RegExp founds cell number OK/or NOT*/}

		</div>
	  
    );
  }
}

export default DisplayPhoneRegExpMessage;
