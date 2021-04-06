import React, { Component } from 'react';
import '../../css/Technical_Info.css';
import LiftedToComponent from '../LiftUpComponent/LiftedTo_Component';

class TechnicalInfo extends Component {
	constructor(props) {
        super(props);
        this.state = {	
        };
    }
  
  //RENDER ------------------------------------------------
  render() {
      return (
		<div className="col-sm-12 col-xs-12"> 	 
          <div className="dropdown">
              <input type="button" className="btn btn-primary border-x" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" value="Technical Info" />
				  
              <div className="collapse col-sm-12 col-xs-12 text-left" id="collapseExample">
			         <p className="underline"> Alerts Replacer (TechnicalInfo/> -- uses LiftUpComponent/ LiftedToComponent/>): </p>
				     {/* {constructed_answer} */} {/* alerts goes there */}
					 
					 {/* <LiftedFrom_Component handleToUpdate = {handleToUpdate.bind(this)}/>  */ } { /* LiftedComponent component, send/uplift value onClick to App.js */ }
					 <LiftedToComponent passedSmsValue={this.props.smsTextData}  passedPhoneNumberValue={this.props.phoneNumberData} passedIfTestModeValue={this.props.ifTestModeData}  passedtechInfoValue={this.props.techInfoDate} />               { /* LiftedComponent component for displaying states from App.js */ }
					 {/*<State_Array_List_Builder numbers={this.props.numbers}/>  */ }         {/*techInfoHandler={techInfoHandler.bind(this)}*/}   {/* Component creates List from State Array*/}
              </div>
			 
          </div>
		</div>
	  
    );
  }
}

export default TechnicalInfo;
