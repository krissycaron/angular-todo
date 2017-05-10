//need to let the project know you will be using angular. this is "var becasue it needs to be global"
//first thing it the name but then it will be an array of plug ins.
var app = angular.module("TodoApp", []);

//controller 
//dynamically creating a nav bar (NEW iife!!!)
//what goes in the (and the angular bits you want to use)
app.controller("NavCtrl", ($scope)=> {
	$scope.cat = "Meow";
	$scope.navItems=[{name: "Logout"}, {name: "All Items"}, {name: "New Item"}];
});


//second controller - 
//must pass in the scope to the variable 
app.controller("ItemCtrl", ($scope) => {
	$scope.dog="Woof!";
	$scope.showListView = true;
	
	$scope.newItem = () => {
		$scope.showListView = false;
		// console.log("new item");
	};

	$scope.allItems = () => {
		$scope.showListView = true;
		// console.log("all item");
	};



});










