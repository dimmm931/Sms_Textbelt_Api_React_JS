import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/autocomplete';
import 'jquery-ui/themes/base/autocomplete.css';  //according to folder stucture in node_modules

/*
import swal from 'sweetalert';
import error from '../../images/error.gif';
import '../../css/TextArea.css';
import axios from 'axios';
import CopyLayout from '../Copy/CopyLayout';
*/





//Function that Validates inputs on change (confirm delete 2nd arg (id)?????).
// **************************************************************************************
// **************************************************************************************
//                                                                                     ** 
//export const AutocompleteFunction =() =>{ 
export function AutocompleteFunction (){ 

  alert('autocomp');
   
   var availablePhoneTags = [ //"+38097664", "+38097854",
		                    {label: "+3809766", value : "Dm"},
							{label: "+3809785", value : "Sh"},
							{label: "+453112",  value : "Cph"},
							{label: "+44791755",  value : "UK"},

							  
        ];
		
		//must-have this context 
		// CHANGE FOR REACT!!!!!!!!!
		var that = this;
		
		//fix function for autocomplete (u type email in <input id="userName">, get autocomplete hints and onSelect puts email value (i.e user ID to) to hidden <input id="userID">)
	     function displaySelectedCategoryLabel(event, ui, that) {
			   
             //sets the selected to state in parent <TextArea/>
     		 that.setState({phoneNumberChild: ui.item.label}); //$("#cellNumberInput").val(ui.item.label);
			 that.handlePhoneNumberKeyPress(event); //reTrigger function that normally works on phone number change, validates number and uplift to parent <app/>
			 
            //$("#userID").val(ui.item.value); //hidden <input id="userID"> to contain user (get from autocomplete array)
            event.preventDefault();
        };
		
		
		
		
		//Autocomplete itself
		$("#cellNumberInput").autocomplete({
           minLength: 1,
           source: availablePhoneTags, //array of objects for autocomplete
		   
		   select: function (event, ui) {
                 displaySelectedCategoryLabel(event, ui, that); //$("#cellNumberInput").val(ui.item.label);/displaySelectedCategoryLabel(event, ui);
            },
        })
		//build custom hints display
		.autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( "<li>" )
        .append( "<div>" + item.label + " => " + item.value + "</div>" )
        .appendTo( ul );
      };
}	
	   