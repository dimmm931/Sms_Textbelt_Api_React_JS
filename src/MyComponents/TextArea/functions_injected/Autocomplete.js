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
   
   var availablePhoneTags = ["+3809766", "+38097668888",
		                    /*{label: "+3809766", value : "Dm"},
							{label: "+3809785", value : "Sh"},
							{label: "+453112",  value : "Cph"},
							{label: "+44791755",  value : "UK"},*/

							  
        ];
		
		
		//Autocomplete itself
		$("#cellNumberInput").autocomplete({
           minLength: 1,
           source: availablePhoneTags, //array of objects for autocomplete
		   
		   select: function (event, ui) {
                //displaySelectedCategoryLabel(event, ui);
            },
        })
		//build custom hints display
		/*.autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( "<li>" )
        .append( "<div>" + item.label + " => " + item.value + "</div>" )
        .appendTo( ul );
      };*/
}	
	   