Sms Api React version.
Uses React JS version 16.6.3 (was released on 23/10/2018),  last version is 16.13.1 
===============================
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

How to uplift var value from child component to Parent state, triggered on direct onClick action:
1. In Child comp add to render section => {  render() { var handleToUpdate  = this.props.handleToUpdate;}
2. In Child comp add to return section => {<button onClick={() => handleToUpdate('some var to lift')}>}
3. In Parent comp add to constructor(props){} =>  var handleToUpdate = this.handleToUpdate.bind(this);
4. In Parent comp add to constructor(props){} the body of method/func  => handleToUpdate(someArg){this.setState({arg1:someArg});}
5. In Parent comp call the Child component itself => <LiftedFrom_Component handleToUpdate = {handleToUpdate.bind(this)}/>

==========

How to uplift var value from child component to Parent state manually(without onClick), triggered in some child function by direct function calling:
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

How to pass state from Parent to Child=> {<LiftedTo_Component liftedValue={this.state.arg1}}, then in Componenent dispaly by {this.props.liftedValue}





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
