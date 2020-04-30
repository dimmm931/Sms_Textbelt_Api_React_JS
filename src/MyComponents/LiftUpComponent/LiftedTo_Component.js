import React, { Component } from 'react';
//import TrendTopic from './TrendTopic';
//import logo from '../../images/api.jpeg';
//import '../../css/LiftedComponent.css';
//import $ from 'jquery';


class LiftedTo_Component extends Component {
	constructor(props) {
        super(props);
        this.state = {
        };
   }
  
 
  
  //RENDER ------------------------------------------------
  render() {
	  
    return (
	   
	   <div className="lifted-to">
		   <h5>
		       <p className="underline">
		           LiftedTo_Components (lifted from parent) are => 
			   </p>
			   
			    <p>
			   {this.props.liftedPhoneNumberValue} {/* here goes lifted from Parent app.js value*/}
			   </p>
			   
			   <p>
			   {this.props.liftedSmsValue} {/* here goes lifted from Parent app.js value*/}
			   </p>
			   
		   </h5>   
		   


 

			   
			   
		  
		   
	   </div>
	  
    );
  }
}

export default LiftedTo_Component;
