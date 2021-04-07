//USED in <TextArea/> as injected function 
import $ from 'jquery';

//Function to scroll
export function scrollResults (divName, parent){  //arg(DivID, levels to go up from DivID)
	if (typeof(parent)==='undefined') {
        $('html, body').animate({
            scrollTop: $(divName).offset().top
            //scrollTop: $('.your-class').offset().top
        }, 'slow'); 
    } else {
	    //if 2nd argument is provided
		var stringX = "$(divName)" + parent + "offset().top";  //i.e constructs -> $("#divID").parent().parent().offset().top
		$('html, body').animate({
            scrollTop: eval(stringX)  
        }, 'slow'); 
	}
	
}