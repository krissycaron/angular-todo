///needed to remove this line from the app.js 
console.log("app loaded first");
var app = angular.module("TodoApp", ["ngRoute"]); 
//this is where you tell angular where the library is.
//Also this ngRoute woudld be different if install using npm ... read the docs. 