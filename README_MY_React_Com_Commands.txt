Sms Api React version.
Uses React JS version 16.6.3 (was released on 23/10/2018),  last version is 16.13.1 

Structure of this project

 Index.js --|
            |--- App.js ----|                     | -- <DisplayPhoneRegExpMessage/> - shows green/red message {"Vallid UA/EU phone number"}, diffrent regExp for EU/EU
                            | -- <TextArea/> ---- | -- inputs (cell number, sms text)
                            |                     |	-- <CountSmsText/> - counts sms chars left (160 or 120 based on Ru or Eng input)
                            |                     | -- buttons (submit, reset)
                            |                     | -- <FlashMessage/> - animated pop-up image on error
                            |                     | -- <ResultFromTextbeltApi/>	-> shows all responses from Api, handles check delivery status	
                            |                     | -- <AjaxLoader/> -- Shows gif spinner loader, when user clicks "Send sms"							
                            |                     | -- functions_injected --> functions used in <TextAreaX/> --> Autocomplete + Validate_RegExp + sendSmsMessage
                            |
                            | -- <TechnicalInfo/> -- uses LiftUpComponent/<LiftedTo_Component/>
                            |
                            | -- <ErrorLayout/>
                            |
                            | -- <TopSectionButtons/> ---- functions_injected -> changeThemeInjected
							
=============================================================

Content
1. Install
2.How to uplift var value from child component to Parent state, triggered on direct onClick action
3.How to uplift var value from child component to Parent state manually(without onClick), triggered in some child function by direct function calling:
4.How to pass state from Parent to Child
5.How to BUILD/Pack APP for hosting server
6.ERROR GIF LOADER:

8.React Work with Form input, how to set state
9. Set state considering setState is asynchronous
10. Add event on button click
11. Import function from other file
12.	How disable a button with state
13. Change CSS class based on state value
14. Refs
15. Counter with prevState

