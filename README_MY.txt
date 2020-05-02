Sms Api React version.
Uses React JS version 16.6.3 (was released on 23/10/2018),  last version is 16.13.1 

Content
1. Install
2.How to uplift var value from child component to Parent state, triggered on direct onClick action
3.How to uplift var value from child component to Parent state manually(without onClick), triggered in some child function by direct function calling:
4.How to pass state from Parent to Child
5.
8.React Work with Form input, how to set state
9. Set state considering setState is asynchronous
10. Add event on button click
11. Import function from other file
99. Troubleshoots

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


	
	
==============================
How it works:
1. Index.js is a JS entry point, it contains <App/> Component, 
which contains all the rest component { <Header nameX = "ReactJS"/> , <ButtonsLayout/> , <Instructions/>, <TextAreaX/>}

2. All core logic is in <TextAreaX/> Component.

3.3 <TextArea/> - core component




 
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
2. In Parent comp add  binding to constructor(props){} =>var liftFinalCoordsHandler = this.liftFinalCoordsHandler.bind(this);  //for catching lifted state from TextArea Comp
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

How to BUILD/Pack APP for hosting server
Folder "BUILD" is for ready created app with all minified concatenated dependencies.
Created by CLI-> npm run build.

Known Problem Issue: path to js,css in BUILD should be without "/" in beginning => 
 1. "static/js/...", not "/static/js/"
 2. "favicon"
 3.GIF imge was not loading => change to {e.exports=/*a.p+*/"static/media/loading2.f7ccc9e1.gif"} in build/static/js/main.91b5d174.chunk.js



========================================================
ERROR GIF LOADER:
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
export const plusSlides = (n)=>{
    showSlides(slideIndex += n);
}

 //and import it where you need to
 //Homepage.js
import {plusSlides} from './slideshow'

handleClick (event) {
        plusSlides(1); 
    }	
	   
	

# To run smth at start => componentDidMount(){}, place after constructor(props) {	
	   
=================================================
99. Troubleshoots
1. If 	   