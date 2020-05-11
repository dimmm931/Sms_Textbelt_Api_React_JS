import React, { Component } from 'react';
import '../../css/TopSectionButtons.css';
import {changeThemeInjected} from './functions_injected/changeThemeInjected'; //import my function

//import error from '../../images/error.gif';

//import $ from 'jquery';



class TopSectionButtons extends Component {
	constructor(props) {
    super(props);
    this.state = {
		wallPapperCount : 0,
		
    };
 
    // This binding is necessary to make `this` work in the callback
	this.runChangeThemeFunct = this.runChangeThemeFunct.bind(this);
	this.changeThemeInjected = changeThemeInjected.bind(this); //for injected from files function

  }
  
  
  runChangeThemeFunct(){
	  this.changeThemeInjected();
	  
	  
  }
 
  
  
  
  //RENDER ------------------------------------------------
  render() {
	
	  
      return (
		<div className="col-sm-12 col-xs-12 top-buttons"> 	 
           <button className="btn btn-sm btn-my shadowX change-theme" onClick={this.runChangeThemeFunct} >Theme <i className="fa fa-repeat"></i></button>
		   <button className="btn btn-sm btn-my shadowX btn-next">Test mode <i className="fa fa-link"></i></button>
		</div>
	  
    );
  }
}

export default TopSectionButtons;