16. Axios
17. Cors in Ajax (Cross-origin resource sharing)(Same-Origin-Policy) 
18. How to toggle boolean state of react component?
19. How to change button text (any text) based on boolean state of react component
20. Error when using setState in ajax success section
21. Multiple CSS classes 
22. Use State in Render, if State type is array[]/object{} 
23. SetState/Update State if State typeof is Array/Object (how add new value to array/object))
24. Using parent's state in child component (as a new child's component state)
25. React imitation of fadeIn/fadeOut animation with overlay div, i.e analogue of{$(".del-st").stop().fadeOut("slow",function(){ /*$(this).html(finalText) */}).fadeIn(3000); 
26. 2 functions inside one file injected to component
27. Troubles with {this} in sub-child functions

99. Troubleshoots
100. How this project works

===============================
1. Install
Install React (NB: in fact,this project is installed via simple copying of old react project, because of some outdated npm features)
1. Having NPM globally installed, go 1 folder up of desired react app
2.CLI => 
  npx create-react-app my-app
  cd my-app
  npm start

#No need to run {CLI => npm init} after it, as "package.json" will be created automatically.

#Start react application = > npm start
If don't have in your package.json section "scripts", add:
 "scripts": {
    "start": "react-scripts start",

Server will be running at => http://localhost:3000/	








 
==================================================

2.How to uplift var value from child component to Parent state, triggered on direct onClick action:
1. In Child comp add to render section => {  render() { var handleToUpdate  = this.props.handleToUpdate;}
2. In Child comp add to return section => {<button onClick={() => handleToUpdate('some var to lift')}>}
3. In Parent comp add to constructor(props){} =>  var handleToUpdate = this.handleToUpdate.bind(this);
4. In Parent comp add to constructor(props){} the body of method/func  => handleToUpdate(someArg){this.setState({arg1:someArg});}
5. In Parent comp call the Child component itself => <LiftedFrom_Component handleToUpdate = {handleToUpdate.bind(this)}/>





============================================================

3.How to uplift var value from child component to Parent state manually(without onClick), triggered in some child function by direct function calling:
1. In Child comp in a place u want, call the parent method and pass to its arg neccessary values data {this.props.liftFinalCoordsHandler(this.state.coordinateArray[0])}
2. NOT NECESSARILY!! => In Parent comp add  binding to constructor(props){} =>var liftFinalCoordsHandler = this.liftFinalCoordsHandler.bind(this);  //for catching lifted state from TextArea Comp
3. In Parent comp describe the method and what to do with passed argument=>
   //method for catching lifted state from TextArea.js Component, triggered manually by {this.props.liftFinalCoordsHandler(this.state.coordinateArray[0])} in TerxArea.js
    liftFinalCoordsHandler(someArgCoords){
        alert('TextArea from Child(TextArea.js) to Parent(App.js): ' + someArgCoords);
        this.setState({arg1:someArgCoords});
    }
4. In Parent comp add to render section => var liftFinalCoordsHandler =  this.liftFinalCoordsHandler ;
5. In Parent comp call/declare Child Component itself with params=> <TextAreaX liftFinalCoordsHandler = {liftFinalCoordsHandler.bind(this)}/>, no matter it is not triggered on click





====================================================

4.How to pass state from Parent to Child=> 
   {<LiftedTo_Component liftedValue={this.state.arg1}}, then in Componenent dispaly by {this.props.liftedValue}





====================================================

5.How to BUILD/Pack APP for hosting server
Folder "BUILD" is for ready created app with all minified concatenated dependencies.
Created by CLI-> npm run build.

Known Problem Issue: path to js,css in BUILD should be without "/" in beginning => 
 1. "static/js/...", not "/static/js/" (in index.html) (4 times)
 2. "favicon"
 3.GIF imge was not loading => change to {e.exports=/*a.p+*/"static/media/loading2.f7ccc9e1.gif"} in build/static/js/main.91b5d174.chunk.js
     Var2 => /*s.p+*/



========================================================
6.ERROR GIF LOADER:
Error Loader is located in <ErrorLayout/>, it is display:none by default.
If input is empty Error Loader is triggered in <TextArea/>:
  $('.App').addClass('blur');  //blur the background
  $(".error-parent").fadeIn(2500); //show error gif from <Error/>
  
  
  
  "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-scripts": "3.4.1",

	
	
====================================================
8.React Work with Form input, how to set state

   handleChange(event){
     this.setState({smsTextChild: event.target.value})  //event.target.value -> input value
  }
  
  render() {
    return <input type=”text” name=”title” value={this.state.smsTextChild} onChange={this.handleChange.bind(this)}/>
	
	
  }	
  
  
=======================================================	
9. Set state considering setState is asynchronous
#Remember that setState is asynchronous, so if you want to print the new state, you have to use the callback parameter. 

  handleChange(event){
     this.setState({smsTextChild: event.target.value}
	     , () => {
          //Do something here...for instance send{this.state.smsTextChild} to parent <App/>, send it as callback
	      this.props.liftSmsTextHandler(this.state.smsTextChild);
       });

	   
	   
	   
	   
=========================================================
10. Add event on button click  
 1.In render => <input type="button" className="btn btn-primary btn-lg" value="Reset" id="reset" onClick={this.resetFields} />	   
 2. In constructor(props) { => this.resetFields = this.resetFields.bind(this);
 3. Between {constructor(props) and  render => resetFields(){}
	   
	  

	  
=========================================	
11. Import function from other file

  //slideshow.js
export function myValidate (thisX, id, regExp, butttonToDisable,  messageErr, messageSuccess, e) { 
    //some code...
}

 //and import it where you need to
 //Homepage.js
import {myValidate} from './slideshow'

constructor(props) {
  //....
}
this.myValidate = myValidate.bind(this);

handleClick (event) {
        this.myValidate(arg1, arg2....); 
    }	
	
	
	
=================================================
	   
12.	How disable a button with state
1. in state =>   this.state = {isEnable: false }
2. in some function (on some check) => this.setState({isEnable : true})
3. in render => <button onClick ={this.someFunction} disabled = {this.state.isEnable} /> 








================================================
13. Change CSS class based on state value, 
see details at https://github.com/account931/sms_Textbelt_Api_React_JS/blob/master/src/MyComponents/TextArea/TextArea.js
               https://github.com/account931/sms_Textbelt_Api_React_JS/blob/master/src/MyComponents/TextArea/child_components/DisplayPhoneRegExpMessage.js

1. Set flag state =>
     this.state = {
		isEnable: false, //true/false state for submit button }
		
2. in render =>
   <DisplayPhoneRegExpMessage status={this.state.isEnable}
   
3. In component <DisplayPhoneRegExpMessage/>
   <span className={this.props.status ? 'err-mess-wrong phone-error' : 'err-mess-ok phone-error'} >
   
4.Change this.state.isEnable somewhere in code, based on some condition => if (value.match(regExp)){  this.setState({isEnable : true});

# OR instead of step#2 & step#3, you can just the following code in render directly (i.e if you don't use separate component like <DisplayPhoneRegExpMessage/>
   <span className={this.state.isEnable ? 'err-mess-wrong phone-error' : 'err-mess-ok phone-error'} > {this.state.phoneNumberErrorMessage} </span>



===========================================   
14. Refs   
Refs in React is a way of equivalent of document.getElementById  =>

1. constructor(props) {
     super(props);
    // создадим реф в поле `textInput` для хранения DOM-элемента
    this.textInput = React.createRef();
  }
2. in render =>
   <input type="text" ref={this.textInput} />

3. In some onClick function =>
    // Установим фокус на текстовое поле с помощью чистого DOM API// Примечание: обращаемся к "current", чтобы получить DOM-узел
    this.textInput.current.focus();   
   
   
   
   
   
===============================================   
15. Counter with prevState      
this.setState(prevState => ({ wallPapperCount: prevState.wallPapperCount + 1 }));



=============================================== 
16. Axios






=============================================== 
17. Cors in Ajax (Cross-origin resource sharing)(Same-Origin-Policy) 
To see ajax requests -> F12-> Network -> XHR

   
This will work if your Ajax request is simple, i.e =>
  Запросы: GET,POST
  Тип содержимого следующего: 
    text/plain
    application/x-www-form-urlencoded
    multipart/form-data

Others request requires preliminary requests (preflight request).
 If you have access to Rest Server you do ajax request, you can do:
  17.1 Add header on Rest Server => header("Access-Control-Allow-Origin: *");
  17.2 Use XDomain Library
  
 --------  
17.1 Add header on Rest Server => header("Access-Control-Allow-Origin: *");
If u create Resr Api via Yii2, headers are added by framework and u won't encounter any CORS problems) =>
   

Working config =>
$.ajax({
  url: 'http://dimmm931.000webhostapp.com/sms_react_js/Server_Side/ajax_script/sendSms.php',//my ajax url //'https://textbelt.com/quota/textbelt',
  type: 'GET',
  //contentType: "application/json",
  dataType: 'JSON', //'JSON', 'text/html' // without this it returned string(that can be alerted), now it returns object
  crossDomain: true,  

 On Rest Server => 
header("Access-Control-Allow-Origin: *"); //must-have CORS header
//header('Content-Type: application/json); //header('Content-Type: application/json; charset=utf-8'); // <= MUST BE TURNED OFF, THIS CAUSED CRASH IN CORS JSON
header("Access-Control-Allow-Headers", "Content-Type"); //DOES NOT MATTER
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
echo json_encode($result);



------------------
17.2 Use XDomain Library => https://github.com/jpillora/xdomain/blob/gh-pages/README.md 
 17.2.1 Add to your index.html => 
   <script src="//unpkg.com/xdomain@0.8.2/dist/xdomain.min.js" slave="http://localhost/sms_Textbelt_Api_React_JS/sms-api-react/Server_Side/ajax_script/proxy.html"></script>
	 
 17.2.2 Add file Proxy.html (at Rest Api Server)	 
<!DOCTYPE HTML>
<!-- Not used, but working ==> Anti Cors https://github.com/jpillora/xdomain/blob/gh-pages/README.md -->
<script src="//unpkg.com/xdomain@0.8.2/dist/xdomain.min.js" master="http://localhost:3000/"></script>


======================================================
18. How to toggle boolean state of react component?
   this.setState(prevState => ({
          ifTestMode: !prevState.ifTestMode
      })); 
   


======================================================   
19. How to change button text (any text) based on boolean state of react component 
(see details at https://github.com/account931/sms_Textbelt_Api_React_JS/blob/master/src/MyComponents/TopSectionButtons/TopSectionButtons.js)
  1. Define the state for button text => 
    constructor(props) {
      this.state = { testButtonText : 'Some text'};
	  //.....
  2. Use in render this.state.testButtonText as text 
    <button onClick={this.runChangeTestModeFunct}> {this.state.testButtonText } </button>
	
  3. On changes in other state, e.g this.state.ifTestMode, change the this.state.testButtonText => 
  
    //toogle the state 
	  this.setState(prevState => ({
          ifTestMode: !prevState.ifTestMode
      })
	  //as it async, then do...
	  , () => {
		   //change the text of button by state
	       if(this.state.ifTestMode === true){
		       this.setState({testButtonText: "Test Mode"}); 
		   } else {
			   this.setState({testButtonText: "Prod Mode"});
		   };
       });
  

  
  
  
 =======================================================  
20. Error when using setState in ajax success section  
 https://stackoverflow.com/questions/43582971/react-setstate-doesnt-rerender-in-ajax-success
 
 Variant 1: => bind the "success" callback function to your React Component => 
  $.ajax({
    success: function(data) {
      this.setState({toRender: renderArray});
    }.bind(this)
  });  

 Variant 2: =>  use arrow function to bind this object because function syntax is the older es5 syntax which does not work with es6 => 
     success: (data) => {
        this.setState({toRender: renderArray});
     },
 
   
   
   
 //===================================================  
 21. Multiple CSS classes 
  <div className={'collapsible' + (active? ' active': '')}>  
  <div className={'col-sm-12 col-xs-12 textbelt-answer' + (this.props.answer.success? ' sms-sent': ' sms-not-sent')}>
   
 

 //=================================================== 

22. Use State in Render, if State typeof is array[]/object{} 

22.1 (if State typeOf is array)(if(typeof(state)==Array))
  render() {
	const newV = this.props.answer.map(function(item, i){
	   return <li key={i}>{item}</li>
    });
	  
      return (
		<div className="col-sm-12 col-xs-12 textbelt-answer">
          {newV }  
		</div>
    );
  }
 
 22.2 (if State typeof is Object) (if(typeof(state)==OBJECT)) , see details at => https://github.com/account931/sms_Textbelt_Api_React_JS/blob/master/src/MyComponents/TextArea/child_components/ResultFromTextbeltApi.js
 
  //iterate over state Object{}, if  typeof(state) == OBJECT
   var myObjX = this.props.answer;   
   const itteratedArray = Object.keys(myObjX).map(function(key, index) {
      return <li key={index}> {key} => {myObjX[key]}  </li>  //index is i++;  key is Object key name;  myObjX[key] is the value of key
   });
 
 
 

  
//=================================================== 
23. SetState/Update State if State typeof is Array/Object (how add new value to array/object))

23.1 SetState/Update State if State typeof is Array (how add new value to array))

 this.setState(prevState => ({
        stateName: [...prevState.array, someNewValue1, someNewValue2]
  }));


23.2 SetState/Update State if State typeof is Object (how add new value to object))
    this.setState(prevState => ({
        answerFromTextbelt: {    // object that we want to update
           ...prevState.answerFromTextbelt,    // keep all other key-value pairs
           success: data.textBeltResponse.success, textId: data.textBeltResponse.textId      // add new values(key:value)/update the value of specific key
         }
    }));
  
 


//=================================================== 
24. Using parent's state in child component (as a new child's component state)
If u want to pass parent's state to child component, DON"T ASSIGN it to new state in child's component, use in child's code directly {this.props.ifTestModeData}.
E.g => 
  In Parent we have state =>
       //......
           this.state = {ifTestMode : true,} 
       //......
       render() { return 	   
           <TechnicalInfo  ifTestModeData={this.state.ifTestMode} />
		   
  In child component DO NOT DO  =>
      //......
           this.state = {ifTest : this.props.ifTestModeData} //DO NOT DO THIS, use in child's code directly {this.props.ifTestModeData}
  




  

========================================================
25. React imitation of fadeIn/fadeOut animation with overlay div, i.e analogue of{$(".del-st").stop().fadeOut("slow",function(){ /*$(this).html(finalText) */}).fadeIn(3000); 

The idea is to create an invisible overlay div class="child-div" with opacity:0 with any gif loader u wish inside div class="parent-div", which contains any visible text.
Div class="child-div" must overlay .parent-div with the same width/height + position:absolute.
When u need to show gif loader, i.e on Click, set .child-div opacity:1, to hide set .child-div opacity:0. May hide with setTimeout for more effect
      setTimeout(function() {
	       $(".child-div").css('opacity', '0'); 
	   }, 3000);

See example implementation =>
  #Html at =>https://github.com/account931/sms_Textbelt_Api_React_JS/blob/master/src/MyComponents/TextArea/child_components/ResultFromTextbeltApi.js
  #CSS at => https://github.com/account931/sms_Textbelt_Api_React_JS/blob/master/src/css/TextArea.css => section <ResultFromTextbeltApi/> (.parent-div, .child-div)



  
  
========================================================
26. 2 functions inside one file injected to component
See details at => https://github.com/account931/sms_Textbelt_Api_React_JS/blob/master/src/MyComponents/TextArea/functions_injected/sendSmsMessage.js



  
  
  
========================================================
27. Troubles with {this} in sub-child functions
Pass {this} as argument=> 
    runSomeActionsOnAjaxResult(this);
	
	function runSomeActionsOnAjaxResult(that){
			  
	   //set true to show Div with result in <ResultFromTextbeltApi/>
	   that.setState({ifUserClickedSendSms: true});
			 
	   //Scroll to results in Mobile only
	   if(window.screen.width <= 640){ 
	       that.scrollResults(".resultScroll");



======================================================

# To run smth at start => componentDidMount(){}, place after constructor(props) {	
# Comments in render can be only in this format => {/* Comments*/}
	   
=================================================
99. Troubleshoots
1. If 	  
2. React autocomplete => https://github.com/reactjs/react-autocomplete or use JQ UI autocomplete, see => https://github.com/account931/sms_Textbelt_Api_React_JS/blob/master/src/MyComponents/TextArea/functions_injected/Autocomplete.js






================================================================
100. How this project works => see https://github.com/account931/sms_Textbelt_Api_React_JS/blob/master/README_MY_This_Project.txt
